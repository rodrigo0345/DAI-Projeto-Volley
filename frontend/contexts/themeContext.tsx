import { createContext, useEffect, useState } from 'react';

export type Theme = {
  theme: string;
  enableLightMode: () => void;
  enableDarkMode: () => void;
  enableOSTheme: () => void;
};

export const ThemeContext = createContext<Theme | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<string>('dark');

  useEffect(
    function detectTheme() {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    [theme]
  );

  function enableLightMode(): void {
    localStorage.theme = 'light';
    setTheme('light'); // trigger the useEffect
  }

  function enableDarkMode(): void {
    localStorage.theme = 'dark';
    setTheme('dark');
  }

  function enableOSTheme(): void {
    localStorage.removeItem('theme');
    setTheme('dark'); // just to trigger the useEffect
  }

  return (
    <ThemeContext.Provider
      value={{ theme, enableLightMode, enableDarkMode, enableOSTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
