"use client";
import React from 'react';
import NavbarFooter from '../components/NavbarFooter';
import { useTheme } from '../components/ThemeProvider';

const themes = ['light', 'dark'];
const languages = ['en', 'fr', 'es'];

const Settings: React.FC = () => {
  const { theme, setTheme, language, setLanguage } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <NavbarFooter>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">Theme</label>
          <select
            className="w-full p-2 border rounded text-black"
            value={theme}
            onChange={handleThemeChange}
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium">Language</label>
          <select
            className="w-full p-2 border rounded text-black"
            value={language}
            onChange={handleLanguageChange}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </NavbarFooter>
  );
};

export default Settings;
