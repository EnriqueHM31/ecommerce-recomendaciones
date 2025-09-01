import { motion } from 'framer-motion';

export default function ImagenAnimada() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex justify-center items-center"
            >
                <div className="relative">
                    {/* Main Technology Circle */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-80 h-80 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-650 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
                    >
                        {/* Floating Tech Elements */}
                        <motion.div
                            animate={{
                                x: [0, 30, 0],
                                y: [0, -30, 0],
                                rotate: [0, 360]
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute top-8 left-8 w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center text-2xl text-theme-primary shadow-lg"
                        >
                            💻
                        </motion.div>

                        <motion.div
                            animate={{
                                x: [0, -25, 0],
                                y: [0, 25, 0],
                                rotate: [0, -360]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute top-16 right-12 w-12 h-12 bg-theme-accent rounded-full flex items-center justify-center text-xl text-theme-secondary shadow-lg"
                        >
                            📱
                        </motion.div>

                        <motion.div
                            animate={{
                                x: [0, 20, 0],
                                y: [0, 20, 0],
                                rotate: [0, 180, 360]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bottom-20 left-16 w-14 h-14 bg-theme-secondary rounded-full flex items-center justify-center text-xl text-theme-primary shadow-lg"
                        >
                            🎧
                        </motion.div>

                        <motion.div
                            animate={{
                                x: [0, -15, 0],
                                y: [0, -15, 0],
                                rotate: [0, -180, -360]
                            }}
                            transition={{
                                duration: 18,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute bottom-12 right-20 w-10 h-10 bg-theme-accent rounded-full flex items-center justify-center text-lg text-theme-secondary shadow-lg"
                        >
                            ⌚
                        </motion.div>

                        {/* Central Icon */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-6xl text-theme-secondary z-10"
                        >
                            🚀
                        </motion.div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-4 -right-4 w-24 h-24 bg-theme-accent rounded-full opacity-20"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-6 -left-6 w-32 h-32 bg-theme-primary rounded-full opacity-20"
                    />
                </div>
            </motion.div>

        </>
    )
}
