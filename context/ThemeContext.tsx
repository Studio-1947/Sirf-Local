'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = {
  bg: string;
  accent: string;
  name: string;
};

const themes: Theme[] = [
  { name: 'Navy', bg: '#1F2A44', accent: '#FFFFFF' },
  { name: 'Burgundy', bg: '#5A0F2E', accent: '#FFFFFF' },
  { name: 'Onyx', bg: '#232429', accent: '#FFFFFF' },
  { name: 'Emerald', bg: '#0B3D2E', accent: '#FFFFFF' },
  { name: 'Ochre', bg: '#5A4A00', accent: '#FFFFFF' },
  { name: 'Rust', bg: '#7B3501', accent: '#FFFFFF' },
  { name: 'Teal', bg: '#106163', accent: '#FFFFFF' },
  { name: 'Purple', bg: '#531162', accent: '#FFFFFF' },
  { name: 'Coffee', bg: '#805B2F', accent: '#FFFFFF' },
  { name: 'MossGreen', bg: '#4F5815', accent: '#FFFFFF' },
  { name: 'Orange', bg: '#920000', accent: '#FFFFFF' },
  { name: 'Blue', bg: '#112971', accent: '#FFFFFF' },
];

interface ThemeContextType {
  currentTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Sequential theme selection
    const lastIndex = localStorage.getItem('lastThemeIndex');
    let nextIndex = 0;
    if (lastIndex !== null) {
      nextIndex = (parseInt(lastIndex, 10) + 1) % themes.length;
    }
    localStorage.setItem('lastThemeIndex', nextIndex.toString());
    
    const selectedTheme = themes[nextIndex];
    setCurrentTheme(selectedTheme);

    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', selectedTheme.bg);
    root.style.setProperty('--accent', selectedTheme.accent);

    // Convert hex to RGB for components that need opacity
    const r = parseInt(selectedTheme.bg.slice(1, 3), 16);
    const g = parseInt(selectedTheme.bg.slice(3, 5), 16);
    const b = parseInt(selectedTheme.bg.slice(5, 7), 16);
    root.style.setProperty('--bg-rgb', `${r}, ${g}, ${b}`);

    // Accent RGB
    const ar = parseInt(selectedTheme.accent.slice(1, 3), 16);
    const ag = parseInt(selectedTheme.accent.slice(3, 5), 16);
    const ab = parseInt(selectedTheme.accent.slice(5, 7), 16);
    root.style.setProperty('--accent-rgb', `${ar}, ${ag}, ${ab}`);

    // Text Colors as per User Requirement
    root.style.setProperty('--text-primary', '#FFFFFF');
    root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.6)');

    // White Opacity Scale for sophisticated emphasis
    root.style.setProperty('--white-100', 'rgba(255, 255, 255, 1.0)');
    root.style.setProperty('--white-90', 'rgba(255, 255, 255, 0.9)');
    root.style.setProperty('--white-80', 'rgba(255, 255, 255, 0.8)');
    root.style.setProperty('--white-70', 'rgba(255, 255, 255, 0.7)');
    root.style.setProperty('--white-60', 'rgba(255, 255, 255, 0.6)');
    root.style.setProperty('--white-50', 'rgba(255, 255, 255, 0.5)');
    root.style.setProperty('--white-40', 'rgba(255, 255, 255, 0.4)');
    root.style.setProperty('--white-30', 'rgba(255, 255, 255, 0.3)');
    root.style.setProperty('--white-20', 'rgba(255, 255, 255, 0.2)');
    root.style.setProperty('--white-10', 'rgba(255, 255, 255, 0.1)');
    root.style.setProperty('--white-05', 'rgba(255, 255, 255, 0.05)');

    // Button Colors (Solid Button: White-ish with Theme Color text)
    root.style.setProperty('--btn-solid-bg', '#E5E7EB'); // Light gray/white-ish
    root.style.setProperty('--btn-solid-text', selectedTheme.bg);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
