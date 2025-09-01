import { motion } from 'framer-motion';
import type { ProductConfiguration, Producto } from '../../types/productos';
interface VariantesProductoDetallesProps {
    product: Producto;
    selectedConfiguration: ProductConfiguration | null;
    handleClickToggleVariantes: (configuration: ProductConfiguration) => void;
}


export default function Variantes({ product, selectedConfiguration, handleClickToggleVariantes }: VariantesProductoDetallesProps) {
    return (
        <>
            <h4 className="text-lg font-semibold mb-4 text-theme-primary">Variantes del Producto</h4>
            <div className="grid grid-cols-4 gap-4">
                {product.configurations.map((config) => (
                    <motion.div
                        key={config.id}
                        onClick={() => handleClickToggleVariantes(config)}
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
        </>

    )
}