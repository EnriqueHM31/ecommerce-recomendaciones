import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { FaBox, FaSyncAlt } from "react-icons/fa";
import ComprasVacias from "../components/Compras/ComprasVacias";
import ErrorCompras from "../components/Compras/ErrorCompras";
import FooterCompras from "../components/Compras/FooterCompras";
import Loading from "../components/Compras/Loading";
import Pedido from "../components/Compras/Pedido";
import Layout from "../components/Landing/Layout";
import { useToggle } from "../hooks/Open/open";
import { useUsuario } from "../hooks/Usuarios/Usuario";
import { useComprasStore } from "../store/comprasStore";

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
    const { toggleById, isOpenById } = useToggle();

    useEffect(() => {
        if (!user) return;
        // 👇 ya no pasamos page porque el store lo maneja solo
        fetchPedidos(user?.emailAddresses?.[0]?.emailAddress ?? "");
    }, [user]);

    return (
        <Layout>
            <AnimatePresence>
                {loading && pedidos.length === 0 && <Loading />}

                {error && pedidos.length === 0 && <ErrorCompras />}

                {!loading && !error && pedidos.length === 0 && <ComprasVacias />}

                {pedidos.length > 0 && (
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
                            <div className="space-y-6 gap-8">
                                {pedidos.map((pedido, index) => (
                                    <Pedido
                                        key={pedido.id}
                                        pedido={pedido}
                                        index={index}
                                        toggle={() => toggleById(pedido.id)}
                                        isOpen={isOpenById(pedido.id)}
                                    />
                                ))}
                            </div>

                            {/* 🔹 Paginación */}
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button
                                    onClick={prevPage}
                                    disabled={page === 1}
                                    className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Anterior
                                </button>

                                {pages.map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`px-3 py-1 rounded-lg border ${p === page
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
                                    className="px-3 py-1 rounded-lg border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>
                            </div>

                            <FooterCompras />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Compras;
