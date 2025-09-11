import { AnimatePresence, motion } from 'framer-motion';
import { FaLongArrowAltUp } from 'react-icons/fa';
import Layout from '../components/Landing/Layout';
import Filtros from '../components/Productos/Filtros';
import Producto from '../components/Productos/Producto';
import ProductosVacios from '../components/Productos/ProductosVacios';
import { useToggle } from '../hooks/Open/open';
import FiltrosBusqueda from '../sections/Productos/FiltrosBusqueda';
import { useCartStore } from '../store/cartStore';
import SkeletonCard from '../components/Productos/Skeleton';
import { useEffect, useState } from 'react';

export default function Products() {
    const { productosAgrupados } = useCartStore();
    const AsideFiltros = useToggle();

    const handleCerrarFiltros = AsideFiltros.close;
    const handleAbrirFiltros = AsideFiltros.open;

    // Estado de loading (simula fetch o espera a que el store se llene)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ⏳ cuando lleguen los productos desactiva el loading
        if (productosAgrupados.length > 0) {
            setLoading(false);
        }
    }, [productosAgrupados]);

    return (
        <Layout>
            <AnimatePresence>
                {AsideFiltros.isOpen && (
                    <Filtros handleCerrarFiltros={handleCerrarFiltros} />
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-theme-secondary text-theme-primary">
                {/* Filters and Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-theme-secondary border-b border-theme py-6 z-40"
                >
                    <FiltrosBusqueda handleAbrirFiltros={handleAbrirFiltros} />
                </motion.div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto px-8 py-12">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {loading
                            ? Array(8)
                                .fill(0)
                                .map((_, i) => <SkeletonCard key={i} />)
                            : productosAgrupados.map((product, index) => (
                                <Producto
                                    key={product.id}
                                    product={product}
                                    index={index}
                                />
                            ))}
                    </motion.div>
                </div>

                {/* Empty State */}
                {!loading && productosAgrupados.length === 0 && <ProductosVacios />}
            </div>

            <button
                className="fixed bottom-8 right-12 bg-theme-primary text-theme-secondary p-3 rounded-full shadow-theme hover:shadow-theme-dark transition-colors duration-300 cursor-pointer hover:scale-110 border border-theme-secondary"
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }}
            >
                <FaLongArrowAltUp className="text-3xl" />
            </button>
        </Layout>
    );
}
