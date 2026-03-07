import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LEVELS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';
import { PersonaStage } from '../types';
import { PersonaIcon } from './PersonaIcon';

/** Map PersonaStage to translation key (personas.xxx) */
const PERSONA_I18N_KEYS: Record<PersonaStage, string> = {
  [PersonaStage.TADPOLE]: 'tadpole',
  [PersonaStage.PLANKTON]: 'plankton',
  [PersonaStage.SHRIMP]: 'shrimp',
  [PersonaStage.CRAB]: 'crab',
  [PersonaStage.SMALL_FISH]: 'smallFish',
  [PersonaStage.OCTOPUS]: 'octopus',
  [PersonaStage.SEAL]: 'seal',
  [PersonaStage.DOLPHIN]: 'dolphin',
  [PersonaStage.SHARK]: 'shark',
  [PersonaStage.WHALE]: 'whale',
  [PersonaStage.GOD_WHALE]: 'godWhale',
};

interface FlowViewProps {
  onBack: () => void;
}

const codeBlockStyle = {
  padding: '0.75rem 1rem',
  margin: 0,
  background: 'transparent',
  fontSize: '0.8rem',
  lineHeight: '1.5',
  fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
  borderRadius: '0.5rem',
};
const codeTagStyle = {
  fontFamily: "'Fira Code', 'Monaco', 'Consolas', monospace",
  whiteSpace: 'pre' as const,
  display: 'block',
};

export const FlowView: React.FC<FlowViewProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { playCutSound } = useSound();

  return (
    <div className="relative min-h-[400px] animate-in slide-in-from-left duration-300 pb-12">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => { playCutSound(); onBack(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
        >
          <i className="fas fa-arrow-left"></i>
          <span>{t('operations.back')}</span>
        </button>
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <i className="fas fa-diagram-project text-indigo-400"></i> {t('app.flow')}
        </h2>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        {t('flow.levelProgression')}
      </p>
      <div className="flex flex-col gap-3 mb-8">
        {LEVELS.map((info, i) => (
          <div key={info.level} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 flex-shrink-0">
              <PersonaIcon persona={info.persona} size="sm" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-white">{t('flow.levelLabel')} {info.level}</span>
              <span className="text-slate-400 ml-2">{t(`personas.${PERSONA_I18N_KEYS[info.persona]}`)}</span>
            </div>
            {i < LEVELS.length - 1 && (
              <i className="fas fa-chevron-down text-slate-500 text-xs flex-shrink-0"></i>
            )}
          </div>
        ))}
      </div>

      {/* Comprehensive Flow & Precedence Reference */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <i className="fas fa-book text-amber-400"></i>
          {t('flow.referenceTitle')}
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          {t('flow.referenceIntro')}
        </p>

        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-1">
          {/* 1. Indentation */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.indentationTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.indentationBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`if x > 0:
    print("positive")   # body of if (4 spaces)
    y = 1               # same block
for i in range(3):
    print(i)            # loop body
    if i == 1:
        break            # inner block (8 spaces)`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 2. for loops — order */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.forLoopsTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.forLoopsBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`# Order: outer → inner (inner runs fully per outer step)
for row in range(2):
    for col in range(2):
        print(row, col)  # (0,0),(0,1),(1,0),(1,1)
# Iterable evaluated once; body runs once per item
items = [1, 2, 3]
for x in items:
    print(x)`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 3. while loops */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.whileLoopsTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.whileLoopsBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`n = 0
while n < 3:    # 1) check condition
    print(n)    # 2) run body
    n += 1      # 3) repeat from step 1`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 4. global vs local */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.globalLocalTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.globalLocalBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`x = 10
def f():
    x = 5      # local x (assignment creates local)
    return x
def g():
    global x
    x = 5      # modifies global x
f()  # 5
g()  # x is now 5 globally`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 5. Clauses */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.clausesTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.clausesBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`if a < 0:
    sign = -1
elif a == 0:
    sign = 0
else:
    sign = 1

try:
    risky()
except ValueError as e:
    handle(e)
finally:
    cleanup()   # always runs

with open("f") as f:
    data = f.read()   # f closed on exit`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 6. return, print, pass, continue, break, yield */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.returnPrintTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.returnPrintBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`def add(a, b):
    return a + b   # exits, returns value to caller

print("hi")        # side effect: output; returns None

def stub():
    pass           # do nothing (syntax placeholder)

for i in range(5):
    if i == 2:
        continue   # skip rest of body, next i
    if i == 4:
        break      # exit loop
    print(i)

def gen():
    yield 1
    yield 2        # generator; pauses after each yield`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 7. Order of precedence — expressions */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.expressionOrderTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.expressionOrderBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`# Inner first: 2+3 then 5*4 then print(20)
print((2 + 3) * 4)

# Precedence: ** > * > +
2 ** 3 * 2    # 8*2 = 16

# Comparisons chain: 1 < 2 and 2 < 3
1 < 2 < 3     # True`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 8. Loop else, with */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.loopElseTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.loopElseBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`for x in []:
    pass
else:
    print("no break")   # runs (loop completed)

for x in [1]:
    break
else:
    print("skipped")    # not run (break happened)`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 9. Operator precedence table */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.operatorPrecedenceTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.operatorPrecedenceBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`# ()  >  **  >  * / // %  >  + -  >  comparisons  >  not  >  and  >  or
2 + 3 * 4       # 14
2 ** 2 ** 3     # 256 (right-associative)
not x and y     # (not x) and y`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 10. Function call order */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.functionCallOrderTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.functionCallOrderBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`def f(a, b):
    return a - b
f(10, 3)        # 7; 10 and 3 evaluated first
"x".upper().lower()   # "x" → "X" → "x"`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 11. Short-circuit and evaluation order */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.shortCircuitTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.shortCircuitBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`None and foo()   # None (foo not called)
1 or foo()        # 1 (foo not called)
0 or 2            # 2`}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* 12. Comprehensions and decorators */}
          <section>
            <h4 className="text-sm font-bold text-indigo-300 mb-2">{t('flow.comprehensionsTitle')}</h4>
            <p className="text-slate-400 text-xs mb-2">
              {t('flow.comprehensionsBody')}
            </p>
            <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
              <SyntaxHighlighter
                language="python"
                style={oneDark}
                customStyle={codeBlockStyle}
                codeTagProps={{ style: codeTagStyle }}
                PreTag="div"
                showLineNumbers={false}
              >
{`[x*2 for x in [1,2,3]]           # [2, 4, 6]
[(i,j) for i in [1,2] for j in [3,4]]
# (1,3),(1,4),(2,3),(2,4)  outer then inner

@outer
@inner
def f(): pass
# f = outer(inner(f)); when calling: outer runs first`}
              </SyntaxHighlighter>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
