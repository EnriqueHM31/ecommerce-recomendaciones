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

interface ProductosBD {
    producto_id: number;
    producto: string;
    categoria: string;
    precio_base: string;
    imagen_url: string;
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
    products: Producto[][];
    productFiltrados: Producto[][];
    categoriasSeleccionadas: string[];

    // Cart
    cartItems: CartItem[];
    isCartOpen: boolean;

    // Actions
    addToCart: (product: Producto) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
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