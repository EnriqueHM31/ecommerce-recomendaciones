import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import {
    FaBox,
    FaCalendarAlt,
    FaDownload,
    FaEye,
    FaSyncAlt
} from "react-icons/fa";
import ComprasVacias from "../components/Compras/ComprasVacias";
import ErrorCompras from "../components/Compras/ErrorCompras";
import Loading from "../components/Compras/Loading";
import Layout from "../components/Landing/Layout";
import { useUsuario } from "../hooks/Usuarios/Usuario"; // Ajusta la ruta según tu estructura
import type { PaymentSession } from "../types/pago.d";
import { colorStatus, formatearFecha, formatearPrecio, formatoRecibo, tranformarStatus } from "../utils/Formateo";
import PdfFactura from "../utils/PDFFactura";
import { useToggle } from "../hooks/Open/open";
import { AnimatePresence, motion } from "framer-motion";

// Tipos para Stripe Orders (ajústalos según tu backend)


const Compras: React.FC = () => {
    const { user } = useUsuario();
    const [pedidos, setPedidos] = useState<PaymentSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const detalles = useToggle()

    const isOpen = detalles.isOpen
    const toggle = detalles.toggle

    useEffect(() => {
        const cargarPedidos = async () => {
            if (!user) return;
            const email = user?.emailAddresses?.[0]?.emailAddress;

            if (!email) {
                setError("No se encontró el email del usuario");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${import.meta.env.VITE_API}/api/compra/pedidos/${email}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los pedidos");
                }

                const { data } = await response.json();
                console.log({ data });
                setPedidos(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        cargarPedidos();
    }, [user]);

    const recargarPedidos = async () => {
        if (!user) return;
        const email = user?.emailAddresses?.[0]?.emailAddress;
        if (!email) return;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${import.meta.env.VITE_API}/api/compra/pedidos/${email}`, {
                method: "GET",
            });


            if (!response.ok) throw new Error("Error al obtener los pedidos");

            const data = await response.json();
            setPedidos(data.orders || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido");
        } finally {
            setLoading(false);
        }
    };





    return (
        <Layout>
            <AnimatePresence>


                {loading && <Loading />}

                {error && (
                    <ErrorCompras error={error} recargarPedidos={recargarPedidos} />
                )}

                {!loading && !error && pedidos.length === 0 && <ComprasVacias />}

                {
                    pedidos.length > 0 && (
                        <div className="min-h-screen bg-theme-secondary  ">
                            <div className="max-w-4xl mx-auto px-6 py-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                        <FaBox className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h1 className="text-3xl font-bold text-theme-primary mb-2">Mis Pedidos</h1>
                                    <p className="text-theme-primary">
                                        Historial completo de tus compras y suscripciones desde Stripe
                                    </p>
                                    <div className="flex items-center justify-center mt-4">
                                        <button
                                            onClick={recargarPedidos}
                                            className="inline-flex items-center px-3 py-2 text-sm bg-theme-primary text-theme-secondary hover:text-theme-accent transition-colors rounded-2xl cursor-pointer"
                                            disabled={loading}
                                        >
                                            <FaSyncAlt className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                                            Actualizar
                                        </button>
                                    </div>
                                </div>


                                <div className="space-y-6">
                                    {pedidos.map((pedido) => (
                                        <div
                                            key={pedido.id}
                                            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                            {pedido.customer?.email}
                                                        </h3>
                                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                                            <FaCalendarAlt className="w-4 h-4 mr-1" />
                                                            {formatearFecha(Number(pedido.created))}
                                                        </div>

                                                    </div>
                                                    <div className="text-right flex flex-col items-end">
                                                        <div className="text-2xl font-bold text-gray-900 mb-2">
                                                            {formatearPrecio(Number(pedido.amount_total), pedido.currency)}
                                                        </div>

                                                        <div
                                                            className={`text-base font-semibold mb-2 text-center rounded-full px-4 py-1 ${colorStatus(pedido.status)}`}
                                                        >
                                                            {tranformarStatus(pedido.status)}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="text-sm text-gray-500">ID: {pedido.id}</div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                                                            onClick={() => toggle()}
                                                        >
                                                            <FaEye className="w-4 h-4 mr-1" />
                                                            Ver detalles
                                                        </button>
                                                        {
                                                            (() => {
                                                                const ObtenerRecibo = formatoRecibo(pedido);
                                                                return (
                                                                    <PDFDownloadLink
                                                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                                        document={<PdfFactura sessionDetails={ObtenerRecibo} />}
                                                                        fileName={`Factura_${ObtenerRecibo.id}.pdf`}
                                                                        style={{
                                                                            backgroundColor: "#16a34a",
                                                                            color: "#fff",
                                                                            padding: "10px 15px",
                                                                            borderRadius: "8px",
                                                                            fontWeight: "bold",
                                                                            display: "inline-flex",
                                                                            alignItems: "center",
                                                                            gap: "5px",
                                                                            textDecoration: "none",
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        <FaDownload className="w-4 h-4 mr-1" />
                                                                        Recibo
                                                                    </PDFDownloadLink>
                                                                );
                                                            })()
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                isOpen && (
                                                    <motion.div
                                                        className="flex flex-col gap-2"
                                                        initial={{ opacity: 0, y: -100 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4 }}
                                                        viewport={{ once: true }}
                                                        exit={{ opacity: 0, y: -100 }}
                                                    >
                                                        <h1>Productos:</h1>
                                                        {
                                                            pedidos.map((pedido) => (
                                                                <div
                                                                    key={pedido.id}
                                                                    className="bg-theme-primary rounded-xl shadow-lg border border-gray-200 overflow-hidden p-4 flex flex-col gap-3"
                                                                >
                                                                    <h2 >Detalles del pedido: </h2>
                                                                    <table className="table-auto w-full text-center ">
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="px-3 py-1 bg-white text-theme-accent">Producto</th>
                                                                                <th className="px-3 py-1 bg-white text-theme-accent">Cantidad</th>
                                                                                <th className="px-3 py-1 bg-white text-theme-accent">Precio</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {
                                                                                pedido.line_items.map((item) => (
                                                                                    <tr key={item.id}>
                                                                                        <td className="px-3 py-1">{item.description}</td>
                                                                                        <td className="px-3 py-1">{item.quantity}</td>
                                                                                        <td className="px-3 py-1">{item.amount_total / 100}</td>
                                                                                    </tr>
                                                                                ))
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            ))
                                                        }
                                                    </motion.div>
                                                )
                                            }
                                            <div className="h-1 bg-gray-200">
                                                <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 w-3/4 rounded-r animate-pulse"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">{pedidos.length}</div>
                                            <div className="text-sm text-gray-500">Total de pedidos</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">
                                            </div>
                                            <div className="text-sm text-gray-500">Completados</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">
                                                {formatearPrecio(pedidos.reduce((sum, p) => sum + Number(p.amount_total), 0), pedidos[0]?.currency || "usd")}
                                            </div>
                                            <div className="text-sm text-gray-500">Total gastado</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </AnimatePresence>
        </Layout>
    );
};

export default Compras;
