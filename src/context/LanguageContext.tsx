
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ar;
  dir: 'rtl' | 'ltr';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    // Basic detection or persistence could be added here
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    dir: (language === 'ar' ? 'rtl' : 'ltr') as 'rtl' | 'ltr'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
