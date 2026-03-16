import React, { useCallback, useMemo, useState } from 'react';
import { MindMapNode } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';

const NODE_RADIUS = 80;
const CHILD_DISTANCE = 120;
const ROOT_RADIUS = 24;
const NODE_FONT_SIZE = 13;
const LABEL_OFFSET = 10;

interface MindMapViewProps {
  root: MindMapNode;
  onBack: () => void;
  onSelectNode?: (node: MindMapNode) => void;
}

interface LayoutNode {
  node: MindMapNode;
  x: number;
  y: number;
  depth: number;
  parentAngle?: number;
}

function useLayout(root: MindMapNode, expanded: Set<string>): LayoutNode[] {
  const list: LayoutNode[] = [];

  function angleFromParent(parentX: number, parentY: number): number {
    if (parentX === 0 && parentY === 0) return 0;
    return Math.atan2(parentY, parentX);
  }

  function layoutNode(
    n: MindMapNode,
    px: number,
    py: number,
    depth: number,
    startAngle: number,
    spanAngle: number
  ) {
    list.push({ node: n, x: px, y: py, depth, parentAngle: depth === 0 ? undefined : angleFromParent(px, py) });
    const isExpanded = depth === 0 || expanded.has(n.id);
    const children = n.children ?? [];
    if (!isExpanded || children.length === 0) return;

    const dist = depth === 0 ? CHILD_DISTANCE * 1.2 : CHILD_DISTANCE;
    const step = children.length <= 1 ? 0 : spanAngle / children.length;
    for (let i = 0; i < children.length; i++) {
      const angle = startAngle + i * step;
      const cx = px + dist * Math.cos(angle);
      const cy = py + dist * Math.sin(angle);
      const childSpan = Math.PI * 0.6;
      const childStart = angle - childSpan / 2;
      layoutNode(children[i], cx, cy, depth + 1, childStart, childSpan);
    }
  }

  layoutNode(root, 0, 0, 0, 0, Math.PI * 2);
  return list;
}

function getEdges(root: MindMapNode, expanded: Set<string>, layout: LayoutNode[]): { x1: number; y1: number; x2: number; y2: number }[] {
  const byId = new Map<string, LayoutNode>();
  layout.forEach((l) => byId.set(l.node.id, l));
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];

  function walk(n: MindMapNode) {
    const children = n.children ?? [];
    const isExpanded = n.id === root.id || expanded.has(n.id);
    if (!isExpanded || children.length === 0) return;
    const from = byId.get(n.id);
    if (!from) return;
    children.forEach((c) => {
      const to = byId.get(c.id);
      if (to) edges.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
      walk(c);
    });
  }
  walk(root);
  return edges;
}

