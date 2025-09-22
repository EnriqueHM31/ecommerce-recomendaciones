import type { Producto, ProductoRaw } from '../types/productos';



export function mapProductos(productosRaw: ProductoRaw[]): Producto[] {
    return productosRaw.map((p) => ({
        id: p.id,
        producto_id: p.productos_base.id,
        producto: p.productos_base.nombre,
        categoria: p.productos_base.categorias.nombre,
        precio_base: Number(p.precio_base),
        imagen_url: p.imagen_url,
        descripcion: p.productos_base.descripcion,
        marca: p.productos_base.marca,
        sku: p.sku,
        stock: p.stock,
        activo: p.activo ? 1 : 0,
        recomendado: p.variantes.recomendado ? 1 : 0,
        procesador: p.variantes.procesador,
        ram_especificacion: p.variantes.ram_especificacion || p.especificaciones_ram.capacidad,
        ram_variante: p.especificaciones_ram.capacidad,
        display: p.variantes.display,
        camara: p.variantes.camara,
        sistema_operativo: p.variantes.sistema_operativo,
        conectividad: p.variantes.conectividad || "",
        bateria: p.variantes.bateria,
        almacenamiento: p.almacenamientos.capacidad,
        color: p.colores.nombre,
        created_at: p.created_at,
        updated_at: p.updated_at || p.created_at,
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