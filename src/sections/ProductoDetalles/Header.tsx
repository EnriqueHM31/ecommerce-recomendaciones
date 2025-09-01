import { FaStar } from 'react-icons/fa';
import type { ProductConfiguration, Producto } from '../../types/productos';

export default function Header({ product, selectedConfiguration }: { product: Producto, selectedConfiguration: ProductConfiguration | null }) {
    return (
        <>
            <div>
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm bg-theme-secondary-light text-theme-primary px-3 py-1 rounded-full">
                        {product.category}
                    </span>
                    {product.recommended && (
                        <span className="text-sm bg-theme-accent text-theme-secondary px-3 py-1 rounded-full flex items-center gap-1">
                            <FaStar className="text-xs" />
                            Recomendado
                        </span>
                    )}
                </div>

                <h1 className="text-4xl font-bold text-theme-primary mb-4">
                    {product.name}
                </h1>
                <p className="text-lg text-theme-primary mb-6">{product.description}</p>

                <div className="text-3xl font-bold text-theme-accent mb-6">
                    ${selectedConfiguration?.price || product.price}
                </div>
            </div>
        </>


    )
}