import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaBox, FaSyncAlt } from "react-icons/fa";
import ComprasVacias from "../components/Compras/ComprasVacias";
import DetalleCompra from "../components/Compras/DetalleCompras";
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
        pedidos,
        page,
        totalPages,
        pages,
        nextPage,
        prevPage,
        setPage,
    } = useComprasStore();

    const [pedidosCargados, setPedidosCargados] = useState(false);

    useEffect(() => {
        if (!user) return;

        const email = user?.emailAddresses?.[0]?.emailAddress ?? "";
        if (!email) return;

        fetchPedidos(email).then(() => setPedidosCargados(true));
    }, [user]);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState<PaymentSession | null>(null);

    const onOpenDetalles = (pedido: PaymentSession) => {
        setPedidoSeleccionado(pedido)
    }

    if (loading || !pedidosCargados) return <Loading />;

    if (error) return <ErrorCompras />

    return (
        <Layout>
            <AnimatePresence>
                <div className="min-h-screen bg-theme-secondary">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <FaBox className="size-5 md:size-8 text-blue-600" />
                            </div>

                            <motion.h1
                                className="text-xl md:text-3xl font-bold text-theme-primary mb-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Mis Pedidos
                            </motion.h1>

                            <motion.p
                                className="text-theme-primary md:text-base text-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Historial completo de tus compras desde Stripe
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

                        {/* 🔹 Paginación */}
                        <section className="flex md:hidden items-center justify-center w-full mt-8 mb-2">
                            <span className="text-center bg-theme-accent text-theme-secondary px-4 py-2 rounded-2xl font-bold text-sm">Pagina {page} de {totalPages}  </span>
                        </section>
                        <div className="flex justify-center items-center gap-5 mt-2 mb-6 md:hidden">
                            <button
                                onClick={prevPage}
                                disabled={page === 1}
                                className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== 1 ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
                            >
                                Anterior
                            </button>



                            <button
                                onClick={nextPage}
                                disabled={page === totalPages}
                                className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== totalPages ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
                            >
                                Siguiente
                            </button>
                        </div>

                        {/* Lista de pedidos */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-2">
                            {
                                pedidos.length === 0 ? (
                                    <ComprasVacias />
                                ) : (
                                    pedidos.map((pedido, index) => (
                                        <Pedido
                                            key={pedido.id}
                                            pedido={pedido}
                                            index={index}
                                            onOpenDetalles={onOpenDetalles}
                                        />
                                    ))
                                )
                            }
                        </div>

                        <div className="hidden justify-center items-center gap-2 mt-8 md:flex">
                            <button
                                onClick={prevPage}
                                disabled={page === 1}
                                className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== 1 ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
                            >
                                Anterior
                            </button>


                            <section className="hidden md:flex gap-2 items-center">
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
                            </section>

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
            <DetalleCompra pedidoSeleccionado={pedidoSeleccionado} setPedidoSeleccionado={setPedidoSeleccionado} />
        </Layout >
    );
};

export default Compras;
