import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaMinus, FaPlus, FaCreditCard } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalItems,
        getTotalPrice
    } = useCartStore();


    const handleCheckout = () => {
        // Aquí iría la lógica de checkout
        alert('¡Gracias por tu compra! Total: $' + getTotalPrice().toFixed(2));
        clearCart();
        closeCart();
    };

    console.log(cartItems);


    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 bg-opacity-50 z-50"
                    />

                    {/* Cart Sidebar */}
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-theme-secondary shadow-2xl z-50 overflow-y-auto scrollbar-none"
                    >
                        {/* Cart Header */}
                        <div className="bg-theme-primary p-6 text-theme-secondary">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold">Carrito de Compras</h2>
                                <motion.button
                                    onClick={closeCart}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 hover:bg-theme-secondary hover:text-theme-primary rounded-full transition-colors"
                                >
                                    <FaTimes size={20} />
                                </motion.button>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-theme-secondary opacity-90">
                                    {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
                                </span>
                                {cartItems.length > 0 && (
                                    <motion.button
                                        onClick={clearCart}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-theme-secondary text-theme-primary px-4 py-2 rounded-full cursor-pointer font-medium hover:bg-theme-accent-light transition-colors"
                                    >
                                        <FaTrash />
                                        Limpiar Carrito
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
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
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item.configuration.id}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-theme-secondary-light border border-theme rounded-xl p-4"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Product Image */}
                                                <img className="w-16 h-16 bg-theme-accent rounded-lg flex items-center justify-center text-2xl text-theme-primary flex-shrink-0"
                                                    src={item.configuration.specs.image || item.product.image}
                                                >
                                                </img>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-theme-primary mb-1 truncate">
                                                        {item.product.name}
                                                    </h4>
                                                    {
                                                        item.configuration.variant && item.configuration.storage !== "N/A" && item.configuration.ram && item.configuration.ram !== "N/A"
                                                            ? <p className="text-sm text-theme-primary mb-1">
                                                                {item.configuration.variant} - {item.configuration.storage !== "N/A" ? item.configuration.storage : ""}
                                                                {item.configuration.ram && item.configuration.ram !== "N/A" ? ` ${item.configuration.ram}` : ""}
                                                            </p>
                                                            : <p className="text-sm text-theme-primary mb-1">
                                                                {item.product.category}
                                                            </p>
                                                    }
                                                    <p className="text-theme-accent font-bold text-lg">
                                                        ${item.configuration.price}
                                                    </p>
                                                </div>

                                                {/* Remove Button */}
                                                <motion.button
                                                    onClick={() => removeFromCart(item.product.id, item.configuration.id)}
                                                    whileHover={{ scale: 1.1, color: '#ef4444' }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-theme-secondary hover:text-red-500 transition-colors p-1"
                                                >
                                                    <FaTrash size={16} />
                                                </motion.button>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3">
                                                    <motion.button
                                                        onClick={() => decreaseQuantity(item.product.id, item.configuration.id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="w-8 h-8 bg-theme-primary text-theme-secondary rounded-full flex items-center justify-center hover:bg-theme-primary-dark transition-colors"
                                                    >
                                                        <FaMinus size={12} />
                                                    </motion.button>

                                                    <span className="text-lg font-semibold text-theme-primary min-w-[2rem] text-center">
                                                        {item.quantity}
                                                    </span>

                                                    <motion.button
                                                        onClick={() => increaseQuantity(item.product.id, item.configuration.id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="w-8 h-8 bg-theme-primary text-theme-secondary rounded-full flex items-center justify-center hover:bg-theme-primary-dark transition-colors"
                                                    >
                                                        <FaPlus size={12} />
                                                    </motion.button>
                                                </div>

                                                <span className="text-lg font-bold text-theme-accent">
                                                    ${(item.configuration.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cart Footer */}
                        {cartItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="border-t border-theme p-6 bg-theme-secondary"
                            >
                                {/* Total */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xl font-semibold text-theme-primary">
                                        Total:
                                    </span>
                                    <span className="text-2xl font-bold text-theme-accent">
                                        ${getTotalPrice().toFixed(2)}
                                    </span>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    onClick={handleCheckout}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-theme-accent text-theme-secondary py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-theme-accent-light transition-colors shadow-theme hover:shadow-theme-dark"
                                >
                                    <FaCreditCard />
                                    Proceder al Pago
                                </motion.button>

                                {/* Continue Shopping */}
                                <motion.button
                                    onClick={closeCart}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full mt-3 py-3 px-6 border-2 border-theme-primary text-theme-primary rounded-xl font-medium hover:bg-theme-primary hover:text-theme-secondary transition-colors"
                                >
                                    Continuar Comprando
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
