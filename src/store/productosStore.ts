import { create } from "zustand";
import { AdapterProductos } from "../adapters/productos";

interface Producto {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    recommended: boolean;
    variants: string[];
    storage: string[];
    specs: {
        processor?: string;
        ram?: string;
        display?: string;
        camera?: string;
        battery?: string;
        connectivity?: string;
        os?: string;
    };
    configurations: {
        id: string;
        variant: string;
        storage: string;
        ram?: string;
        price: number;
        stock: number;
        specs: {
            processor?: string;
            ram?: string;
            display?: string;
            camera?: string;
            battery?: string;
            connectivity?: string;
            os?: string;
        };
    }[];
}


interface ProductosStore {
    productos: Producto[];
    setProductos: (productos: Producto[]) => void;
    fetchProductos: () => Promise<void>;
}

// Store de Zustand
export const useProductosStore = create<ProductosStore>((set) => ({
    productos: [],
    setProductos: (productos) => set({ productos }),
    fetchProductos: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/productos/todos`);
            const { data } = await response.json();

            const productosAdaptados = AdapterProductos(data)
            set({ productos: productosAdaptados });
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    },
}));
