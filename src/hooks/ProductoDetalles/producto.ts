import { useParams } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import type { Producto } from "../../types/productos";

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
    };

    const handleClickToggleVariantes = (product: Producto) => {
        console.log("hola", product);
    };

    return {
        product,
        handleAddToCart,
        handleClickToggleVariantes,
    }
}