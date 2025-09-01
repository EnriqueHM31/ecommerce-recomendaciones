
interface Producto {
    id: number;
    name: string;
    price: number;
    category: string;
    color: string;
    stock: number;
    image: string;
    description: string;
    recommended: boolean;
    variants: string[];
    storage: string[];
    specs: {
        processor?: string;
        ram?: string;
        display?: string;
        camera?: string;
        battery?: string;
        connectivity?: string;
        os?: string;
    };
    configurations: {
        id: string;
        variant: string;
        storage: string;
        ram?: string;
        price: number;
        stock: number;
        specs: {
            processor?: string;
            ram?: string;
            display?: string;
            color?: string;
            image?: string;
            camera?: string;
            battery?: string;
            connectivity?: string;
            os?: string;
        };
    }[];
}

interface ProductosBD {
    producto_id: number;
    producto: string;
    categoria: string;
    precio_base: string;
    imagen: string;
    descripcion: string;
    variante_id: number;
    color: string;
    almacenamiento: string;
    ram_variante: string;
    sistema_operativo: string;
    sku: string;
    stock: number;
    estado_stock: string;
    recomendado: number;
    procesador: string;
    ram_especificacion: string;
    display: string;
    camara: string;
    sistema: string;
    conectividad: string | null;
    bateria: string;
    fecha_creacion: string; // ISO 8601
    fecha_actualizacion: string; // ISO 8601
}

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
                image: p.imagen ?? 'https://img.freepik.com/vector-gratis/cargando-circulos-azul-degradado_78370-2646.jpg?semt=ais_hybrid&w=740&q=80',
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
                image: p.imagen ?? 'https://img.freepik.com/vector-gratis/cargando-circulos-azul-degradado_78370-2646.jpg?semt=ais_hybrid&w=740&q=80',
                camera: p.camara,
                battery: p.bateria,
                connectivity: p.conectividad ?? '',
                os: p.sistema_operativo
            }
        });
    });
    return grouped;
}