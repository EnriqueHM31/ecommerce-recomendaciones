import type { PedidoRow, PedidoItem } from "@/types/compras";
import type { LineItem, PaymentSession } from "@/types/pago";

export function adaptPedidosToPaymentSessions(pedidos: PedidoRow[]): PaymentSession[] {
    return pedidos.map((pedido) => {
        // Mapear cada item del pedido a LineItem
        const line_items: LineItem[] = pedido.items.map((item: PedidoItem) => ({
            id: item.id.toString(),
            description: item.producto.productos_base.descripcion,
            quantity: item.cantidad,
            amount_total: item.subtotal * item.cantidad,
            currency: "MXN",
            price: {
                price: item.precio_unitario,
                product: {
                    images: [item.producto.imagen_url],
                    name: item.producto.productos_base.nombre,
                    description: item.producto.productos_base.descripcion,
                },
            },
        }));

        // Construir PaymentSession para este pedido
        const paymentSession: PaymentSession = {
            id: pedido.id,
            amount: pedido.total.toString(),
            amount_total: pedido.total,
            currency: "MXN",
            created: pedido.fecha_pedido,
            line_items,
            status: pedido.estado,
            customer: {
                email: pedido.usuario.correo,
                name: pedido.usuario.nombre,
                address: {
                    city: pedido.direccion.ciudad,
                    country: pedido.direccion.pais,
                    line1: pedido.direccion.direccion_1,
                    line2: pedido.direccion.direccion_2 ?? "",
                    postal_code: pedido.direccion.codigo_postal,
                    state: pedido.direccion.estado,
                },
            },
        };

        return paymentSession;
    });
}
