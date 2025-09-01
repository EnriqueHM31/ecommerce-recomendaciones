import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { COLORES_ECOMMERCE_PRODUCTOS } from '../../constants/colores';
import type { Producto } from '../../types/productos';
import { useCartStore } from '../../store/cartStore';


interface ProductosProps {
    product: Producto;
    index: number;
}


export default function Producto({ product, index }: ProductosProps) {

    const navigate = useNavigate();
    const { addToCart } = useCartStore();
    return (
        <>
            <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.1 }
                }}
                className="bg-secondary-dark border border-theme rounded-2xl p-6 shadow-theme hover:shadow-theme-dark transition-all duration-300 cursor-pointer flex flex-col justify-between"
                onClick={() => navigate(`/products/${product.id}`)}
            >
                {/* Product Image */}
                <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={product.specs.image || product.image || ''}
                    alt={product.name || ''}
                    className="w-full mx-auto h-48  object-contain p-2  rounded-xl flex items-center justify-center text-6xl mb-4"
                />

                <div className="mb-3">
                    <span className="text-xs text-theme-primary bg-theme-secondary-light px-2 py-1 rounded-full">
                        {product.category}
                    </span>
                    {product.recommended && (
                        <span className="ml-2 text-xs bg-theme-accent text-theme-secondary px-2 py-1 rounded-full">
                            ⭐ Recomendado
                        </span>
                    )}
                </div>

                {/* Product Info */}
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-theme-primary mb-2">
                        {product.name}
                    </h3>
                    <p className="text-theme-primary text-sm mb-3 line-clamp-2">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-theme-accent">
                            ${product.price}
                        </span>
                        <span className="text-sm text-theme-secondary bg-theme-primary px-2 py-1 rounded-full">
                            Stock: {product.stock}
                        </span>
                    </div>

                    {/* Color Indicator */}
                    {product.color && (
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm text-theme-primary">Color:</span>
                            {
                                product.configurations.map((config) => (
                                    <div
                                        key={config.id}
                                        className="w-6 h-6 rounded-full border border-theme-secondary"
                                        style={{ backgroundColor: COLORES_ECOMMERCE_PRODUCTOS.find(c => c.nombre === config.specs.color)?.valor }}
                                    />
                                ))
                            }

                        </div>
                    )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (product.configurations && product.configurations.length > 0) {
                            addToCart(product, product.configurations[0]);
                        }
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-theme-primary text-theme-secondary py-3 px-4 rounded-xl font-xl font-medium flex items-center justify-center gap-2 hover:bg-theme-primary-dark transition-colors duration-300"
                >
                    🛒 Agregar al Carrito
                </motion.button>
            </motion.div>
        </>
    )
}