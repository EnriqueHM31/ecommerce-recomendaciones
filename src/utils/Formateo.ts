import type { PaymentSession } from "../types/pago";
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

export const formatoRecibo = (pedido: PaymentSession) => {
    return {
        id: pedido.id,
        amount: String(pedido.amount_total),   // convertido a string
        currency: pedido.currency,
        date: String(pedido.created),          // convertido a string
        email: pedido.customer?.email ?? "No disponible",
        name: pedido.customer?.name ?? "No disponible",
        lineItems: pedido.line_items,
        address: {
            city: pedido.customer?.address?.city ?? "No disponible",
            country: pedido.customer?.address?.country ?? "No disponible",
            line1: pedido.customer?.address?.line1 ?? "No disponible",
            line2: pedido.customer?.address?.line2 ?? "No disponible",
            postal_code: pedido.customer?.address?.postal_code ?? "No disponible",
            state: pedido.customer?.address?.state ?? "No disponible",
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