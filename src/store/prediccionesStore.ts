import { create } from 'zustand';
import type { Producto } from '../types/productos';
import { useCartStore } from './cartStore';

export interface IPredicciones {
    producto: string;
    score: number;
}

interface IPrediccionesStore {
    predicciones: Producto[];
    recomendado: boolean
    fetchPredicciones: (id_usuario: string | undefined) => Promise<void>;
}

const prediccionesStore = create<IPrediccionesStore>((set) => ({
    predicciones: [],
    recomendado: false,
    fetchPredicciones: async (id_usuario: string | undefined) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/recomendaciones?userId=${id_usuario}`, {
                method: 'GET',
            });

            const data = await response.json();

            // 'detalle' contiene array de { producto_id, sku }
            const { detalle, recomendado } = data;

            console.log({ recomendado });

            if (!recomendado) {
                console.log({ detalle });
                console.log({ data: useCartStore.getState().products });

                if (!detalle || detalle.length === 0) {
                    // Si no hay detalle, fallback opcional: mostrar productos populares de tu store
                    const productosPopulares = useCartStore
                        .getState()
                        .products.slice(0, 4); // por ejemplo, los primeros 5
                    set({ predicciones: productosPopulares });
                    return;
                }

                // 1️⃣ Obtener los SKUs recomendados
                const productosRecomendadosSKUs = detalle.map((item: Producto) => item.producto_id);

                // 2️⃣ Filtrar los productos que ya están en tu store
                const productosFiltrados = useCartStore
                    .getState()
                    .products.filter(p => productosRecomendadosSKUs.includes(p.id));

                // 3️⃣ Actualizar el estado
                set({ predicciones: productosFiltrados });
            } else {
                console.log({ detalle });
                console.log({ data: useCartStore.getState().products });

                if (!detalle || detalle.length === 0) {
                    // Si no hay detalle, fallback opcional: mostrar productos populares de tu store
                    const productosPopulares = useCartStore
                        .getState()
                        .products.slice(0, 4); // por ejemplo, los primeros 5
                    console.log({ productosPopulares });
                    set({ predicciones: productosPopulares });
                    return;
                }

                // 1️⃣ Obtener los SKUs recomendados
                const productosRecomendadosSKUs = detalle.map((item: Producto) => item.producto);

                // 2️⃣ Filtrar los productos que ya están en tu store
                const productosFiltrados = useCartStore
                    .getState()
                    .products.filter(p => productosRecomendadosSKUs.includes(p.sku));

                // 3️⃣ Actualizar el estado
                set({ predicciones: productosFiltrados });
            }
            set({ recomendado });

        } catch (err) {
            console.error("❌ Error al obtener predicciones:", err);

            // Fallback opcional: mostrar productos populares
            const productosPopulares = useCartStore
                .getState()
                .products.slice(0, 5);
            set({ predicciones: productosPopulares });
        }
    },

}));

export default prediccionesStore;

export const usePrediccionesStore = prediccionesStore;