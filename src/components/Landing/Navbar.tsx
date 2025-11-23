import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaShoppingCart,
    FaSun,
    FaMoon,
    FaHome,
    FaBox,
    FaEnvelope,
    FaBars,
    FaTimes,
    FaTachometerAlt,
} from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useThemeStore } from '../../store/themeStore';
import { useUsuario } from '../../hooks/Usuarios/Usuario';
import { AuthCheck } from '../../hooks/Usuarios/AuthUsuario';
import ButtonsAccesso from '../Clerk/ButtonsAccesso';

export default function Navbar() {
    const { theme, toggleTheme } = useThemeStore();
    const { toggleCart, getTotalItems } = useCartStore();
    const { user } = useUsuario();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.div className="sticky top-0 z-50">
            <nav className="bg-[#05395f] py-4 shadow-theme-dark">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -2 }}
                        className="text-theme-secondary flex items-center justify-between w-full md:w-auto z-500"
                    >
                        <h2 className="text-2xl font-bold m-0">StoreTec BPL</h2>

                        {/* Botón hamburguesa en móvil */}
                        <button
                            className="md:hidden text-theme-secondary text-2xl ml-4"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </motion.div>

                    {/* Menú Desktop */}
                    <ul className="hidden md:flex list-none m-0 p-0 gap-8 z-100">
                        {[
                            { icon: FaHome, name: 'Inicio', href: '/' },
                            { icon: FaBox, name: 'Productos', href: '/products' },
                            { icon: FaEnvelope, name: 'Contacto', href: '/contact' },
                        ].map((item, index) => (
                            <motion.li
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <a
                                    href={item.href}
                                    className="text-theme-secondary no-underline font-medium hover:text-theme-accent transition-colors duration-200 flex items-center gap-2"
                                >
                                    <item.icon className="text-lg" />
                                    {item.name}
                                </a>
                            </motion.li>
                        ))}
                        {user && (
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
                        )}
                        {user && (user.publicMetadata?.role === 'Administrador' ||
                            user.emailAddresses[0]?.emailAddress === 'admin@ecommerce.com') && (
                                <motion.li
                                    key="dashboard"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    whileHover={{ y: -2 }}
                                >
                                    <a
                                        href="/dashboard"
                                        className="text-theme-secondary no-underline font-medium hover:text-theme-accent transition-colors duration-300 flex items-center gap-2"
                                    >
                                        <FaTachometerAlt className="text-lg" />
                                        Dashboard
                                    </a>
                                </motion.li>
                            )}
                    </ul>

                    {/* Botones lado derecho (Desktop) */}
                    <div className="hidden md:flex gap-4 items-center">
                        {/* Carrito */}
                        <motion.button
                            onClick={toggleCart}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full border-2 border-theme-secondary text-theme-secondary bg-transparent hover:bg-theme-secondary hover:text-theme-primary transition-all duration-300 text-xl flex items-center justify-center relative cursor-pointer"
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
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 rounded-full border-2 border-theme-secondary text-theme-secondary bg-transparent hover:bg-theme-secondary hover:text-theme-primary transition-all duration-300 text-xl flex items-center justify-center cursor-pointer hover:scale-110"
                        >
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </motion.button>

                        <ButtonsAccesso />

                        <AuthCheck />
                    </div>
                </div>

                {/* Menú Mobile con animaciones */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ y: '-100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-100%', opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="md:hidden flex flex-col gap-6 px-6 py-4 fixed bg-[#05395f] shadow-lg w-full z-0 items-center
                            justify-center"
                        >

                            {/* Segunda sección: links principales */}
                            <motion.ul
                                initial={{ y: -30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="flex flex-col gap-4 justify-center items-center mb-4"
                            >
                                {[
                                    { icon: FaHome, name: 'Inicio', href: '/' },
                                    { icon: FaBox, name: 'Productos', href: '/products' },
                                    { icon: FaEnvelope, name: 'Contacto', href: '/contact' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className="text-theme-secondary font-medium flex items-center gap-2 hover:text-theme-accent"
                                        >
                                            <item.icon />
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                                {user && (
                                    <li>
                                        <a
                                            href="/compras"
                                            className="text-theme-secondary font-medium flex items-center gap-2 hover:text-theme-accent"
                                        >
                                            <FaShoppingCart />
                                            Mis compras
                                        </a>
                                    </li>
                                )}
                            </motion.ul>
                            {/* Primera sección: carrito, theme y login */}
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="flex justify-center items-center  gap-8 w-full "
                            >
                                <button
                                    onClick={toggleCart}
                                    className="relative text-theme-secondary text-xl size-12 flex items-center justify-center rounded-full border-theme-secondary border"
                                >
                                    <FaShoppingCart />
                                    {getTotalItems() > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-theme-accent text-theme-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                            {getTotalItems() > 99 ? '99+' : getTotalItems()}
                                        </span>
                                    )}
                                </button>

                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <button className="border border-theme-secondary text-theme-secondary px-3 py-3 rounded-full text-sm ">
                                            Iniciar Sesión
                                        </button>
                                    </SignInButton>
                                </SignedOut>
                                {user &&
                                    (
                                        <div className="size-12 flex items-center justify-center rounded-full border-2 border-white">
                                            <SignedIn>
                                                <UserButton appearance={{ elements: { userButtonAvatarBox: 'size-12 rounded-full', userButtonBox: 'rounded-full transition-all duration-300 hover:bg-theme-secondary hover:text-theme-primary cursor-pointer', }, }} />
                                            </SignedIn>
                                        </div>
                                    )
                                }

                                <button
                                    onClick={toggleTheme}
                                    className="text-theme-secondary text-xl size-12 flex items-center justify-center rounded-full border border-theme-secondary"
                                >
                                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                                </button>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.div>
    );
}
