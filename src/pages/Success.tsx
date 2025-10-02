import { adaptPedidosToPaymentSessions } from "@/adapters/pedidos";
import { BlobProvider } from "@react-pdf/renderer";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    FaCheckCircle,
    FaDownload,
    FaHome
} from 'react-icons/fa';
import Factura from '../components/Pago/Factura';
import PdfFactura from '../components/Pago/PDFFactura';
import FacturaSkeleton from '../components/Success/Skeleton';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useCartStore } from '../store/cartStore';
import type { PaymentSession } from '../types/pago';
import { containerAnimacion, itemAnimacion } from '../utils/animaciones';
import Loading from "@/components/Compras/Loading";

export default function PaymentSuccess() {
    const [sessionDetails, setSessionDetails] = useState<PaymentSession | null>(null);
    const { handleRedirigirPagina } = useNavegacion();
    const { clearCart } = useCartStore();
    const idSession = useRef('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const procesarPedido = async () => {
            setIsLoading(true);
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sessionId = urlParams.get("session_id");
                if (!sessionId) return;

                // Crear pedido
                const crearRes = await fetch(`${import.meta.env.VITE_API}/api/crear-pedido`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ checkout_session_id: sessionId })
                });
                if (!crearRes.ok) throw new Error("Error al crear el pedido");

                // Traer pedido
                const fetchRes = await fetch(`${import.meta.env.VITE_API}/api/compra/checkout-session?sessionId=${sessionId}`);
                if (!fetchRes.ok) throw new Error("Error al obtener la sesión");

                const { data } = await fetchRes.json();
                const pedidoAdaptado = adaptPedidosToPaymentSessions([data])[0];

                idSession.current = sessionId;
                setSessionDetails(pedidoAdaptado);

                // Limpiar carrito
                clearCart();

            } catch (err) {
                console.error("Error en flujo de creación y fetch de pedido:", err);
            } finally {
                setIsLoading(false); // <-- Se asegura que siempre se desactive al final
            }
        };

        procesarPedido();
    }, []);



    if (isLoading || !sessionDetails) {
        return <Loading text="Cargando tu factura" />;
    }




    return (
        <div className="min-h-[110dvh] bg-blue-950 flex items-center justify-center p-4 w-full">
            {
                sessionDetails ? (

                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl max-w-full md:max-w-10/12 lg:max-w-1/2 w-full p-8 text-center min-h-[110dvh] flex flex-col justify-between"
                        variants={containerAnimacion(0.15)}
                        initial="hidden"
                        animate="show"
                    >
                        <Factura sessionDetails={sessionDetails} />

                        {/* Botones */}
                        <section className='flex flex-col md:mx-auto justify-center items-center  gap-3 w-full max-w-full md:max-w-1/2'>
                            {/* Confirmación */}
                            <motion.div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full flex items-center justify-center" variants={itemAnimacion(0.8)}>
                                <p className="text-green-800 text-sm flex items-center gap-2 text-center">
                                    <FaCheckCircle className="text-green-600" />
                                    Se ha enviado tu recibo a tu email
                                </p>
                            </motion.div>
                            <motion.div className=" flex items-center justify-center w-full" variants={itemAnimacion(0.9)}>
                                <BlobProvider document={<PdfFactura sessionDetails={sessionDetails} />}>
                                    {({ url }) => (
                                        <a
                                            href={url || "#"}
                                            download={`Factura_${sessionDetails.id}.pdf`}
                                            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors w-full md:w-full text-center md:text-center justify-center md:justify-center cursor-pointer"
                                        >
                                            <FaDownload className="w-4 h-4 mr-1" />
                                            Recibo
                                        </a>
                                    )}
                                </BlobProvider>
                            </motion.div>
                            <motion.button
                                onClick={() => {
                                    handleRedirigirPagina("/");
                                    clearCart();
                                }}
                                className="w-full  hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                                variants={itemAnimacion(1)}
                            >
                                <FaHome className="w-4 h-4" /> Volver al Inicio
                            </motion.button>

                        </section>
                    </motion.div>
                ) : (
                    <FacturaSkeleton />
                )
            }
        </div>
    );
}
