import { adaptPedidosToPaymentSessions } from "@/adapters/pedidos";
import type { PedidoRow } from "@/types/compras";
import { create } from "zustand";
import type { PaymentSession, Pedido } from "../types/pago";
// Item de un pedido



interface ComprasStore {
    // 🔹 Estado de pedidos
    allPedidos: PaymentSession[]; // todos
    pedidos: PaymentSession[];    // visibles
    todosPedidosUsuarios: Pedido[];

    loading: boolean;
    error: string | null;
    detalles: boolean;

    // Paginación
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
    pages: number[];

    // Actions
    fetchPedidos: (id: string) => Promise<void>;
    fetchTodosPedidos: () => Promise<void>;

    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    resetPedidos: () => void;

    updateStatusPedido: (id: string, estado: "enviado" | "cancelado" | "entregado" | "fallido" | "confirmado") => void;
}

export const useComprasStore = create<ComprasStore>()((set, get) => ({
    allPedidos: [],
    pedidos: [],
    todosPedidosUsuarios: [],

    loading: false,
    error: null,
    detalles: false,

    // Estado inicial de paginación
    page: 1,
    pageSize: 6, // 👈 fijo en 5
    total: 0,
    totalPages: 0,
    hasMore: true,
    pages: [],

    // 🔹 Traer todos los pedidos y luego dividir en páginas en frontend
    fetchPedidos: async (id: string) => {
        if (!id) {
            set({ error: "No se encontró el email del usuario", loading: false });
            return;
        }

        try {
            set({ loading: true, error: null });

            const response = await fetch(
                `${import.meta.env.VITE_API}/api/compra/pedidos/${id}`,
                { method: "GET" }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los pedidos");
            }

            const { data }: { data: PedidoRow[] } = await response.json();


            const pedidosAdaptados = adaptPedidosToPaymentSessions(data);

            const pageSize = get().pageSize;
            const total = data.length;
            const totalPages = Math.ceil(total / pageSize);
            const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

            // 👇 calcular los pedidos visibles para la página actual
            const currentPage = 1;
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;
            const visible = pedidosAdaptados.slice(start, end);


            set({
                allPedidos: pedidosAdaptados,
                pedidos: visible,
                total,
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

    fetchTodosPedidos: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}/api/pedidos/todos`,
                { method: "GET" }
            );

            if (!response.ok) {
                throw new Error("Error al obtener los pedidos");
            }

            const { data } = await response.json();

            set({
                todosPedidosUsuarios: data,
                loading: false,
            });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : "Error desconocido",
                loading: false,
            });
        }
    },
    // 🔹 Cambiar de página (calcula los visibles a partir de allPedidos)
    setPage: (page: number) => {
        const { allPedidos, pageSize, totalPages } = get();

        const currentPage = Math.min(Math.max(page, 1), totalPages);
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const visible = allPedidos.slice(start, end);

        set({
            page: currentPage,
            pedidos: visible,
            hasMore: currentPage < totalPages,
        });
    },

    nextPage: () => {
        const { page, setPage, totalPages } = get();
        if (page < totalPages) setPage(page + 1);
    },

    prevPage: () => {
        const { page, setPage } = get();
        if (page > 1) setPage(page - 1);
    },

    resetPedidos: () =>
        set({
            allPedidos: [],
            pedidos: [],
            page: 1,
            total: 0,
            totalPages: 0,
            pages: [],
            hasMore: true,
            loading: false,
            error: null,
        }),
    updateStatusPedido: (id: string, estado: "enviado" | "cancelado" | "entregado" | "fallido" | "confirmado") => {

        const { todosPedidosUsuarios } = get();

        const pedidos = todosPedidosUsuarios.map((pedido) =>
            pedido.id === id ? { ...pedido, estado } : pedido
        );

        set({ todosPedidosUsuarios: pedidos as Pedido[] });

    },



}));
