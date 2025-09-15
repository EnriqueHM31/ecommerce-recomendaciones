import { motion } from 'framer-motion';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useCartStore } from '../../store/cartStore';

interface FiltrosBusquedaProps {
    handleAbrirFiltros: () => void;
}

export default function FiltrosBusqueda({ handleAbrirFiltros }: FiltrosBusquedaProps) {


    const { eliminarCategoriaFiltro, buscarProducto, categoriasSeleccionadas, productosAgrupados } = useCartStore();


    return (
        <>
            <div className="max-w-7xl mx-auto px-3">
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
                            <span className="text-sm md:text-base text-theme-primary">
                                {productosAgrupados.length} productos disponibles
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
        </>
    )
}