import { motion } from 'framer-motion';

export default function ProductosVacios() {
    return (
        <>
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
        </>
    )
}