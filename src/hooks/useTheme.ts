import {useEffect, useState} from 'react';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'site-theme';

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');

  // read stored value client-side
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored) setTheme(stored as Theme);
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const apply = (t: Theme) => {
      const root = document.documentElement;
      if (t === 'dark') {
        root.classList.add('dark');
      } else if (t === 'light') {
        root.classList.remove('dark');
      } else {
        // system: match prefers-color-scheme
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) root.classList.add('dark');
        else root.classList.remove('dark');
      }
    };

    apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }

    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (theme === 'system') {
        apply('system');
      }
    };
    if (mq && mq.addEventListener) mq.addEventListener('change', handler);
    return () => {
      if (mq && mq.removeEventListener) mq.removeEventListener('change', handler);
    };
  }, [theme]);

  return {theme, setTheme};
}
