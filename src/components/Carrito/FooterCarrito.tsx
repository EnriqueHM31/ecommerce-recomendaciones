import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';

interface FooterCarritoProps {
    handleCheckout: () => void;
}

export default function FooterCarrito({ handleCheckout }: FooterCarritoProps) {

    const { getTotalPrice, closeCart } = useCartStore();
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-theme p-6 bg-theme-secondary"
            >
                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-lg md:text-xl font-semibold text-theme-primary">
                        Total:
                    </span>
                    <span className="text-lg md:text-2xl font-bold text-theme-accent">
                        ${getTotalPrice().toFixed(2)}
                    </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                    onClick={handleCheckout}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-theme-accent text-theme-secondary py-3 md:py-4 px-6 rounded-xl font-semibold md:text-lg flex items-center justify-center gap-3 hover:bg-theme-accent-light transition-colors shadow-theme hover:shadow-theme-dark cursor-pointer text-base"
                >
                    <FaCreditCard />
                    Proceder al Pago
                </motion.button>

                {/* Continue Shopping */}
                <motion.button
                    onClick={closeCart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-3 py-3 px-6 border-2 border-theme-primary text-theme-primary rounded-xl font-medium hover:bg-theme-primary hover:text-theme-secondary transition-colors cursor-pointer text-sm md:text-base"
                >
                    Continuar Comprando
                </motion.button>
            </motion.div>
        </>
    )
}