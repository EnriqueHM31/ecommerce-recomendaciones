import { motion } from "framer-motion";
import { FaCalendarAlt, FaDownload, FaEye } from "react-icons/fa";
import { BlobProvider } from "@react-pdf/renderer";
import type { PaymentSession } from "../../types/pago";
import {
    colorStatus,
    formatearFecha,
    formatearPrecio,
    formatoRecibo,
    tranformarStatus,
} from "../../utils/Formateo";
import PdfFactura from "../../utils/PDFFactura";

interface PedidoProps {
    pedido: PaymentSession;
    onOpenDetalles: (pedido: PaymentSession) => void; // 👈 modal
    index: number;
}

export default function Pedido({ pedido, onOpenDetalles, index }: PedidoProps) {
    return (
        <motion.div
            key={pedido.id}
            className="bg-white rounded-2xl shadow-md border border-theme-primary hover:shadow-xl transition-all p-6 flex flex-col justify-between relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            {/* Header */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-base font-semibold text-gray-900 truncate mb-2">
                    {pedido.customer?.email}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaCalendarAlt className="w-4 h-4 mr-1" />
                    {formatearFecha(Number(pedido.created))}
                </div>

                <div className="mt-auto">
                    <div className="text-xl font-bold text-gray-900 mb-2">
                        {formatearPrecio(Number(pedido.amount_total), pedido.currency)}
                    </div>

                    <div
                        className={`text-2xl font-semibold text-center rounded-full px-3 py-1 ${colorStatus(
                            pedido.status
                        )}`}
                    >
                        {tranformarStatus(pedido.status)}
                    </div>
                </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                <button
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    onClick={() => onOpenDetalles(pedido)}
                >
                    <FaEye className="w-4 h-4 mr-1" />
                    Ver detalles
                </button>

                {(() => {
                    const ObtenerRecibo = formatoRecibo(pedido);
                    return (
                        <BlobProvider
                            document={<PdfFactura sessionDetails={ObtenerRecibo} />}
                        >
                            {({ url, loading }) =>
                                loading ? (
                                    <button
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
                                    >
                                        Generando...
                                    </button>
                                ) : (
                                    <a
                                        href={url || "#"}
                                        download={`Factura_${ObtenerRecibo.id}.pdf`}
                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <FaDownload className="w-4 h-4 mr-1" />
                                        Recibo
                                    </a>
                                )
                            }
                        </BlobProvider>
                    );
                })()}
            </div>

        </motion.div>
    );
}
