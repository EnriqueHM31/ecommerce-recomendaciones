import { motion } from 'framer-motion';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from 'react';
import {
    FaCheckCircle,
    FaDownload,
    FaHome
} from 'react-icons/fa';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useCartStore } from '../store/cartStore';
import { containerAnimacion, itemAnimacion } from '../utils/animaciones';
import Factura from '../components/Pago/Factura';
import type { SessionDetails } from '../types/pago.d';

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

                const { data } = await res.json();
                console.log({ data });

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
                    lineItems: data.line_items?.data ?? [],
                    address: data.customer?.address ?? {
                        city: "No disponible",
                        country: "No disponible",
                        line1: "No disponible",
                        line2: "No disponible",
                        postalCode: "No disponible",
                        state: "No disponible",
                    },
                });
            } catch (err) {
                console.error("Error al obtener detalles de sesión:", err);
            }
        };
        fetchSession();
    }, []);

    const handleDownloadInvoice = async ({ id }: { id: string }) => {
        // Obtener el elemento Factura
        const invoiceElement = document.getElementById('invoice');
        if (!invoiceElement) return;

        // Clonar el nodo para no afectar el DOM original
        const clone = invoiceElement.cloneNode(true) as HTMLElement;
        clone.style.width = getComputedStyle(invoiceElement).width; // mantener ancho
        clone.style.height = getComputedStyle(invoiceElement).height; // mantener altura

        // Corregir colores que html2canvas no soporta
        clone.querySelectorAll<HTMLElement>("*").forEach((el) => {
            const style = getComputedStyle(el);
            if (style.color.includes("oklch")) el.style.color = "#000";
            if (style.backgroundColor.includes("oklch")) el.style.backgroundColor = "#fff";
        });

        // Agregar temporalmente al body (html2canvas necesita que esté en DOM)
        clone.style.position = "absolute";
        clone.style.top = "-9999px";
        document.body.appendChild(clone);

        // Generar canvas
        const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
        document.body.removeChild(clone); // limpiar DOM

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Factura_${id}.pdf`);
    };


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
                        <button
                            onClick={() => {
                                const invoiceEl = document.getElementById("invoice");
                                if (invoiceEl) {
                                    setTimeout(() => handleDownloadInvoice({ id: sessionDetails?.id || "" }), 2000);
                                }
                            }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FaDownload className="w-4 h-4" /> Descargar Recibo
                        </button>
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
