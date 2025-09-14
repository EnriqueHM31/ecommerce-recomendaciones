import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import DetallesCompra from "./DetallesCompra";
import type { PaymentSession } from "../../types/pago";

interface DetalleCompraProps {
    pedidoSeleccionado: PaymentSession | null;
    setPedidoSeleccionado: (pedido: PaymentSession | null) => void;
}

export default function DetalleCompra({ pedidoSeleccionado, setPedidoSeleccionado }: DetalleCompraProps) {
    return (
        <AnimatePresence>
            {pedidoSeleccionado && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-[100vh]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-theme-secondary rounded-xl shadow-2xl max-w-full md:max-w-4xl w-full p-4 md:p-16 relative md:max-h-[80vh] max-h-screen h-[80vh] md:h-auto overflow-x-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={() => setPedidoSeleccionado(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-500 cursor-pointer"
                        >
                            <IoClose className=" text-3xl md:text-5xl" />
                        </button>

                        <DetallesCompra pedido={pedidoSeleccionado} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}