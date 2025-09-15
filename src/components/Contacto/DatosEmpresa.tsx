import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

export default function DatosEmpresa() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-12 space-y-4"
            >
                <h3 className="text-xl font-semibold text-theme-accent mb-4">
                    Información de Contacto
                </h3>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-theme-secondary">
                        <FaPhone className="text-theme-primary text-lg" />
                        <span className="text-theme-primary">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-theme-secondary">
                        <FaEnvelope className="text-theme-primary text-lg" />
                        <span className="text-theme-primary">storetecbpl@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-theme-secondary">
                        <FaMapMarkerAlt className="text-theme-primary text-lg" />
                        <span className="text-theme-primary">123 Tech Calle, Digital Ciudad, DC 12345</span>
                    </div>
                </div>
            </motion.div>
        </>
    )
}