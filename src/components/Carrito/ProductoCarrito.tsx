import { motion } from 'framer-motion';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import type { CartItem } from '../../types/productos';
import { useCartStore } from '../../store/cartStore';

interface ProductoCarritoProps {
    item: CartItem;
    index: number;
}

export default function ProductoCarrito({ item, index }: ProductoCarritoProps) {

    const { removeFromCart, decreaseQuantity, increaseQuantity } = useCartStore();

    return (
        <>
            <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-theme-secondary-light border border-theme rounded-xl p-4"
            >
                <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className='size-16 flex items-center justify-center p-2 rounded-full mx-auto mb-4 bg-white'>
                        <img className="size-12  rounded-lg flex items-center justify-center text-theme-primary flex-shrink-0 object-contain"
                            src={item.product.imagen_url}
                        >
                        </img>

                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-theme-primary mb-1 truncate">
                            {item.product.producto}
                        </h4>
                        <div className='flex items-center gap-2'>
                            <p className="text-theme-secondary text-xs">
                                {item.product.marca}
                            </p>
                            <p className="text-theme-secondary text-xs">
                                {item.product.ram_variante}
                            </p>
                            <p className="text-theme-secondary text-xs">
                                {item.product.almacenamiento}
                            </p>
                            <p className="text-theme-secondary text-xs">
                                {item.product.color}
                            </p>
                        </div>
                        <p className="text-theme-accent font-bold text-lg">
                            ${item.product.precio_base}
                        </p>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                        onClick={() => removeFromCart(item.product.sku)}
                        whileHover={{ scale: 1.1, color: '#ef4444' }}
                        whileTap={{ scale: 0.9 }}
                        className="text-theme-primary hover:text-red-500 transition-colors p-1 cursor-pointer"
                    >
                        <FaTrash size={16} />
                    </motion.button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={() => decreaseQuantity(item.product.sku)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 bg-theme-primary text-theme-secondary rounded-full flex items-center justify-center hover:bg-theme-primary-dark transition-colors cursor-pointer"
                        >
                            <FaMinus size={12} />
                        </motion.button>

                        <span className="text-lg font-semibold text-theme-primary min-w-[2rem] text-center">
                            {item.quantity}
                        </span>

                        <motion.button
                            onClick={() => increaseQuantity(item.product.sku)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 bg-theme-primary text-theme-secondary rounded-full flex items-center justify-center hover:bg-theme-primary-dark transition-colors cursor-pointer"
                        >
                            <FaPlus size={12} />
                        </motion.button>
                    </div>

                    <span className="text-lg font-bold text-theme-accent">
                        ${(item.product.precio_base * item.quantity).toFixed(2)}
                    </span>
                </div>
            </motion.div>
        </>
    )
}