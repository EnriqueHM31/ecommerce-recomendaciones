import type { ProductConfiguration } from '../../types/productos';


export default function Configuracion({ selectedConfiguration }: { selectedConfiguration: ProductConfiguration }) {
    return (
        <>
            <div className="space-y-3">
                <h4 className="text-lg font-semibold mb-3 text-theme-primary">Configuración Seleccionada</h4>
                <div className="p-4 rounded-lg border-2 border-theme-accent bg-theme-secondary-light">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{selectedConfiguration.variant}</span>
                        <span className="text-lg font-bold">${selectedConfiguration.price}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                        {selectedConfiguration.storage && (
                            <span className="px-2 py-1 bg-theme-secondary rounded">
                                {selectedConfiguration.storage}
                            </span>
                        )}
                        {selectedConfiguration.ram && (
                            <span className="px-2 py-1 bg-theme-secondary rounded">
                                {selectedConfiguration.ram}
                            </span>
                        )}
                        <span className="px-2 py-1 bg-theme-secondary rounded">
                            Stock: {selectedConfiguration.stock}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}