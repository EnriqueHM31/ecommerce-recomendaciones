import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { useNavegacion } from "../hooks/Navigate/navegacion";
import { containerAnimacion, itemAnimacion } from "../utils/animaciones";

export default function NotFound() {
    const { handleRedirigirPagina } = useNavegacion();

    const emojis = ["💻", "📱", "🖥️", "🎧"];

    return (
        <div className="min-h-[100dvh] bg-theme-primary text-theme-secondary flex items-center justify-center p-4">
            <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center flex flex-col gap-6"
                variants={containerAnimacion(0.15)}
                initial="hidden"
                animate="show"
            >
                {/* Emojis animados */}
                <div className="flex justify-center gap-6 text-4xl">
                    {emojis.map((emoji, index) => (
                        <motion.span
                            key={index}
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.3,
                            }}
                        >
                            {emoji}
                        </motion.span>
                    ))}
                </div>

                {/* Texto 404 */}
                <motion.h1
                    className="text-5xl font-bold text-gray-800"
                    variants={itemAnimacion(0.3)}
                >
                    404
                </motion.h1>
                <motion.p
                    className="text-gray-600 text-lg"
                    variants={itemAnimacion(0.4)}
                >
                    ¡Oops! La página que buscas no existe en nuestro <br />
                    universo tecnológico 🔌
                </motion.p>

                {/* Botón volver */}
                <motion.button
                    onClick={() => handleRedirigirPagina("/")}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                    variants={itemAnimacion(0.6)}
                >
                    <FaHome className="w-4 h-4" /> Volver al Inicio
                </motion.button>
            </motion.div>
        </div>
    );
}
