import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore, type ProductConfiguration } from "../../store/cartStore";

export function useProducto() {
    const { id } = useParams<{ id: string }>();
    const { getProductById, addToCart } = useCartStore();

    const product = getProductById(Number(id));

    const [selectedConfiguration, setSelectedConfiguration] = useState<ProductConfiguration | null>(null);

    // 🔹 Al montar, revisamos si hay configuración guardada en localStorage
    useEffect(() => {
        if (product) {
            const savedConfig = localStorage.getItem(`selectedConfig-${product.id}`);
            if (savedConfig) {
                setSelectedConfiguration(JSON.parse(savedConfig));
            } else if (product.configurations.length) {
                setSelectedConfiguration(product.configurations[0]);
            }
        }
    }, [product]);

    // 🔹 Cada vez que cambia la config seleccionada, la guardamos en localStorage
    useEffect(() => {
        if (selectedConfiguration && product) {
            localStorage.setItem(`selectedConfig-${product.id}`, JSON.stringify(selectedConfiguration));
        }
    }, [selectedConfiguration, product]);

    if (!product) {
        return {
            product: null,
            selectedConfiguration: null,
            handleAddToCart: () => { },
            handleClickToggleVariantes: () => { },
        }
    }


    const handleAddToCart = () => {
        if (selectedConfiguration) {
            addToCart(product, selectedConfiguration);
        }
    };

    const handleClickToggleVariantes = (config: ProductConfiguration) => {
        setSelectedConfiguration(config)
    };



    return {
        product,
        selectedConfiguration,
        handleAddToCart,
        handleClickToggleVariantes,
    }
}