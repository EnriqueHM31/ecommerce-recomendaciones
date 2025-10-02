import { FaSyncAlt, FaTimesCircle } from "react-icons/fa";
import { useComprasStore } from "../../store/comprasStore";
import { useUsuario } from "../../hooks/Usuarios/Usuario";


export default function ErrorCompras() {

    const { fetchPedidos, error } = useComprasStore();
    const { user } = useUsuario();
    return (
        <div className="min-h-[90vh] flex items-center justify-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <FaTimesCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Error al cargar pedidos
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => fetchPedidos(user?.id ?? "")}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    <FaSyncAlt className="w-4 h-4 mr-2" />
                    Intentar de nuevo
                </button>
            </div>
        </div>
    )
}