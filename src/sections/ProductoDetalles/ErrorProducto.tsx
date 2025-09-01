import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

export default function ErrorProducto() {

    const navigate = useNavigate();
    return (
        <>
            <Layout>
                <div className="min-h-screen bg-theme-secondary text-theme-primary flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-semibold mb-2">Producto no encontrado</h2>
                        <p className="text-theme-secondary mb-4">El producto que buscas no existe</p>
                        <motion.button
                            onClick={() => navigate('/products')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-theme-primary text-theme-secondary px-6 py-3 rounded-lg font-medium"
                        >
                            Volver a Productos
                        </motion.button>
                    </motion.div>
                </div>
            </Layout>
        </>
    )
}