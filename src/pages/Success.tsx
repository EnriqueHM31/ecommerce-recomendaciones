import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    FaCheckCircle,
    FaHome
} from 'react-icons/fa';
import { toast } from 'sonner';
import Factura from '../components/Pago/Factura';
import FacturaSkeleton from '../components/Success/Skeleton';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useUsuario } from '../hooks/Usuarios/Usuario';
import { useCartStore } from '../store/cartStore';
import type { CheckoutSession } from '../types/session';
import { containerAnimacion, itemAnimacion } from '../utils/animaciones';
import DownloadFacturaButton from '../components/Pago/BotonDescarga';

export default function PaymentSuccess() {
    const [sessionDetails, setSessionDetails] = useState<CheckoutSession | null>(null);
    const { handleRedirigirPagina } = useNavegacion();
    const { clearCart } = useCartStore();
    const { user, isLoaded } = useUsuario();


    useEffect(() => {
        const fetchSession = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sessionId = urlParams.get("session_id");
                if (!sessionId) return;

                const res = await fetch(`${import.meta.env.VITE_API}/api/compra/checkout-session?sessionId=${sessionId}`);
                if (!res.ok) throw new Error("Error al obtener la sesión");

                const { data } = await res.json();

                setSessionDetails(data);

            } catch (err) {
                console.error("Error al obtener detalles de sesión:", err);
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        if (!user || !sessionDetails || !isLoaded) return;

        async function crearPedido(sessionDetails: CheckoutSession) {
            const response = await fetch(`${import.meta.env.VITE_API}/api/crear-pedido`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user?.id, // ahora seguro que existe
                    cartItems: sessionDetails.line_items.data.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        price: item.price.unit_amount,
                        amount_total: item.amount_total,
                    })),
                    direccion_envio: sessionDetails.customer_details?.address,
                })
            });

            if (response.ok) {
                toast.success('Se realizo su compra con éxito.');
            }
        }

        crearPedido(sessionDetails);
    }, [sessionDetails, isLoaded, user]); // <--- agregamos user


    console.log({ sessionDetails });

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
                                    toast.success('Se realizo su compra con éxito.');
                                }}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
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
