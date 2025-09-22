import { useClerk } from '@clerk/clerk-react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { useUsuario } from '../../hooks/Usuarios/Usuario';
import { comprarProductos } from '../../services/compras';
import { useCartStore } from '../../store/cartStore';
import CarritoVacio from './CarritoVacio';
import FooterCarrito from './FooterCarrito';
import HeaderCarrito from './HeaderCarrtio';
import ProductoCarrito from './ProductoCarrito';

export default function Cart() {
    const { cartItems, isCartOpen, closeCart } = useCartStore();

    const { user } = useUsuario();
    const { openSignIn } = useClerk();

    const handleCheckout = async () => {
        const toastID = toast.loading("Procesando compra...");

        if (!user) {
            openSignIn();
            return;
        }

        if (cartItems.length === 0) return;

        try {
            const userCompra = {
                id: user?.id ?? "",
                email: user?.emailAddresses[0].emailAddress ?? "",
                fullName: user?.fullName ?? "",
            }
            const { data } = await comprarProductos({ user: userCompra, cartItems });
            toast.success("Compra exitosa", { id: toastID });

            setTimeout(() => {
                window.location.href = data;
            }, 500);
        } catch (error) {
            console.error(error);
            toast.error("Hubo un problema con el checkout", { id: toastID });
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Cart Sidebar */}
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-full md:max-w-md bg-theme-secondary shadow-2xl z-50 overflow-y-auto scrollbar-none min-h-screen "
                    >
                        {/* Cart Header */}
                        <HeaderCarrito />

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-3 md:p-6">
                            {cartItems.length === 0 ? (
                                <CarritoVacio />
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <ProductoCarrito key={item.product.id} item={item} index={index} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cart Footer */}
                        {cartItems.length > 0 && (
                            <FooterCarrito handleCheckout={handleCheckout} />
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
