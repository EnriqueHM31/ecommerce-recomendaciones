import { FaCheck } from 'react-icons/fa';
import type { Producto } from '../../types/productos';



export default function Especificaciones({ configuracionSeleccionada }: { configuracionSeleccionada: Producto | undefined }) {

    return (
        <>
            <div>
                <h4 className="text-lg font-semibold mb-3 text-theme-primary">Especificaciones</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Almacenamiento
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.almacenamiento ?? "N/S"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Marca
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.marca ?? "N/S"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Display
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.display ?? "N/S"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Color
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.color ?? "N/S"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Conectividad
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.conectividad === "" || configuracionSeleccionada?.conectividad === null ? "N/S" : configuracionSeleccionada?.conectividad}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Categoria
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.categoria ?? "N/S"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Camara
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.camara ?? "N/S"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaCheck className="text-theme-accent text-sm" />
                        <div>
                            <span className="text-sm text-theme-accent capitalize">
                                Bateria
                            </span>
                            <p className="text-theme-primary font-medium">{configuracionSeleccionada?.bateria ?? "N/S"}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}