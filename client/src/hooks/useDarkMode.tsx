// useDarkMode.js
import { useEffect, useState } from 'react';
const [theme, setTheme] = useState(window.localStorage.getItem('theme') || 'piresLight');

export const useDarkMode = () => {
  const [themeString, setThemeString] = useState('piresLight');
  const [componentMounted, setComponentMounted] = useState(false);
  const setMode = (mode : string) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('piresDark')
    } else {
      setMode('piresLight')
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
      setMode('piresDark') :
      localTheme ?
        setTheme(localTheme) :
        setMode('piresLight');
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted]
};