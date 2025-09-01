import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaComments, FaPaperPlane } from 'react-icons/fa';

interface FormContactoProps {
    handleSubmit: (e: React.FormEvent) => void;
    datos: { name: string; email: string; };
    camposBloqueados: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormContacto({ handleSubmit, datos, camposBloqueados, handleChange }: FormContactoProps) {

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <label htmlFor="name" className="block text-theme-primary font-medium mb-2">
                        Nombre Completo
                    </label>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-primary text-lg" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={datos.name ?? ''}
                            className={`w-full pl-12 pr-4 py-3 border-2 border-theme rounded-xl bg-theme-secondary  text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent transition-all duration-300 `}
                            placeholder="Tu nombre completo"
                            onChange={handleChange}
                            disabled={camposBloqueados}
                            autoComplete='on'
                        />
                    </div>
                </motion.div>

                {/* Email Field */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <label htmlFor="email" className="block text-theme-primary font-medium mb-2">
                        Correo Electrónico
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-primary text-lg" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={datos.email ?? ''}
                            className={`w-full pl-12 pr-4 py-3 border-2 border-theme rounded-xl bg-theme-secondary  text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent transition-all duration-300 `}
                            placeholder="tu@email.com"
                            onChange={handleChange}
                            disabled={camposBloqueados}
                            autoComplete='on'
                        />
                    </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <label htmlFor="message" className="block text-theme-primary font-medium mb-2">
                        Mensaje
                    </label>
                    <div className="relative">
                        <FaComments className="absolute left-3 top-3 text-theme-primary text-lg" />
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="w-full pl-12 pr-4 py-3 border-2 border-theme rounded-xl bg-theme-secondary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="Escribe tu mensaje aquí..."
                            onChange={handleChange}
                            autoComplete='on'
                        />
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="w-full bg-theme-accent text-theme-secondary py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-theme-accent-light transition-colors duration-300 shadow-theme hover:shadow-theme-dark"
                >
                    <FaPaperPlane />
                    Enviar Mensaje
                </motion.button>
            </form>
        </>
    )
}