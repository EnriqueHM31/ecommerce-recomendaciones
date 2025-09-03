import { FaCheck } from 'react-icons/fa';
import type { Producto } from '../../types/productos';



export default function Especificaciones({ selectedConfiguration }: { selectedConfiguration: Producto }) {

    return (
        <>
            <div>
                <h4 className="text-lg font-semibold mb-3 text-theme-primary">Especificaciones</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div key={selectedConfiguration.id} className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Almacenamiento
                            </span>
                            <p className="text-theme-primary font-medium">{selectedConfiguration.almacenamiento}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}