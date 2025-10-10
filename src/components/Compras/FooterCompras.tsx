import { formatearPrecio } from "@/utils/Formateo";
import { motion } from "framer-motion";
import { useComprasStore } from "../../store/comprasStore";


export default function FooterCompras() {

    const { allPedidos: pedidos } = useComprasStore();
    return (
        <>
            <motion.section className="mt-8 bg-white rounded-xl shadow-lg border border-theme-primary p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * pedidos.length + 0.3 }}
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center md:text-start">Resumen</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{pedidos.length}</div>
                        <div className="text-sm text-gray-500">Total de pedidos</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {pedidos.filter(p => p.status === "enviado").length}
                        </div>
                        <div className="text-sm text-gray-500">Enviados</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {formatearPrecio(pedidos.reduce((sum, p) => sum + Number(p.amount_total), 0), pedidos[0]?.currency || "usd")}
                        </div>
                        <div className="text-sm text-gray-500">Total gastado</div>
                    </div>
                </div>
            </motion.section>
        </>
    )
}