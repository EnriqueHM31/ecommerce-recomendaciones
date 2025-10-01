import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import { useCategoriasStore } from "../../store/categoriasStore";
import { useTecnicosStore } from "../../store/tecnicosStore";
import { formatPrecio, isValidUrl } from "@/utils/Formateo";
import { useCartStore } from "../../store/cartStore";
import { mapProductos } from "../../adapters/productos";

// Interfaces
interface ProductoBase { id: number; nombre: string, categoria_id: number; }
interface Variante { id: number; nombre_variante: string; producto_base_id: number; }
interface Color { id: number; nombre: string; }
interface Almacenamiento { id: number; capacidad: string; tipo: string; }
interface RAM { id: number; capacidad: string; tipo: string; }

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    categoriaId: number | null;
    productoBaseId: number | null;
    varianteId: number | null;
    colorId: number | null;
    almacenamientoId: number | null;
    ramId: number | null;
    sku: string;
    precio: number;
    stock: number;
    imagenUrl: string;
}

export default function CrearProductoModal({ isOpen, onClose }: ModalProps) {
    // Estado único para todo el formulario
    const { tecnicos } = useTecnicosStore();
    const [formData, setFormData] = useState<FormData>({
        categoriaId: null,
        productoBaseId: null,
        varianteId: null,
        colorId: null,
        almacenamientoId: null,
        ramId: null,
        sku: "",
        precio: 0,
        stock: 0,
        imagenUrl: "",
    });

    const { categorias: categoriasStore } = useCategoriasStore();
    const { addProductDashboard } = useCartStore();

    const [productosBase, setProductosBase] = useState<ProductoBase[]>([]);
    const [variantes, setVariantes] = useState<Variante[]>([]);
    const [colores, setColores] = useState<Color[]>([]);
    const [almacenamientos, setAlmacenamientos] = useState<Almacenamiento[]>([]);
    const [ramOptions, setRamOptions] = useState<RAM[]>([]);

    // Simulación de carga de datos (reemplazar con tu API)

    useEffect(() => {
        if (!tecnicos) return;

        const productosBase = tecnicos.dataProductosBase.map(p => ({ id: p.id, nombre: p.nombre, categoria_id: p.categoria_id }));
        const variantes = tecnicos.dataVariantes.map(v => ({ id: v.id, nombre_variante: v.nombre_variante, producto_base_id: v.producto_base_id }));
        const colores = tecnicos.dataColores.map(c => ({ id: c.id, nombre: c.nombre }));
        const almacenamientos = tecnicos.dataAlmacenamientos.map(a => ({ id: a.id, capacidad: a.capacidad, tipo: a.tipo }));
        const ramOptions = tecnicos.dataRams.map(r => ({ id: r.id, capacidad: r.capacidad, tipo: r.tipo }));

        setProductosBase(productosBase);
        setVariantes(variantes);
        setColores(colores);
        setAlmacenamientos(almacenamientos);
        setRamOptions(ramOptions);

    }, [tecnicos, categoriasStore]);



    useEffect(() => {
        const variante = variantes.find(v => v.id === formData.varianteId);
        const almacenamiento = almacenamientos.find(a => a.id === formData.almacenamientoId);
        const color = colores.find(c => c.id === formData.colorId);
        const ram = ramOptions.find(r => r.id === formData.ramId);

        let sku = "";

        if (formData.productoBaseId === 10) {
            // 🔹 Si el producto base es 10 → SKU = Variante + Color
            if (variante && color) {
                sku = `${variante.nombre_variante}-${color.nombre}`.replace(/\s/g, '');
            }
        } else {
            // 🔹 Caso general → Variante + Almacenamiento + Color + RAM
            if (variante && almacenamiento && color && ram) {
                sku = `${variante.nombre_variante}-${almacenamiento.capacidad}-${color.nombre}-${ram.capacidad}`.replace(/\s/g, '');
            }
        }

        if (sku) {
            setFormData(prev => ({ ...prev, sku }));
        }
    }, [
        formData.varianteId,
        formData.almacenamientoId,
        formData.colorId,
        formData.ramId,
        formData.productoBaseId
    ]);



    const handleChange = (field: keyof FormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        // Validación mínima
        if (!formData.productoBaseId || !formData.precio || !formData.sku) {
            toast.error("Completa los campos obligatorios");
            return;
        }

        if (formData.imagenUrl && !isValidUrl(formData.imagenUrl)) {
            toast.error("La URL de la imagen no es válida");
            return;
        }

        if (formData.almacenamientoId === 0 && formData.productoBaseId !== 10) {
            toast.error("Debes seleccionar almacenamiento");
            return;
        }

        if (formData.ramId === 0 && formData.productoBaseId !== 10) {
            toast.error("Debes seleccionar RAM");
            return;
        }

        // Construir el body del POST según tu API
        const body = {
            producto_base_id: formData.productoBaseId,
            variante_id: formData.varianteId,
            color_id: formData.colorId,
            almacenamiento_id: formData.almacenamientoId === 0 ? null : formData.almacenamientoId,
            ram_id: formData.ramId === 0 ? null : formData.ramId,
            sku: formData.sku,
            precio: formatPrecio(formData.precio),
            stock: formData.stock,
            imagen_url: formData.imagenUrl,
        };


        try {
            const res = await fetch(`${import.meta.env.VITE_API}/api/create/productos-sku`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Error al crear el producto");

            const { data } = await res.json();
            const newProduct = mapProductos([data])[0];
            addProductDashboard(newProduct);
            toast.success("Producto creado exitosamente");
            onClose();
            // Si quieres, puedes hacer algo con la respuesta
        } catch (error) {
            console.error(error);
            toast.error(error as string || "Error al crear el producto");
        }
    };

    if (!isOpen) return null;

    const variantesFiltradas = formData.productoBaseId
        ? variantes.filter(v => v.producto_base_id === formData.productoBaseId)
        : [];


    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 h-screen">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white text-theme-secondary2 p-6 rounded-lg w-full max-w-2xl relative"
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                <h2 className="text-xl font-bold mb-4">Crear Producto</h2>

                <div className="grid grid-cols-2 gap-4">


                    <div>
                        <label className="block text-sm font-medium">Producto Base</label>
                        <select
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.productoBaseId ?? ""}
                            onChange={(e) => handleChange("productoBaseId", Number(e.target.value))}
                        >
                            <option value="">Selecciona producto</option>
                            {productosBase.map(p => (
                                <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Variante</label>
                        <select
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.varianteId ?? ""}
                            onChange={(e) => handleChange("varianteId", Number(e.target.value))}
                            disabled={!formData.productoBaseId} // desactivar si no hay producto base
                        >
                            {!formData.productoBaseId ? (
                                <option value="">Elige primero el producto base</option>
                            ) : (
                                <>
                                    <option value="">Selecciona variante</option>
                                    {variantesFiltradas.map(v => (
                                        <option key={v.id} value={v.id}>{v.nombre_variante}</option>
                                    ))}

                                </>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Color</label>
                        <select
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.colorId ?? ""}
                            onChange={(e) => handleChange("colorId", Number(e.target.value))}
                        >
                            <option value="">Selecciona color</option>
                            {colores.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Almacenamiento</label>
                        <select
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.almacenamientoId ?? ""}
                            onChange={(e) => handleChange("almacenamientoId", Number(e.target.value))}
                        >
                            <option value="">Selecciona almacenamiento</option>
                            {almacenamientos.map(a => (
                                <option key={a.id} value={a.id}>{a.capacidad} {a.tipo}</option>
                            ))}
                            <option value="0">N/A</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">RAM</label>
                        <select
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.ramId ?? ""}
                            onChange={(e) => handleChange("ramId", Number(e.target.value))}
                        >
                            <option value="">Selecciona RAM</option>
                            {ramOptions.map(r => (
                                <option key={r.id} value={r.id}>{r.capacidad} {r.tipo}</option>
                            ))}
                            <option value="0">N/A</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">SKU</label>
                        <input
                            type="text"
                            disabled
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.sku}
                            onChange={(e) => handleChange("sku", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Precio</label>
                        <input
                            type="number"
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.precio}
                            onChange={(e) => {
                                let valor = e.target.value;

                                // Eliminar cualquier carácter que no sea dígito
                                valor = valor.replace(/\D/g, "");

                                // Eliminar ceros a la izquierda
                                valor = valor.replace(/^0+(?=\d)/, "");

                                // Convertir a número o 0 si está vacío
                                handleChange("precio", valor ? Number(valor) : 0);
                            }
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Stock</label>
                        <input
                            type="text" // usar text para poder controlar el formato
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.stock}
                            onChange={(e) => {
                                let valor = e.target.value;

                                // Eliminar cualquier carácter que no sea dígito
                                valor = valor.replace(/\D/g, "");

                                // Eliminar ceros a la izquierda
                                valor = valor.replace(/^0+(?=\d)/, "");

                                // Convertir a número o 0 si está vacío
                                handleChange("stock", valor ? Number(valor) : 0);
                            }}
                        />


                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium">Imagen URL</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border rounded p-2"
                            value={formData.imagenUrl}
                            onChange={(e) => handleChange("imagenUrl", e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Guardar
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
