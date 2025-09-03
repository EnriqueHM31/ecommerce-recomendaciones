import { AnimatePresence, motion } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import CarritoVacio from '../Carrito/CarritoVacio';
import FooterCarrito from '../Carrito/FooterCarrito';
import HeaderCarrito from '../Carrito/HeaderCarrtio';
import ProductoCarrito from '../Carrito/ProductoCarrito';
import { useUsuario } from '../../hooks/Usuarios/Usuario';
import { useClerk } from '@clerk/clerk-react';

export default function Cart() {
    const {
        cartItems,
        isCartOpen,
        closeCart,
    } = useCartStore();

    const { user } = useUsuario();
    const { openSignIn } = useClerk();

    const handleCheckout = async () => {

        if (!user) {
            openSignIn();
            return;
        }

        if (cartItems.length === 0) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API}/api/compra/checkout-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems,
                    customer: {
                        id: user?.id,
                        email: user?.emailAddresses[0].emailAddress,
                        name: user?.fullName,
                    }
                }),
            });
            const { data } = await res.json();



            if (data) {
                window.location.href = data.url;
            } else {
                alert("Error al crear la sesión de pago");
            }
        } catch (error) {
            console.error(error);
            alert("Hubo un problema con el checkout");
        }
    };

    console.log({ cartItems });

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
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-theme-secondary shadow-2xl z-50 overflow-y-auto scrollbar-none min-h-screen "
                    >
                        {/* Cart Header */}
                        <HeaderCarrito />

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
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
