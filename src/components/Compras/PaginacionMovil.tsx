import { useComprasStore } from "../../store/comprasStore";

export default function PaginacionMovil() {

    const { page, totalPages, prevPage, nextPage } = useComprasStore();

    return (
        <>
            <section className="flex md:hidden items-center justify-center w-full mt-8 mb-2" >
                <span className="text-center bg-theme-accent text-theme-secondary px-4 py-2 rounded-2xl font-bold text-sm">Pagina {page} de {totalPages}  </span>
            </section >
            <div className="flex justify-center items-center gap-5 mt-2 mb-6 md:hidden">
                <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== 1 ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
                >
                    Anterior
                </button>

                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== totalPages ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
                >
                    Siguiente
                </button>
            </div>
        </>
    )
}