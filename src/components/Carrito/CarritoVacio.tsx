import { motion } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';

export default function CarritoVacio() {
    const { closeCart } = useCartStore();
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
            >
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold text-theme-primary mb-2">
                    Tu carrito está vacío
                </h3>
                <p className="text-theme-secondary mb-6">
                    Agrega algunos productos para comenzar
                </p>
                <motion.button
                    onClick={closeCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-theme-primary text-theme-secondary px-6 py-3 rounded-lg font-medium"
                >
                    Continuar Comprando
                </motion.button>
            </motion.div>
        </>
    )
}