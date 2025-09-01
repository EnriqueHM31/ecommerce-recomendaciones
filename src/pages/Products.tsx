import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaFilter, FaLongArrowAltUp, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Filtros from '../components/Filtros';
import Layout from '../components/Layout';
import { COLORES_ECOMMERCE_PRODUCTOS } from '../constants/colores';
import { useCartStore } from '../store/cartStore';

export default function Products() {
    const { productFiltrados, addToCart, buscarProducto, categoriasSeleccionadas, eliminarCategoriaFiltro } = useCartStore();
    const navigate = useNavigate();
    const [isOpen, setisOpen] = useState(false);

    const handleCerrarFiltros = () => {
        setisOpen(false)
    }

    const handleAbrirFiltros = () => {
        setisOpen(true)
    }

    console.log(productFiltrados);
    console.log(categoriasSeleccionadas);


    return (
        <Layout>

            <AnimatePresence>
                {
                    isOpen && <Filtros handleCerrarFiltros={handleCerrarFiltros} />
                }
            </AnimatePresence>
            <div className="min-h-screen bg-theme-secondary text-theme-primary">

                {/* Filters and Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-theme-secondary border-b border-theme py-6  z-40"
                >
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex flex-col  gap-4">
                                <div className='flex items-center gap-4'>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 bg-theme-accent text-theme-secondary px-4 py-2 rounded-lg font-medium cursor-pointer"
                                        onClick={handleAbrirFiltros}
                                    >
                                        <FaFilter />
                                        Filtros
                                    </motion.button>
                                    <span className="text-theme-primary">
                                        {productFiltrados.length} productos disponibles
                                    </span>
                                </div>
                                <div className='flex flex-wrap gap-4'>
                                    {
                                        categoriasSeleccionadas.length > 0 && (
                                            categoriasSeleccionadas.map((cat, index) => (
                                                <span key={index} className="text-theme-secondary bg-theme-primary px-4 py-1 rounded-full flex items-center gap-2 w-fit text-xs">
                                                    {cat}
                                                    <button onClick={() => eliminarCategoriaFiltro(cat)}>
                                                        <IoClose className="text-2xl" />
                                                    </button>
                                                </span>
                                            ))
                                        )
                                    }
                                </div>
                            </div>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary" />
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="pl-10 pr-4 py-2 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent w-64"
                                    onChange={(e) => buscarProducto(e.target.value)}
                                    id='buscar-productos'
                                    name='buscar-productos'
                                    autoComplete='off'
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

            <button
                className='fixed bottom-8 right-12 bg-theme-primary text-theme-secondary p-3 rounded-full shadow-theme hover:shadow-theme-dark transition-colors duration-300 cursor-pointer hover:scale-110 border border-theme-secondary'
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }}
            >
                <FaLongArrowAltUp className='text-3xl' />
            </button>
        </Layout>
    )
}
