import type { CartItem } from "../types/productos";

interface Compras {
    user: {
        id: string;
        email: string;
        fullName: string;
    };
    cartItems: CartItem[];
}

export async function comprarProductos({ user, cartItems }: Compras) {
    const res = await fetch(`${import.meta.env.VITE_API}/api/compra/checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            items: cartItems,
            customer: {
                id: user.id,
                email: user.email,
                name: user.fullName,
            }
        }),
    });
    if (res.ok) {
        return { data: await res.json() };
    } else {
        throw new Error("Error al crear la sesión de pago");
    }
}