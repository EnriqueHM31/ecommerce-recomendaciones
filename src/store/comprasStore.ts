import { create } from "zustand";
import type { PaymentSession } from "../types/pago";

interface ComprasStore {
    pedidos: PaymentSession[];
    loading: boolean;
    error: string | null;
    detalles: boolean;

    // Paginación
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
    pages: number[]; // array de páginas [1, 2, 3, ...]

    // Actions
    fetchPedidos: (email: string, page?: number) => Promise<void>;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    resetPedidos: () => void;
}

export const useComprasStore = create<ComprasStore>()((set, get) => ({
    pedidos: [],
    loading: false,
    error: null,
    detalles: false,

    // Estado inicial de paginación
    page: 1,
    pageSize: 5, // 👈 fijo en 5
    total: 0,
    totalPages: 0,
    hasMore: true,
    pages: [],

    // 🔹 Traer pedidos con paginación
    fetchPedidos: async (email: string, page?: number) => {
        if (!email) {
            set({
                error: "No se encontró el email del usuario",
                loading: false,
            });
            return;
        }

        try {
            set({ loading: true, error: null });

            const currentPage = page ?? get().page;
            const pageSize = get().pageSize;

            const response = await fetch(
                `${import.meta.env.VITE_API}/api/compra/pedidos/${email}?page=${currentPage}&pageSize=${pageSize}`,
                { method: "GET" }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los pedidos");
            }

            // 🔹 El backend debe devolver { data: PaymentSession[], total: number }
            const { data, total } = await response.json();

            const totalPages = Math.ceil((total ?? 0) / pageSize);
            const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

            set({
                pedidos: data || [],
                total: total ?? 0,
                totalPages,
                pages,
                hasMore: currentPage < totalPages,
                page: currentPage,
                loading: false,
            });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Error desconocido",
                loading: false,
            });
        }
    },

    // 🔹 Cambiar de página manualmente
    setPage: (page: number) => set({ page }),

    // 🔹 Página siguiente
    nextPage: () => {
        const { page, totalPages, setPage } = get();
        if (page < totalPages) setPage(page + 1);
    },

    // 🔹 Página anterior
    prevPage: () => {
        const { page, setPage } = get();
        if (page > 1) setPage(page - 1);
    },

    // 🔹 Resetear pedidos y paginación
    resetPedidos: () =>
        set({
            pedidos: [],
            page: 1,
            total: 0,
            totalPages: 0,
            pages: [],
            hasMore: true,
            loading: false,
            error: null,
        }),
}));
