export const localeNames = {
  en: "English",
  hi: "हिन्दी",
  as: "অসমীয়া",
  mni: "মৈতৈলোন",
  bn: "বাংলা",
  ne: "नेपाली",
} as const;

export type Locale = keyof typeof localeNames;

export const messages: Record<Locale, Record<string, string>> = {
  en: { myDay: "My Day", games: "Games", memories: "My Memories", assistant: "Assistant", greeting: "Good morning, Asha", done: "Done", later: "Remind me later", help: "Need help", dashboard: "Caregiver dashboard" },
  hi: { myDay: "मेरा दिन", games: "खेल", memories: "मेरी यादें", assistant: "सहायक", greeting: "सुप्रभात, आशा", done: "हो गया", later: "बाद में याद दिलाएँ", help: "मदद चाहिए", dashboard: "देखभालकर्ता डैशबोर्ड" },
  as: { myDay: "মোৰ দিন", games: "খেল", memories: "মোৰ স্মৃতি", assistant: "সহায়ক", greeting: "সুপ্ৰভাত, আশা", done: "হ'ল", later: "পিছত সোঁৱৰাই দিব", help: "সহায় লাগে", dashboard: "যত্নকাৰী ডেশ্বব'ৰ্ড" },
  mni: { myDay: "ঐগী নোংমা", games: "শান্নবা", memories: "ঐগী নিংশিংবা", assistant: "মতেং পাংবা", greeting: "নুংাইবা নোংমা, আশা", done: "লোইরে", later: "মথংদা নিংশিংহল্লো", help: "মতেং পীদুনা", dashboard: "কেয়ারগিভর দাশবোর্দ" },
  bn: { myDay: "আমার দিন", games: "খেলা", memories: "আমার স্মৃতি", assistant: "সহায়ক", greeting: "সুপ্রভাত, আশা", done: "হয়ে গেছে", later: "পরে মনে করান", help: "সাহায্য চাই", dashboard: "যত্নদাতা ড্যাশবোর্ড" },
  ne: { myDay: "मेरो दिन", games: "खेलहरू", memories: "मेरा सम्झनाहरू", assistant: "सहायक", greeting: "शुभ प्रभात, आशा", done: "भयो", later: "पछि सम्झाउनुहोस्", help: "मद्दत चाहियो", dashboard: "हेरचाहकर्ता ड्यासबोर्ड" },
};
