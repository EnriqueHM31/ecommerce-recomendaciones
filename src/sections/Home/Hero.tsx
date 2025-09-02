import { motion } from 'framer-motion';
import IMAGENHERO from '../../assets/img/img.png';

export default function Hero() {
    return (
        <>
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
                        <div className="w-40 h-4 bg-theme-primary rounded-md shadow-lg md:mt-[-80px]" />
                    </motion.div>

                </div>
            </motion.section>
        </>

    )
}