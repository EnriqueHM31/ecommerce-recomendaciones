import type { CheckoutSession } from "../types/session";


export const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Función para normalizar el precio
export const formatPrecio = (input: string | number) => {
    // Convertir a string y eliminar comas y espacios
    const valor = String(input).replace(/,/g, "").trim();

    // Convertir a número
    let numero = parseFloat(valor);

    // Si no es número válido, poner 0
    if (isNaN(numero) || numero < 0) numero = 0;

    // Redondear a dos decimales y convertir a string
    return numero.toFixed(2);
};


export const formatearPrecio = (amount: number, currency?: string) =>
    new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: currency?.toUpperCase() || "USD",
    }).format(amount);

export const formatearPrecio2 = (amount: number, currency?: string) =>
    new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: currency?.toUpperCase() || "MXN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount / 100);


export const formatearFecha = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const tranformarStatus = (status: string) => {
    return status === "paid" ? "Pagado"
        : status === "canceled" ? "Cancelado"
            : status === "failed" ? "Fallido"
                : "Enviado";
}

export const colorStatus = (status: string) => {
    return status === "paid" ? "text-green-700 border-green-200"
        : status === "canceled" ? "text-red-700 border-red-200"
            : status === "failed" ? "text-yellow-700 border-yellow-200"
                : "text-blue-700 border-blue-200";
}

export const transformarEstado = (status: string) => {
    return status === "pendiente" ? "Pendiente"
        : status === "confirmado" ? "Confirmado"
            : status === "enviado" ? "Enviado"
                : status === "entregado" ? "Entregado"
                    : status === "cancelado" ? "Cancelado"
                        : "Fallido";
}

export const colorEstado = (status: string) => {
    return status === "pendiente" ? "bg-orange-500 text-white border-blue-200"
        : status === "confirmado" ? "bg-blue-600 text-white border-green-200"
            : status === "enviado" ? "bg-green-600 text-white border-green-200"
                : status === "entregado" ? " bg-ambar-300 text-white border-green-200"
                    : status === "cancelado" ? "bg-red-300  text-white border-red-200"
                        : "text-yellow-700 border-yellow-200";
}

export const formatoRecibo = (pedido: CheckoutSession) => {
    return {
        id: pedido.id,
        amount: String(pedido.amount_total),   // convertido a string
        currency: pedido.currency,
        date: String(pedido.created),          // convertido a string
        email: pedido.customer_email ?? "No disponible",
        name: pedido.customer_details?.name ?? "No disponible",
        lineItems: pedido.line_items,
        address: {
            city: pedido.customer_details?.address?.city ?? "No disponible",
            country: pedido.customer_details?.address?.country ?? "No disponible",
            line1: pedido.customer_details?.address?.line1 ?? "No disponible",
            line2: pedido.customer_details?.address?.line2 ?? "No disponible",
            postal_code: pedido.customer_details?.address?.postal_code ?? "No disponible",
            state: pedido.customer_details?.address?.state ?? "No disponible",
        },
    };
}

export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}