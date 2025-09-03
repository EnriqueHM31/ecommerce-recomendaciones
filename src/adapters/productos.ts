import type { ProductConfiguration, Producto } from '../types/productos';

export function AdapterProductos(products: Producto[]) {
    const grouped: Producto[] = [];

    products.forEach(p => {
        let existing = grouped.find(g => g.id === p.producto_id);
        if (!existing) {
            existing = {
                id: p.id,
                name: p.producto.toLowerCase(),
                price: Number(p.precio_base),
                category: p.categoria,
                image: p.imagen_url === '' ? 'https://img.freepik.com/vector-gratis/cargando-circulos-azul-degradado_78370-2646.jpg?semt=ais_hybrid&w=740&q=80' : p.imagen_url,
                color: p.color,
                description: p.descripcion,
                stock: p.stock,
                recommended: p.recomendado === 1,
                variants: [],
                storage: [],
                specs: {
                    processor: p.procesador,
                    ram: p.ram_especificacion,
                    display: p.display,
                    camera: p.camara,
                    battery: p.bateria,
                    connectivity: p.conectividad ?? '',
                    os: p.sistema_operativo
                },
                configurations: []
            };
            grouped.push(existing);
        }

        // Añadir variante si no existe
        if (!existing.variants.includes(p.producto)) {
            existing.variants.push(p.producto);
        }
        if (!existing.storage.includes(p.almacenamiento)) {
            existing.storage.push(p.almacenamiento);
        }

        existing.configurations.push({
            id: p.sku,
            variant: p.producto,
            storage: p.almacenamiento,
            ram: p.ram_variante,
            price: Number(p.precio_base),
            stock: p.stock,
            specs: {
                processor: p.procesador,
                ram: p.ram_especificacion,
                display: p.display,
                color: p.color,
                image: p.imagen_url === '' ? 'https://img.freepik.com/vector-gratis/cargando-circulos-azul-degradado_78370-2646.jpg?semt=ais_hybrid&w=740&q=80' : p.imagen_url,
                battery: p.bateria,
                connectivity: p.conectividad ?? '',
                os: p.sistema_operativo
            }
        });
    });

    // Expandir productos con variantes
    return products;
}

// Función para expandir cada producto en múltiples productos (uno por cada variante)
function expandProductVariants(groupedProducts: Producto[]): Producto[] {
    const expandedProducts: Producto[] = [];

    groupedProducts.forEach(product => {
        // Si el producto no tiene configuraciones, agregarlo tal como está
        if (!product.configurations || product.configurations.length === 0) {
            expandedProducts.push(product);
            return;
        }

        // Crear producto principal (el original)
        const mainProduct: Producto = {
            ...product,
            isMainProduct: true, // Marcar como producto principal
            originalProductId: product.id
        };
        expandedProducts.push(mainProduct);

        // Crear un producto para cada configuración
        product.configurations.forEach((config, index) => {
            // Crear las configuraciones para este producto variante
            const newConfigurations = [
                // Agregar el producto original como configuración
                {
                    id: product.id,
                    variant: product.name,
                    storage: product.storage.length > 0 ? product.storage[0] : '',
                    ram: product.specs.ram,
                    price: product.price,
                    stock: product.stock,
                    specs: {
                        ...product.specs,
                        color: product.color,
                        image: product.image
                    }
                },
                // Agregar las otras configuraciones (excluyendo la actual)
                ...product.configurations
                    .filter((_, i) => i !== index)
                    .map(otherConfig => ({
                        id: otherConfig.id,
                        variant: otherConfig.variant,
                        storage: otherConfig.storage,
                        ram: otherConfig.ram,
                        price: otherConfig.price,
                        stock: otherConfig.stock,
                        specs: otherConfig.specs
                    }))
            ];

            // Crear el producto variante
            const variantProduct: Producto = {
                ...product as Producto,
                id: Number(config.id), // Usar el SKU como nuevo ID
                name: config.variant, // Usar el nombre de la variante
                price: config.price, // Usar el precio de la variante
                stock: config.stock, // Usar el stock de la variante
                color: config.specs.color ?? "", // Usar el color de la variante
                image: config.specs.image ?? "", // Usar la imagen de la variante
                storage: [config.storage], // Usar el almacenamiento de la variante
                specs: {
                    ...config.specs,
                    ram: config.ram // Usar la RAM de la variante
                },
                configurations: newConfigurations as ProductConfiguration[],
                originalProductId: product.id // Referencia al producto original
            };

            expandedProducts.push(variantProduct);
        });
    });

    return expandedProducts;
}

// Función alternativa si quieres mantener ambos enfoques
export function AdapterProductosOriginal(products: Producto[]) {
    const grouped: Producto[] = [];

    products.forEach(p => {
        let existing = grouped.find(g => g.id === p.producto_id);
        if (!existing) {
            existing = {
                id: p.producto_id,
                name: p.producto,
                price: Number(p.precio_base),
                category: p.categoria,
                image: p.imagen_url === '' ? 'https://img.freepik.com/vector-gratis/cargando-circulos-azul-degradado_78370-2646.jpg?semt=ais_hybrid&w=740&q=80' : p.imagen_url,
                color: p.color,
                description: p.descripcion,
                stock: p.stock,
                recommended: p.recomendado === 1,
                variants: [],
                storage: [],
                specs: {
                    processor: p.procesador,
                    ram: p.ram_especificacion,
                    display: p.display,
                    camera: p.camara,
                    battery: p.bateria,
                    connectivity: p.conectividad ?? '',
                    os: p.sistema_operativo
                },
                configurations: []
            };
            grouped.push(existing);
        }

        if (!existing.variants.includes(p.producto)) {
            existing.variants.push(p.producto);
        }
        if (!existing.storage.includes(p.almacenamiento)) {
            existing.storage.push(p.almacenamiento);
        }

        existing.configurations.push({
            id: p.sku,
            variant: p.producto,
            storage: p.almacenamiento,
            ram: p.ram_variante,
            price: Number(p.precio_base),
            stock: p.stock,
            specs: {
                processor: p.procesador,
                ram: p.ram_especificacion,
                display: p.display,
                color: p.color,
                image: p.imagen_url === '' ? 'https://img.freepik.com/vector-gratis/cargando-circulos-azul-degradado_78370-2646.jpg?semt=ais_hybrid&w=740&q=80' : p.imagen_url,
                battery: p.bateria,
                connectivity: p.conectividad ?? '',
                os: p.sistema_operativo
            }
        });
    });

    return grouped;
}

// Función utilitaria para usar cuando necesites expandir
export function expandProducts(products: Producto[]): Producto[] {
    return expandProductVariants(products);
}