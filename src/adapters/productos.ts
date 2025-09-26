import type { Producto, ProductoRaw } from '../types/productos';



export function mapProductos(productosRaw: ProductoRaw[]): Producto[] {
    return productosRaw.map((p) => ({
        id: p.id,
        producto_id: p.productos_base?.id ?? 0,
        producto: p.variantes?.nombre_variante ?? "Sin variante",
        categoria: p.productos_base?.categorias?.nombre ?? "Sin categoría",
        precio_base: Number(p.precio_base),
        imagen_url: p.imagen_url ?? "",
        descripcion: p.productos_base?.descripcion ?? "",
        marca: p.productos_base?.marca ?? "Genérico",
        sku: p.sku,
        stock: p.stock,
        activo: p.activo ? 1 : 0,
        recomendado: 0,

        // --- Especificaciones ---
        procesador: p.variantes?.procesador ?? "N/A",
        ram_especificacion: p.especificaciones_ram?.tipo ?? "N/A",
        ram_variante: p.especificaciones_ram?.capacidad ?? "N/A",
        display: p.variantes?.display ?? "N/A",
        camara: p.variantes?.camara ?? "N/A",
        sistema_operativo: p.variantes?.sistema_operativo ?? "N/A",
        conectividad: p.variantes?.conectividad ?? "N/A",
        bateria: p.variantes?.bateria ?? "N/A",
        almacenamiento: p.almacenamientos?.capacidad ?? "N/A",
        color: p.colores?.nombre ?? "Sin color",

        created_at: p.created_at,
        updated_at: "",
    }));
}


export function shuffleArray<T>(array: T[]): T[] {
    const a = [...array]; // clonar para no modificar el original
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}