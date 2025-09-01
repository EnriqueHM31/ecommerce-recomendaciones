import { FaCheck } from 'react-icons/fa';
import type { ProductConfiguration } from '../../types/productos';



export default function Especificaciones({ selectedConfiguration }: { selectedConfiguration: ProductConfiguration }) {
    return (
        <>
            <div>
                <h4 className="text-lg font-semibold mb-3 text-theme-primary">Especificaciones</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedConfiguration.specs).map(([key, value]) => {

                        if (key === "image") {
                            return null;
                        }
                        return value && value !== "N/A" && value !== "image" ? (
                            <div key={key} className="flex items-center gap-3">
                                <FaCheck className="text-theme-accent text-sm" />
                                <div>
                                    <span className="text-sm text-theme-accent capitalize">
                                        {key.replace(/([A-Z])/g, " $1").trim()}:
                                    </span>
                                    <p className="text-theme-primary font-medium">{value}</p>
                                </div>
                            </div>
                        ) : null
                    })
                    }
                </div>
            </div>
        </>
    )
}