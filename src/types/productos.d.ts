export interface Producto {
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
    product: Product;
    configuration: ProductConfiguration;
    quantity: number;
}

export interface CartStore {
    // Products
    products: Product[];
    productFiltrados: Product[];
    categoriasSeleccionadas: string[];

    // Cart
    cartItems: CartItem[];
    isCartOpen: boolean;

    // Actions
    addToCart: (product: Product, configuration: ProductConfiguration) => void;
    removeFromCart: (productId: number, configurationId: string) => void;
    increaseQuantity: (productId: number, configurationId: string) => void;
    decreaseQuantity: (productId: number, configurationId: string) => void;
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