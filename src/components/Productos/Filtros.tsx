import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useCartStore } from "../../store/cartStore";
import { useCategoriasStore } from "@/store/categoriasStore";


export default function Filtros({ handleCerrarFiltros }: { handleCerrarFiltros: () => void }) {

    const { categoriasSeleccionadas, filtrarCategoria } = useCartStore();
    const { categorias } = useCategoriasStore();
    return (
        <>


            {/* Fondo oscuro */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={handleCerrarFiltros}
                className="fixed inset-0 bg-black z-80"
            />

            {/* Panel lateral */}
            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-80 bg-theme-secondary shadow-lg z-100 p-6 overflow-y-auto flex flex-col justify-center"
            >
                <h2 className="text-2xl font-semibold mt-8">Filtros por categoría</h2>
                <ul className="flex flex-col gap-6 my-8">
                    {categorias.map((cat, index) => (
                        <li key={index}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" value="" onChange={(e) => filtrarCategoria({ categoria: cat.nombre, checked: e.target.checked })} checked={categoriasSeleccionadas.find(c => c === cat.nombre) ? true : false} />
                                    <div
                                        className="group peer bg-white rounded-full duration-300 w-10 h-5 ring-2 ring-gray-500 after:duration-300 after:bg-gray-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-4 after:w-4 after:top-[2px] after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-4 peer-hover:after:scale-95"
                                    ></div>
                                </label>
                                <span>{cat.nombre}</span>
                            </label>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleCerrarFiltros}
                    className="mt-6 p-2 bg-theme-accent text-theme-secondary rounded-full font-medium absolute top-0 right-5 cursor-pointer"
                >
                    <IoClose className="text-2xl font-bold" />
                </button>
            </motion.aside>
        </>
    )
}