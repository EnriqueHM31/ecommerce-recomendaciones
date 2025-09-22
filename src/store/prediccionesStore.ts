import { create } from 'zustand';
import type { Producto } from '../types/productos';
import { useCartStore } from './cartStore';

export interface IPredicciones {
    producto: string;
    score: number;
}

interface IPrediccionesStore {
    predicciones: Producto[];
    fetchPredicciones: (id_usuario: string | undefined) => Promise<void>;
}

const prediccionesStore = create<IPrediccionesStore>((set) => ({
    predicciones: [],
    fetchPredicciones: async (id_usuario: string | undefined) => {

        const response = await fetch(`${import.meta.env.VITE_API}/api/usuario/${id_usuario}`, {
            method: 'GET',
        });
        const { recomendaciones, populares } = await response.json();

        if (recomendaciones) {
            const skus = recomendaciones.map((recomendacion: IPredicciones) => recomendacion.producto.split(' - ')[0]);

            const productosPlanos = useCartStore.getState().productosPlanos;
            const predicciones = productosPlanos.filter(producto => producto.sku !== '' && skus.includes(producto.sku));

            set({ predicciones: predicciones });
            return
        }
        const skus = populares.map((recomendacion: IPredicciones) => recomendacion.producto.split(' - ')[0]);

        const productosPlanos = useCartStore.getState().productosPlanos;
        const predicciones = productosPlanos.filter(producto => producto.sku !== '' && skus.includes(producto.sku));


        set({ predicciones });

    },
}));

export default prediccionesStore;

export const usePrediccionesStore = prediccionesStore;