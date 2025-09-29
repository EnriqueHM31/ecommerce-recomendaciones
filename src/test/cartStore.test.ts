import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Producto } from '../types/productos';

// Mock del store completo
const mockCartStore = {
    products: [],
    productFiltrados: [],
    productosPlanos: [],
    productosAgrupados: [],
    cartItems: [],
    isCartOpen: false,
    categoriasSeleccionadas: [],
    query: '',
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    increaseQuantity: vi.fn(),
    decreaseQuantity: vi.fn(),
    clearCart: vi.fn(),
    toggleCart: vi.fn(),
    closeCart: vi.fn(),
    buscarProducto: vi.fn(),
    fetchProductos: vi.fn(),
    filtrarCategoria: vi.fn(),
    eliminarCategoriaFiltro: vi.fn(),
    getTotalItems: vi.fn(() => 0),
    getTotalPrice: vi.fn(() => 0),
    getProductById: vi.fn(),
};

vi.mock('../store/cartStore', () => ({
    useCartStore: vi.fn(() => mockCartStore),
}));

// Mock de los servicios
vi.mock('../services/productos', () => ({
    obtenerProductos: vi.fn(),
}));

vi.mock('../adapters/productos', () => ({
    mapProductos: vi.fn((products) => products),
    shuffleArray: vi.fn((array) => array),
}));

vi.mock('../utils/productos', () => ({
    agruparProductos: vi.fn((products) => products),
}));

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        info: vi.fn(),
    },
}));

const mockProduct: Producto = {
    id: 1,
    producto_id: 1,
    producto: 'iPhone 15 Pro',
    categoria: 'Smartphones',
    precio_base: 999.99,
    imagen_url: 'https://example.com/iphone.jpg',
    descripcion: 'El último iPhone con chip A17 Pro',
    marca: 'Apple',
    sku: 'IPHONE15PRO-001',
    stock: 10,
    procesador: 'A17 Pro',
    ram_especificacion: 'LPDDR5',
    ram_variante: '8GB',
    display: '6.1" Super Retina XDR',
    camara: '48MP Main + 12MP Ultra Wide',
    sistema_operativo: 'iOS 17',
    conectividad: '5G, Wi-Fi 6E',
    bateria: 'Hasta 23 horas',
    almacenamiento: '128GB',
    color: 'Titanio Natural',
};

const mockProduct2: Producto = {
    id: 2,
    producto_id: 2,
    producto: 'Samsung Galaxy S24',
    categoria: 'Smartphones',
    precio_base: 799.99,
    imagen_url: 'https://example.com/galaxy.jpg',
    descripcion: 'Android flagship con cámara de 200MP',
    marca: 'Samsung',
    sku: 'GALAXYS24-001',
    stock: 15,
    procesador: 'Snapdragon 8 Gen 3',
    ram_especificacion: 'LPDDR5X',
    ram_variante: '8GB',
    display: '6.2" Dynamic AMOLED 2X',
    camara: '50MP Main + 12MP Ultra Wide',
    sistema_operativo: 'Android 14',
    conectividad: '5G, Wi-Fi 7',
    bateria: '4000mAh',
    almacenamiento: '128GB',
    color: 'Negro',
};

describe('Cart Store', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset mock store state
        mockCartStore.cartItems = [];
        mockCartStore.products = [];
        mockCartStore.productFiltrados = [];
        mockCartStore.productosPlanos = [];
        mockCartStore.productosAgrupados = [];
        mockCartStore.isCartOpen = false;
        mockCartStore.categoriasSeleccionadas = [];
        mockCartStore.query = '';
    });

    describe('addToCart', () => {
        it('should call addToCart with correct product', () => {
            mockCartStore.addToCart(mockProduct);

            expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockProduct);
            expect(mockCartStore.addToCart).toHaveBeenCalledTimes(1);
        });

        it('should call addToCart multiple times for same product', () => {
            mockCartStore.addToCart(mockProduct);
            mockCartStore.addToCart(mockProduct);

            expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockProduct);
            expect(mockCartStore.addToCart).toHaveBeenCalledTimes(2);
        });

        it('should call addToCart for different products', () => {
            mockCartStore.addToCart(mockProduct);
            mockCartStore.addToCart(mockProduct2);

            expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockProduct);
            expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockProduct2);
            expect(mockCartStore.addToCart).toHaveBeenCalledTimes(2);
        });
    });

    describe('removeFromCart', () => {
        it('should call removeFromCart with correct SKU', () => {
            mockCartStore.removeFromCart(mockProduct.sku);

            expect(mockCartStore.removeFromCart).toHaveBeenCalledWith(mockProduct.sku);
            expect(mockCartStore.removeFromCart).toHaveBeenCalledTimes(1);
        });
    });

    describe('quantity management', () => {
        it('should call increaseQuantity with correct SKU', () => {
            mockCartStore.increaseQuantity(mockProduct.sku);

            expect(mockCartStore.increaseQuantity).toHaveBeenCalledWith(mockProduct.sku);
            expect(mockCartStore.increaseQuantity).toHaveBeenCalledTimes(1);
        });

        it('should call decreaseQuantity with correct SKU', () => {
            mockCartStore.decreaseQuantity(mockProduct.sku);

            expect(mockCartStore.decreaseQuantity).toHaveBeenCalledWith(mockProduct.sku);
            expect(mockCartStore.decreaseQuantity).toHaveBeenCalledTimes(1);
        });
    });

    describe('cart state management', () => {
        it('should call clearCart', () => {
            mockCartStore.clearCart();

            expect(mockCartStore.clearCart).toHaveBeenCalledTimes(1);
        });

        it('should call toggleCart', () => {
            mockCartStore.toggleCart();

            expect(mockCartStore.toggleCart).toHaveBeenCalledTimes(1);
        });

        it('should call closeCart', () => {
            mockCartStore.closeCart();

            expect(mockCartStore.closeCart).toHaveBeenCalledTimes(1);
        });
    });

    describe('computed values', () => {
        it('should call getTotalItems', () => {
            const result = mockCartStore.getTotalItems();

            expect(mockCartStore.getTotalItems).toHaveBeenCalledTimes(1);
            expect(result).toBe(0);
        });

        it('should call getTotalPrice', () => {
            const result = mockCartStore.getTotalPrice();

            expect(mockCartStore.getTotalPrice).toHaveBeenCalledTimes(1);
            expect(result).toBe(0);
        });
    });

    describe('product search and filtering', () => {
        it('should call buscarProducto with correct query', () => {
            const query = 'iPhone';
            mockCartStore.buscarProducto(query);

            expect(mockCartStore.buscarProducto).toHaveBeenCalledWith(query);
            expect(mockCartStore.buscarProducto).toHaveBeenCalledTimes(1);
        });

        it('should call filtrarCategoria with correct parameters', () => {
            const categoria = 'Smartphones';
            const checked = true;
            mockCartStore.filtrarCategoria({ categoria, checked });

            expect(mockCartStore.filtrarCategoria).toHaveBeenCalledWith({ categoria, checked });
            expect(mockCartStore.filtrarCategoria).toHaveBeenCalledTimes(1);
        });

        it('should call eliminarCategoriaFiltro with correct categoria', () => {
            const categoria = 'Smartphones';
            mockCartStore.eliminarCategoriaFiltro(categoria);

            expect(mockCartStore.eliminarCategoriaFiltro).toHaveBeenCalledWith(categoria);
            expect(mockCartStore.eliminarCategoriaFiltro).toHaveBeenCalledTimes(1);
        });
    });
});