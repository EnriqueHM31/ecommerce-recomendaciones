import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaCheck, FaHeart, FaShare, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCartStore } from '../store/cartStore';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getProductById, addToCart } = useCartStore();
    const [selectedConfiguration, setSelectedConfiguration] = useState<string>('');


    const product = getProductById(Number(id));
    console.log(product);

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen bg-theme-secondary text-theme-primary flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-semibold mb-2">Producto no encontrado</h2>
                        <p className="text-theme-secondary mb-4">El producto que buscas no existe</p>
                        <motion.button
                            onClick={() => navigate('/products')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-theme-primary text-theme-secondary px-6 py-3 rounded-lg font-medium"
                        >
                            Volver a Productos
                        </motion.button>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    // Set default configuration
    if (!selectedConfiguration && product.configurations.length > 0) {
        setSelectedConfiguration(product.configurations[0].id);
    }

    const handleAddToCart = () => {
        const config = product.configurations.find(c => c.id === selectedConfiguration);
        if (config) {
            addToCart(product, config);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-theme-secondary text-theme-primary py-8">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Back Button */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05, x: -5 }}
                        className="flex items-center gap-2 text-theme-primary mb-8 hover:text-theme-accent transition-colors"
                    >
                        <FaArrowLeft />
                        Volver
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Product Images */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Main Image */}
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="w-full h-96 bg-theme-primary rounded-2xl flex items-center justify-center text-8xl mb-6 shadow-theme object-contain"
                                src={product.image}
                            >
                            </motion.img>

                            {/* Variant Images Row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <h4 className="text-lg font-semibold mb-4 text-theme-primary">Variantes del Producto</h4>
                                <div className="grid grid-cols-4 gap-4">
                                    {product.configurations.map((product, index) => (
                                        <div key={product.id}
                                        >
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`w-full h-24 bg-theme-accent rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 `}
                                            >
                                                <img src={product.specs.image} alt={product.variant} className="w-full h-full object-cover" />
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Product Header */}
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="flex items-center gap-2 mb-3"
                                >
                                    <span className="text-sm bg-theme-secondary-light text-theme-primary px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                    {product.recommended && (
                                        <span className="text-sm bg-theme-accent text-theme-secondary px-3 py-1 rounded-full flex items-center gap-1">
                                            <FaStar className="text-xs" />
                                            Recomendado
                                        </span>
                                    )}
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="text-4xl font-bold text-theme-primary mb-4"
                                >
                                    {product.name}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="text-lg text-theme-primary mb-6"
                                >
                                    {product.description}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="text-3xl font-bold text-theme-accent mb-6"
                                >
                                    ${product.price}
                                </motion.div>
                            </div>

                            {/* Configuration Selection */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <h4 className="text-lg font-semibold mb-3 text-theme-primary">Configuración</h4>
                                <div className="space-y-3">
                                    {product.configurations.map((config) => (
                                        <motion.button
                                            key={config.id}
                                            onClick={() => setSelectedConfiguration(config.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${selectedConfiguration === config.id
                                                ? 'border-theme-accent bg-theme-accent text-theme-secondary'
                                                : 'border-theme hover:border-theme-accent'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold">{config.variant}</span>
                                                <span className="text-lg font-bold">${config.price}</span>
                                            </div>
                                            <div className="flex gap-2 text-sm">
                                                {config.storage !== "N/A" && (
                                                    <span className="px-2 py-1 bg-theme-secondary-light rounded">
                                                        {config.storage}
                                                    </span>
                                                )}
                                                {config.ram && config.ram !== "N/A" && (
                                                    <span className="px-2 py-1 bg-theme-secondary-light rounded">
                                                        {config.ram}
                                                    </span>
                                                )}
                                                <span className="px-2 py-1 bg-theme-secondary-light rounded">
                                                    Stock: {config.stock}
                                                </span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Product Specifications */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                <h4 className="text-lg font-semibold mb-3 text-theme-primary">Especificaciones</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(product.specs).map(([key, value]) => {
                                        if (value && value !== "N/A") {
                                            return (
                                                <div key={key} className="flex items-center gap-3">
                                                    <FaCheck className="text-theme-accent text-sm" />
                                                    <div>
                                                        <span className="text-sm text-theme-accent capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                                                        </span>
                                                        <p className="text-theme-primary font-medium">{value}</p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </motion.div>

                            {/* Stock Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                                className="flex items-center gap-2 text-theme-secondary"
                            >
                                <span className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span className='text-theme-accent'>{product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}</span>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="flex flex-col sm:flex-row gap-4 pt-6"
                            >
                                <motion.button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 bg-theme-primary text-theme-secondary py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-theme-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaShoppingCart />
                                    Agregar al Carrito
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-4 border-2 border-theme-primary text-theme-primary rounded-xl font-semibold hover:bg-theme-primary hover:text-theme-secondary transition-colors"
                                >
                                    <FaHeart />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-4 border-2 border-theme-primary text-theme-primary rounded-xl font-semibold hover:bg-theme-primary hover:text-theme-secondary transition-colors"
                                >
                                    <FaShare />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
