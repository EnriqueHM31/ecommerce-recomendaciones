import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import type { Producto } from '../../types/productos';

const ProductosAdmin = () => {
    const { products, fetchProductos } = useCartStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            await fetchProductos();
            setIsLoading(false);
        };
        loadProducts();
    }, [fetchProductos]);

    // Filtrar productos
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || product.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Obtener categorías únicas
    const categories = [...new Set(products.map(product => product.categoria))];

    const handleEditProduct = (product: Producto) => {
        // TODO: Implementar edición de producto
        console.log('Editar producto:', product);
    };

    const handleDeleteProduct = (product: Producto) => {
        // TODO: Implementar eliminación de producto
        console.log('Eliminar producto:', product);
    };

    const handleAddProduct = () => {
        // TODO: Implementar agregar producto
        console.log('Agregar nuevo producto');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-theme-primary mb-2">
                        Gestión de Productos
                    </h1>
                    <p className="text-gray-600">
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
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent appearance-none"
                        >
                            <option value="">Todas las categorías</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
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
                                {filteredProducts.map((product, index) => (
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
                                                ? 'bg-green-100 text-green-800'
                                                : product.stock > 0
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {product.stock > 10 ? 'En Stock' :
                                                    product.stock > 0 ? 'Stock Bajo' : 'Sin Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEditProduct(product)}
                                                    className="text-blue-600 hover:text-blue-900 p-1"
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDeleteProduct(product)}
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                >
                                                    <FaTrash className="w-4 h-4" />
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
        </div>
    );
};

export default ProductosAdmin;
