import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { useComprasStore } from '../../store/comprasStore';
import { useCartStore } from '../../store/cartStore';

const VentasAdmin = () => {
    const { allPedidos } = useComprasStore();
    const { products } = useCartStore();
    const [timeRange, setTimeRange] = useState('30'); // días
    const [salesData, setSalesData] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        conversionRate: 0,
        topProducts: [] as any[],
        monthlyRevenue: [] as any[],
        dailySales: [] as any[]
    });

    useEffect(() => {
        calculateSalesData();
    }, [allPedidos, products, timeRange]);

    const calculateSalesData = () => {
        const now = new Date();
        const daysAgo = new Date(now.getTime() - parseInt(timeRange) * 24 * 60 * 60 * 1000);

        // Filtrar pedidos por rango de tiempo
        const filteredOrders = allPedidos.filter(order => {
            const orderDate = new Date(Number(order.created) * 1000);
            return orderDate >= daysAgo;
        });

        // Calcular métricas básicas
        const paidOrders = filteredOrders.filter(order => order.status === 'paid');
        const totalRevenue = paidOrders.reduce((sum, order) => sum + order.amount_total, 0);
        const totalOrders = paidOrders.length;
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Calcular productos más vendidos
        const productSales = new Map();
        paidOrders.forEach(order => {
            order.line_items?.forEach((item: any) => {
                const productName = item.description || 'Producto';
                const quantity = item.quantity || 1;
                const current = productSales.get(productName) || { quantity: 0, revenue: 0 };
                productSales.set(productName, {
                    quantity: current.quantity + quantity,
                    revenue: current.revenue + (item.amount_total || 0)
                });
            });
        });

        const topProducts = Array.from(productSales.entries())
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);

        // Calcular ingresos mensuales (últimos 6 meses)
        const monthlyRevenue = [];
        for (let i = 5; i >= 0; i--) {
            const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const nextMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

            const monthOrders = allPedidos.filter(order => {
                const orderDate = new Date(Number(order.created) * 1000);
                return orderDate >= month && orderDate < nextMonth && order.status === 'paid';
            });

            const monthRevenue = monthOrders.reduce((sum, order) => sum + order.amount_total, 0);
            monthlyRevenue.push({
                month: month.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }),
                revenue: monthRevenue
            });
        }

        // Calcular ventas diarias (últimos 7 días)
        const dailySales = [];
        for (let i = 6; i >= 0; i--) {
            const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const nextDay = new Date(day.getTime() + 24 * 60 * 60 * 1000);

            const dayOrders = allPedidos.filter(order => {
                const orderDate = new Date(Number(order.created) * 1000);
                return orderDate >= day && orderDate < nextDay && order.status === 'paid';
            });

            const dayRevenue = dayOrders.reduce((sum, order) => sum + order.amount_total, 0);
            dailySales.push({
                day: day.toLocaleDateString('es-ES', { weekday: 'short' }),
                revenue: dayRevenue,
                orders: dayOrders.length
            });
        }

        setSalesData({
            totalRevenue,
            totalOrders,
            averageOrderValue,
            conversionRate: 0, // Necesitarías datos de visitantes para calcular esto
            topProducts,
            monthlyRevenue,
            dailySales
        });
    };

    const timeRanges = [
        { value: '7', label: 'Últimos 7 días' },
        { value: '30', label: 'Últimos 30 días' },
        { value: '90', label: 'Últimos 90 días' },
        { value: '365', label: 'Último año' }
    ];

    const statsCards = [
        {
            title: 'Ingresos Totales',
            value: `$${salesData.totalRevenue.toLocaleString()}`,
            icon: FaDollarSign,
            color: 'bg-green-500',
            change: '+12.5%'
        },
        {
            title: 'Pedidos Totales',
            value: salesData.totalOrders.toString(),
            icon: FaShoppingCart,
            color: 'bg-blue-500',
            change: '+8.3%'
        },
        {
            title: 'Valor Promedio',
            value: `$${salesData.averageOrderValue.toLocaleString()}`,
            icon: FaChartLine,
            color: 'bg-purple-500',
            change: '+5.2%'
        },
        {
            title: 'Tasa de Conversión',
            value: `${salesData.conversionRate.toFixed(1)}%`,
            icon: FaUsers,
            color: 'bg-orange-500',
            change: '+2.1%'
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-theme-primary mb-2">
                        Análisis de Ventas
                    </h1>
                    <p className="text-gray-600">
                        Métricas y análisis detallado de las ventas de tu tienda
                    </p>
                </div>

                {/* Time Range Selector */}
                <div className="flex space-x-2">
                    {timeRanges.map(range => (
                        <button
                            key={range.value}
                            onClick={() => setTimeRange(range.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeRange === range.value
                                ? 'bg-theme-primary text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => {
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
                                    <p className="text-sm text-green-600 mt-1">
                                        {stat.change} vs período anterior
                                    </p>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Ingresos Mensuales
                    </h3>
                    <div className="space-y-3">
                        {salesData.monthlyRevenue.map((month) => (
                            <div key={month.month} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{month.month}</span>
                                <div className="flex items-center space-x-3">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-theme-primary h-2 rounded-full"
                                            style={{
                                                width: `${Math.min(100, (month.revenue / Math.max(...salesData.monthlyRevenue.map(m => m.revenue))) * 100)}%`
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-20 text-right">
                                        ${month.revenue.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Daily Sales Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Ventas Diarias (Últimos 7 días)
                    </h3>
                    <div className="space-y-3">
                        {salesData.dailySales.map((day) => (
                            <div key={day.day} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{day.day}</span>
                                <div className="flex items-center space-x-3">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{
                                                width: `${Math.min(100, (day.revenue / Math.max(...salesData.dailySales.map(d => d.revenue))) * 100)}%`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">
                                            ${day.revenue.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {day.orders} pedidos
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Top Products */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Productos Más Vendidos
                </h3>
                <div className="space-y-3">
                    {salesData.topProducts.map((product, index) => (
                        <div key={product.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-theme-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.quantity} unidades vendidas</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    ${product.revenue.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-500">en ingresos</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default VentasAdmin;
