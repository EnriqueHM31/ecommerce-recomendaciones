import { motion } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';

export default function ProductosRecomendados() {

    const { getRecommendedProducts, addToCart } = useCartStore();

    const recommendedProducts = getRecommendedProducts();
    const navigate = useNavigate();
    return (
        <>
            {/* Featured Products */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-16 bg-theme-secondary"
                id="products"
            >
                <div className="max-w-7xl mx-auto px-8">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center text-4xl text-theme-primary mb-12 font-bold"
                    >
                        Productos Recomendados
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recommendedProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.1 }
                                }}
                                className="bg-theme-secondary border border-theme rounded-2xl p-8 text-center shadow-theme hover:shadow-theme-dark cursor-pointer flex flex-col justify-between min-h-50"
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                <motion.img
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        transition: { duration: 0.2 }
                                    }}
                                    src={product.image}
                                    className="w-32 h-32 bg-theme-accent rounded-full flex items-center justify-center mx-auto mb-6 text-6xl text-theme-secondary"
                                >
                                </motion.img>
                                <h3 className="text-theme-primary mb-2 text-xl font-semibold">{product.name}</h3>
                                <p className="text-theme-primary mb-2">{product.description}</p>
                                <span className="block text-2xl font-bold text-theme-accent mb-3">${product.price}</span>

                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Usar la primera configuración disponible
                                        if (product.configurations && product.configurations.length > 0) {
                                            addToCart(product, product.configurations[0]);
                                        }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-theme-primary text-theme-secondary border-none py-3 px-6 rounded-full cursor-pointer font-medium w-full shadow-theme hover:shadow-theme-dark mb-2"
                                >
                                    Agregar al Carrito
                                </motion.button>

                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </>
    )
}