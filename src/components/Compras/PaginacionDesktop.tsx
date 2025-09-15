import { useComprasStore } from "../../store/comprasStore";

export default function PaginacionDesktop() {

    const { page, totalPages, pages, nextPage, prevPage, setPage } = useComprasStore();
    return (
        <div className="hidden justify-center items-center gap-2 mt-8 md:flex">
            <button
                onClick={prevPage}
                disabled={page === 1}
                className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== 1 ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
            >
                Anterior
            </button>


            <section className="hidden md:flex gap-2 items-center">
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 rounded-lg border cursor-pointer ${p === page
                            ? "bg-blue-600 text-white font-bold"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </section>

            <button
                onClick={nextPage}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-lg border bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed ${page !== totalPages ? `hover:bg-blue-700 hover:text-white` : ""} cursor-pointer`}
            >
                Siguiente
            </button>
        </div>

    )
}