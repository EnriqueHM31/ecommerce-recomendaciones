import { motion } from 'framer-motion';
import {
    FaTachometerAlt,
    FaBox,
    FaTags,
    FaShoppingCart,
    FaChartLine,
    FaSignOutAlt
} from 'react-icons/fa';
import { useClerk } from '@clerk/clerk-react';

interface SidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

const menuItems = [
    {
        id: 'overview',
        label: 'Resumen',
        icon: FaTachometerAlt,
        color: 'text-blue-600'
    },
    {
        id: 'productos',
        label: 'Productos',
        icon: FaBox,
        color: 'text-green-600'
    },
    {
        id: 'categorias',
        label: 'Categorías',
        icon: FaTags,
        color: 'text-purple-600'
    },
    {
        id: 'pedidos',
        label: 'Pedidos',
        icon: FaShoppingCart,
        color: 'text-orange-600'
    },
    {
        id: 'ventas',
        label: 'Ventas',
        icon: FaChartLine,
        color: 'text-red-600'
    }
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
    const { signOut } = useClerk();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 h-screen bg-theme-secondary shadow-lg flex flex-col"
        >
            {/* Logo */}
            <div className="p-6 ">
                <h1 className="text-2xl font-bold text-theme-secondary">
                    Admin Panel
                </h1>
                <p className="text-sm text-gray-500">Ecommerce Dashboard</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <li key={item.id}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => onSectionChange(item.id)}
                                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-blue-700 text-white shadow-md'
                                        : 'text-white hover:bg-gray-600'
                                        }`}
                                >
                                    <Icon
                                        className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : item.color
                                            }`}
                                    />
                                    <span className="font-medium">{item.label}</span>
                                </motion.button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Sign Out */}
            <div className="p-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignOut}
                    className="w-full flex items-center px-4 py-3 rounded-lg bg-red-500 hover:bg-red-400 transition-all duration-200"
                >
                    <FaSignOutAlt className="w-5 h-5 mr-3" />
                    <span className="font-medium">Cerrar Sesión</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
