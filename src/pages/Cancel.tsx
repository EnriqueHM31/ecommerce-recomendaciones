import { motion } from 'framer-motion';
import { FaHome, FaTimesCircle } from 'react-icons/fa';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { containerAnimacion, itemAnimacion } from '../utils/animaciones';

export default function PaymentCancel() {
    const { handleRedirigirPagina } = useNavegacion();

    return (
        <div className="min-h-[100dvh] bg-theme-secondary flex items-center justify-center p-4">
            <motion.div
                className="bg-white  border-theme-secondary rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center flex flex-col justify-between"
                variants={containerAnimacion(0.15)}
                initial="hidden"
                animate="show"
            >
                {/* Mensaje de cancelación */}
                <motion.div
                    className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6"
                    variants={itemAnimacion(0.3)}
                >
                    <p className="text-red-800 text-lg font-semibold flex items-center justify-center gap-3">
                        <FaTimesCircle className="text-red-600 w-6 h-6" />
                        El pago fue cancelado
                    </p>
                    <p className="text-sm text-red-700 mt-2">
                        No se realizó ningún cargo. Si lo deseas, puedes intentar nuevamente.
                    </p>
                </motion.div>

                {/* Botones */}
                <section className="flex flex-col justify-between gap-3">
                    <motion.button
                        onClick={() => {
                            handleRedirigirPagina("/");
                        }}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                        variants={itemAnimacion(0.6)}
                    >
                        <FaHome className="w-4 h-4" /> Volver al Inicio
                    </motion.button>
                </section>
            </motion.div>
        </div>
    );
}
