import { create } from 'zustand';
import type { PaymentSession } from '../types/pago';

interface ComprasStore {
    pedidos: PaymentSession[];
    loading: boolean;
    error: string | null;
    detalles: boolean;

    // Actions
    fetchPedidos: (email: string) => void;
}


export const useComprasStore = create<ComprasStore>()(
    (set) => ({
        pedidos: [],
        loading: true,
        error: null,
        detalles: false,

        fetchPedidos: async (email: string) => {
            if (!email) {
                set({ error: "No se encontró el email del usuario", loading: false });
                return;
            }

            try {
                set({ loading: true, error: null });

                const response = await fetch(`${import.meta.env.VITE_API}/api/compra/pedidos/${email}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los pedidos");
                }

                const { data } = await response.json();

                set({ pedidos: data || [], loading: false });

            } catch (err) {
                set({ error: err instanceof Error ? err.message : "Error desconocido", loading: false });
            } finally {
                set({ loading: false });
            }
        },

    })
);