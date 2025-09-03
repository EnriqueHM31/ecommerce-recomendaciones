import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import type { Producto } from "../../types/productos";

export function useProducto() {
    const { id } = useParams<{ id: string }>();
    const { getProductById, addToCart } = useCartStore();
    const [varianteSeleccionada, setVarianteSeleccionada] = useState<Producto[][]>();

    const product = getProductById(Number(id));

    // 🔹 Al montar, revisamos si hay configuración guardada en localStorage
    useEffect(() => {
        if (product) {
            setVarianteSeleccionada(product);
            const savedConfig = localStorage.getItem(`selectedConfig-${product.id}`);
            if (savedConfig) {
                console.log(JSON.parse(savedConfig));
            }
        }
    }, []);



    if (!varianteSeleccionada) {
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
        console.log(product);
    };

    const productoEscogidoArray = [...product];


    const productoEscogido = productoEscogidoArray[0];



    return {
        productoEscogido,
        handleAddToCart,
        handleClickToggleVariantes,
        productoEscogidoArray
    }
}