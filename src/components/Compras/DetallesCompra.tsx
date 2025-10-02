import { formatearFechaES, formatearPrecio } from "@/utils/Formateo";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaShoppingCart, FaUser } from "react-icons/fa";
import type { PaymentSession } from "../../types/pago";

interface DetallesCompraProps {
    pedido: PaymentSession;
}

export default function DetallesCompra({ pedido }: DetallesCompraProps) {
    return (
        <motion.div
            className="rounded-2xl shadow-xl md:p-6 py-8 px-3 flex flex-col gap-6 bg-theme-secondary scrollbar-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Encabezado */}
            <div className="flex items-center gap-3 border-b pb-3">
                <FaShoppingCart className="text-theme-primary" size={24} />
                <h2 className="text-xl font-semibold text-theme-primary">
                    Detalles de la compra
                </h2>
            </div>

            {/* Información del cliente */}
            {pedido.customer && (
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <FaUser className="text-gray-600" size={18} />
                        <span className="text-sm text-gray-700">
                            <strong>Cliente:</strong> {pedido.customer?.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-gray-600" size={18} />
                        <span className="text-sm text-gray-700">
                            <strong>Fecha:</strong>{" "}
                            {formatearFechaES(pedido.created).split(",")[0]}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-gray-600" size={18} />
                        <span className="text-sm text-gray-700">
                            <strong>Estado:</strong>{" "}
                            <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-medium ${pedido.status === "succeeded"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {pedido.status}
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaClock className="text-gray-600" size={18} />
                        <span className="text-sm text-gray-700">
                            <strong>Hora:</strong>{" "}
                            {formatearFechaES(pedido.created).split(",")[1]}
                        </span>
                    </div>
                </div>
            )}

            {/* Tabla de productos */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-theme-primary text-theme-secondary">
                            <th className="px-3 py-2 text-left">Imagen</th>
                            <th className="px-3 py-2 text-left">Producto</th>
                            <th className="px-3 py-2">Cantidad</th>
                            <th className="px-3 py-2">Precio</th>
                            <th className="px-3 py-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.line_items.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b last:border-none hover:bg-blue-900 transition"
                            >
                                <td className="px-3 py-3 flex items-center justify-center">
                                    <div className="size-12 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
                                        <img
                                            src={item.price?.product?.images[0]}
                                            alt="producto"
                                            className="size-10 object-contain"
                                        />
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    {item.price.product.name} <br />
                                    {item.description}
                                </td>
                                <td className="px-3 py-3 text-center">{item.quantity}</td>
                                <td className="px-3 py-3 text-center">
                                    {formatearPrecio(item.price.price, item.currency)}
                                </td>
                                <td className="px-3 py-3 text-center">
                                    {formatearPrecio((item.price.price * item.quantity), item.currency)}
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            {/* Resumen */}
            <div className="flex justify-end mt-4">
                <div className="bg-gray-50 px-6 py-3 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-600">Total pagado</p>
                    <p className="text-lg font-semibold text-theme-accent">
                        {formatearPrecio(pedido.amount_total, pedido.currency)}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
