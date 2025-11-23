import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCheck, FaEye, FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import { useComprasStore } from '../../store/comprasStore';
import type { Pedido } from '../../types/pago';

import { colorEstado, transformarEstado } from '@/utils/Formateo';
import { toast } from 'sonner';

const PedidosAdmin = () => {
    const { todosPedidosUsuarios, fetchTodosPedidos, updateStatusPedido } = useComprasStore();
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
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'enviado', label: 'Enviado' },
        { value: 'cancelado', label: 'Cancelado' },
    ];

    const handleViewOrder = (order: Pedido) => {
        setSelectedOrder(order);
    };


    const getTotalRevenue = () => {
        return todosPedidosUsuarios
            .filter(order => order.estado === 'pendiente')
            .reduce((sum, order) => sum + order.total, 0);
    };

    const getOrdersByStatus = (status: string) => {
        return todosPedidosUsuarios.filter(order => order.estado === status).length;
    };

    const handleUpdateEnviado = async (orderId: string) => {

        const toastId = toast.loading('Enviando pedido...');
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/pedidos/status/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nuevo_estado: 'enviado'
                })
            })

            if (!response.ok) {
                toast.error('Error al enviar pedido', { id: toastId });
                throw new Error("Error al enviar pedido");
            }

            const { data } = await response.json();

            const { estado_nuevo, pedido_id } = data;

            updateStatusPedido(pedido_id, estado_nuevo);
            toast.success('Pedido ha sido actualizado', { id: toastId });
            setSelectedOrder(null);
        } catch (err) {
            console.error('Error al enviar pedido', err);
            toast.error('Error al enviar pedido', { id: toastId });
        }
    };


    // Función para convertir string a Date
    function parseFecha(fechaStr: string): Date {
        // Separar la fecha de la hora
        const [fechaParte, horaParte] = fechaStr.split(", ");

        // Separar día, mes, año
        const [dia, mes, anio] = fechaParte.split("/").map(Number);

        // Separar hora, minuto, segundo y a.m./p.m.
        const data = horaParte.split(/[: ]/).map(Number);
        let hora = data[0];
        const minuto = data[1];
        const segundo = data[2];
        const ampm = horaParte.includes("p.m.") ? "PM" : "AM";

        if (ampm === "PM" && hora < 12) hora += 12;
        if (ampm === "AM" && hora === 12) hora = 0;

        return new Date(anio, mes - 1, dia, hora, minuto, segundo);
    }

    const fechasOrdenadas = filteredOrders.sort(
        (a, b) => parseFecha(b.fecha_pedido).getTime() - parseFecha(a.fecha_pedido).getTime()
    );




    return (
        <div className="space-y-6 scrollbar-none">
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
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 scrollbar-none"
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
                            <p className="text-2xl font-bold text-gray-900">${getTotalRevenue().toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
                            Mostrando {fechasOrdenadas.length} de {todosPedidosUsuarios.length} pedidos
                        </span>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Cargando pedidos...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto scrollbar-none  rounded-xl p-2 overflow-visible">
                        <table className="w-full ">
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
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {fechasOrdenadas.map((order, index) => (
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
                                            {order.fecha_pedido}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${order.total.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-3 py-2 text-sm font-medium rounded-full ${colorEstado(order.estado)}`}>
                                                {transformarEstado(order.estado)}
                                            </span>
                                        </td>
                                        <td>
                                            <button onClick={() => handleViewOrder(order)} className="flex items-center  px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 bg-theme-accent text-theme-primary rounded-2xl">
                                                <FaEye className="w-4 h-4 mr-2" />
                                                Ver pedido
                                            </button>
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
                                <div className='flex flex-col'>
                                    <label className="text-sm font-medium text-gray-500">Estado</label>
                                    <p className="text-sm text-gray-900">
                                        {transformarEstado(selectedOrder.estado)}
                                    </p>
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

                        {
                            selectedOrder.estado !== "enviado" && (

                                <div className='mt-4 flex items-center justify-end'>
                                    <button className=' bg-green-600 text-theme-primary rounded-2xl py-3 cursor-pointer px-4 text-sm hover:bg-theme-accent-dark font-bold hover:scale-105 duration-300 transition-transform' onClick={() => handleUpdateEnviado(selectedOrder.id)}>
                                        Marcar como enviado
                                    </button>
                                </div>
                            )
                        }
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PedidosAdmin;
