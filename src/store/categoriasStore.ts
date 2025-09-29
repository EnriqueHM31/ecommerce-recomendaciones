import { create } from 'zustand';

export interface Categoria {
    id_categoria: number;
    nombre: string;
}
interface CategoriasStore {
    categorias: Categoria[];
    setCategorias: (categorias: Categoria[]) => void;
    fetchCategorias: () => Promise<void>;
}

export const CategoriasStore = create<CategoriasStore>((set) => ({
    categorias: [],
    setCategorias: (categorias) => set({ categorias }),

    fetchCategorias: async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/api/categorias`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Error al obtener las categorias');
        }
        const { data } = await response.json();
        set({ categorias: data });
    },
}));

export const useCategoriasStore = CategoriasStore;
