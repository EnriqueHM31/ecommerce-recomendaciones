export interface ProductoB {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    color: string;
    category: string;
    stock: number;
    recommended: boolean;
    variants: string[];
    storage: string[];
    isMainProduct?: boolean
    originalProductId?: product.id


    specs: {
        processor?: string;
        ram?: string;
        display?: string;
        camera?: string;
        color?: string;
        image?: string;
        battery?: string;
        connectivity?: string;
        os?: string;
    };
    configurations: ProductConfiguration[];
}

interface ProductoRaw {
    id: number;
    sku: string;
    precio_base: string;
    stock: number;
    imagen_url: string;
    activo: boolean;
    created_at: string;
    productos_base: {
        id: number;
        nombre: string;
        descripcion: string;
        marca: string;
        activo: boolean;
        categorias: { nombre: string };
    };
    variantes: {
        id: number;
        nombre_variante: string;
        procesador: string;
        display: string;
        camara: string;
        bateria: string;
        conectividad: string | null;
        sistema_operativo: string;
        activa: boolean;
    };
    colores: { nombre: string };
    almacenamientos: { capacidad: string };
    especificaciones_ram: { capacidad: string, tipo: string };
}

export interface RawProduct {
    id: number;
    sku: string;
    precio_base: string;
    stock: number;
    imagen_url: string;
    activo: boolean;
    created_at: string;
    updated_at: string;
    productos_base: {
        id: number;
        nombre: string;
        descripcion: string;
        marca: string;
        activo: boolean;
        categorias: { nombre: string };
    };
    variantes: {
        id: number;
        nombre_variante: string;
        procesador: string;
        display: string;
        camara: string;
        bateria: string;
        conectividad: string | null;
        sistema_operativo: string;
        recomendado: number;
        activa: boolean;
        ram_especificacion?: string; // si existe en la tabla variantes
    };
    colores: { nombre: string };
    almacenamientos: { capacidad: string };
    especificaciones_ram: { capacidad: string };
}


export interface Producto {
    activo: number;
    almacenamiento: string;
    bateria: string;
    camara: string;
    categoria: string;
    color: string;
    conectividad: string;
    created_at: string;
    descripcion: string;
    display: string;
    id: number;
    imagen_url: string;
    marca: string;
    precio_base: number;
    procesador: string;
    producto: string;
    producto_id: number;
    ram_especificacion: string;
    ram_variante: string;
    recomendado: number;
    sistema_operativo: string;
    sku: string;
    stock: number;
    updated_at: string;
}



export interface ProductConfiguration {
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
        camera?: string;
        image?: string;
        color?: string;
        battery?: string;
        connectivity?: string;
        os?: string;
    };
}


export interface CartItem {
    product: Producto;
    quantity: number;
}

export interface CartStore {
    // Products
    products: Producto[]; // Now holds MasterProduct[]
    productFiltrados: Producto[];
    categoriasSeleccionadas: string[];
    productosPlanos: Producto[];
    productosAgrupados: Producto[];
    query: string;

    // Cart
    cartItems: CartItem[];
    isCartOpen: boolean;

    // Actions
    addToCart: (product: Producto) => void;
    removeFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    closeCart: () => void;
    buscarProducto: (query: string) => void;
    fetchProductos: () => Promise<void>;
    filtrarCategoria: ({ categoria, checked }: { categoria: string; checked: boolean }) => void;
    eliminarCategoriaFiltro: (categoria: string) => void;

    // Computed
    getTotalItems: () => number;
    getTotalPrice: () => number;
    getRecommendedProducts: () => Product[];
    getProductById: (id: number) => Product | undefined;
}