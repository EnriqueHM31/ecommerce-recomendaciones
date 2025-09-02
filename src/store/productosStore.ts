import { create } from "zustand";
import { AdapterProductos } from "../adapters/productos";
import type { Producto } from "../types/productos";
import { obtenerProductos } from "../services/productos";

interface ProductosStore {
    productos: Producto[];
    fetchProductos: () => Promise<void>;
}

// Store de Zustand
export const useProductosStore = create<ProductosStore>((set) => ({
    productos: [],
    fetchProductos: async () => {
        const { success, message, data } = await obtenerProductos();
        if (success) {
            const productosAdaptados = AdapterProductos(data);
            set({ productos: productosAdaptados });
        }
        else {
            throw new Error(message);
        }
    },
}));
