import type { Producto } from '../../types/productos';

interface ConfiguracionProps {
    arrayConfiguraciones: Producto[];
    handleToggle: (product: Producto) => void;
    configuracionSeleccionada: Producto | null;
}

export default function Configuracion({ arrayConfiguraciones, handleToggle, configuracionSeleccionada }: ConfiguracionProps) {

    return (
        <>
            <div className="space-y-3">
                <h4 className="text-lg font-semibold mb-3 text-theme-primary">Configuración Seleccionada</h4>
                {
                    arrayConfiguraciones.map(config => (
                        <div key={config.sku} className={`p-4 rounded-lg border-2 border-theme-accent bg-theme-secondary-light ${config.sku === configuracionSeleccionada?.sku ? 'border-theme-accent bg-theme-primary text-theme-secondary' : 'border-transparent hover:border-theme-accent'} cursor-pointer`}
                            onClick={() => {
                                console.log(config);
                                handleToggle(config)
                            }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{config.sistema_operativo}</span>
                                <span className="text-lg font-bold">${config.precio_base}</span>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <span className="px-2 py-1  rounded">
                                    {config.almacenamiento}
                                </span>
                                <span className="px-2 py-1  rounded">{config.ram_variante}</span>
                                <span className="px-2 py-1  rounded">
                                    {config.ram_especificacion}
                                </span>
                                <span className="px-2 py-1  rounded">
                                    Stock: {config.stock}
                                </span>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}