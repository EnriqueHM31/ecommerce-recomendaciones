import { motion } from 'framer-motion';
import {
    FaShoppingCart,
    FaSun,
    FaMoon,
    FaHome,
    FaBox,
    FaEnvelope
} from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useThemeStore } from '../../store/themeStore';

export default function Navbar() {
    const { theme, toggleTheme } = useThemeStore();
    const { toggleCart, getTotalItems } = useCartStore();

    return (
        <motion.div
            className="sticky top-0 z-50"
        >
            <nav className="bg-[#023d65] py-4 shadow-theme-dark">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -2 }}
                        className="text-theme-secondary"
                    >
                        <h2 className="text-2xl font-bold m-0">StoreTec BPL</h2>
                    </motion.div>

                    {/* Links */}
                    <ul className="flex list-none m-0 p-0 gap-8">
                        {[
                            { icon: FaHome, name: "Inicio", href: "/" },
                            { icon: FaBox, name: "Productos", href: "/products" },
                            { icon: FaEnvelope, name: "Contacto", href: "/contact" }
                        ].map((item, index) => (
                            <motion.li
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                <a
                                    href={item.href}
                                    className="text-theme-secondary no-underline font-medium hover:text-theme-accent transition-colors duration-300 flex items-center gap-2"
                                >
                                    <item.icon className="text-lg" />
                                    {item.name}
                                </a>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Botones lado derecho */}
                    <div className="flex gap-4 items-center">
                        {/* Carrito */}
                        <motion.button
                            onClick={toggleCart}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 p-0 rounded-full border-2 border-theme-secondary text-theme-secondary bg-transparent hover:bg-theme-secondary hover:text-theme-primary transition-all duration-300 text-xl flex items-center justify-center relative cursor-pointer"
                        >
                            <FaShoppingCart />
                            {getTotalItems() > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-theme-accent text-theme-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                                >
                                    {getTotalItems() > 99 ? '99+' : getTotalItems()}
                                </motion.span>
                            )}
                        </motion.button>

                        {/* Toggle theme */}
                        <motion.button
                            onClick={toggleTheme}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 p-0 rounded-full border-2 border-theme-secondary text-theme-secondary bg-transparent hover:bg-theme-secondary hover:text-theme-primary transition-all duration-300 text-xl flex items-center justify-center cursor-pointer"
                        >
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </motion.button>

                        {/* Auth */}
                        <motion.div className="flex items-center "
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="border-2 border-theme-secondary text-theme-secondary py-2 px-4 rounded-full cursor-pointer transition-all duration-300 font-medium hover:bg-theme-secondary hover:text-theme-primary flex items-center gap-2 curpo">
                                        Iniciar Sesión
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <div className="size-10 flex items-center justify-center rounded-full border-2 border-white">
                                <SignedIn>
                                    <UserButton
                                        appearance={{
                                            elements: {
                                                userButtonAvatarBox: 'w-8 h-8 rounded-full',
                                                userButtonBox: 'rounded-full transition-all duration-300 hover:bg-theme-secondary hover:text-theme-primary cursor-pointer',
                                            },
                                        }}
                                    />
                                </SignedIn>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </nav>
        </motion.div>
    );
}
