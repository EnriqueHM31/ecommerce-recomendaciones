import { motion } from 'framer-motion';
import IMG_LOGO_MOTOROLA from '../../assets/img/logo_motorola.webp';
import IMG_LOGO_STEREN from '../../assets/img/logo_steren.webp';
import IMG_LOGO_APPLE from '../../assets/img/logo_apple.webp';
import IMG_LOGO_HUAWEI from '../../assets/img/logo_huawei.webp';
import IMG_LOGO_ANDROID from '../../assets/img/logo_android.webp';

export default function Marcas() {
    return (
        <>
            {/* Brands Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="py-16 bg-theme-secondary-light px-3 md:px-0"
                id="brands"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center text-2xl md:text-4xl text-theme-primary mb-12 font-bold"
                    >
                        Nuestras Marcas
                    </motion.h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            { icon: IMG_LOGO_APPLE, name: "Apple" },
                            { icon: IMG_LOGO_ANDROID, name: "Android" },
                            { icon: IMG_LOGO_HUAWEI, name: "Huawei" },
                            { icon: IMG_LOGO_STEREN, name: "Steren" },
                            { icon: IMG_LOGO_MOTOROLA, name: "Motorola" }
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
                                className={`text-center p-8 bg-theme-secondary border border-theme rounded-2xl shadow-theme hover:shadow-theme-dark cursor-pointer ${index === 4 ? "col-span-2 md:col-span-1" : ""}`}
                            >
                                <motion.img
                                    whileHover={{
                                        scale: 1.2,
                                        rotate: 10,
                                        transition: { duration: 0.2 }
                                    }}
                                    src={brand.icon}
                                    className="w-20 h-20 bg-theme-accent rounded-full flex items-center justify-center mx-auto mb-4 text-4xl text-theme-secondary object-cover"
                                >
                                </motion.img>
                                <h3 className="text-theme-primary m-0 text-lg font-semibold">{brand.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </>
    )
}