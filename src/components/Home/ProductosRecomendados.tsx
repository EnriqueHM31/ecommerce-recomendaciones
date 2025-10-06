import type { Producto } from '@/types/productos';
import { formatearPrecio } from '@/utils/Formateo';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavegacion } from '../../hooks/Navigate/navegacion';
import { useUsuario } from '../../hooks/Usuarios/Usuario';
import { useCartStore } from '../../store/cartStore';
import { usePrediccionesStore } from '../../store/prediccionesStore';
import SkeletonCard from '../Productos/Skeleton';

export default function ProductosRecomendados() {

    const { predicciones, fetchPredicciones, recomendado } = usePrediccionesStore();
    const { fetchProductos } = useCartStore();
    const { handleRedirigirPagina } = useNavegacion();
    const { addToCart } = useCartStore();

    const { user } = useUsuario();

    useEffect(() => {
        fetchProductos();
        fetchPredicciones(user?.id ?? '');
    }, [user]);

    console.log({ predicciones });

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
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center text-2xl md:text-4xl text-theme-primary mb-12 font-bold"
                    >
                        {recomendado ? "Productos Recomendados" : "Productos Mas Vendidos"}
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-3 lg:px-0">
                        {
                            predicciones.length === 0 &&
                            Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        }
                        {predicciones.map((product: Producto) => (
                            <motion.div
                                key={product.sku}
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
                                onClick={() => handleRedirigirPagina(`/products/${product.id}`)}
                            >
                                <div className="flex w-36 h-36 items-center justify-center p-3 rounded-full mx-auto mb-4 bg-white">
                                    <motion.img
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { duration: 0.2 },
                                        }}
                                        src={product.imagen_url}
                                        className="w-24 h-24 object-contain"
                                    />
                                </div>
                                <h3 className="text-theme-primary mb-2 text-xl font-semibold">{product.producto}</h3>
                                <p className="text-theme-primary mb-2 line-clamp-2">{product.descripcion}</p>
                                <div className='flex flex-wrap gap-2 my-3'>
                                    <span className='bg-theme-accent text-white px-4 py-1 rounded-2xl'>  Color: {product.color ? product.color : ''} </span>
                                    <span className='bg-theme-accent text-white px-4 py-1 rounded-2xl'>{product.ram_especificacion ? `RAM: ${product.ram_especificacion}` : ''}</span>
                                    <span className='bg-theme-accent text-white px-4 py-1 rounded-2xl'>{product.almacenamiento ? `Almacenamiento: ${product.almacenamiento}` : ''}</span>
                                </div>
                                <span className="block text-2xl font-bold text-theme-accent mb-3">{formatearPrecio(product.precio_base, 'MXN')}</span>

                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product);
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