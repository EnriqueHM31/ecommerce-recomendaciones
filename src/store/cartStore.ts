import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { obtenerProductos } from '../services/productos';
import type { CartStore, Producto } from '../types/productos';
import { agruparProductos } from '../utils/productos';
import { toast } from 'sonner';

/*
// Mock products data
const mockProducts: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999.99,
        image: "📱",
        description: "El último iPhone con chip A17 Pro y cámara de 48MP",
        category: "Smartphones",
        stock: 15,
        recommended: true,
        variants: ["iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 15", "iPhone 15 Plus"],
        storage: ["128GB", "256GB", "512GB", "1TB"],
        specs: {
            processor: "A17 Pro chip",
            ram: "8GB",
            display: "6.1\" Super Retina XDR OLED",
            camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
            battery: "Hasta 23 horas de reproducción de video",
            connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
            os: "iOS 17"
        },
        images: ["📱", "📱", "📱", "📱"],
        configurations: [
            {
                id: "iphone15pro-128-8",
                variant: "iPhone 15 Pro",
                storage: "128GB",
                ram: "8GB",
                price: 999.99,
                stock: 8,
                specs: {
                    processor: "A17 Pro chip",
                    ram: "8GB",
                    display: "6.1\" Super Retina XDR OLED",
                    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
                    battery: "Hasta 23 horas de reproducción de video",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
                    os: "iOS 17"
                }
            },
            {
                id: "iphone15pro-256-8",
                variant: "iPhone 15 Pro",
                storage: "256GB",
                ram: "8GB",
                price: 1099.99,
                stock: 12,
                specs: {
                    processor: "A17 Pro chip",
                    ram: "8GB",
                    display: "6.1\" Super Retina XDR OLED",
                    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
                    battery: "Hasta 23 horas de reproducción de video",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
                    os: "iOS 17"
                }
            },
            {
                id: "iphone15pro-512-8",
                variant: "iPhone 15 Pro",
                storage: "512GB",
                ram: "8GB",
                price: 1299.99,
                stock: 6,
                specs: {
                    processor: "A17 Pro chip",
                    ram: "8GB",
                    display: "6.1\" Super Retina XDR OLED",
                    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
                    battery: "Hasta 23 horas de reproducción de video",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
                    os: "iOS 17"
                }
            },
            {
                id: "iphone15pro-1tb-8",
                variant: "iPhone 15 Pro",
                storage: "1TB",
                ram: "8GB",
                price: 1499.99,
                stock: 4,
                specs: {
                    processor: "A17 Pro chip",
                    ram: "8GB",
                    display: "6.1\" Super Retina XDR OLED",
                    camera: "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
                    battery: "Hasta 23 horas de reproducción de video",
                    connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
                    os: "iOS 17"
                }
            }
        ]
    },
    {
        id: 2,
        name: "MacBook Air M2",
        price: 1199.99,
        image: "💻",
        description: "Laptop ultraligera con chip M2 y hasta 18 horas de batería",
        category: "Laptops",
        stock: 8,
        recommended: true,
        variants: ["MacBook Air M2", "MacBook Air M3", "MacBook Pro M2", "MacBook Pro M3"],
        storage: ["256GB", "512GB", "1TB", "2TB"],
        specs: {
            processor: "Apple M2 chip",
            ram: "8GB/16GB/24GB",
            display: "13.6\" Liquid Retina display",
            camera: "1080p FaceTime HD camera",
            battery: "Hasta 18 horas de batería",
            connectivity: "Wi-Fi 6, Bluetooth 5.0, Thunderbolt 4",
            os: "macOS Ventura"
        },
        images: ["💻", "💻", "💻", "💻"],
        configurations: [
            {
                id: "macbook-air-m2-256-8",
                variant: "MacBook Air M2",
                storage: "256GB",
                ram: "8GB",
                price: 1199.99,
                stock: 3,
                specs: {
                    processor: "Apple M2 chip",
                    ram: "8GB",
                    display: "13.6\" Liquid Retina display",
                    camera: "1080p FaceTime HD camera",
                    battery: "Hasta 18 horas de batería",
                    connectivity: "Wi-Fi 6, Bluetooth 5.0, Thunderbolt 4",
                    os: "macOS Ventura"
                }
            },
            {
                id: "macbook-air-m2-256-16",
                variant: "MacBook Air M2",
                storage: "256GB",
                ram: "16GB",
                price: 1399.99,
                stock: 2,
                specs: {
                    processor: "Apple M2 chip",
                    ram: "16GB",
                    display: "13.6\" Liquid Retina display",
                    camera: "1080p FaceTime HD camera",
                    battery: "Hasta 18 horas de batería",
                    connectivity: "Wi-Fi 6, Bluetooth 5.0, Thunderbolt 4",
                    os: "macOS Ventura"
                }
            },
            {
                id: "macbook-air-m2-512-8",
                variant: "MacBook Air M2",
                storage: "512GB",
                ram: "8GB",
                price: 1399.99,
                stock: 2,
                specs: {
                    processor: "Apple M2 chip",
                    ram: "8GB",
                    display: "13.6\" Liquid Retina display",
                    camera: "1080p FaceTime HD camera",
                    battery: "Hasta 18 horas de batería",
                    connectivity: "Wi-Fi 6, Bluetooth 5.0, Thunderbolt 4",
                    os: "macOS Ventura"
                }
            },
            {
                id: "macbook-air-m2-512-16",
                variant: "MacBook Air M2",
                storage: "512GB",
                ram: "16GB",
                price: 1599.99,
                stock: 1,
                specs: {
                    processor: "Apple M2 chip",
                    ram: "16GB",
                    display: "13.6\" Liquid Retina display",
                    camera: "1080p FaceTime HD camera",
                    battery: "Hasta 18 horas de batería",
                    connectivity: "Wi-Fi 6, Bluetooth 5.0, Thunderbolt 4",
                    os: "macOS Ventura"
                }
            }
        ]
    },
    {
        id: 3,
        name: "AirPods Pro",
        price: 249.99,
        image: "🎧",
        description: "Audífonos inalámbricos con cancelación activa de ruido",
        category: "Audio",
        stock: 25,
        recommended: true,
        variants: ["AirPods Pro", "AirPods Pro 2", "AirPods 3", "AirPods Max"],
        storage: ["N/A"],
        specs: {
            processor: "H2 chip",
            ram: "N/A",
            display: "N/A",
            camera: "N/A",
            battery: "Hasta 6 horas con cancelación activa",
            connectivity: "Bluetooth 5.3, MagSafe charging",
            os: "iOS 16.1+"
        },
        images: ["🎧", "🎧", "🎧", "🎧"],
        configurations: [
            {
                id: "airpods-pro-basic",
                variant: "AirPods Pro",
                storage: "N/A",
                ram: "N/A",
                price: 249.99,
                stock: 25,
                specs: {
                    processor: "H2 chip",
                    ram: "N/A",
                    display: "N/A",
                    camera: "N/A",
                    battery: "Hasta 6 horas con cancelación activa",
                    connectivity: "Bluetooth 5.3, MagSafe charging",
                    os: "iOS 16.1+"
                }
            }
        ]
    },
    {
        id: 4,
        name: "iPad Air",
        price: 599.99,
        image: "📱",
        description: "Tablet versátil con chip M1 y pantalla Liquid Retina",
        category: "Tablets",
        stock: 12,
        recommended: false,
        variants: ["iPad Air", "iPad Air M2", "iPad Pro 11", "iPad Pro 12.9"],
        storage: ["64GB", "128GB", "256GB", "512GB"],
        specs: {
            processor: "Apple M1 chip",
            ram: "8GB",
            display: "10.9\" Liquid Retina display",
            camera: "12MP Wide camera",
            battery: "Hasta 10 horas de navegación web",
            connectivity: "Wi-Fi 6, Bluetooth 5.0, USB-C",
            os: "iPadOS 15"
        },
        images: ["📱", "📱", "📱", "📱"],
        configurations: [
            {
                id: "ipad-air-64-8",
                variant: "iPad Air",
                storage: "64GB",
                ram: "8GB",
                price: 599.99,
                stock: 12,
                specs: {
                    processor: "Apple M1 chip",
                    ram: "8GB",
                    display: "10.9\" Liquid Retina display",
                    camera: "12MP Wide camera",
                    battery: "Hasta 10 horas de navegación web",
                    connectivity: "Wi-Fi 6, Bluetooth 5.0, USB-C",
                    os: "iPadOS 15"
                }
            }
        ]
    },
    {
        id: 5,
        name: "Apple Watch Series 9",
        price: 399.99,
        image: "⌚",
        description: "Smartwatch con monitor cardíaco y GPS integrado",
        category: "Wearables",
        stock: 20,
        recommended: true,
        variants: ["Apple Watch Series 9", "Apple Watch Series 8", "Apple Watch SE", "Apple Watch Ultra"],
        storage: ["32GB"],
        specs: {
            processor: "S9 SiP chip",
            ram: "N/A",
            display: "Always-On Retina display",
            camera: "N/A",
            battery: "Hasta 18 horas de batería",
            connectivity: "GPS, Wi-Fi, Bluetooth 5.3, Cellular",
            os: "watchOS 10"
        },
        images: ["⌚", "⌚", "⌚", "⌚"],
        configurations: [
            {
                id: "apple-watch-32-basic",
                variant: "Apple Watch Series 9",
                storage: "32GB",
                ram: "N/A",
                price: 399.99,
                stock: 20,
                specs: {
                    processor: "S9 SiP chip",
                    ram: "N/A",
                    display: "Always-On Retina display",
                    camera: "N/A",
                    battery: "Hasta 18 horas de batería",
                    connectivity: "GPS, Wi-Fi, Bluetooth 5.3, Cellular",
                    os: "watchOS 10"
                }
            }
        ]
    },
    {
        id: 6,
        name: "Samsung Galaxy S24",
        price: 799.99,
        image: "📱",
        description: "Android flagship con cámara de 200MP y IA avanzada",
        category: "Smartphones",
        stock: 18,
        recommended: true,
        variants: ["Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra", "Galaxy S23", "Galaxy S22"],
        storage: ["128GB", "256GB", "512GB", "1TB"],
        specs: {
            processor: "Snapdragon 8 Gen 3",
            ram: "8GB/12GB",
            display: "6.2\" Dynamic AMOLED 2X",
            camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
            battery: "4000mAh, 25W charging",
            connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
            os: "Android 14, One UI 6.1"
        },
        images: ["📱", "📱", "📱", "📱"],
        configurations: [
            {
                id: "galaxy-s24-128-8",
                variant: "Galaxy S24",
                storage: "128GB",
                ram: "8GB",
                price: 799.99,
                stock: 6,
                specs: {
                    processor: "Snapdragon 8 Gen 3",
                    ram: "8GB",
                    display: "6.2\" Dynamic AMOLED 2X",
                    camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
                    battery: "4000mAh, 25W charging",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
                    os: "Android 14, One UI 6.1"
                }
            },
            {
                id: "galaxy-s24-256-8",
                variant: "Galaxy S24",
                storage: "256GB",
                ram: "8GB",
                price: 899.99,
                stock: 8,
                specs: {
                    processor: "Snapdragon 8 Gen 3",
                    ram: "8GB",
                    display: "6.2\" Dynamic AMOLED 2X",
                    camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
                    battery: "4000mAh, 25W charging",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
                    os: "Android 14, One UI 6.1"
                }
            },
            {
                id: "galaxy-s24-256-12",
                variant: "Galaxy S24",
                storage: "256GB",
                ram: "12GB",
                price: 999.99,
                stock: 3,
                specs: {
                    processor: "Snapdragon 8 Gen 3",
                    ram: "12GB",
                    display: "6.2\" Dynamic AMOLED 2X",
                    camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
                    battery: "4000mAh, 25W charging",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
                    os: "Android 14, One UI 6.1"
                }
            },
            {
                id: "galaxy-s24-512-12",
                variant: "Galaxy S24",
                storage: "512GB",
                ram: "12GB",
                price: 1099.99,
                stock: 1,
                specs: {
                    processor: "Snapdragon 8 Gen 3",
                    ram: "12GB",
                    display: "6.2\" Dynamic AMOLED 2X",
                    camera: "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
                    battery: "4000mAh, 25W charging",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
                    os: "Android 14, One UI 6.1"
                }
            }
        ]
    },
    {
        id: 7,
        name: "Dell XPS 13",
        price: 999.99,
        image: "💻",
        description: "Laptop premium con pantalla InfinityEdge y procesador Intel",
        category: "Laptops",
        stock: 10,
        recommended: false,
        variants: ["Dell XPS 13", "Dell XPS 15", "Dell XPS 17", "Dell Inspiron 15"],
        storage: ["256GB", "512GB", "1TB", "2TB"],
        specs: {
            processor: "Intel Core i7-1250U",
            ram: "16GB/32GB LPDDR5",
            display: "13.4\" 4K OLED Touch",
            camera: "720p HD camera",
            battery: "Hasta 12 horas de batería",
            connectivity: "Wi-Fi 6E, Bluetooth 5.2, Thunderbolt 4",
            os: "Windows 11 Pro"
        },
        images: ["💻", "💻", "💻", "💻"],
        configurations: [
            {
                id: "dell-xps-256-16",
                variant: "Dell XPS 13",
                storage: "256GB",
                ram: "16GB",
                price: 999.99,
                stock: 10,
                specs: {
                    processor: "Intel Core i7-1250U",
                    ram: "16GB LPDDR5",
                    display: "13.4\" 4K OLED Touch",
                    camera: "720p HD camera",
                    battery: "Hasta 12 horas de batería",
                    connectivity: "Wi-Fi 6E, Bluetooth 5.2, Thunderbolt 4",
                    os: "Windows 11 Pro"
                }
            }
        ]
    },
    {
        id: 8,
        name: "Sony WH-1000XM5",
        price: 349.99,
        image: "🎧",
        description: "Audífonos over-ear con la mejor cancelación de ruido",
        category: "Audio",
        stock: 14,
        recommended: false,
        variants: ["WH-1000XM5", "WH-1000XM4", "WH-1000XM3", "WF-1000XM4"],
        storage: ["N/A"],
        specs: {
            processor: "V1 processor",
            ram: "N/A",
            display: "N/A",
            camera: "N/A",
            battery: "Hasta 30 horas con cancelación activa",
            connectivity: "Bluetooth 5.2, NFC, USB-C",
            os: "N/A"
        },
        images: ["🎧", "🎧", "🎧", "🎧"],
        configurations: [
            {
                id: "sony-wh1000xm5-basic",
                variant: "WH-1000XM5",
                storage: "N/A",
                ram: "N/A",
                price: 349.99,
                stock: 14,
                specs: {
                    processor: "V1 processor",
                    ram: "N/A",
                    display: "N/A",
                    camera: "N/A",
                    battery: "Hasta 30 horas con cancelación activa",
                    connectivity: "Bluetooth 5.2, NFC, USB-C",
                    os: "N/A"
                }
            }
        ]
    },
    {
        id: 9,
        name: "Microsoft Surface Pro 9",
        price: 1099.99,
        image: "💻",
        description: "Tablet convertible con Windows 11 y teclado desmontable",
        category: "Tablets",
        stock: 6,
        recommended: false,
        variants: ["Surface Pro 9", "Surface Pro 8", "Surface Pro 7+", "Surface Laptop 5"],
        storage: ["128GB", "256GB", "512GB", "1TB"],
        specs: {
            processor: "Intel Core i5-1235U",
            ram: "8GB/16GB LPDDR5",
            display: "13\" PixelSense Flow display",
            camera: "10MP front-facing, 10MP rear",
            battery: "Hasta 15.5 horas de batería",
            connectivity: "Wi-Fi 6E, Bluetooth 5.1, USB-C",
            os: "Windows 11 Home/Pro"
        },
        images: ["💻", "💻", "💻", "💻"],
        configurations: [
            {
                id: "surface-pro-128-8",
                variant: "Surface Pro 9",
                storage: "128GB",
                ram: "8GB",
                price: 1099.99,
                stock: 6,
                specs: {
                    processor: "Intel Core i5-1235U",
                    ram: "8GB LPDDR5",
                    display: "13\" PixelSense Flow display",
                    camera: "10MP front-facing, 10MP rear",
                    battery: "Hasta 15.5 horas de batería",
                    connectivity: "Wi-Fi 6E, Bluetooth 5.1, USB-C",
                    os: "Windows 11 Home/Pro"
                }
            }
        ]
    },
    {
        id: 10,
        name: "Garmin Fenix 7",
        price: 699.99,
        image: "⌚",
        description: "Reloj deportivo con GPS y monitoreo avanzado de actividad",
        category: "Wearables",
        stock: 9,
        recommended: false,
        variants: ["Fenix 7", "Fenix 7S", "Fenix 7X", "Fenix 6", "Vivoactive 4"],
        storage: ["32GB"],
        specs: {
            processor: "N/A",
            ram: "N/A",
            display: "1.3\" 260x260 transflective MIP",
            camera: "N/A",
            battery: "Hasta 18 días en modo smartwatch",
            connectivity: "GPS, GLONASS, Galileo, Wi-Fi, Bluetooth",
            os: "Garmin OS"
        },
        images: ["⌚", "⌚", "⌚", "⌚"],
        configurations: [
            {
                id: "garmin-fenix-32-basic",
                variant: "Fenix 7",
                storage: "32GB",
                ram: "N/A",
                price: 699.99,
                stock: 9,
                specs: {
                    processor: "N/A",
                    ram: "N/A",
                    display: "1.3\" 260x260 transflective MIP",
                    camera: "N/A",
                    battery: "Hasta 18 días en modo smartwatch",
                    connectivity: "GPS, GLONASS, Galileo, Wi-Fi, Bluetooth",
                    os: "Garmin OS"
                }
            }
        ]
    },
    {
        id: 11,
        name: "Google Pixel 8",
        price: 699.99,
        image: "📱",
        description: "Android puro con cámara Google y IA integrada",
        category: "Smartphones",
        stock: 16,
        recommended: true,
        variants: ["Pixel 8", "Pixel 8 Pro", "Pixel 7", "Pixel 7 Pro", "Pixel 6"],
        storage: ["128GB", "256GB"],
        specs: {
            processor: "Google Tensor G3",
            ram: "8GB LPDDR5X",
            display: "6.2\" OLED, 120Hz",
            camera: "50MP Main + 12MP Ultra Wide",
            battery: "4575mAh, 27W charging",
            connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
            os: "Android 14"
        },
        images: ["📱", "📱", "📱", "📱"],
        configurations: [
            {
                id: "pixel-8-128-8",
                variant: "Pixel 8",
                storage: "128GB",
                ram: "8GB",
                price: 699.99,
                stock: 16,
                specs: {
                    processor: "Google Tensor G3",
                    ram: "8GB LPDDR5X",
                    display: "6.2\" OLED, 120Hz",
                    camera: "50MP Main + 12MP Ultra Wide",
                    battery: "4575mAh, 27W charging",
                    connectivity: "5G, Wi-Fi 7, Bluetooth 5.3",
                    os: "Android 14"
                }
            }
        ]
    },
    {
        id: 12,
        name: "Lenovo ThinkPad X1",
        price: 1499.99,
        image: "💻",
        description: "Laptop empresarial con seguridad avanzada y durabilidad militar",
        category: "Laptops",
        stock: 5,
        recommended: false,
        variants: ["ThinkPad X1 Carbon", "ThinkPad X1 Yoga", "ThinkPad X1 Nano", "ThinkPad T14"],
        storage: ["256GB", "512GB", "1TB", "2TB"],
        specs: {
            processor: "Intel Core i7-1355U",
            ram: "16GB/32GB LPDDR5",
            display: "14\" 2.8K OLED Touch",
            camera: "1080p FHD IR camera",
            battery: "Hasta 13.5 horas de batería",
            connectivity: "Wi-Fi 6E, Bluetooth 5.1, Thunderbolt 4",
            os: "Windows 11 Pro"
        },
        images: ["💻", "💻", "💻", "💻"],
        configurations: [
            {
                id: "thinkpad-x1-256-16",
                variant: "ThinkPad X1 Carbon",
                storage: "256GB",
                ram: "16GB",
                price: 1499.99,
                stock: 5,
                specs: {
                    processor: "Intel Core i7-1355U",
                    ram: "16GB LPDDR5",
                    display: "14\" 2.8K OLED Touch",
                    camera: "1080p FHD IR camera",
                    battery: "Hasta 13.5 horas de batería",
                    connectivity: "Wi-Fi 6E, Bluetooth 5.1, Thunderbolt 4",
                    os: "Windows 11 Pro"
                }
            }
        ]
    }
];
*/
export const useCartStore = create<CartStore>()(

    persist(
        (set, get) => ({
            // Initial state
            products: [],
            productFiltrados: [],
            productosPlanos: [],
            cartItems: [],
            isCartOpen: false,
            categoriasSeleccionadas: [],
            productosAgrupados: [],
            query: "",

            // Actions
            addToCart: (product: Producto) => {
                set((state) => {
                    const existingItem = state.cartItems.find(item =>
                        item.product.id === product.id
                    );

                    if (existingItem) {
                        // If product with same configuration already exists, increase quantity
                        return {
                            cartItems: state.cartItems.map(item =>
                                item.product.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            )
                        };
                    } else {
                        // Add new product configuration to cart
                        return {
                            cartItems: [...state.cartItems, { product, quantity: 1 }]
                        };
                    }
                });
            },

            removeFromCart: (productId: string) => {
                set((state) => ({
                    cartItems: state.cartItems.filter(item =>
                        !(item.product.sku === productId)
                    )
                }));
            },

            increaseQuantity: (productId: string) => {
                set((state) => ({
                    cartItems: state.cartItems.map(item =>
                        item.product.sku === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                }));
            },

            decreaseQuantity: (productId: string) => {
                set((state) => ({
                    cartItems: state.cartItems.map(item =>
                        item.product.sku === productId
                            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                            : item
                    ).filter(item => item.quantity > 0) // Remove items with 0 quantity
                }));
            },

            clearCart: () => {
                set({ cartItems: [] });
            },

            toggleCart: () => {
                set((state) => ({ isCartOpen: !state.isCartOpen }));
            },

            closeCart: () => {
                set({ isCartOpen: false });
            },

            // Computed values
            getTotalItems: () => {
                const state = get();
                return state.cartItems.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                const state = get();
                return state.cartItems.reduce((total, item) => total + (item.product.precio_base * item.quantity), 0);
            },

            getRecommendedProducts: () => {
                const state = get();
                return state.products.flatMap(product => product.filter(p => p.recomendado));
            },

            getProductById: (id: number) => {
                return get().productosPlanos.find(p => p.id === id);
            },

            fetchProductos: async () => {
                const { success, message, data } = await obtenerProductos();

                if (!success) {
                    console.error("Error al cargar productos:", message);
                    return;
                }

                const productosAdaptados = agruparProductos(data)
                const productosPlanos = productosAdaptados.flatMap(product => product);

                const productosAgrupados = productosPlanos.filter((obj, index, self) => index === self.findIndex(o => o.producto === obj.producto));




                set({ products: productosAdaptados, productFiltrados: productosAdaptados.flat(), productosPlanos, productosAgrupados });
            },
            buscarProducto: (query: string) => {
                set({ query }); // guardamos la búsqueda en el estado

                const { productosPlanos, categoriasSeleccionadas } = get();

                const filtrados = productosPlanos.filter(p => {
                    // --- Categorías ---
                    const categoriasSinRecomendados = categoriasSeleccionadas.filter(c => c !== "Recomendados");

                    const filtraCategorias =
                        categoriasSinRecomendados.length === 0
                            ? true
                            : categoriasSinRecomendados.includes(p.categoria);

                    const filtraRecomendados = categoriasSeleccionadas.includes("Recomendados")
                        ? Boolean(p.recomendado)
                        : true;

                    // --- Búsqueda ---
                    const filtraBusqueda = query.trim().length === 0
                        ? true
                        : p.producto.toLowerCase().includes(query.toLowerCase());

                    return filtraCategorias && filtraRecomendados && filtraBusqueda;
                });

                const productosAgrupados = filtrados.filter(
                    (obj, index, self) => index === self.findIndex(o => o.producto === obj.producto)
                );

                set({ productosAgrupados });
            },
            filtrarCategoria: ({ categoria, checked }: { categoria: string; checked: boolean }) => {
                const state = get();
                let nuevasCategorias = [...state.categoriasSeleccionadas];

                if (checked) {
                    nuevasCategorias.push(categoria);
                    toast.success(`Se agregó el filtro: ${categoria}.`);
                } else {
                    nuevasCategorias = nuevasCategorias.filter(c => c !== categoria);
                    toast.info(`Se eliminó el filtro: ${categoria}.`);
                }

                set({ categoriasSeleccionadas: nuevasCategorias });

                const { productosPlanos, query } = get();

                const filtrados = productosPlanos.filter(p => {
                    // --- Categorías ---
                    const categoriasSinRecomendados = nuevasCategorias.filter(c => c !== "Recomendados");

                    const filtraCategorias =
                        categoriasSinRecomendados.length === 0
                            ? true
                            : categoriasSinRecomendados.includes(p.categoria);

                    const filtraRecomendados = nuevasCategorias.includes("Recomendados")
                        ? Boolean(p.recomendado)
                        : true;

                    // --- Búsqueda ---
                    const filtraBusqueda = query.trim().length === 0
                        ? true
                        : p.producto.toLowerCase().includes(query.toLowerCase());

                    return filtraCategorias && filtraRecomendados && filtraBusqueda;
                });

                const productosAgrupados = filtrados.filter(
                    (obj, index, self) => index === self.findIndex(o => o.producto === obj.producto)
                );

                set({ productosAgrupados });
            },


            eliminarCategoriaFiltro: (categoria: string) => {
                const state = get();
                const nuevasCategorias = state.categoriasSeleccionadas.filter(c => c !== categoria);

                set({ categoriasSeleccionadas: nuevasCategorias });

                const { productosPlanos, query } = get();

                const filtrados = productosPlanos.filter(p => {
                    // --- Categorías ---
                    const categoriasSinRecomendados = nuevasCategorias.filter(c => c !== "Recomendados");

                    const filtraCategorias =
                        categoriasSinRecomendados.length === 0
                            ? true
                            : categoriasSinRecomendados.includes(p.categoria);

                    const filtraRecomendados = nuevasCategorias.includes("Recomendados")
                        ? Boolean(p.recomendado)
                        : true;

                    // --- Búsqueda ---
                    const filtraBusqueda = query.trim().length === 0
                        ? true
                        : p.producto.toLowerCase().includes(query.toLowerCase());

                    return filtraCategorias && filtraRecomendados && filtraBusqueda;
                });

                const productosAgrupados = filtrados.filter(
                    (obj, index, self) => index === self.findIndex(o => o.producto === obj.producto)
                );
                toast.success(`Se eliminio el filtro ${categoria}.`);

                set({ productosAgrupados });
            }

        }),

        {
            name: 'cart-storage', // name of the item in localStorage
            partialize: (state) => ({ cartItems: state.cartItems }), // only persist cartItems
        }
    )
);
