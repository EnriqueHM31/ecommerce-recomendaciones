import { FaStar } from 'react-icons/fa';
import type { Producto } from '../../types/productos';

export default function Header({ product }: { product: Producto }) {
    return (
        <>
            <div>
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3">
                    <span className="text-sm bg-theme-accent text-theme-secondary px-3 py-1 rounded-full flex items-center gap-1">
                        Categoria: {product.categoria}
                    </span>
                    {product.recomendado ? (
                        <span className="text-sm bg-theme-accent text-theme-secondary px-3 py-1 rounded-full flex items-center gap-1">
                            <FaStar className="text-xs" />
                            Recomendado
                        </span>
                    ) : null}
                </div>

                <h1 className="text-4xl font-bold text-theme-primary mb-4">
                    {product.producto}
                </h1>
                <p className="text-lg text-theme-primary mb-6">{product.descripcion}</p>

                <div className="text-3xl font-bold text-theme-accent mb-6">
                    ${product.precio_base}
                </div>
            </div>
        </>


    )
}