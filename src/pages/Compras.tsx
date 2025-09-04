import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
    FaBox,
    FaSyncAlt
} from "react-icons/fa";
import ComprasVacias from "../components/Compras/ComprasVacias";
import ErrorCompras from "../components/Compras/ErrorCompras";
import FooterCompras from "../components/Compras/FooterCompras";
import Loading from "../components/Compras/Loading";
import Pedido from "../components/Compras/Pedido";
import Layout from "../components/Landing/Layout";
import { useToggle } from "../hooks/Open/open";
import { useUsuario } from "../hooks/Usuarios/Usuario";
import type { PaymentSession } from "../types/pago.d";

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
                                        <Pedido pedido={pedido} toggle={toggle} isOpen={isOpen} pedidos={pedidos} />
                                    ))}
                                </div>


                                <FooterCompras pedidos={pedidos} />
                            </div>
                        </div>
                    )}
            </AnimatePresence>
        </Layout>
    );
};

export default Compras;
