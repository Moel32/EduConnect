"use client";
// ThemeProvider.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const storedLanguage = localStorage.getItem('language');

    if (storedTheme) setTheme(storedTheme);
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
