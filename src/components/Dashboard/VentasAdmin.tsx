import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaChartLine, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { useConversion } from '../../hooks/Dashboard/Conversion';
import { useCartStore } from '../../store/cartStore';
import { useComprasStore } from '../../store/comprasStore';
import type { Producto } from '../../types/productos';

const VentasAdmin = () => {
    const { todosPedidosUsuarios } = useComprasStore();
    const { productosTop: productosAllTop } = useCartStore();
    const { visitas } = useConversion();

    const [rangoDias, setRangoDias] = useState("7");
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
        calcularDatosVentas(Number(rangoDias));
    }, [todosPedidosUsuarios, productosAllTop, rangoDias, visitas]);

    const calcularDatosVentas = (rangoDias: number) => {
        const ahora = new Date();
        const zona = "America/Mexico_City";

        // 1️⃣ Fecha límite según rango
        const fechaLimite = new Date(ahora);
        fechaLimite.setDate(fechaLimite.getDate() - rangoDias);
        fechaLimite.setHours(0, 0, 0, 0);

        // 2️⃣ Convertir strings de pedidos a Date
        const parseFechaPedido = (fechaStr: string): Date => {
            const [fechaParte, horaParte] = fechaStr.split(", ");
            const [dia, mes, anio] = fechaParte.split("/").map(Number);

            const data = horaParte
                .split(/[: ]/)
                .filter(Boolean)
                .map(Number);

            let hora = data[0];
            const minuto = data[1];
            const segundo = data[2];

            const isPM = horaParte.toLowerCase().includes("p.m.");
            const isAM = horaParte.toLowerCase().includes("a.m.");
            if (isPM && hora < 12) hora += 12;
            if (isAM && hora === 12) hora = 0;

            return new Date(anio, mes - 1, dia, hora, minuto, segundo);
        };

        const pedidosConFecha = todosPedidosUsuarios.map((pedido) => ({
            ...pedido,
            fechaObjeto: parseFechaPedido(pedido.fecha_pedido),
        }));

        // 3️⃣ Filtrar pedidos dentro del rango y completados
        const estadosPermitidos = ["pendiente", "enviado"];
        const pedidosFiltrados = pedidosConFecha.filter(
            (pedido) =>
                pedido.fechaObjeto >= fechaLimite &&
                estadosPermitidos.includes(pedido.estado)
        );

        // 4️⃣ Datos generales (SOLO pedidos filtrados)
        const ingresosTotales = pedidosFiltrados.reduce(
            (sum, pedido) => sum + pedido.total,
            0
        );
        const totalPedidos = pedidosFiltrados.length;
        const valorPromedioPedido = totalPedidos > 0 ? ingresosTotales / totalPedidos : 0;

        // 5️⃣ Tasa de conversión (SOLO pedidos filtrados)
        const tasaConversion = visitas > 0 ? (totalPedidos / visitas) * 100 : 0;

        // 6️⃣ Productos top FILTRADOS por rango
        const conteoProductos = new Map<string, { producto: { cantidad: number, id: number, precio_unitario: number, producto_id: number, subtotal: number }; cantidad: number; ingresos: number }>();

        console.log({ pedidosFiltrados });
        pedidosFiltrados.forEach(pedido => {
            pedido.pedido_items?.
                forEach((prod: { cantidad: number, id: number, precio_unitario: number, producto_id: number, subtotal: number }) => {
                    const key = `${prod.id}`;
                    const actual = conteoProductos.get(key);

                    if (actual) {
                        actual.cantidad += prod.cantidad || 1;
                        actual.ingresos += (prod.precio_unitario || 0) * (prod.cantidad || 1);
                    } else {
                        conteoProductos.set(key, {
                            producto: prod,
                            cantidad: prod.cantidad || 1,
                            ingresos: (prod.precio_unitario || 0) * (prod.cantidad || 1)
                        });
                    }
                });
        });

        const productosTop = productosAllTop.slice(0, 5);

        // 7️⃣ Ingresos mensuales (dinámico según rango)
        const mesesAMostrar = rangoDias <= 7 ? 3 : rangoDias <= 30 ? 6 : rangoDias <= 90 ? 9 : 12;

        const ingresosMensuales = Array.from({ length: mesesAMostrar }, (_, i) => {
            const mes = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
            mes.setHours(0, 0, 0, 0);
            const siguienteMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 1);

            const pedidosMes = pedidosFiltrados.filter(
                (pedido) =>
                    pedido.fechaObjeto >= mes && pedido.fechaObjeto < siguienteMes
            );

            const ingresosMes = pedidosMes.reduce((sum, pedido) => sum + pedido.total, 0);
            const mesNombre = mes.toLocaleDateString("es-ES", {
                month: "short",
                year: "numeric",
                timeZone: zona,
            });

            return {
                mes: mesNombre,
                ingresos: ingresosMes,
            };
        }).reverse();

        // 8️⃣ Ventas diarias (dinámico según rango)
        const diasAMostrar = rangoDias <= 7 ? 7 : rangoDias <= 30 ? 14 : rangoDias <= 90 ? 30 : 60;

        const ventasDiarias = Array.from({ length: diasAMostrar }, (_, i) => {
            const dia = new Date(ahora);
            dia.setDate(dia.getDate() - (diasAMostrar - 1 - i));
            dia.setHours(0, 0, 0, 0);
            const siguienteDia = new Date(dia);
            siguienteDia.setDate(dia.getDate() + 1);

            const pedidosDia = pedidosFiltrados.filter(
                (pedido) =>
                    pedido.fechaObjeto >= dia && pedido.fechaObjeto < siguienteDia
            );

            const ingresosDia = pedidosDia.reduce((sum, pedido) => sum + pedido.total, 0);

            // Formato de fecha según el rango
            const diaNombre = rangoDias <= 30
                ? dia.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", timeZone: zona })
                : dia.toLocaleDateString("es-ES", { day: "numeric", month: "short", timeZone: zona });

            return {
                dia: diaNombre,
                ingresos: ingresosDia,
                pedidos: pedidosDia.length,
            };
        });

        // 9️⃣ Guardar todo en estado
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
            valor: `$${datosVentas.ingresosTotales.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
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
            valor: `$${datosVentas.valorPromedioPedido.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icono: FaChartLine,
            color: 'bg-purple-500',
        },
    ];

    const FilaBarra = ({ etiqueta, valor, max, mostrarPedidos }: { etiqueta: string; valor: number; max: number; mostrarPedidos?: number }) => (
        <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 min-w-[80px]">{etiqueta}</span>
            <div className="flex items-center space-x-3 flex-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-theme-primary h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (valor / (max || 1)) * 100)}%` }}></div>
                </div>
                <div className="text-right min-w-[100px]">
                    <div className="text-sm font-medium text-gray-900">${valor.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
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
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${rangoDias === rango.valor ? 'bg-theme-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            {rango.etiqueta}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-none">
                        {datosVentas.ingresosMensuales.length > 0 ? (
                            datosVentas.ingresosMensuales.map(mes =>
                                <FilaBarra key={mes.mes} etiqueta={mes.mes} valor={mes.ingresos} max={Math.max(...datosVentas.ingresosMensuales.map(m => m.ingresos), 1)} />
                            )
                        ) : (
                            <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
                        )}
                    </div>
                </motion.div>

                {/* Ventas Diarias */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 scrollbar-none"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ventas Diarias</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-none">
                        {datosVentas.ventasDiarias.length > 0 ? (
                            datosVentas.ventasDiarias.map(dia =>
                                <FilaBarra key={dia.dia} etiqueta={dia.dia} valor={dia.ingresos} max={Math.max(...datosVentas.ventasDiarias.map(d => d.ingresos), 1)} mostrarPedidos={dia.pedidos} />
                            )
                        ) : (
                            <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
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
                    {datosVentas.productosTop.length > 0 ? (
                        datosVentas.productosTop.map((item: Producto, index: number) => (
                            <div key={`${item.id}-${index}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-theme-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {item.producto}
                                            {item.almacenamiento && ` (${item.almacenamiento})`}
                                            {item.ram_variante && ` (${item.ram_variante})`}
                                            {item.ram_especificacion && ` (${item.ram_especificacion})`}
                                        </p>
                                        <p className="text-sm text-gray-500">{item.total_vendido} unidades vendidas</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        ${((item.precio_base ?? 0) * (item.total_vendido ?? 0)).toLocaleString('es-MX')}
                                    </p>
                                    <p className="text-sm text-gray-500">en ingresos</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-8">No hay productos vendidos en este periodo</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default VentasAdmin;