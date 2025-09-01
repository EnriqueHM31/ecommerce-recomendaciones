import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Landing/Layout';
import Configuracion from '../sections/ProductoDetalles/Configuracion';
import ProductoNoEncontrado from '../sections/ProductoDetalles/ErrorProducto';
import Especificaciones from '../sections/ProductoDetalles/Especificaciones';
import Header from '../sections/ProductoDetalles/Header';
import { useCartStore } from '../store/cartStore';
import type { ProductConfiguration } from '../types/productos';
import VariantesProductoDetalles from '../sections/ProductoDetalles/Variantes';


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
            <ProductoNoEncontrado />
        );
    }
    const handleAddToCart = () => {
        if (selectedConfiguration) {
            addToCart(product, selectedConfiguration);
        }
    };

    const handleClickToggleVariantes = (config: ProductConfiguration) => {
        setSelectedConfiguration(config)
    };


    return (
        <Layout>
            <div className="min-h-screen bg-theme-secondary text-theme-primary pb-26 pt-10  ">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Botón volver */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05, x: -5 }}
                        className="flex items-center gap-2 text-theme-primary mb-8 hover:text-theme-accent transition-colors cursor-pointer"
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
                            <VariantesProductoDetalles product={product} selectedConfiguration={selectedConfiguration} handleClickToggleVariantes={handleClickToggleVariantes} />
                        </motion.div>

                        {/* Información del producto */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <Header product={product} selectedConfiguration={selectedConfiguration} />

                            {/* Configuración seleccionada */}
                            {selectedConfiguration && (
                                <Configuracion selectedConfiguration={selectedConfiguration} />
                            )}

                            {/* Especificaciones */}
                            {selectedConfiguration && selectedConfiguration.specs && (
                                <Especificaciones selectedConfiguration={selectedConfiguration} />
                            )}

                            {/* Botón agregar carrito */}
                            <motion.button
                                onClick={handleAddToCart}
                                disabled={!selectedConfiguration || selectedConfiguration.stock === 0}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-theme-primary text-theme-secondary py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-theme-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <FaShoppingCart />
                                Agregar al Carrito
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout >
    );
}
