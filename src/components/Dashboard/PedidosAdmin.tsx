import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCheck, FaEye, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import { useComprasStore } from '../../store/comprasStore';
import type { Pedido } from '../../types/pago';

import { colorEstado, transformarEstado } from '@/utils/formateo';

const PedidosAdmin = () => {
    const { todosPedidosUsuarios, fetchTodosPedidos } = useComprasStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            setIsLoading(true);
            fetchTodosPedidos();
            setIsLoading(false);
        };
        loadOrders();
    }, [fetchTodosPedidos]);

    // Filtrar pedidos
    const filteredOrders = todosPedidosUsuarios.filter(order => {
        const matchesSearch = (order.usuarios.correo).toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === '' || order.estado === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statusOptions = [
        { value: '', label: 'Todos los estados' },
        { value: 'pagado', label: 'Pagado' },
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'cancelado', label: 'Cancelado' },
        { value: 'fallido', label: 'Fallido' }
    ];

    const handleViewOrder = (order: Pedido) => {
        setSelectedOrder(order);
    };

    const handleUpdateStatus = (orderId: string, newStatus: string) => {
        // TODO: Implementar actualización de estado
        console.log('Actualizar estado:', orderId, newStatus);
    };

    const getTotalRevenue = () => {
        return todosPedidosUsuarios
            .filter(order => order.estado === 'pendiente')
            .reduce((sum, order) => sum + order.total, 0);
    };

    const getOrdersByStatus = (status: string) => {
        return todosPedidosUsuarios.filter(order => order.estado === status).length;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-theme-primary mb-2">
                    Gestión de Pedidos
                </h1>
                <p className="text-gray-400">
                    Administra y monitorea todos los pedidos de tu tienda
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                            <p className="text-2xl font-bold text-gray-900">{todosPedidosUsuarios.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                            <FaEye className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Enviados</p>
                            <p className="text-2xl font-bold text-green-600">{getOrdersByStatus('enviado')}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                            <FaCheck className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-600">{getOrdersByStatus('pendiente')}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <FaTimes className="w-6 h-6 text-white" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Ingresos</p>
                            <p className="text-2xl font-bold text-gray-900">${getTotalRevenue().toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">$</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar por email o ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-950 text-theme-secondary2 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-blue-950 text-theme-secondary2 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent appearance-none cursor-pointer"
                        >
                            {statusOptions.map(option => (
                                <option className='cursor-pointer' key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center">
                        <span className="text-sm text-gray-600">
                            Mostrando {filteredOrders.length} de {todosPedidosUsuarios.length} pedidos
                        </span>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando pedidos...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
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
                                {filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {order.usuarios.nombre || order.usuarios.correo || 'Cliente'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.usuarios.correo || 'Sin email'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {new Date(order.fecha_pedido).toLocaleString("es-MX", {
                                                timeZone: "America/Mexico_City",
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit"
                                            })}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${order.total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${colorEstado(order.estado)}`}>
                                                {transformarEstado(order.estado)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleViewOrder(order)}
                                                    className="text-blue-600 hover:text-blue-900 p-1"
                                                >
                                                    <FaEye className="w-4 h-4" />
                                                </motion.button>
                                                {order.estado === 'confirmado' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleUpdateStatus(order.id, 'paid')}
                                                        className="text-green-600 hover:text-green-900 p-1"
                                                    >
                                                        <FaCheck className="w-4 h-4" />
                                                    </motion.button>
                                                )}
                                                {order.estado === 'cancelado' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleUpdateStatus(order.id, 'canceled')}
                                                        className="text-red-600 hover:text-red-900 p-1"
                                                    >
                                                        <FaTimes className="w-4 h-4" />
                                                    </motion.button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">Detalles del Pedido</h3>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">ID del Pedido</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Estado</label>
                                    <span className={` px-2 py-1 text-xs font-medium rounded-full ${colorEstado(selectedOrder.estado)}`}>
                                        <br />
                                        {transformarEstado(selectedOrder.estado)}
                                    </span>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Cliente</label>
                                    <p className="text-sm text-gray-900">{selectedOrder.usuarios.nombre || selectedOrder.usuarios.correo || 'Cliente'}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Total</label>
                                    <p className="text-sm text-gray-900">${selectedOrder.total.toLocaleString()}</p>
                                </div>
                            </div>

                            {selectedOrder?.direcciones && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Dirección</label>
                                    <p className="text-sm text-gray-900">
                                        {selectedOrder.direcciones.direccion_1}, {selectedOrder.direcciones.ciudad}, {selectedOrder.direcciones.pais}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PedidosAdmin;
