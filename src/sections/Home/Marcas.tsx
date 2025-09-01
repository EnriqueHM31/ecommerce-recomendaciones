import { motion } from 'framer-motion';
import { FaApple, FaAndroid, FaBox, FaMobile, FaTags } from 'react-icons/fa';

export default function Marcas() {
    return (
        <>
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
        </>
    )
}