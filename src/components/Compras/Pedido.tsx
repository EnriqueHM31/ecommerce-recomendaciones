import { motion } from 'framer-motion';
import { FaCalendarAlt, FaDownload, FaEye } from 'react-icons/fa';
import type { PaymentSession } from '../../types/pago';
import { formatearFecha, formatearPrecio, formatoRecibo, tranformarStatus, colorStatus } from '../../utils/Formateo';
import PdfFactura from '../../utils/PDFFactura';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DetallesCompra from './DetallesCompra';

interface PedidoProps {
    pedido: PaymentSession;
    toggle: () => void;
    isOpen: boolean;
    pedidos: PaymentSession[];
}

export default function Pedido({ pedido, toggle, isOpen, pedidos }: PedidoProps) {
    return (

        <>
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
                                    <DetallesCompra pedido={pedido} />
                                ))
                            }
                        </motion.div>
                    )
                }
                <div className="h-1 bg-gray-200">
                    <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 w-3/4 rounded-r animate-pulse"></div>
                </div>
            </div>
        </>
    )
}