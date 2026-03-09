/**
 * Shared question display helpers: split question text into prefix + code,
 * and format code with indentation. Used by IdLogView and HistoryLog.
 */
import { translateQuestionText } from './translateQuestion';

export const formatCodeSnippet = (text: string): string => {
  if (!text) return '';

  const isSimpleExpression = !text.includes('\n') &&
    !/\b(def|class|if|for|while|with|try|except|finally|else|elif)\b/.test(text);

  if (isSimpleExpression) return text;
  if (text.includes('\n')) return text;

  let inString: string | null = null;
  let bracketDepth = 0;
  let currentLine = '';
  const initialLines: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (!inString && (char === "'" || char === '"')) {
      inString = char;
      currentLine += char;
    } else if (inString === char && text[i - 1] !== '\\') {
      inString = null;
      currentLine += char;
    } else if (!inString && (char === '[' || char === '(' || char === '{')) {
      bracketDepth++;
      currentLine += char;
    } else if (!inString && (char === ']' || char === ')' || char === '}')) {
      bracketDepth--;
      currentLine += char;
    } else if (!inString && bracketDepth === 0 && char === ':') {
      currentLine += char;
      initialLines.push(currentLine.trim());
      currentLine = '';
    } else if (!inString && bracketDepth === 0 && char === ';') {
      if (currentLine.trim()) initialLines.push(currentLine.trim());
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim()) initialLines.push(currentLine.trim());

  let currentIndent = 0;
  const formattedLines: string[] = [];

  for (let i = 0; i < initialLines.length; i++) {
    let line = initialLines[i];
    if (/^(else|elif|except|finally)\b/.test(line)) {
      currentIndent = Math.max(0, currentIndent - 1);
    }
    if (currentIndent > 0) {
      if (/^(print|assert|obj\s*=|f\s*=|x\s*=|y\s*=|g\s*=|next\([^)]*\)|[a-z_]\w*\s*=\s*[A-Z])/.test(line) && !line.startsWith('self.')) {
        currentIndent = 0;
      }
      if (/^(class|import|from)\b/.test(line)) currentIndent = 0;
      if (line.match(/^[a-z_]\w*\(/) && !line.startsWith('self.')) {
        const funcName = line.split('(')[0];
        if (!initialLines.slice(0, i).some(l => l.includes('def ' + funcName))) {
          currentIndent = 0;
        }
      }
    }
    formattedLines.push(' '.repeat(currentIndent * 4) + line);
    if (line.endsWith(':')) {
      currentIndent++;
    } else if (/^(return|pass|break|continue)\b/.test(line)) {
      currentIndent = Math.max(0, currentIndent - 1);
    }
  }
  return formattedLines.join('\n');
};

export const splitQuestion = (text: string, language: string = 'en', questionId?: number): { prefix: string; code: string } => {
  try {
    const enhancedText = translateQuestionText(text, language, questionId);

    if (enhancedText.includes('\n')) {
      const lines = enhancedText.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\s{2,}/.test(line) || /^\s*(def|class|for|while|if|with|import|from)\s+/.test(line)) {
          return {
            prefix: lines.slice(0, i).join('\n').trim(),
            code: lines.slice(i).join('\n')
          };
        }
      }
    }

    const questionWords = [
      'What is', 'Résultat : ',
      'Result', 'Résultat',
      'Output', 'Sortie',
      'Value', 'Valeur',
      'What', 'Which', 'Lequel', 'How', 'Comment', 'When', 'Quand', 'Where', 'Où', 'Why', 'Pourquoi',
      'Can', 'Peut', 'Does', 'Est-ce que', 'Is', 'Est', 'Are', 'Sont', 'Will', 'Va', 'Would', 'Serait', 'Should', 'Devrait'
    ];

    let questionWordMatch = null;
    for (const word of questionWords) {
      const pattern = new RegExp(`^${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+`, 'i');
      const match = enhancedText.match(pattern);
      if (match) {
        questionWordMatch = match;
        break;
      }
    }

    if (questionWordMatch && questionWordMatch[0]) {
      const questionEnd = questionWordMatch[0].length;
      let remainingText = enhancedText.substring(questionEnd).trim();
      remainingText = remainingText.replace(/^(of|de|is)\s+/i, '');
      const hasQuestionMark = remainingText.endsWith('?');
      if (hasQuestionMark) remainingText = remainingText.slice(0, -1).trim();

      const functionCallPattern = /[a-zA-Z_]\w*\s*\(/;
      const codeKeywordPattern = /\b(def|class|for|while|if|with|import|from|print)\s+/;
      const bracketPattern = /[\[\(\{]/;

      if (functionCallPattern.test(remainingText) ||
        bracketPattern.test(remainingText) ||
        codeKeywordPattern.test(remainingText)) {
        return {
          prefix: enhancedText.substring(0, questionEnd).trim() + (hasQuestionMark ? '?' : ''),
          code: remainingText
        };
      }
    }

    const codePatterns = [
      /\b(def|class|for|while|if|with|import|from)\s+/,
      /print\s*\(/,
      /[a-zA-Z_]\w*\s*\(/,
    ];

    for (const pattern of codePatterns) {
      const match = enhancedText.match(pattern);
      if (match && match.index !== undefined) {
        const beforeCode = enhancedText.substring(0, match.index).trim();
        if (/^(What|Result|Output|Value|Which|How|When|Where|Why|Can|Does|Is|Are|Will|Would|Should)/i.test(beforeCode)) {
          return {
            prefix: beforeCode,
            code: enhancedText.substring(match.index).trim()
          };
        }
      }
    }

    return { prefix: enhancedText, code: '' };
  } catch (error) {
    return { prefix: text, code: '' };
  }
};
