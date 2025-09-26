import { motion } from 'framer-motion';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import Layout from '../components/Landing/Layout';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useProducto } from '../hooks/ProductoDetalles/producto';
import Configuracion from '../components/ProductoDetalles/Configuracion';
import ProductoNoEncontrado from '../components/ProductoDetalles/ErrorProducto';
import Especificaciones from '../components/ProductoDetalles/Especificaciones';
import Header from '../components/ProductoDetalles/Header';
import VariantesProductoDetalles from '../components/ProductoDetalles/Variantes';
import { useCartStore } from '../store/cartStore';
import type { Producto } from '../types/productos';
import { useEffect, useState } from 'react';


export default function ProductDetail() {

    const { product, handleAddToCart } = useProducto();
    const { handleRegresarAnteriorExacto } = useNavegacion();
    const { productosPlanos } = useCartStore();
    const [configuracionSeleccionada, setConfiguracionSeleccionada] = useState<Producto | undefined>();
    const { fetchProductos } = useCartStore();
    useEffect(() => {
        fetchProductos();
    }, []);


    useEffect(() => {
        if (product) {
            setConfiguracionSeleccionada(product);
        }
    }, [product]);


    if (!product) {
        return (
            <ProductoNoEncontrado />
        );
    }

    const handleToggle = (productoSeleccionado: Producto) => {
        setConfiguracionSeleccionada(productoSeleccionado);
    }


    const productosArray = productosPlanos.filter(p => p.producto === configuracionSeleccionada?.producto);

    return (
        <Layout>
            <div className="min-h-screen bg-theme-secondary text-theme-primary pb-26 pt-10  ">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Botón volver */}
                    <motion.button
                        onClick={() => handleRegresarAnteriorExacto()}
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
                                key={configuracionSeleccionada?.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="w-full h-50 md:h-96  rounded-2xl flex items-center justify-center text-8xl mb-6 shadow-theme object-contain bg-white p-3 md:p-0"
                                src={configuracionSeleccionada?.imagen_url}
                                alt={configuracionSeleccionada?.producto + " " + configuracionSeleccionada?.color}
                            />

                            {/* Thumbnails de variantes */}
                            <VariantesProductoDetalles
                                productoSeleccionado={configuracionSeleccionada as Producto}
                                product={productosArray}
                                handleClickToggleVariantes={handleToggle} />
                        </motion.div>

                        {/* Información del producto */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <Header product={configuracionSeleccionada ?? product} />

                            {/* Configuración seleccionada */}
                            {configuracionSeleccionada && (
                                <Configuracion arrayConfiguraciones={productosArray}
                                    handleToggle={handleToggle}
                                    configuracionSeleccionada={configuracionSeleccionada}
                                />
                            )}

                            {/* Especificaciones */}
                            {product && (
                                <Especificaciones configuracionSeleccionada={configuracionSeleccionada} />
                            )}

                            {/* Botón agregar carrito */}
                            <motion.button
                                onClick={() => handleAddToCart(configuracionSeleccionada ?? product)}
                                disabled={!product || product.stock === 0}
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
