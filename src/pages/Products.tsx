import { motion } from 'framer-motion';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const { productFiltrados, addToCart, buscarProducto } = useCartStore();
    const navigate = useNavigate();

    console.log(productFiltrados);


    return (
        <Layout>
            <div className="min-h-screen bg-theme-secondary text-theme-primary">

                {/* Filters and Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-theme-secondary border-b border-theme py-6 sticky top-0 z-40"
                >
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 bg-theme-accent text-theme-secondary px-4 py-2 rounded-lg font-medium"
                                >
                                    <FaFilter />
                                    Filtros
                                </motion.button>
                                <span className="text-theme-secondary">
                                    {productFiltrados.length} productos disponibles
                                </span>
                            </div>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary" />
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="pl-10 pr-4 py-2 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent w-64"
                                    onChange={(e) => buscarProducto(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {productFiltrados.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                }}
                                className="bg-secondary-dark border border-theme rounded-2xl p-6 shadow-theme hover:shadow-theme-dark transition-all duration-300 cursor-pointer flex flex-col justify-between"
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                {/* Product Image */}
                                <motion.img
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    src={product.image}
                                    className="w-full h-48 bg-theme-primary rounded-xl flex items-center justify-center text-6xl mb-4"
                                >
                                </motion.img>

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

                                </div>

                                {/* Add to Cart Button */}
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
                                    className="w-full bg-theme-primary text-theme-secondary py-3 px-4 rounded-xl font-xl font-medium flex items-center justify-center gap-2 hover:bg-theme-primary-dark transition-colors duration-300 mb-3"
                                >
                                    🛒
                                    Agregar al Carrito
                                </motion.button>

                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Empty State */}
                {productFiltrados.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-semibold text-theme-primary mb-2">
                            No hay productos disponibles
                        </h3>
                        <p className="text-theme-primary">
                            Pronto tendremos nuevos productos para ti
                        </p>
                    </motion.div>
                )}

            </div>
        </Layout>
    );
}
