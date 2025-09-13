import { useParams } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import type { Producto } from "../../types/productos";
import { toast } from "sonner";

export function useProducto() {
    const { id } = useParams<{ id: string }>();
    const { getProductById, addToCart } = useCartStore();

    const product = getProductById(Number(id));

    if (!product) {
        return {
            product: null,
            selectedConfiguration: null,
            handleAddToCart: () => { },
            handleClickToggleVariantes: () => { },
        }
    }


    const handleAddToCart = (product: Producto) => {
        addToCart(product);
        toast.success(`Se agregó el producto ${product.producto} ${product.color} al carrito.`);
    };


    return {
        product,
        handleAddToCart,
    }
}