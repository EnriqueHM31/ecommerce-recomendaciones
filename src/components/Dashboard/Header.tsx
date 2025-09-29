import { motion } from 'framer-motion';
// Usar el tipo de usuario de Clerk
type User = {
    id: string;
    firstName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
    publicMetadata?: { role?: string };
};
import { FaBell, FaUser } from 'react-icons/fa';

interface HeaderProps {
    user: User;
}

const Header = ({ user }: HeaderProps) => {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
        >
            <div className="flex items-center justify-between">
                {/* Title */}
                <div>
                    <h2 className="text-2xl font-bold text-theme-primary">
                        Panel de Administración
                    </h2>
                    <p className="text-sm text-gray-500">
                        Bienvenido, {user.firstName || user.emailAddresses[0]?.emailAddress}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative p-2 text-gray-600 hover:text-theme-primary transition-colors"
                    >
                        <FaBell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            3
                        </span>
                    </motion.button>

                    {/* User Profile */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2"
                    >
                        <div className="w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center">
                            <FaUser className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">
                                {user.firstName || 'Admin'}
                            </p>
                            <p className="text-gray-500 text-xs">
                                {user.emailAddresses[0]?.emailAddress}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
