
import type { Producto, ProductosBD } from '../types/productos';

export function AdapterProductos(products: ProductosBD[]) {
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
    return grouped;
}