export const MindMapView: React.FC<MindMapViewProps> = ({ root, onBack, onSelectNode }) => {
  const { t } = useLanguage();
  const { playCutSound } = useSound();
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set((root.children ?? []).map((c) => c.id)));
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const layout = useMemo(() => useLayout(root, expanded), [root, expanded]);
  const edges = useMemo(() => getEdges(root, expanded, layout), [root, expanded, layout]);

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const ids = new Set<string>();
    function collect(n: MindMapNode) {
      (n.children ?? []).forEach((c) => {
        ids.add(c.id);
        collect(c);
      });
    }
    collect(root);
    setExpanded(ids);
  }, [root]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set((root.children ?? []).map((c) => c.id)));
  }, [root]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((s) => Math.min(3, Math.max(0.3, s + delta)));
    },
    []
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as SVGElement).closest('g[data-node]')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart]
  );

  const handlePointerUp = useCallback(() => setIsDragging(false), []);
  const handlePointerLeave = useCallback(() => setIsDragging(false), []);

  const resetView = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setScale(1);
  }, []);

  const zoomIn = useCallback(() => setScale((s) => Math.min(3, s + 0.2)), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(0.3, s - 0.2)), []);

  const handleNodeClick = useCallback(
    (e: React.MouseEvent, node: MindMapNode) => {
      e.stopPropagation();
      const hasChildren = (node.children?.length ?? 0) > 0;
      if (hasChildren) {
        toggleExpand(node.id);
      }
      if (node.file || node.id !== 'root') {
        playCutSound();
        onSelectNode?.(node);
      }
    },
    [toggleExpand, onSelectNode, playCutSound]
  );

  const svgSize = 1200;
  const center = svgSize / 2;
  const transform = `translate(${center + pan.x},${center + pan.y}) scale(${scale})`;

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-slate-950">
      {/* Top bar — NotebookLM style: minimal, controls on right */}
      <div className="flex items-center justify-between shrink-0 px-4 py-3 border-b border-white/10 bg-slate-900/80">
        <button
          onClick={() => { playCutSound(); onBack(); }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={t('mindMap.back')}
        >
          <i className="fas fa-arrow-left" />
          <span className="text-sm font-medium">{t('mindMap.back')}</span>
        </button>
        <h1 className="text-base font-semibold text-white absolute left-1/2 -translate-x-1/2 pointer-events-none">
          {t('mindMap.title')}
        </h1>
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('mindMap.zoomOut')}
          >
            <i className="fas fa-minus text-sm" />
          </button>
          <button
            onClick={zoomIn}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('mindMap.zoomIn')}
          >
            <i className="fas fa-plus text-sm" />
          </button>
          <button
            onClick={resetView}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('mindMap.resetView')}
          >
            <i className="fas fa-compress-alt text-sm" />
          </button>
          <button
            onClick={expandAll}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('mindMap.expandAll')}
          >
            <i className="fas fa-expand-alt text-sm" />
          </button>
          <button
            onClick={collapseAll}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t('mindMap.collapseAll')}
          >
            <i className="fas fa-compress text-sm" />
          </button>
        </div>
      </div>

      {/* Canvas: full area, pan/zoom */}
      <div
        className="flex-1 min-h-0 overflow-hidden cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{ touchAction: 'none' }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="block"
          style={{ minHeight: '100%' }}
        >
          <defs>
            <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
            </filter>
            <linearGradient id="root-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(251,191,36)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="rgb(245,158,11)" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="branch-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(30,41,59)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(15,23,42)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g transform={transform}>
            {/* Edges */}
            {edges.map((edge, i) => (
              <line
                key={i}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke="rgba(251,191,36,0.35)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            ))}
            {/* Nodes */}
            {layout.map(({ node, x, y, depth }) => {
              const isRoot = node.id === root.id;
              const r = isRoot ? ROOT_RADIUS : 20;
              const hasChildren = (node.children?.length ?? 0) > 0;
              const isExpanded = depth === 0 || expanded.has(node.id);
              const canOpen = node.file || (node.id !== 'root' && onSelectNode);

              return (
                <g
                  key={node.id}
                  data-node
                  className="cursor-pointer outline-none"
                  transform={`translate(${x},${y})`}
                  onClick={(e) => handleNodeClick(e, node)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNodeClick(e as unknown as React.MouseEvent, node);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={node.name}
                >
                  <circle
                    r={r}
                    fill={isRoot ? 'url(#root-fill)' : 'url(#branch-fill)'}
                    stroke={isRoot ? 'rgba(251,191,36,0.8)' : 'rgba(251,191,36,0.4)'}
                    strokeWidth={isRoot ? 2 : 1}
                    filter="url(#node-shadow)"
                  />
                  {hasChildren && !isRoot && (
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="10"
                      fill="rgba(251,191,36,0.9)"
                      y={-r - 2}
                    >
                      {isExpanded ? '−' : '+'}
                    </text>
                  )}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={isRoot ? NODE_FONT_SIZE + 2 : NODE_FONT_SIZE}
                    fontWeight={isRoot ? 700 : 600}
                    fill={isRoot ? 'rgb(23,23,23)' : 'rgb(226,232,240)'}
                    x={0}
                    y={isRoot ? 0 : r + LABEL_OFFSET}
                    className="pointer-events-none select-none"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Hint */}
      <p className="shrink-0 px-4 py-2 text-center text-xs text-slate-500 border-t border-white/5">
        {t('mindMap.tapNode')}
      </p>
    </div>
  );
};
