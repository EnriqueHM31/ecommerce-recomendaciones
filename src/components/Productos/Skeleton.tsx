export default function SkeletonCard() {
    return (
        <div className="w-full md:w-72 bg-[#0f172a] rounded-2xl p-4 shadow-md animate-pulse">
            {/* Imagen */}
            <div className="w-full h-40 bg-gray-700 rounded-xl mb-4"></div>

            {/* Categoría */}
            <div className="h-4 w-20 bg-gray-600 rounded mb-2"></div>

            {/* Título */}
            <div className="h-5 w-32 bg-gray-500 rounded mb-2"></div>

            {/* Descripción */}
            <div className="h-3 w-48 bg-gray-600 rounded mb-1"></div>
            <div className="h-3 w-40 bg-gray-600 rounded mb-3"></div>

            {/* Precio y Stock */}
            <div className="flex justify-between items-center mb-3">
                <div className="h-5 w-16 bg-gray-500 rounded"></div>
                <div className="h-5 w-12 bg-gray-600 rounded"></div>
            </div>

            {/* Colores */}
            <div className="flex space-x-2 mb-4">
                <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
            </div>

            {/* Botón */}
            <div className="h-10 bg-gray-700 rounded-xl"></div>
        </div>
    );
}
