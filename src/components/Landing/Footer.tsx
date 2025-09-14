import { FaEnvelope, FaFacebook, FaHome, FaInstagram, FaTwitter, FaBox, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useUsuario } from "../../hooks/Usuarios/Usuario";

export default function Footer() {
    const { user } = useUsuario();
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-theme-primary text-theme-accent py-12"
        >
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex justify-between md:flex-row flex-col gap-8 mb-8">
                    {/* Logo y descripción */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-theme-primary bg-theme-secondary w-fit rounded-2xl px-4 py-1 mb-4 text-xl font-semibold">
                            StoreTec BPL
                        </h3>
                        <p className="text-theme-secondary leading-relaxed mb-4">
                            Tu tienda de confianza para tecnología de vanguardia
                        </p>
                    </motion.div>

                    {/* Enlaces rápidos */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-theme-primary bg-theme-secondary w-fit rounded-2xl px-4 py-1 mb-4 text-xl font-semibold">
                            Enlaces Rápidos
                        </h3>
                        <ul className="list-none p-0">
                            {[
                                { icon: FaHome, name: "Inicio", href: "/" },
                                { icon: FaBox, name: "Productos", href: "/products" },
                                { icon: FaEnvelope, name: "Contacto", href: "/contact" },
                            ].map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="mb-2"
                                >
                                    <a
                                        href={item.href}
                                        className="text-theme-secondary hover:opacity-75 transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <item.icon />
                                        {item.name}
                                    </a>
                                </motion.li>
                            ))}
                            {
                                user && (
                                    <motion.li
                                        key="compras"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        whileHover={{ y: -2 }}
                                    >
                                        <a
                                            href="/compras"
                                            className="text-theme-secondary no-underline font-medium hover:text-theme-accent transition-colors duration-300 flex items-center gap-2"
                                        >
                                            <FaShoppingCart className="text-lg" />
                                            Mis compras
                                        </a>
                                    </motion.li>
                                )
                            }
                        </ul>
                    </motion.div>

                    {/* Redes sociales */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-theme-primary bg-theme-secondary w-fit rounded-2xl px-4 py-1 mb-4 text-xl font-semibold">
                            Contáctanos
                        </h3>
                        <p className="text-theme-secondary leading-relaxed mb-4">
                            Síguenos en nuestras redes y mantente conectado
                        </p>
                        <div className="flex gap-4 mt-4">
                            {[
                                { icon: FaFacebook, href: "https://facebook.com" },
                                { icon: FaTwitter, href: "https://twitter.com" },
                                { icon: FaInstagram, href: "https://instagram.com" },
                                { icon: FaEnvelope, href: "mailto:contacto@tudominio.com" },
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ scale: 1.2 }}
                                    href={item.href}
                                    target="_blank"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-secondary text-theme-primary shadow-theme hover:shadow-theme-dark"
                                >
                                    <item.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Derechos reservados */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center pt-8 border-t border-white text-theme-secondary"
                >
                    <p>&copy; 2025 StoreTec BPL. Todos los derechos reservados.</p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
