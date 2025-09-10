import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaBox, FaSyncAlt } from "react-icons/fa";
import ComprasVacias from "../components/Compras/ComprasVacias";
import DetallesCompra from "../components/Compras/DetallesCompra";
import ErrorCompras from "../components/Compras/ErrorCompras";
import FooterCompras from "../components/Compras/FooterCompras";
import Loading from "../components/Compras/Loading";
import Pedido from "../components/Compras/Pedido";
import Layout from "../components/Landing/Layout";
import { useUsuario } from "../hooks/Usuarios/Usuario";
import { useComprasStore } from "../store/comprasStore";
import type { PaymentSession } from "../types/pago";

const Compras: React.FC = () => {
    const { user } = useUsuario();
    const {
        fetchPedidos,
        loading,
        error,
        pedidos, // 👈 ya son solo los visibles
        page,
        totalPages,
        pages,
        nextPage,
        prevPage,
        setPage,
    } = useComprasStore();

    // Hook para abrir/cerrar pedidos por ID
    useEffect(() => {
        if (!user) return;
        // 👇 ya no pasamos page porque el store lo maneja solo
        fetchPedidos(user?.emailAddresses?.[0]?.emailAddress ?? "");
    }, [user]);

    const [pedidoSeleccionado, setPedidoSeleccionado] = useState<PaymentSession | null>(null);

    const onOpenDetalles = (pedido: PaymentSession) => {
        setPedidoSeleccionado(pedido)
    }

    if (loading && pedidos.length === 0 && !user) return <Loading />

    if (error && pedidos.length === 0) return <ErrorCompras />

    if (!loading && !error && pedidos.length === 0) return <ComprasVacias />
    return (
        <Layout>
            <AnimatePresence>
                <div className="min-h-screen bg-theme-secondary">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <FaBox className="w-8 h-8 text-blue-600" />
                            </div>

                            <motion.h1
                                className="text-3xl font-bold text-theme-primary mb-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Mis Pedidos
                            </motion.h1>

                            <motion.p
                                className="text-theme-primary"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Historial completo de tus compras y suscripciones desde Stripe
                            </motion.p>

                            <div className="flex flex-col items-center justify-center mt-4">
                                <motion.button
                                    onClick={() =>
                                        fetchPedidos(user?.emailAddresses?.[0]?.emailAddress ?? "")
                                    }
                                    className="inline-flex items-center px-3 py-2 text-sm bg-theme-primary text-theme-secondary hover:text-theme-accent transition-colors rounded-2xl cursor-pointer"
                                    disabled={loading}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <FaSyncAlt
                                        className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                                    />
                                    Actualizar
                                </motion.button>
                            </div>
                        </div>

                        {/* Lista de pedidos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-2">
                            {pedidos.map((pedido, index) => (
                                <Pedido
                                    key={pedido.id}
                                    pedido={pedido}
                                    index={index}
                                    onOpenDetalles={onOpenDetalles}
                                />
                            ))}
                        </div>

                        {/* 🔹 Paginación */}
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={prevPage}
                                disabled={page === 1}
                                className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== 1 ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
                            >
                                Anterior
                            </button>

                            {pages.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-1 rounded-lg border cursor-pointer ${p === page
                                        ? "bg-blue-600 text-white font-bold"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}

                            <button
                                onClick={nextPage}
                                disabled={page === totalPages}
                                className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== totalPages ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
                            >
                                Siguiente
                            </button>
                        </div>

                        <FooterCompras />
                    </div>
                </div>
            </AnimatePresence>
            {/* MODAL de detalles */}
            <AnimatePresence>
                {pedidoSeleccionado && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Botón cerrar */}
                            <button
                                onClick={() => setPedidoSeleccionado(null)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>

                            <DetallesCompra pedido={pedidoSeleccionado} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout >
    );
};

export default Compras;
