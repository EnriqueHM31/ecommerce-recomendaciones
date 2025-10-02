import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaBox, FaSyncAlt } from "react-icons/fa";
import ComprasVacias from "../components/Compras/ComprasVacias";
import DetalleCompra from "../components/Compras/DetalleCompras";
import ErrorCompras from "../components/Compras/ErrorCompras";
import FooterCompras from "../components/Compras/FooterCompras";
import Loading from "../components/Compras/Loading";
import PaginacionDesktop from "../components/Compras/PaginacionDesktop";
import PaginacionMovil from "../components/Compras/PaginacionMovil";
import Pedido from "../components/Compras/Pedido";
import Layout from "../components/Landing/Layout";
import { useMisCompras } from "../hooks/Compras/misCompras";
import { useUsuario } from "../hooks/Usuarios/Usuario";
import { useComprasStore } from "../store/comprasStore";

const Compras: React.FC = () => {
    const { user } = useUsuario();
    const {
        fetchPedidos,
        loading,
        error,
        pedidos,
    } = useComprasStore();

    const { pedidosCargados, onOpenDetalles, pedidoSeleccionado, onCloseDetalles } = useMisCompras({ user });
    if (loading || !pedidosCargados) return <Loading text="Cargando tus pedidos..." />;

    if (error) return <ErrorCompras />

    console.log({ pedidos });

    return (
        <Layout>
            <AnimatePresence>
                {
                    pedidos.length === 0 ? (
                        <ComprasVacias />
                    ) : (

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
                                                fetchPedidos(user?.id ?? "")
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

                                <PaginacionMovil />

                                {/* Lista de pedidos */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-2">
                                    {
                                        pedidos.map((pedido, index) => (
                                            <Pedido
                                                key={pedido.id}
                                                pedido={pedido}
                                                index={index}
                                                onOpenDetalles={onOpenDetalles}
                                            />
                                        ))
                                    }
                                </div>

                                <PaginacionDesktop />
                                <FooterCompras />
                            </div>
                        </div>
                    )}
            </AnimatePresence>
            {/* MODAL de detalles */}
            <DetalleCompra pedidoSeleccionado={pedidoSeleccionado} onCloseDetalles={onCloseDetalles} />
        </Layout >
    );
};

export default Compras;
