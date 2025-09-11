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

    const seen = new Set<string>();

    const uniqueProducts = product.filter(p => {
        if (seen.has(p.color)) return false;
        seen.add(p.color);
        return true;
    });

    return (
        <>
            <h4 className="text-lg font-semibold mb-4 text-theme-primary">
                Variantes del Producto
            </h4>
            <div className="grid grid-cols-4 gap-4">
                {
                    uniqueProducts.map(producto => (
                        <motion.div
                            key={producto.sku}
                            onClick={() => handleClickToggleVariantes(producto)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full h-24 rounded-xl overflow-hidden cursor-pointer p-2  transition-all duration-300 border-4 bg-white ${productoSeleccionado.color === producto.color
                                ? 'border-blue-500'
                                : 'border-transparent hover:border-primary'
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
