import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaCheckCircle,
    FaHome
} from 'react-icons/fa';
import DownloadFacturaButton from '../components/Pago/BotonDescarga';
import Factura from '../components/Pago/Factura';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useCartStore } from '../store/cartStore';
import type { SessionDetails, StripeCheckoutSession, StripeLineItem } from '../types/pago.d';
import { containerAnimacion, itemAnimacion } from '../utils/animaciones';

export default function PaymentSuccess() {
    const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
    const { handleRedirigirPagina } = useNavegacion();
    const { clearCart } = useCartStore();


    useEffect(() => {
        const fetchSession = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sessionId = urlParams.get("session_id");
                if (!sessionId) return;

                const res = await fetch(`${import.meta.env.VITE_API}/api/compra/checkout-session?sessionId=${sessionId}`);
                if (!res.ok) throw new Error("Error al obtener la sesión");

                const { data }: { data: StripeCheckoutSession } = await res.json();

                setSessionDetails({
                    id: data.id,
                    amount: ((data.amount_total ?? 0) / 100).toFixed(2),
                    currency: data.currency?.toUpperCase() ?? "USD",
                    date: new Date((data.created ?? Date.now()) * 1000).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    email: data.customer?.email ?? "No disponible",
                    name: data.customer?.name ?? "No disponible",

                    // ✅ Map correcto de los productos
                    lineItems: data.line_items?.data.map((item: StripeLineItem) => ({
                        id: item.id,
                        description: item.description,
                        quantity: Number(item.quantity),
                        amount_total: Number((item.amount_total / 100).toFixed(2)),
                        currency: item.currency?.toUpperCase(),
                        price: {
                            price: Number((item.price.unit_amount / 100).toFixed(2)),
                            product: {
                                images: item.price.product.images ?? ["https://via.placeholder.com/150x150.png?text=Sin+Imagen"], // ✅ imagen por producto
                                name: item.price.product.name,
                                description: item.price.product.description,
                            }
                        } // precio unitario
                    })) ?? [],

                    // ✅ Address solo con los datos del cliente
                    address: data.customer?.address ?? {
                        city: "No disponible",
                        country: "No disponible",
                        line1: "No disponible",
                        line2: "No disponible",
                        postal_code: "No disponible",
                        state: "No disponible",
                    },
                });

            } catch (err) {
                console.error("Error al obtener detalles de sesión:", err);
            }
        };
        fetchSession();
    }, []);



    return (
        <div className="min-h-[110dvh] bg-bliue-950 flex items-center justify-center p-4">
            <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-8 text-center min-h-[110dvh] flex flex-col justify-between"
                variants={containerAnimacion(0.15)}
                initial="hidden"
                animate="show"
            >

                <Factura sessionDetails={sessionDetails} />

                {/* Botones */}
                <section className='flex flex-col justify-between gap-3'>
                    {/* Confirmación */}
                    <motion.div className="bg-green-50 border border-green-200 rounded-lg p-4 " variants={itemAnimacion(0.8)}>
                        <p className="text-green-800 text-sm flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" />
                            Se ha enviado tu recibo a tu email
                        </p>
                    </motion.div>
                    <motion.div className="" variants={itemAnimacion(0.9)}>
                        <DownloadFacturaButton sessionDetails={sessionDetails} />
                    </motion.div>

                    <motion.button
                        onClick={() => {
                            handleRedirigirPagina("/");
                            clearCart();
                        }}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                        variants={itemAnimacion(1)}
                    >
                        <FaHome className="w-4 h-4" /> Volver al Inicio
                    </motion.button>

                </section>
            </motion.div>
        </div>
    );
}
