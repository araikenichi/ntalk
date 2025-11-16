// Mock translation service - in production, you would use Google Translate API or similar
export const translationService = {
  translate: async (text: string, targetLang: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock translations based on common phrases
    const translations: Record<string, Record<string, string>> = {
      'Hello': {
        'zh': '你好',
        'ja': 'こんにちは',
        'ko': '안녕하세요',
        'es': 'Hola',
        'fr': 'Bonjour',
      },
      'How are you?': {
        'zh': '你好吗？',
        'ja': '元気ですか？',
        'ko': '어떻게 지내세요?',
        'es': '¿Cómo estás?',
        'fr': 'Comment allez-vous?',
      },
      'Thank you': {
        'zh': '谢谢',
        'ja': 'ありがとう',
        'ko': '감사합니다',
        'es': 'Gracias',
        'fr': 'Merci',
      },
    };

    // Check if we have a mock translation
    if (translations[text] && translations[text][targetLang]) {
      return translations[text][targetLang];
    }

    // Otherwise return a mock translation
    return `[${targetLang.toUpperCase()}] ${text}`;
  },

  correctText: async (text: string, targetLang: string): Promise<{ original: string; corrected: string; explanation: string }[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));

    // Mock corrections - in production, use AI-based grammar checking
    const mockCorrections = [
      {
        original: text,
        corrected: text.replace(/\bi am\b/gi, 'I am'),
        explanation: 'Capitalization: "I" should always be capitalized in English.',
      },
    ];

    // Only return corrections if there are actual differences
    return mockCorrections.filter(c => c.original !== c.corrected);
  },
};
