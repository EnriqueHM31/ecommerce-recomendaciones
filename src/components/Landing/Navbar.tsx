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
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useThemeStore } from '../../store/themeStore';

export default function Navbar() {
    const { theme, toggleTheme } = useThemeStore();
    const { toggleCart, getTotalItems } = useCartStore();

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-theme-primary py-4 sticky top-0 z-50 shadow-theme-dark"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-theme-secondary"
                >
                    <h2 className="text-2xl font-bold m-0">StoreTec BPL</h2>
                </motion.div>

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
                            transition={{ duration: 0.5, delay: index * 0.1 }}
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

                <div className="flex gap-4 items-center">
                    <motion.button
                        onClick={toggleCart}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 p-0 rounded-full border-2 border-theme-secondary text-theme-secondary bg-transparent hover:bg-theme-secondary hover:text-theme-primary transition-all duration-300 text-xl flex items-center justify-center relative"
                    >
                        <FaShoppingCart />
                        {/* Cart Badge */}
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

                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 p-0 rounded-full border-2 border-theme-secondary text-theme-secondary bg-transparent hover:bg-theme-secondary hover:text-theme-primary transition-all duration-300 text-xl flex items-center justify-center"
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </motion.button>

                    <motion.div
                        className='flex items-center'
                    >
                        <SignedOut>
                            <SignInButton mode="modal">

                                <button className="border-2 border-theme-secondary text-theme-secondary py-2 px-4 rounded-full cursor-pointer transition-all duration-300 font-medium hover:bg-theme-secondary hover:text-theme-primary flex items-center gap-2">
                                    Iniciar Sesión
                                </button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: 'w-8 h-8 rounded-full',
                                        userButtonBox: 'border-2 border-white p-1 rounded-full transition-all duration-300 hover:bg-theme-secondary hover:text-theme-primary',
                                    },
                                }}
                            />
                        </SignedIn>
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
}
