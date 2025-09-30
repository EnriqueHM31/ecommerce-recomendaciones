import { create } from 'zustand';

export interface ProductoBase {
    id: number;
    nombre: string;
    categoria_id: number;
}

export interface Variantes {
    id: number;
    nombre_variante: string;
    producto_base_id: number;
}

export interface Colores {
    id: number;
    nombre: string;
}

export interface Almacenamientos {
    id: number;
    capacidad: string;
    tipo: string;
}

export interface Ram {
    id: number;
    capacidad: string;
    tipo: string;
}


export interface Tecnico {
    dataProductosBase: ProductoBase[];
    dataVariantes: Variantes[];
    dataColores: Colores[];
    dataAlmacenamientos: Almacenamientos[];
    dataRams: Ram[];

}

interface TecnicoStoreProps {
    tecnicos: Tecnico;
    setTecnicos: (tecnicos: Tecnico) => void;
    fetchTecnicos: () => Promise<void>;
}


export const TecnicosStore = create<TecnicoStoreProps>((set) => ({
    tecnicos: {} as Tecnico,
    setTecnicos: (tecnicos) => set({ tecnicos }),

    fetchTecnicos: async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/api/tecnicos`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Error al obtener los tecnicos');
        }
        const { data } = await response.json();
        set({ tecnicos: data });
    },
}));

export const useTecnicosStore = TecnicosStore;