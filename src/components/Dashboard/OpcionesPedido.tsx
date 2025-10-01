import type { Pedido } from "@/types/pago";
import { AnimatePresence, motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

interface Props {
    order: Pedido;
    handleViewOrder: (order: Pedido) => void;
    handleUpdateStatus: (id: string, estado: string) => void;
    open: boolean;
    setOpenId: (id: string | null) => void;
}

const OpcionesMenu = ({ order, handleViewOrder, open, setOpenId }: Props) => {
    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
            <div className="flex items-center">
                {/* Botón principal */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpenId(open ? null : order.id)}
                    className="text-gray-600 hover:text-gray-900 p-1 bg-theme-accent text-theme-primary px-4 py-2  rounded-2xl"
                >
                    Opciones
                </motion.button>

                {/* Submenú */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 bottom-12 w-40 bg-white shadow-lg rounded-lg border border-blue-950 z-20"
                        >
                            <button
                                onClick={() => {
                                    handleViewOrder(order);
                                    setOpenId(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaEye className="w-4 h-4 mr-2" /> Ver pedido
                            </button>


                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </td>
    );
};

export default OpcionesMenu;
