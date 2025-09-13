import { toast } from 'sonner';
import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
    theme: Theme;
    toggleTheme: () => void;
}

// Función para obtener el theme inicial
const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) return savedTheme;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

export const useThemeStore = create<ThemeStore>((set) => {
    const initialTheme = getInitialTheme();
    // Asignar el theme al cargar
    document.documentElement.setAttribute('data-theme', initialTheme);

    return {
        theme: initialTheme,
        toggleTheme: () => set((state) => {
            const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            toast.success(`Se cambió el tema a ${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)}.`);
            return { theme: newTheme };
        }),

    };
});
