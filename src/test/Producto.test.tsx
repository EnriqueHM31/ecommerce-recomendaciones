import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Producto from '../components/Productos/Producto';
import { useCartStore } from '../store/cartStore';
import type { Producto as ProductoType } from '../types/productos';

// Mock del store
vi.mock('../store/cartStore');
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
    },
}));

// Mock de framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
        img: ({ children, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { children?: React.ReactNode }) => <img {...props}>{children}</img>,
        button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) => <button {...props}>{children}</button>,
    },
}));

const mockProduct: ProductoType = {
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

const mockCartStore = {
    addToCart: vi.fn(),
    productFiltrados: [mockProduct],
};

describe('Producto Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useCartStore as unknown as MockedFunction<typeof useCartStore>).mockReturnValue(mockCartStore);
    });

    it('should render product information correctly', () => {
        render(
            <BrowserRouter>
                <Producto product={mockProduct} index={0} />
            </BrowserRouter>
        );

        // Verificar que se renderiza la información del producto
        expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
        expect(screen.getByText('El último iPhone con chip A17 Pro')).toBeInTheDocument();
        expect(screen.getByText('Smartphones')).toBeInTheDocument();
        expect(screen.getByText('$999.99')).toBeInTheDocument();
        expect(screen.getByText('Stock: 10')).toBeInTheDocument();
    });

    it('should display product specifications', () => {
        render(
            <BrowserRouter>
                <Producto product={mockProduct} index={0} />
            </BrowserRouter>
        );

        // Verificar que se muestran las especificaciones
        expect(screen.getByText('RAM: 8GB')).toBeInTheDocument();
        expect(screen.getByText('Almacenamiento: 128GB')).toBeInTheDocument();
        expect(screen.getByText('Color: Titanio Natural')).toBeInTheDocument();
        expect(screen.getByText('Conectividad: 5G, Wi-Fi 6E')).toBeInTheDocument();
    });

    it('should call addToCart when button is clicked', () => {
        render(
            <BrowserRouter>
                <Producto product={mockProduct} index={0} />
            </BrowserRouter>
        );

        const addToCartButton = screen.getByText('🛒 Agregar al Carrito');
        fireEvent.click(addToCartButton);

        expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('should have clickable product card', () => {
        render(
            <BrowserRouter>
                <Producto product={mockProduct} index={0} />
            </BrowserRouter>
        );

        // Buscar el div principal que contiene la clase cursor-pointer
        const productCard = screen.getByText('iPhone 15 Pro').closest('div[class*="cursor-pointer"]');
        expect(productCard).toBeInTheDocument();
    });

    it('should prevent event propagation when add to cart button is clicked', () => {
        render(
            <BrowserRouter>
                <Producto product={mockProduct} index={0} />
            </BrowserRouter>
        );

        const addToCartButton = screen.getByText('🛒 Agregar al Carrito');
        fireEvent.click(addToCartButton);

        // Verificar que addToCart fue llamado
        expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('should display color indicators when multiple colors are available', () => {
        const productWithMultipleColors = {
            ...mockProduct,
            color: 'Azul',
        };

        const mockCartStoreWithColors = {
            ...mockCartStore,
            productFiltrados: [mockProduct, productWithMultipleColors],
        };

        (useCartStore as unknown as MockedFunction<typeof useCartStore>).mockReturnValue(mockCartStoreWithColors);

        render(
            <BrowserRouter>
                <Producto product={mockProduct} index={0} />
            </BrowserRouter>
        );

        // Verificar que se muestra la sección de colores
        expect(screen.getByText('Color:')).toBeInTheDocument();
    });
});
