import { motion } from 'framer-motion';
import {
    FaBox,
    FaShoppingCart,
    FaDollarSign,
    FaUsers,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import { useComprasStore } from '../../store/comprasStore';
import { useEffect, useState } from 'react';

const Overview = () => {
    const { products, productosTop } = useCartStore();
    const { todosPedidosUsuarios } = useComprasStore();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        revenueGrowth: 0,
        ordersGrowth: 0
    });

    useEffect(() => {

        // Calcular estadísticas
        const totalProducts = products.length;
        const totalOrders = todosPedidosUsuarios.length;
        const totalRevenue = todosPedidosUsuarios.reduce((sum, order) => sum + order.total, 0);
        const uniqueCustomers = new Set(todosPedidosUsuarios.map(order => order.usuarios.correo)).size;

        // Calcular crecimiento (simulado)
        const revenueGrowth = 12.5; // % de crecimiento
        const ordersGrowth = 8.3; // % de crecimiento

        setStats({
            totalProducts,
            totalOrders,
            totalRevenue,
            totalCustomers: uniqueCustomers,
            revenueGrowth,
            ordersGrowth
        });
    }, [todosPedidosUsuarios]);

    const statCards = [
        {
            title: 'Total Productos',
            value: stats.totalProducts,
            icon: FaBox,
            color: 'bg-blue-500',
            change: '+5.2%',
            changeType: 'positive'
        },
        {
            title: 'Pedidos Totales',
            value: stats.totalOrders,
            icon: FaShoppingCart,
            color: 'bg-green-500',
            change: `+${stats.ordersGrowth}%`,
            changeType: 'positive'
        },
        {
            title: 'Ingresos Totales',
            value: `$${stats.totalRevenue.toLocaleString()}`,
            icon: FaDollarSign,
            color: 'bg-yellow-500',
            change: `+${stats.revenueGrowth}%`,
            changeType: 'positive'
        },
        {
            title: 'Clientes Únicos',
            value: stats.totalCustomers,
            icon: FaUsers,
            color: 'bg-purple-500',
            change: '+3.1%',
            changeType: 'positive'
        }
    ];

    console.log({ todosPedidosUsuarios });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-theme-primary  py-3 mb-2">
                    Resumen General
                </h1>
                <p className="text-gray-400">
                    Vista general de tu tienda en línea
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                {stat.changeType === 'positive' ? (
                                    <FaArrowUp className="w-4 h-4 text-green-500 mr-1" />
                                ) : (
                                    <FaArrowDown className="w-4 h-4 text-red-500 mr-1" />
                                )}
                                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Pedidos Recientes
                    </h3>
                    <div className="space-y-3">
                        {todosPedidosUsuarios.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {order.usuarios.correo || 'Cliente'}
                                    </p>
                                    <p className="text-sm text-gray-500">

                                        {order.fecha_pedido}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        ${order.total.toLocaleString()}
                                    </p>
                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${order.estado === 'confirmado'
                                        ? 'bg-green-100 text-green-800'
                                        : order.estado === 'pendiente'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {order.estado === 'confirmado' ? 'Pagado' :
                                            order.estado === 'pendiente' ? 'Pendiente' : 'Cancelado'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Products */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Productos Más Vendidos
                    </h3>
                    <div className="space-y-3">
                        {productosTop.slice(0, 5).map((product) => (
                            <div key={product.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                        <img
                                            src={product.imagen_url}
                                            alt={product.producto}
                                            className="w-8 h-8 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{product.producto}</p>
                                        <p className="text-sm text-gray-500">{product.categoria}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        ${product.precio_base.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Overview;
