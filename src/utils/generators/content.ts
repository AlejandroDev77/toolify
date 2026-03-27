// Content Generator Utilities

export function generateBio(style: 'professional' | 'casual' | 'creative'): string {
  const templates = {
    professional: [
      'Experienced professional with a passion for innovation and excellence.',
      'Results-driven specialist focused on delivering high-quality solutions.',
      'Dedicated expert committed to continuous learning and growth.',
      'Strategic thinker with proven track record of success.',
    ],
    casual: [
      'Just someone who loves what they do and does it well.',
      'Living life one project at a time. Always learning, always growing.',
      'Passionate about making things happen and having fun along the way.',
      'Coffee enthusiast, problem solver, and all-around good person.',
    ],
    creative: [
      'Turning ideas into reality, one pixel at a time.',
      'Creating magic through code, design, and a sprinkle of imagination.',
      'Dreamer, maker, and believer in the power of creativity.',
      'Crafting experiences that inspire and delight.',
    ],
  };

  const options = templates[style];
  return options[Math.floor(Math.random() * options.length)];
}

export function generateHashtags(topic: string, count: number = 10): string[] {
  const commonHashtags = [
    'trending', 'viral', 'instagood', 'photooftheday', 'love', 'beautiful',
    'happy', 'follow', 'like', 'style', 'inspiration', 'motivation',
  ];

  const topicWords = topic.toLowerCase().split(' ').filter(w => w.length > 2);
  const hashtags = new Set<string>();

  // Add topic-based hashtags
  topicWords.forEach(word => {
    hashtags.add(`#${word}`);
    hashtags.add(`#${word}life`);
    hashtags.add(`#${word}love`);
  });

  // Add common hashtags
  commonHashtags.forEach(tag => hashtags.add(`#${tag}`));

  return Array.from(hashtags).slice(0, count);
}

export function generateUsername(baseName: string): string[] {
  const suffixes = ['_official', '_real', '_pro', '123', '456', 'x', 'xo', '_'];
  const prefixes = ['the', 'real', 'official', 'mr', 'ms', 'its'];
  
  const usernames: string[] = [];
  const cleanBase = baseName.toLowerCase().replace(/\s+/g, '');

  usernames.push(cleanBase);
  suffixes.forEach(suffix => usernames.push(cleanBase + suffix));
  prefixes.forEach(prefix => usernames.push(prefix + cleanBase));
  
  // Add some with numbers
  for (let i = 0; i < 3; i++) {
    const num = Math.floor(Math.random() * 1000);
    usernames.push(cleanBase + num);
  }

  return usernames.slice(0, 10);
}

export function generateSlogan(keywords: string[]): string[] {
  const templates = [
    (k: string) => `${k} - Made Simple`,
    (k: string) => `Your ${k} Solution`,
    (k: string) => `${k} Reimagined`,
    (k: string) => `The Future of ${k}`,
    (k: string) => `${k} That Works`,
    (k: string) => `Elevate Your ${k}`,
    (k: string) => `${k} Without Limits`,
    (k: string) => `Where ${k} Meets Excellence`,
  ];

  const slogans: string[] = [];
  keywords.forEach(keyword => {
    templates.forEach(template => {
      slogans.push(template(keyword));
    });
  });

  return slogans.slice(0, 10);
}

export function generateEmailTemplate(type: 'welcome' | 'followup' | 'newsletter'): string {
  const templates = {
    welcome: `Subject: Welcome to [Company Name]!

Dear [Name],

Welcome aboard! We're thrilled to have you join our community.

Here's what you can expect:
• Access to exclusive content
• Regular updates and tips
• Priority support

Get started by [action].

Best regards,
[Your Name]
[Company Name]`,

    followup: `Subject: Following up on our conversation

Hi [Name],

I wanted to follow up on our recent discussion about [topic].

As promised, here are the next steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Let me know if you have any questions!

Best,
[Your Name]`,

    newsletter: `Subject: [Month] Newsletter - [Company Name]

Hello [Name],

Here's what's new this month:

📰 Latest Updates
[Update 1]
[Update 2]

💡 Tips & Tricks
[Tip 1]
[Tip 2]

Stay tuned for more!

Cheers,
[Company Name] Team`,
  };

  return templates[type];
}
