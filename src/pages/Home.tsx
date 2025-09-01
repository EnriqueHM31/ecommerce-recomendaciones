import { motion } from 'framer-motion';
import {
    FaTags,
    FaEnvelope,
    FaHome,
    FaBox,
    FaMobile,
    FaApple,
    FaAndroid,
    FaFacebook,
    FaInstagram,
    FaTwitter
} from 'react-icons/fa';
import Layout from '../components/Layout';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import IMAGENHERO from '../assets/img/img.png';

export default function Home() {
    const { getRecommendedProducts, addToCart } = useCartStore();
    const recommendedProducts = getRecommendedProducts();
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="min-h-screen ns bg-theme-secondary text-theme-primary">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="bg-theme-secondary-light py-16 flex items-center min-h-[80vh]"
                    id="home"
                >
                    <div className="max-w-11/12 mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative ">

                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-5xl lg:text-5xl text-theme-primary mb-4 leading-tight font-bold"
                            >
                                La Mejor Tecnología al Alcance de tus Manos
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-md text-theme-primary  mb-8 leading-relaxed "
                            >
                                Bienvenido a tu tienda de tecnología de confianza, donde la innovación se encuentra con la comodidad. Aquí encontrarás una amplia gama de productos que van desde smartphones, laptops y accesorios, hasta los últimos gadgets diseñados para simplificar tu vida.
                            </motion.p>
                            <motion.button
                                onClick={() => (window.location.href = '/products')}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="bg-theme-primary text-theme-secondary px-6 py-3 text-lg font-semibold cursor-pointer rounded-2xl hover:bg-white hover:text-theme-primary transition-colors duration-300 ease-in-out"
                            >
                                Ver Productos
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0, scale: 0.8 }}
                            animate={{ x: 0, opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex flex-col justify-center items-center relative"
                        >
                            {/* Imagen flotante */}
                            <img
                                src={IMAGENHERO}
                                alt="hero-image"
                                className="w-full h-full object-cover max-w-3/4 drop-shadow-blue-300 float-animation"
                            />

                            {/* Base cuadrada */}
                            <div className="w-40 h-4 bg-gray-800 rounded-md shadow-lg md:mt-[-80px]" />
                        </motion.div>

                    </div>
                </motion.section>

                {/* Featured Products */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="py-16 bg-theme-secondary"
                    id="products"
                >
                    <div className="max-w-7xl mx-auto px-8">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center text-4xl text-theme-primary mb-12 font-bold"
                        >
                            Productos Recomendados
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {recommendedProducts.map((product) => (
                                <motion.div
                                    key={product.id}
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
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    <motion.img
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { duration: 0.2 }
                                        }}
                                        src={product.image}
                                        className="w-32 h-32 bg-theme-accent rounded-full flex items-center justify-center mx-auto mb-6 text-6xl text-theme-secondary"
                                    >
                                    </motion.img>
                                    <h3 className="text-theme-primary mb-2 text-xl font-semibold">{product.name}</h3>
                                    <p className="text-theme-primary mb-4">{product.description}</p>
                                    <span className="block text-2xl font-bold text-theme-accent mb-6">${product.price}</span>

                                    <motion.button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Usar la primera configuración disponible
                                            if (product.configurations && product.configurations.length > 0) {
                                                addToCart(product, product.configurations[0]);
                                            }
                                        }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-theme-primary text-theme-secondary border-none py-3 px-6 rounded-full cursor-pointer font-medium w-full shadow-theme hover:shadow-theme-dark mb-3"
                                    >
                                        Agregar al Carrito
                                    </motion.button>

                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Brands Section */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="py-16 bg-theme-secondary-light"
                    id="brands"
                >
                    <div className="max-w-7xl mx-auto px-8">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center text-4xl text-theme-primary mb-12 font-bold"
                        >
                            Nuestras Marcas
                        </motion.h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {[
                                { icon: FaApple, name: "Apple" },
                                { icon: FaAndroid, name: "Android" },
                                { icon: FaMobile, name: "Huawei" },
                                { icon: FaTags, name: "Steren" },
                                { icon: FaBox, name: "Motorola" }
                            ].map((brand, index) => (
                                <motion.div
                                    key={brand.name}
                                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="text-center p-8 bg-theme-secondary border border-theme rounded-2xl shadow-theme hover:shadow-theme-dark cursor-pointer"
                                >
                                    <motion.div
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 10,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="w-20 h-20 bg-theme-accent rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-theme-secondary"
                                    >
                                        <brand.icon />
                                    </motion.div>
                                    <h3 className="text-theme-primary m-0 text-lg font-semibold">{brand.name}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-theme-primary text-theme-accent py-12"
                >
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex justify-between md:flex-row flex-col gap-8 mb-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-theme-primary bg-theme-secondary w-fit rounded-2xl px-4 py-1 mb-4 text-xl font-semibold">StoreTec BPL</h3>
                                <p className="text-theme-secondary leading-relaxed mb-4">Tu tienda de confianza para tecnología de vanguardia</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-theme-primary bg-theme-secondary w-fit rounded-2xl px-4 py-1 mb-4 text-xl font-semibold">Enlaces Rápidos</h3>
                                <ul className="list-none p-0">
                                    {[
                                        { icon: FaHome, name: "Inicio", href: "/" },
                                        { icon: FaBox, name: "Productos", href: "/products" },
                                        { icon: FaEnvelope, name: "Contacto", href: "/contact" }
                                    ].map((item, index) => (
                                        <motion.li
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="mb-2"
                                        >
                                            <a href={`${item.href}`} className="text-theme-secondary hover:opacity-75 transition-colors duration-300 flex items-center gap-2">
                                                <item.icon />
                                                {item.name}
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
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
                                    <motion.a
                                        whileHover={{ scale: 1.2 }}
                                        href="https://facebook.com"
                                        target="_blank"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-secondary text-theme-primary shadow-theme hover:shadow-theme-dark"
                                    >
                                        <FaFacebook />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.2 }}
                                        href="https://twitter.com"
                                        target="_blank"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-secondary text-theme-primary shadow-theme hover:shadow-theme-dark"
                                    >
                                        <FaTwitter />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.2 }}
                                        href="https://instagram.com"
                                        target="_blank"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-secondary text-theme-primary shadow-theme hover:shadow-theme-dark"
                                    >
                                        <FaInstagram />
                                    </motion.a>
                                    <motion.a
                                        whileHover={{ scale: 1.2 }}
                                        href="mailto:contacto@tudominio.com"
                                        className="w-10 h-10 flex items-center justify-center rounded-full bg-theme-secondary text-theme-primary shadow-theme hover:shadow-theme-dark"
                                    >
                                        <FaEnvelope />
                                    </motion.a>
                                </div>
                            </motion.div>

                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center pt-8 border-t border-theme-dark text-theme-secondary"
                        >
                            <p>&copy; 2025 StoreTec BPL. Todos los derechos reservados.</p>
                        </motion.div>
                    </div>
                </motion.footer>

            </div>
        </Layout>
    );
}