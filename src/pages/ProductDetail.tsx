import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheck, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCartStore } from '../store/cartStore';

export interface ProductConfiguration {
    id: string;
    variant: string;
    storage: string;
    ram?: string;
    price: number;
    stock: number;
    specs: {
        processor?: string;
        ram?: string;
        display?: string;
        camera?: string;
        image?: string;
        color?: string;
        battery?: string;
        connectivity?: string;
        os?: string;
    };
}

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getProductById, addToCart } = useCartStore();

    const product = getProductById(Number(id));

    const [selectedConfiguration, setSelectedConfiguration] = useState<ProductConfiguration | null>(null);

    // 🔹 Al montar, revisamos si hay configuración guardada en localStorage
    useEffect(() => {
        if (product) {
            const savedConfig = localStorage.getItem(`selectedConfig-${product.id}`);
            if (savedConfig) {
                setSelectedConfiguration(JSON.parse(savedConfig));
            } else if (product.configurations.length) {
                setSelectedConfiguration(product.configurations[0]);
            }
        }
    }, [product]);

    // 🔹 Cada vez que cambia la config seleccionada, la guardamos en localStorage
    useEffect(() => {
        if (selectedConfiguration && product) {
            localStorage.setItem(`selectedConfig-${product.id}`, JSON.stringify(selectedConfiguration));
        }
    }, [selectedConfiguration, product]);

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

    const handleAddToCart = () => {
        if (selectedConfiguration) {
            addToCart(product, selectedConfiguration);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-theme-secondary text-theme-primary py-8">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Botón volver */}
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
                        {/* Imagen principal */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.img
                                key={selectedConfiguration?.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="w-full h-96  rounded-2xl flex items-center justify-center text-8xl mb-6 shadow-theme object-contain"
                                src={selectedConfiguration?.specs.image || product.image}
                                alt={selectedConfiguration?.variant || product.name}
                            />

                            {/* Thumbnails de variantes */}
                            <h4 className="text-lg font-semibold mb-4 text-theme-primary">Variantes del Producto</h4>
                            <div className="grid grid-cols-4 gap-4">
                                {product.configurations.map((config) => (
                                    <motion.div
                                        key={config.id}
                                        onClick={() => setSelectedConfiguration(config)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`w-full h-24  rounded-xl overflow-hidden cursor-pointer p-2 border-2 transition-all duration-300 ${selectedConfiguration?.id === config.id
                                            ? 'border-theme-accent'
                                            : 'border-transparent hover:border-theme'
                                            }`}
                                    >
                                        <img
                                            src={config.specs.image || product.image}
                                            alt={config.variant}
                                            className="w-full h-full object-contain"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Información del producto */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                {/* Header */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm bg-theme-secondary-light text-theme-primary px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                    {product.recommended && (
                                        <span className="text-sm bg-theme-accent text-theme-secondary px-3 py-1 rounded-full flex items-center gap-1">
                                            <FaStar className="text-xs" />
                                            Recomendado
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-4xl font-bold text-theme-primary mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-theme-primary mb-6">{product.description}</p>

                                <div className="text-3xl font-bold text-theme-accent mb-6">
                                    ${selectedConfiguration?.price || product.price}
                                </div>
                            </div>

                            {/* Configuración seleccionada */}
                            {selectedConfiguration && (
                                <div className="space-y-3">
                                    <h4 className="text-lg font-semibold mb-3 text-theme-primary">Configuración Seleccionada</h4>
                                    <div className="p-4 rounded-lg border-2 border-theme-accent bg-theme-secondary-light">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold">{selectedConfiguration.variant}</span>
                                            <span className="text-lg font-bold">${selectedConfiguration.price}</span>
                                        </div>
                                        <div className="flex gap-2 text-sm">
                                            {selectedConfiguration.storage && (
                                                <span className="px-2 py-1 bg-theme-secondary rounded">
                                                    {selectedConfiguration.storage}
                                                </span>
                                            )}
                                            {selectedConfiguration.ram && (
                                                <span className="px-2 py-1 bg-theme-secondary rounded">
                                                    {selectedConfiguration.ram}
                                                </span>
                                            )}
                                            <span className="px-2 py-1 bg-theme-secondary rounded">
                                                Stock: {selectedConfiguration.stock}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Especificaciones */}
                            {selectedConfiguration && selectedConfiguration.specs && (
                                <div>
                                    <h4 className="text-lg font-semibold mb-3 text-theme-primary">Especificaciones</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {Object.entries(selectedConfiguration.specs).map(([key, value]) => {

                                            if (key === "image") {
                                                return null;
                                            }
                                            return value && value !== "N/A" && value !== "image" ? (
                                                <div key={key} className="flex items-center gap-3">
                                                    <FaCheck className="text-theme-accent text-sm" />
                                                    <div>
                                                        <span className="text-sm text-theme-accent capitalize">
                                                            {key.replace(/([A-Z])/g, " $1").trim()}:
                                                        </span>
                                                        <p className="text-theme-primary font-medium">{value}</p>
                                                    </div>
                                                </div>
                                            ) : null
                                        })
                                        }
                                    </div>
                                </div>
                            )}

                            {/* Botón agregar carrito */}
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={!selectedConfiguration || selectedConfiguration.stock === 0}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-theme-primary text-theme-secondary py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-theme-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FaShoppingCart />
                                Agregar al Carrito
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
