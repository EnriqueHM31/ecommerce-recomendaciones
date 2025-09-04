import type { PaymentSession } from "../../types/pago";
import { formatearPrecio } from "../../utils/Formateo";


interface FooterComprasProps {
    pedidos: PaymentSession[];
}
export default function FooterCompras({ pedidos }: FooterComprasProps) {
    return (
        <>
            <section className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{pedidos.length}</div>
                        <div className="text-sm text-gray-500">Total de pedidos</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {pedidos.filter(p => p.status === "paid").length}
                        </div>
                        <div className="text-sm text-gray-500">Completados</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {formatearPrecio(pedidos.reduce((sum, p) => sum + Number(p.amount_total), 0), pedidos[0]?.currency || "usd")}
                        </div>
                        <div className="text-sm text-gray-500">Total gastado</div>
                    </div>
                </div>
            </section>
        </>
    )
}