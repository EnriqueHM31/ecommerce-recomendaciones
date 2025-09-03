import { motion } from "framer-motion";
import type { Producto } from "../../types/productos";

interface VariantesProductoDetallesProps {
    productoSeleccionado: Producto;
    product: Producto[];
    handleClickToggleVariantes: (product: Producto) => void;
}

export default function Variantes({
    productoSeleccionado,
    product,
    handleClickToggleVariantes,
}: VariantesProductoDetallesProps) {


    return (
        <>
            <h4 className="text-lg font-semibold mb-4 text-theme-primary">
                Variantes del Producto
            </h4>
            <div className="grid grid-cols-4 gap-4">
                {
                    product.map(producto => (
                        <motion.div
                            key={producto.sku}
                            onClick={() => handleClickToggleVariantes(producto)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full h-24 rounded-xl overflow-hidden cursor-pointer p-2 border-2 transition-all duration-300 ${productoSeleccionado.id === producto.id
                                ? 'border-theme-accent'
                                : 'border-transparent hover:border-theme'
                                }`}
                        >
                            <img
                                src={producto.imagen_url}
                                alt={producto.producto + " " + producto.color}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    ))
                }
            </div>
        </>
    );
}
