import type { UserResource } from "@clerk/types";
import { useEffect, useState } from "react";
import { useComprasStore } from "../../store/comprasStore";
import type { PaymentSession } from "../../types/pago";
interface useMisComprasProps {
    user?: UserResource | null;
}

export function useMisCompras({ user }: useMisComprasProps) {
    const [pedidosCargados, setPedidosCargados] = useState(false);
    const { fetchPedidos } = useComprasStore();

    useEffect(() => {
        if (!user) return;

        const email = user?.emailAddresses?.[0]?.emailAddress ?? "";
        const id = user?.id ?? "";
        if (!email || !id) return;

        fetchPedidos(email, id).then(() => setPedidosCargados(true));
    }, [user]);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState<PaymentSession | null>(null);

    const onOpenDetalles = (pedido: PaymentSession) => {
        setPedidoSeleccionado(pedido)
    }

    const onCloseDetalles = () => {
        setPedidoSeleccionado(null);
    }

    return {    // 🔹 devolvemos un objeto con las propiedades que necesitemos
        pedidosCargados,
        pedidoSeleccionado,
        onOpenDetalles,
        onCloseDetalles,
    };
}