import type { PaymentSession } from "../../types/pago";
import { formatearPrecio } from "../../utils/Formateo";
import { AnimatePresence, motion } from "framer-motion";

interface DetallesCompraProps {
    pedido: PaymentSession;
}

export default function DetallesCompra({ pedido }: DetallesCompraProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pedido.id}
                className="bg-theme-primary text-theme-secondary rounded-xl shadow-lg border border-gray-200 overflow-hidden p-4 flex flex-col gap-3"
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="" >Detalles del pedido: </h2>
                <table className="table-auto w-full text-center ">
                    <thead>
                        <tr>
                            <th className="px-3 py-1 bg-white text-theme-accent">Imagen</th>
                            <th className="px-3 py-1 bg-white text-theme-accent">Producto</th>
                            <th className="px-3 py-1 bg-white text-theme-accent">Cantidad</th>
                            <th className="px-3 py-1 bg-white text-theme-accent">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pedido.line_items.map((item) => (
                                <tr key={item.id} >
                                    <td className="px-3 py-3">
                                        <div className="size-12 flex items-center justify-center bg-white mx-auto">
                                            <img src={item.price?.product?.images[0]} alt="producto" className="size-10 object-contain" />

                                        </div>

                                    </td>
                                    <td className="px-3 py-3">{item.description}</td>
                                    <td className="px-3 py-3">{item.quantity}</td>
                                    <td className="px-3 py-3">{formatearPrecio(item.amount_total, item.currency)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </motion.div>
        </AnimatePresence >
    )
}