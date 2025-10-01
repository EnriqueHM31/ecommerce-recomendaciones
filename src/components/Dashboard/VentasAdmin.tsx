import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaChartLine, FaDollarSign, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import { useComprasStore } from '../../store/comprasStore';
import type { Producto } from '../../types/productos';
import ReactGA from "react-ga4";
import { useConversion } from '../../hooks/Dashboard/Conversion';

ReactGA.initialize("G-XXXXXXXXXX"); // tu ID de medición

// Registrar vistas de página
ReactGA.send({ hitType: "pageview", page: window.location.pathname });



const VentasAdmin = () => {
    const { todosPedidosUsuarios } = useComprasStore();
    const { productosTop: productosAllTop } = useCartStore();
    const { visitas } = useConversion();

    const [rangoDias, setRangoDias] = useState("30");
    const [datosVentas, setDatosVentas] = useState({
        ingresosTotales: 0,
        totalPedidos: 0,
        valorPromedioPedido: 0,
        tasaConversion: 0,
        productosTop: [] as Producto[],
        ingresosMensuales: [] as { mes: string; ingresos: number }[],
        ventasDiarias: [] as { dia: string; ingresos: number; pedidos: number }[],
    });

    useEffect(() => {
        calcularDatosVentas();
    }, [todosPedidosUsuarios, productosAllTop, rangoDias]);

    const calcularDatosVentas = () => {
        const ahora = new Date();
        const fechaLimite = new Date(
            ahora.getTime() - parseInt(rangoDias) * 24 * 60 * 60 * 1000
        );

        const pedidosConFecha = todosPedidosUsuarios.map((pedido) => ({
            ...pedido,
            fechaObjeto: new Date(pedido.fecha_pedido),
        }));

        const pedidosFiltrados = pedidosConFecha.filter(
            (pedido) => pedido.fechaObjeto >= fechaLimite && pedido.estado === "pendiente"
        );

        const ingresosTotales = pedidosFiltrados.reduce(
            (sum, pedido) => sum + pedido.total,
            0
        );
        const totalPedidos = pedidosFiltrados.length;
        const valorPromedioPedido =
            totalPedidos > 0 ? ingresosTotales / totalPedidos : 0;

        // 👉 usamos directamente los productos top que ya trae el backend
        const productosTop = productosAllTop ?? [];

        // Ingresos mensuales últimos 6 meses
        const ingresosMensuales = Array.from({ length: 6 }, (_, i) => {
            const mes = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
            const siguienteMes = new Date(
                ahora.getFullYear(),
                ahora.getMonth() - i + 1,
                1
            );
            const pedidosMes = pedidosFiltrados.filter(
                (pedido) => pedido.fechaObjeto >= mes && pedido.fechaObjeto < siguienteMes
            );
            const ingresosMes = pedidosMes.reduce((sum, pedido) => sum + pedido.total, 0);
            return {
                mes: mes.toLocaleDateString("es-ES", { month: "short", year: "numeric" }),
                ingresos: ingresosMes,
            };
        }).reverse();

        // Ventas diarias últimos 7 días
        const ventasDiarias = Array.from({ length: 7 }, (_, i) => {
            const dia = new Date(ahora.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
            const siguienteDia = new Date(dia.getTime() + 24 * 60 * 60 * 1000);
            const pedidosDia = pedidosFiltrados.filter(
                (pedido) => pedido.fechaObjeto >= dia && pedido.fechaObjeto < siguienteDia
            );
            const ingresosDia = pedidosDia.reduce((sum, pedido) => sum + pedido.total, 0);
            return {
                dia: dia.toLocaleDateString("es-ES", { weekday: "short" }),
                ingresos: ingresosDia,
                pedidos: pedidosDia.length,
            };
        });

        const tasaConversion = todosPedidosUsuarios.length / visitas * 100;

        setDatosVentas({
            ingresosTotales,
            totalPedidos,
            valorPromedioPedido,
            tasaConversion,
            productosTop,
            ingresosMensuales,
            ventasDiarias,
        });
    };


    const rangosTiempo = [
        { valor: '7', etiqueta: 'Últimos 7 días' },
        { valor: '30', etiqueta: 'Últimos 30 días' },
        { valor: '90', etiqueta: 'Últimos 90 días' },
        { valor: '365', etiqueta: 'Último año' }
    ];

    const tarjetasEstadisticas = [
        {
            titulo: 'Ingresos Totales',
            valor: `$${datosVentas.ingresosTotales.toLocaleString()}`,
            icono: FaDollarSign,
            color: 'bg-green-500',
        },
        {
            titulo: 'Pedidos Totales',
            valor: datosVentas.totalPedidos.toString(),
            icono: FaShoppingCart,
            color: 'bg-blue-500',
        },
        {
            titulo: 'Valor Promedio',
            valor: `$${datosVentas.valorPromedioPedido.toLocaleString()}`,
            icono: FaChartLine,
            color: 'bg-purple-500',
        },
        {
            titulo: 'Tasa de Conversión',
            valor: `${datosVentas.tasaConversion.toFixed(1)}%`,
            icono: FaUsers,
            color: 'bg-orange-500',
        }
    ];


    // Componente para las barras de los charts
    const FilaBarra = ({ etiqueta, valor, max, mostrarPedidos }: { etiqueta: string; valor: number; max: number; mostrarPedidos?: number }) => (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{etiqueta}</span>
            <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-theme-primary h-2 rounded-full" style={{ width: `${Math.min(100, (valor / max) * 100)}%` }}></div>
                </div>
                <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">${valor.toLocaleString()}</div>
                    {mostrarPedidos !== undefined && <div className="text-xs text-gray-500">{mostrarPedidos} pedidos</div>}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-theme-primary mb-2">Análisis de Ventas</h1>
                    <p className="text-gray-600">Métricas y análisis detallado de las ventas de tu tienda</p>
                </div>

                {/* Selector de rango de tiempo */}
                <div className="flex space-x-2">
                    {rangosTiempo.map(rango => (
                        <button
                            key={rango.valor}
                            onClick={() => setRangoDias(rango.valor)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${rangoDias === rango.valor ? 'bg-theme-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {rango.etiqueta}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tarjetasEstadisticas.map((tarjeta, index) => {
                    const Icono = tarjeta.icono;
                    return (
                        <motion.div
                            key={tarjeta.titulo}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{tarjeta.titulo}</p>
                                    <p className="text-2xl font-bold text-gray-900">{tarjeta.valor}</p>
                                </div>
                                <div className={`w-12 h-12 ${tarjeta.color} rounded-lg flex items-center justify-center`}>
                                    <Icono className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ingresos Mensuales */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos Mensuales</h3>
                    <div className="space-y-3">
                        {datosVentas.ingresosMensuales.map(mes =>
                            <FilaBarra key={mes.mes} etiqueta={mes.mes} valor={mes.ingresos} max={Math.max(...datosVentas.ingresosMensuales.map(m => m.ingresos))} />
                        )}
                    </div>
                </motion.div>

                {/* Ventas Diarias */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas Diarias (Últimos 7 días)</h3>
                    <div className="space-y-3">
                        {datosVentas.ventasDiarias.map(dia =>
                            <FilaBarra key={dia.dia} etiqueta={dia.dia} valor={dia.ingresos} max={Math.max(...datosVentas.ventasDiarias.map(d => d.ingresos))} mostrarPedidos={dia.pedidos} />
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Productos Más Vendidos */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos Más Vendidos</h3>
                <div className="space-y-3">
                    {datosVentas.productosTop.map((item: Producto, index: number) => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-theme-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{item.producto}</p>
                                    <p className="text-sm text-gray-500">{item.total_vendido} unidades vendidas</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    ${((item.precio_base ?? 0) * (item.total_vendido ?? 0)).toLocaleString()}
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
