import { BlobProvider } from "@react-pdf/renderer";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
    FaCheckCircle,
    FaDownload,
    FaHome
} from 'react-icons/fa';
import { toast } from 'sonner';
import Factura from '../components/Pago/Factura';
import PdfFactura from '../components/Pago/PDFFactura';
import FacturaSkeleton from '../components/Success/Skeleton';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useUsuario } from '../hooks/Usuarios/Usuario';
import { useCartStore } from '../store/cartStore';
import type { PaymentSession } from '../types/pago';
import type { CheckoutSession } from '../types/session';
import { containerAnimacion, itemAnimacion } from '../utils/animaciones';

export default function PaymentSuccess() {
    const [sessionDetails, setSessionDetails] = useState<CheckoutSession | null>(null);
    const { handleRedirigirPagina } = useNavegacion();
    const { clearCart } = useCartStore();
    const { user, isLoaded } = useUsuario();
    const idSession = useRef('');


    useEffect(() => {
        const fetchSession = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sessionId = urlParams.get("session_id");
                if (!sessionId) return;

                const res = await fetch(`${import.meta.env.VITE_API}/api/compra/checkout-session?sessionId=${sessionId}`);
                if (!res.ok) throw new Error("Error al obtener la sesión");

                const { data } = await res.json();
                idSession.current = sessionId;

                setSessionDetails(data);

            } catch (err) {
                console.error("Error al obtener detalles de sesión:", err);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        if (!user || !sessionDetails || !isLoaded) return;

        const ids = sessionDetails.metadata?.carrito ? JSON.parse(sessionDetails.metadata.carrito) : [];

        async function crearPedido(sessionDetails: CheckoutSession) {
            const response = await fetch(`${import.meta.env.VITE_API}/api/crear-pedido`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user?.id, // ahora seguro que existe
                    cart_items: sessionDetails.line_items.data.map((item, index) => ({
                        id: ids[index].producto_id,
                        quantity: ids[index].cantidad,
                        price: item.price.unit_amount,
                        amount_total: item.amount_total,
                    })),
                    direccion_envio: sessionDetails.customer_details?.address,
                    checkout_session_id: idSession.current
                })
            });

            if (response.ok) {
                toast.success('Se realizo su compra con éxito.');
            }
        }

        crearPedido(sessionDetails);
    }, [sessionDetails, isLoaded, user]); // <--- agregamos user

    if (!sessionDetails) return null;

    const pedidoCreado: PaymentSession | null = {
        id: sessionDetails?.id,
        amount: sessionDetails?.amount_total.toString(),
        currency: sessionDetails?.currency,
        created: sessionDetails.created.toString(),
        email: sessionDetails.customer_details?.email,
        name: sessionDetails.customer_details?.name,
        line_items: sessionDetails.line_items.data.map((item) => ({
            id: item.id,
            description: item.description,
            quantity: item.quantity,
            amount_total: item.amount_total,
            currency: item.currency,
            price: {
                price: item.price.unit_amount,
                product: {
                    images: item.price.product.images,
                    name: item.price.product.name,
                    description: item.price.product.description,
                }
            }
        })),
        amount_total: sessionDetails.amount_total,
        customer: {
            address: {
                city: sessionDetails.customer_details?.address?.city ?? "No disponible",
                country: sessionDetails.customer_details?.address?.country ?? "No disponible",
                line1: sessionDetails.customer_details?.address?.line1 ?? "No disponible",
                line2: sessionDetails.customer_details?.address?.line2 ?? "No disponible",
                postal_code: sessionDetails.customer_details?.address?.postal_code ?? "No disponible",
                state: sessionDetails.customer_details?.address?.state ?? "No disponible",
            },
            email: sessionDetails.customer_details?.email ?? "No disponible",
            name: sessionDetails.customer_details?.name ?? "No disponible",
        },
        status: sessionDetails.status

    }



    return (
        <div className="min-h-[110dvh] bg-blue-950 flex items-center justify-center p-4">
            {
                sessionDetails ? (

                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl max-w-1/2 w-full p-8 text-center min-h-[110dvh] flex flex-col justify-between"
                        variants={containerAnimacion(0.15)}
                        initial="hidden"
                        animate="show"
                    >

                        <Factura sessionDetails={sessionDetails} />

                        {/* Botones */}
                        <section className='flex flex-col mx-auto justify-center items-center  gap-3 w-full max-w-1/2'>
                            {/* Confirmación */}
                            <motion.div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full flex items-center justify-center" variants={itemAnimacion(0.8)}>
                                <p className="text-green-800 text-sm flex items-center gap-2 text-center">
                                    <FaCheckCircle className="text-green-600" />
                                    Se ha enviado tu recibo a tu email
                                </p>
                            </motion.div>
                            <motion.div className=" flex items-center justify-center w-full" variants={itemAnimacion(0.9)}>
                                <BlobProvider document={<PdfFactura sessionDetails={pedidoCreado} />}>
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
                                    toast.success('Se realizo su compra con éxito.');
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
