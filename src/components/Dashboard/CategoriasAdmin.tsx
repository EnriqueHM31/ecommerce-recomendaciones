import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import { useCategoriasStore } from '../../store/categoriasStore';
import { toast } from 'sonner';
import type { Producto } from '../../types/productos';

interface Category {
    id_categoria?: number;
    nombre: string;
    color: string;
    conteo: number;
}

const CategoriasAdmin = () => {
    const { categorias } = useCategoriasStore();
    const { products } = useCartStore();

    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [newCategory, setNewCategory] = useState({ id_categoria: 0, nombre: '' });

    const categoryColors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
        '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6B7280'
    ];

    const getRandomColor = () => categoryColors[Math.floor(Math.random() * categoryColors.length)];

    // Inicializar categorías con colores aleatorios y conteo dinámico
    useEffect(() => {
        const combined: Category[] = categorias.map(cat => {
            const color = getRandomColor();
            const conteo = products.filter(p => p.categoria === cat.nombre).length;

            return {
                id_categoria: cat.id_categoria,
                nombre: cat.nombre,
                color,
                conteo
            };
        });

        setCategories(combined);
    }, [categorias, products]);

    const productosPorCategoria = useMemo(() => {
        const conteo: Record<string, number> = {};
        products.forEach((prod: Producto) => {
            if (prod.categoria) conteo[prod.categoria] = (conteo[prod.categoria] || 0) + 1;
        });
        return conteo;
    }, [products, categorias]);

    const handleAddCategory = async () => {
        if (!newCategory.nombre.trim()) return;

        const toastId = toast.loading("Creando categoría...");
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/categorias`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: newCategory.nombre }),
            });

            if (!response.ok) throw new Error('Error al agregar la categoría');

            const { data } = await response.json();

            const newCat: Category = {
                id_categoria: data[0].id_categoria,
                nombre: newCategory.nombre,
                color: getRandomColor(),
                conteo: 0
            };

            setCategories([...categories, newCat]);
            setNewCategory({ id_categoria: 0, nombre: '' });
            setIsAddingCategory(false);
            toast.success('Categoría creada', { id: toastId });
        } catch (error) {
            toast.error('Error al crear categoría', { id: toastId });
            console.error(error);
        }
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setNewCategory({ id_categoria: category.id_categoria ?? 0, nombre: category.nombre });
    };

    const handleUpdateCategory = async () => {
        if (!editingCategory) return;
        if (newCategory.nombre === editingCategory.nombre) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/categorias`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingCategory.id_categoria, nombre: newCategory.nombre }),
            });

            if (!response.ok) throw new Error('Error al actualizar la categoría');

            const { data } = await response.json();

            const updatedCategories = categories.map(cat =>
                cat.id_categoria === editingCategory.id_categoria
                    ? { ...cat, nombre: data.nombre }
                    : cat
            );

            setCategories(updatedCategories);
            setEditingCategory(null);
            setNewCategory({ id_categoria: 0, nombre: '' });
            toast.success('Categoría actualizada');
        } catch (error) {
            toast.error('Error al actualizar categoría');
            console.error(error);
        }
    };

    const handleDeleteCategory = async (categoryId?: number) => {
        if (!categoryId) return;

        const toastId = toast.loading("Eliminando categoría...");
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/categorias/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: categoryId })
            });

            if (!response.ok) throw new Error('Error al eliminar la categoría');

            setCategories(categories.filter(cat => cat.id_categoria !== categoryId));
            toast.success('Categoría eliminada', { id: toastId });
        } catch (error) {
            toast.error('Error al eliminar categoría', { id: toastId });
            console.error(error);
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-theme-primary mb-2">Gestión de Categorías</h1>
                    <p className="text-gray-600">Organiza tus productos en categorías para mejor navegación</p>
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
                        className="w-full pl-10 pr-4 py-2 border border-blue-950 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent text-theme-secondary2"
                    />
                </div>

                <div className="flex items-center space-x-2 flex-1 justify-center">
                    <span className="text-theme-secondary2 text-sm">
                        Mostrando {filteredCategories.length} de {categories.length} categorías
                    </span>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category, index) => (
                    <motion.div
                        key={index}
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
                                <h3 className="text-lg font-semibold text-gray-900">{category.nombre}</h3>
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
                                    onClick={() => handleDeleteCategory(category.id_categoria)}
                                    className="text-red-600 hover:text-red-900 p-1"
                                >
                                    <FaTrash className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                {productosPorCategoria[category.nombre] || 0} productos
                            </span>
                            <div
                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: category.color }}
                            >
                                {category.nombre}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Add/Edit Category Modal */}
            {(isAddingCategory || editingCategory) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la categoría</label>
                                <input
                                    type="text"
                                    value={newCategory.nombre}
                                    onChange={(e) => setNewCategory({ ...newCategory, nombre: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent text-theme-secondary2"
                                    placeholder="Ej: Smartphones"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    setIsAddingCategory(false);
                                    setEditingCategory(null);
                                    setNewCategory({ id_categoria: 0, nombre: '' });
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
