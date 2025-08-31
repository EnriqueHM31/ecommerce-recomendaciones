import { create } from "zustand";

interface Producto {
    id: number;
    nombre: string;
    // agrega más campos según tu API
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
            const response = await fetch(`${import.meta.env.VITE_API}/api/productos`);
            const data = await response.json();
            set({ productos: data });
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    },
}));
