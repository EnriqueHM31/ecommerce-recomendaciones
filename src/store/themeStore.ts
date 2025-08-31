import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => {
    // Detect initial theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
        theme: savedTheme || (prefersDark ? 'dark' : 'light'),
        toggleTheme: () => set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            return { theme: newTheme };
        }),
        setTheme: (theme) => {
            localStorage.setItem('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
            set({ theme });
        },
    };
});
