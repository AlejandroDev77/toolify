// Lorem Ipsum Generator Logic
const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export function generateLoremWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  return words.join(' ');
}

export function generateLoremSentences(count: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    const wordCount = Math.floor(Math.random() * 10) + 5;
    let sentence = generateLoremWords(wordCount);
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
    sentences.push(sentence);
  }
  return sentences.join(' ');
}

export function generateLoremParagraphs(count: number): string {
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 5) + 3;
    paragraphs.push(generateLoremSentences(sentenceCount));
  }
  return paragraphs.join('\n\n');
}
