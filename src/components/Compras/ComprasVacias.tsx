import { FaBox } from "react-icons/fa";
import { useUsuario } from "../../hooks/Usuarios/Usuario";

export default function ComprasVacias() {
    const { user } = useUsuario();
    return (
        <>
            <div className="text-center py-12 min-h-[90vh] flex items-center justify-center flex-col">
                <FaBox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No tienes pedidos aún
                </h3>
                <p className="text-gray-500">
                    Cuando realices tu primera compra, aparecerá aquí.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    Email: {user?.emailAddresses?.[0]?.emailAddress}
                </p>
            </div>
        </>
    )
}