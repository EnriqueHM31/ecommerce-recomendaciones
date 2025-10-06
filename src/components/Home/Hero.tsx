import { motion } from 'framer-motion';
import IMAGENHERO from '../../assets/img/img.png';
import { useUsuario } from '../../hooks/Usuarios/Usuario';
import { useNavegacion } from '../../hooks/Navigate/navegacion';

export default function Hero() {
    const { user } = useUsuario();
    const { handleRedirigirPagina } = useNavegacion();
    return (
        <>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-7xl mx-auto bg-theme-secondary-light py-16 flex items-center min-h-[80vh]"
                id="home"
            >
                <div className="max-w-full mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative ">

                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className='flex flex-col items-center justify-center md:items-start md:justify-start px-3 md:px-0'
                    >
                        {
                            user && (
                                <motion.p
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-sm text-theme-secondary bg-theme-primary w-fit px-4 py-2 rounded-2xl mb-4 leading-tight text-center"

                                >
                                    {`Bienvenido ${user?.firstName !== null ? user?.firstName : ''} ${user?.lastName !== null ? user?.lastName : ''}`}
                                </motion.p>
                            )
                        }

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-3xl md:text-5xl lg:text-5xl text-theme-primary mb-4 leading-tight font-bold text-center md:text-start"
                        >
                            La Mejor Tecnología al Alcance de tus Manos
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-md text-theme-primary  mb-8 leading-relaxed text-center md:text-start"
                        >
                            Bienvenido a tu tienda de tecnología de confianza, donde la innovación se encuentra con la comodidad. Aquí encontrarás una amplia gama de productos que van desde smartphones, laptops y accesorios, hasta los últimos gadgets diseñados para simplificar tu vida.
                        </motion.p>
                        <motion.button
                            onClick={() => handleRedirigirPagina("/products")}
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