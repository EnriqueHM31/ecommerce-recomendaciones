import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle, FaFilter, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';
import { useToggle } from '../../hooks/Open/open';
import { useCartStore } from '../../store/cartStore';
import { useTecnicosStore } from '../../store/tecnicosStore';
import type { Producto } from '../../types/productos';
import CrearProductoModal from './FormularioProducto';

const ProductosAdmin = () => {
    const { products, fetchProductos, deleteProductDashboard } = useCartStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { fetchTecnicos } = useTecnicosStore();

    const modalAgregar = useToggle();
    const isOpenAgregar = modalAgregar.isOpen;
    const openAgregar = modalAgregar.open;
    const closeAgregar = modalAgregar.close;

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            await fetchProductos();
            await fetchTecnicos();
            setIsLoading(false);
        };
        loadProducts();
    }, [fetchProductos]);

    // Filtrar productos
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch =
                product.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === '' || product.categoria === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    // Obtener categorías únicas
    const categories = [...new Set(products.map(product => product.categoria))];


    const handleToggleProduct = async (product: Producto) => {

        const toastId = toast.loading('Actualizando...');
        try {
            // 1️⃣ Determinar el método: PATCH en lugar de DELETE, porque solo actualizaremos 'active'
            const response = await fetch(`${import.meta.env.VITE_API}/api/create/productos-sku/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ active: !product.active }), // invertimos el valor de active
            });

            if (!response.ok) {
                toast.error('Error al actualizar el producto', {
                    id: toastId,
                });
                return;
            }

            const { data } = await response.json();
            const { id } = data[0];


            // 2️⃣ Actualizar el estado en el dashboard
            deleteProductDashboard(id); // tu función de Zustand toggleActive

            // 3️⃣ Mensaje según acción
            toast.success(product.active ? 'Producto desactivado' : 'Producto activado', {
                id: toastId,
            });

        } catch (error) {
            console.error('Error al toggle product:', error, {
                id: toastId,
            });
            toast.error('Error al actualizar el producto');
        }
    };


    const handleAddProduct = () => {
        openAgregar();
    };
    const filteredAndSortedProducts = useMemo(() => {
        return [...products]
            .filter(product => {
                const matchesSearch =
                    product.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesCategory =
                    selectedCategory === '' || product.categoria === selectedCategory;

                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => {
                const nameCompare = a.producto.localeCompare(b.producto);
                if (nameCompare !== 0) return nameCompare; // Si los nombres son diferentes
                return a.id - b.id; // Si los nombres son iguales, ordenar por id
            });
    }, [products, searchTerm, selectedCategory]);

    return (
        <div className="space-y-6">
            {
                isOpenAgregar &&
                <CrearProductoModal isOpen={isOpenAgregar} onClose={closeAgregar} />
            }
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-theme-primary mb-2">
                        Gestión de Productos
                    </h1>
                    <p className="text-gray-400">
                        Administra el catálogo de productos de tu tienda
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddProduct}
                    className="bg-theme-primary text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-theme-primary-dark transition-colors"
                >
                    <FaPlus className="w-4 h-4" />
                    <span>Agregar Producto</span>
                </motion.button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-950 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent text-theme-secondary2  "
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-950 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent appearance-none text-theme-secondary2 cursor-pointer"
                        >
                            <option className='cursor-pointer' value="">Todas las categorías</option>
                            {categories.map(category => (
                                <option className='cursor-pointer' key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center">
                        <span className="text-sm text-gray-600">
                            Mostrando {filteredProducts.length} de {products.length} productos
                        </span>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando productos...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Producto
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Categoría
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Precio
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAndSortedProducts.map((product, index) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                                                    <img
                                                        src={product.imagen_url}
                                                        alt={product.producto}
                                                        className="w-10 h-10 object-contain"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.producto}
                                                    </div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">
                                                        {product.descripcion}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                {product.categoria}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${product.precio_base.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${product.stock > 10
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : product.stock > 0
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {product.stock > 10 ? 'En Stock' :
                                                    product.stock > 0 ? 'Stock Bajo' : 'Sin Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${product.active
                                                    ? 'bg-green-100 text-green-800' // Producto activo
                                                    : 'bg-gray-200 text-gray-500'   // Producto inactivo
                                                    }`}
                                            >
                                                {product.active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className=" space-x-2 flex items-center justify-center gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleToggleProduct(product)}
                                                    className=" p-1 cursor-pointer"
                                                >
                                                    {
                                                        product.active ? <FaTrash className="size-6 text-red-600 hover:text-red-900" /> : <FaCheckCircle className="size-6 text-green-600 hover:text-green-900" />
                                                    }

                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div >
    );
};

export default ProductosAdmin;
