import { useEffect, useState } from 'react';
import {
    FaCheckCircle,
    FaCreditCard,
    FaDownload,
    FaEnvelope,
    FaHome
} from 'react-icons/fa';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useCartStore } from '../store/cartStore';

interface LineItem {
    id: string;
    description: string;
    quantity: number;
    amount_total: number;
    currency: string;
}

interface SessionDetails {
    id: string;
    amount: string;
    currency: string;
    date: string;
    email?: string;
    name?: string;
    lineItems: LineItem[];
}

// ===== PÁGINA DE ÉXITO =====
export default function PaymentSuccess() {
    const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
    const { handleRedirigirPagina } = useNavegacion();
    const { clearCart } = useCartStore()

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sessionId = urlParams.get("session_id");

                if (!sessionId) return;

                const res = await fetch(`${import.meta.env.VITE_API}/api/compra/checkout-session?sessionId=${sessionId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                if (!res.ok) throw new Error("Error al obtener la sesión");

                const { data } = await res.json();

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
                });
            } catch (err) {
                console.error("Error al obtener detalles de sesión:", err);
            }
        };

        fetchSession();
    }, []);

    const handleDownloadReceipt = () => {
        console.log("Descargando recibo...");
    };

    const handleEmailReceipt = () => {
        console.log("Enviando recibo por email...");
    };

    console.log({ sessionDetails });
    const items = sessionDetails?.lineItems
    console.log({ items });

    return (
        <div className="min-h-screen bg-theme-primary flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center">
                <div className="mb-6">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                        <FaCheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
                <p className="text-gray-600 mb-6">Tu transacción se ha procesado correctamente</p>

                {sessionDetails && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <FaCreditCard className="text-blue-600" />
                            Detalles de la transacción
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 flex-1">Nombre:</span>
                                <span className="font-medium text-black flex-4 text-start">{sessionDetails.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 flex-1">Email:</span>
                                <span className="font-medium text-black flex-4 text-start">{sessionDetails.email}</span>
                            </div>
                            <div className="flex  gap-4 ">
                                <span className="text-gray-600 flex-1">Monto:</span>
                                <span className="font-medium text-black flex-4 text-start">${sessionDetails.amount} {sessionDetails.currency}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 flex-1">Fecha:</span>
                                <span className="font-medium text-black flex-4 text-start">{sessionDetails.date}</span>
                            </div>
                        </div>

                        {sessionDetails.lineItems.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Productos:</h4>
                                {sessionDetails.lineItems.length > 0 && (
                                    <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-4 py-2 text-left border-b  text-theme-secondary bg-theme-primary border-gray-200">Producto</th>
                                                <th className="px-4 py-2 text-center border-b  text-theme-secondary bg-theme-primary border-gray-200">Cantidad</th>
                                                <th className="px-4 py-2 text-right border-b  text-theme-secondary bg-theme-primary border-gray-200">Precio Unitario</th>
                                                <th className="px-4 py-2 text-right border-b  text-theme-secondary bg-theme-primary border-gray-200">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sessionDetails.lineItems.map((item: LineItem) => (
                                                <tr key={item.id} className="even:bg-gray-50">
                                                    <td className="px-4 py-2 text-black">{item.description}</td>
                                                    <td className="px-4 py-2 text-center text-black">{item.quantity}</td>
                                                    <td className="px-4 py-2 text-right text-black">
                                                        ${(item.amount_total / item.quantity / 100).toFixed(2)} {item.currency}
                                                    </td>
                                                    <td className="px-4 py-2 text-right font-medium text-black">
                                                        ${(item.amount_total / 100).toFixed(2)} {item.currency}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                            </div>
                        )}
                    </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 text-sm flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" />
                        Se ha enviado una confirmación a tu email
                    </p>
                </div>

                <div className="space-y-3 mb-6">
                    <button
                        onClick={handleDownloadReceipt}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <FaDownload className="w-4 h-4" />
                        Descargar Recibo
                    </button>

                    <button
                        onClick={handleEmailReceipt}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <FaEnvelope className="w-4 h-4" />
                        Reenviar por Email
                    </button>
                </div>

                <button
                    onClick={() => {
                        handleRedirigirPagina("/");
                        clearCart();
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <FaHome className="w-4 h-4" />
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
}
