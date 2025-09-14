import { motion } from 'framer-motion';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import { toast } from 'sonner';

export default function HeaderCarrito() {

    const { getTotalItems, clearCart, closeCart, cartItems } = useCartStore();
    return (
        <>
            <div className="bg-theme-primary p-4 text-theme-secondary">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg md:text-2xl font-bold">Carrito de Compras</h2>
                    <motion.button
                        onClick={closeCart}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-theme-secondary hover:text-theme-primary rounded-full transition-colors cursor-pointer"
                    >
                        <FaTimes size={20} />
                    </motion.button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-theme-secondary opacity-90 text-base md:text-base">
                        {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
                    </span>
                    {cartItems.length > 0 && (
                        <motion.button
                            onClick={() => {
                                clearCart()
                                toast.success('Se limpió el carrito.');
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-theme-secondary text-theme-primary px-4 py-2 rounded-full cursor-pointer font-medium hover:bg-theme-accent-light transition-colors text-sm md:text-base"
                        >
                            <FaTrash />
                            Limpiar Carrito
                        </motion.button>
                    )}
                </div>
            </div>
        </>
    )
}