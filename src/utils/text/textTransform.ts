// Text Transformation Utilities
export function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function countCharacters(text: string, includeSpaces: boolean = true): number {
  return includeSpaces ? text.length : text.replace(/\s/g, '').length;
}

export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
}

export function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
}

export function removeExtraSpaces(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function removeAllSpaces(text: string): string {
  return text.replace(/\s/g, '');
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function toSentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

export function reverseWords(text: string): string {
  return text.split(' ').reverse().join(' ');
}
