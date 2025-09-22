import type { Producto } from '../types/productos';

// ✅ agrupamos por producto + color
export const agruparProductos = (data: Producto[]) => {
    const grupos: Record<string, Producto[]> = data.reduce((acc, item) => {
        const key = `${item.producto}-${item.color}`; // clave única por producto + color

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);
        return acc;
    }, {} as Record<string, Producto[]>);

    // devolvemos como array de arrays
    return Object.values(grupos);
};
