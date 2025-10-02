import { formatearFechaES, formatearPrecio, formatPrecio } from '@/utils/Formateo';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCreditCard, FaDirections, FaShoppingCart } from 'react-icons/fa';
import type { PaymentSession } from '../../types/pago';
import { containerAnimacion, itemAnimacion } from '../../utils/animaciones';



export default function Factura({ sessionDetails }: { sessionDetails: PaymentSession }) {
    return (
        <>
            <div id="invoice" className="bg-gray-50 rounded-lg md:p-4 mb-6 text-left w-full">
                {/* Header */}

                <motion.div
                    className="mb-6 md:mx-auto bg-green-100 w-full py-2 rounded-2xl justify-center flex items-center flex-col gap-5"
                    variants={itemAnimacion(0.2)}
                >
                    <FaCheckCircle className="w-12 h-12 text-green-600" />
                    <motion.h1
                        className="text-3xl font-bold text-gray-900 mb-2"
                        variants={itemAnimacion(0.3)}
                    >
                        ¡Pago Exitoso!
                    </motion.h1>
                </motion.div>

                <motion.p className="text-gray-600 mb-6" variants={itemAnimacion(0.4)}>
                    Tu transacción se ha procesado correctamente
                </motion.p>

                {/* Detalles de sesión */}
                <motion.div
                    className="bg-gray-50 rounded-lg  text-left flex flex-col gap-2 mb-7"
                    variants={itemAnimacion(0.6)}
                >
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <FaCreditCard className="text-blue-600" />
                        Detalles de la transacción
                    </h3>

                    <section className="text-sm flex flex-col lg:gap-2">
                        <div className="flex md:flex-row flex-col md:items-center gap-1 md:gap-4">
                            <span className="text-gray-600 md:flex-1">Nombre:</span>
                            <span className="font-medium text-black md:flex-4 text-start flex-wrap">{sessionDetails.customer?.name}</span>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-center gap-1 md:gap-4">
                            <span className="text-gray-600 md:flex-1">Email:</span>
                            <span className="font-medium text-black md:flex-4 text-start flex-wrap">{sessionDetails.customer?.email}</span>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-center gap-1 md:gap-4">
                            <span className="text-gray-600 md:flex-1">Monto:</span>
                            <span className="font-medium text-black md:flex-4 text-start">{formatPrecio((sessionDetails.amount_total))}</span>
                        </div>
                        <div className="flex md:flex-row flex-col md:items-center gap-1 md:gap-4">
                            <span className="text-gray-600 md:flex-1">Fecha:</span>
                            <span className="font-medium text-black md:flex-4 text-start">{formatearFechaES(sessionDetails?.created)}</span>
                        </div>
                    </section>
                </motion.div>

                <motion.div
                    className=" rounded-lg text-left flex flex-col gap-2 bg-gray-200"
                    variants={itemAnimacion(0.6)}
                >
                    <section className='flex flex-col gap-2'>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 ">
                            <FaDirections className="text-blue-600" />
                            Detalles de la direccion
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-lg text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">Direccion 1:</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">Direccion 2:</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">Ciudad</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">Estado</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">Código Postal</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">País</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="px-4 py-2 text-black">{sessionDetails.customer?.address?.line1}</td>
                                        <td className="px-4 py-2 text-black">{sessionDetails.customer?.address?.line2}</td>
                                        <td className="px-4 py-2 text-black">{sessionDetails.customer?.address?.city}</td>
                                        <td className="px-4 py-2 text-black">{sessionDetails.customer?.address?.state}</td>
                                        <td className="px-4 py-2 text-black">{sessionDetails.customer?.address?.postal_code}</td>
                                        <td className="px-4 py-2 text-black">{sessionDetails.customer?.address?.country}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>


                    {/* Tabla de productos */}
                    {sessionDetails?.line_items !== undefined && (
                        <motion.div
                            className="mt-4 overflow-x-auto"
                            variants={containerAnimacion(0.7)} // staggerChildren aquí
                            initial="hidden"
                            animate="show"
                        >
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FaShoppingCart className="text-blue-600" />
                                Detalles de la transacción
                            </h3>
                            <table className="min-w-full border border-gray-200 rounded-lg text-sm w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">Image</th>
                                        <th className="px-4 py-2 text-left border-b border-gray-200 bg-blue-950 text-white">Producto</th>
                                        <th className="px-4 py-2 text-center border-b border-gray-200 bg-blue-950 text-white">Cantidad</th>
                                        <th className="px-4 py-2 text-right border-b border-gray-200 bg-blue-950 text-white">Precio Unitario</th>
                                        <th className="px-4 py-2 text-right border-b border-gray-200 bg-blue-950 text-white">Total</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {sessionDetails?.line_items.map((item) => (
                                        <tr key={item.id} className="even:bg-gray-50">
                                            <td className="px-4 py-2 text-black flex items-center justify-center">
                                                <motion.img src={item.price.product?.images[0] || "https://via.placeholder.com/150"} alt="producto" className="size-10 object-contain rounded-lg" />
                                            </td>
                                            <td className="px-4 py-2 text-black">
                                                <motion.div >
                                                    {item.price.product.name}:
                                                    {item.price.product.description}
                                                </motion.div>
                                            </td>
                                            <td className="px-4 py-2 text-center text-black">
                                                <motion.div >{item.quantity}</motion.div>
                                            </td>
                                            <td className="px-4 py-2 text-right text-black">
                                                <motion.div >
                                                    {formatearPrecio(item.price.price, item.currency)}
                                                </motion.div>
                                            </td>
                                            <td className="px-4 py-2 text-right font-medium text-black">
                                                <motion.div >
                                                    {formatearPrecio(item.amount_total, item.currency)}
                                                </motion.div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>

                    )}
                </motion.div>
            </div>
        </>


    )
}