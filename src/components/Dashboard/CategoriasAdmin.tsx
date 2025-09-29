import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';

interface Category {
    id: string;
    name: string;
    description: string;
    productCount: number;
    color: string;
}

const CategoriasAdmin = () => {
    const { products } = useCartStore();
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        color: '#3B82F6'
    });

    const categoryColors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
    ];

    useEffect(() => {
        // Generar categorías basadas en los productos existentes
        const categoryMap = new Map<string, number>();
        products.forEach(product => {
            const count = categoryMap.get(product.categoria) || 0;
            categoryMap.set(product.categoria, count + 1);
        });

        const generatedCategories: Category[] = Array.from(categoryMap.entries()).map(([name, count], index) => ({
            id: `cat-${index}`,
            name,
            description: `Categoría de ${name.toLowerCase()}`,
            productCount: count,
            color: categoryColors[index % categoryColors.length]
        }));

        setCategories(generatedCategories);
    }, [products]);

    // Filtrar categorías
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddCategory = () => {
        if (newCategory.name.trim()) {
            const category: Category = {
                id: `cat-${Date.now()}`,
                name: newCategory.name,
                description: newCategory.description,
                productCount: 0,
                color: newCategory.color
            };
            setCategories([...categories, category]);
            setNewCategory({ name: '', description: '', color: '#3B82F6' });
            setIsAddingCategory(false);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setNewCategory({
            name: category.name,
            description: category.description,
            color: category.color
        });
    };

    const handleUpdateCategory = () => {
        if (editingCategory && newCategory.name.trim()) {
            setCategories(categories.map(cat =>
                cat.id === editingCategory.id
                    ? { ...cat, ...newCategory }
                    : cat
            ));
            setEditingCategory(null);
            setNewCategory({ name: '', description: '', color: '#3B82F6' });
        }
    };

    const handleDeleteCategory = (categoryId: string) => {
        setCategories(categories.filter(cat => cat.id !== categoryId));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-theme-primary mb-2">
                        Gestión de Categorías
                    </h1>
                    <p className="text-gray-600">
                        Organiza tus productos en categorías para mejor navegación
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddingCategory(true)}
                    className="bg-theme-primary text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-theme-primary-dark transition-colors"
                >
                    <FaPlus className="w-4 h-4" />
                    <span>Agregar Categoría</span>
                </motion.button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between gap-10">
                <div className="relative flex-2">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar categorías..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-blue-950  rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent text-theme-secondary2"
                    />
                </div>

                <div className="flex items-center space-x-2 flex-1 justify-center">
                    <span className='text-theme-secondary2 text-sm'>
                        Mostrando {filteredCategories.length} de {categories.length} categorías
                    </span>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <div
                                    className="w-4 h-4 rounded-full mr-3"
                                    style={{ backgroundColor: category.color }}
                                ></div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {category.name}
                                </h3>
                            </div>
                            <div className="flex space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleEditCategory(category)}
                                    className="text-blue-600 hover:text-blue-900 p-1"
                                >
                                    <FaEdit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleDeleteCategory(category.id)}
                                    className="text-red-600 hover:text-red-900 p-1"
                                >
                                    <FaTrash className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">
                            {category.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                {category.productCount} productos
                            </span>
                            <div
                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: category.color }}
                            >
                                {category.name}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add/Edit Category Modal */}
            {(isAddingCategory || editingCategory) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {editingCategory ? 'Editar Categoría' : 'Agregar Categoría'}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre de la categoría
                                </label>
                                <input
                                    type="text"
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                                    placeholder="Ej: Smartphones"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción
                                </label>
                                <textarea
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                                    rows={3}
                                    placeholder="Descripción de la categoría..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Color
                                </label>
                                <div className="flex space-x-2">
                                    {categoryColors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setNewCategory({ ...newCategory, color })}
                                            className={`w-8 h-8 rounded-full border-2 ${newCategory.color === color ? 'border-gray-900' : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    setIsAddingCategory(false);
                                    setEditingCategory(null);
                                    setNewCategory({ name: '', description: '', color: '#3B82F6' });
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                                className="px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary-dark"
                            >
                                {editingCategory ? 'Actualizar' : 'Agregar'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CategoriasAdmin;
