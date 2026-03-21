// Text Analysis Utilities

export interface ReadingTimeResult {
  minutes: number;
  seconds: number;
  words: number;
}

export function calculateReadingTime(text: string, wordsPerMinute: number = 200): ReadingTimeResult {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  const totalMinutes = words / wordsPerMinute;
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);

  return { minutes, seconds, words };
}

export interface KeywordDensity {
  keyword: string;
  count: number;
  density: number;
}

export function calculateKeywordDensity(text: string, topN: number = 10): KeywordDensity[] {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3); // Ignore short words

  const totalWords = words.length;
  const wordCount = new Map<string, number>();

  words.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });

  const keywords: KeywordDensity[] = Array.from(wordCount.entries())
    .map(([keyword, count]) => ({
      keyword,
      count,
      density: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return keywords;
}

export interface TextDiff {
  added: string[];
  removed: string[];
  unchanged: string[];
}

export function compareTexts(text1: string, text2: string): TextDiff {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  const set1 = new Set(lines1);
  const set2 = new Set(lines2);

  const added = lines2.filter(line => !set1.has(line));
  const removed = lines1.filter(line => !set2.has(line));
  const unchanged = lines1.filter(line => set2.has(line));

  return { added, removed, unchanged };
}

export function sortLines(text: string, order: 'asc' | 'desc' | 'length' = 'asc'): string {
  const lines = text.split('\n');

  switch (order) {
    case 'desc':
      return lines.sort((a, b) => b.localeCompare(a)).join('\n');
    case 'length':
      return lines.sort((a, b) => a.length - b.length).join('\n');
    default:
      return lines.sort().join('\n');
  }
}

export function removeDuplicateLines(text: string): string {
  const lines = text.split('\n');
  const unique = [...new Set(lines)];
  return unique.join('\n');
}

export function findAndReplace(text: string, find: string, replace: string, caseSensitive: boolean = false): string {
  if (!caseSensitive) {
    const regex = new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    return text.replace(regex, replace);
  }
  return text.split(find).join(replace);
}

export function splitText(text: string, delimiter: string): string[] {
  return text.split(delimiter);
}

export function addLineNumbers(text: string, startFrom: number = 1): string {
  const lines = text.split('\n');
  return lines.map((line, index) => `${startFrom + index}. ${line}`).join('\n');
}

export function extractEmails(text: string): string[] {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(emailRegex) || [];
}
