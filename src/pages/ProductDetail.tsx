import { motion } from 'framer-motion';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import Layout from '../components/Landing/Layout';
import { useNavegacion } from '../hooks/Navigate/navegacion';
import { useProducto } from '../hooks/ProductoDetalles/producto';
import Configuracion from '../sections/ProductoDetalles/Configuracion';
import ProductoNoEncontrado from '../sections/ProductoDetalles/ErrorProducto';
import Especificaciones from '../sections/ProductoDetalles/Especificaciones';
import Header from '../sections/ProductoDetalles/Header';
import VariantesProductoDetalles from '../sections/ProductoDetalles/Variantes';
import { useCartStore } from '../store/cartStore';
import type { Producto } from '../types/productos';
import { useEffect, useState } from 'react';


export default function ProductDetail() {

    const { productoEscogido, productoEscogidoArray, handleAddToCart, handleClickToggleVariantes } = useProducto();
    const { handleRegresarAnteriorExacto } = useNavegacion();
    const { products } = useCartStore();
    const [configuracionSeleccionada, setConfiguracionSeleccionada] = useState<Producto | undefined>();

    useEffect(() => {
        if (productoEscogido) {
            setConfiguracionSeleccionada(productoEscogido);
        }
    }, [productoEscogido]);

    if (!productoEscogido) {
        return (
            <ProductoNoEncontrado />
        );
    }


    const handleToogleConfiguracion = (product: Producto) => {
        setConfiguracionSeleccionada(product);
    };


    function getGruposByProductoId(productos: Producto[][], productoId: number): Producto[][] {
        return productos.filter(grupo => {
            return grupo.some(p => p.producto_id === productoId)
        });
    }

    const gruposVariantes = getGruposByProductoId(products, productoEscogido.producto_id);



    return (
        <Layout>
            <div className="min-h-screen bg-theme-secondary text-theme-primary pb-26 pt-10  ">
                <div className="max-w-7xl mx-auto px-8">
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
                                key={productoEscogido?.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="w-full h-96  rounded-2xl flex items-center justify-center text-8xl mb-6 shadow-theme object-contain"
                                src={productoEscogido?.imagen_url}
                                alt={productoEscogido?.producto}
                            />

                            {/* Thumbnails de variantes */}
                            <VariantesProductoDetalles
                                productoSeleccionado={productoEscogido}
                                product={gruposVariantes}
                                handleClickToggleVariantes={handleClickToggleVariantes} />
                        </motion.div>

                        {/* Información del producto */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <Header product={productoEscogido} />

                            {/* Configuración seleccionada */}
                            {configuracionSeleccionada && (
                                <Configuracion selectedConfiguration={productoEscogidoArray ?? []}
                                    handlhandleClickToggleVariantes={handleToogleConfiguracion}
                                    configuracionSeleccionada={configuracionSeleccionada}
                                />
                            )}

                            {/* Especificaciones */}
                            {productoEscogido && (
                                <Especificaciones selectedConfiguration={productoEscogido} />
                            )}

                            {/* Botón agregar carrito */}
                            <motion.button
                                onClick={() => handleAddToCart(productoEscogido)}
                                disabled={!productoEscogido || productoEscogido.stock === 0}
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
