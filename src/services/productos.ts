export async function obtenerProductos() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/productos/todos`);
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        const { success, message: mensajePeticion, data } = await response.json();

        if (!success) {
            throw new Error(mensajePeticion);
        }

        return { success: true, message: mensajePeticion, data: data };

    } catch (error) {
        console.error("Error al cargar productos:", error);
        return { success: false, message: error as string, data: [] };
    };
}

export async function obtenerProductosTop() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/productos/top`);
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        const { success, message: mensajePeticion, data } = await response.json();

        if (!success) {
            throw new Error(mensajePeticion);
        }

        return { success: true, message: mensajePeticion, data: data };

    } catch (error) {
        console.error("Error al cargar productos:", error);
        return { success: false, message: error as string, data: [] };
    };
}

export async function obtenerProductosActivos() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/productos/todos/activos`);
        if (!response.ok) {
            throw new Error('Error al cargar productos');
        }
        const { success, message: mensajePeticion, data } = await response.json();

        if (!success) {
            throw new Error(mensajePeticion);
        }

        return { success: true, message: mensajePeticion, data: data };

    } catch (error) {
        console.error("Error al cargar productos:", error);
        return { success: false, message: error as string, data: [] };
    };
}