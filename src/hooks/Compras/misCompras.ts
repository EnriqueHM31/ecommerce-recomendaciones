import { useEffect, useState } from "react";
import type { PaymentSession } from "../../types/pago";
import type { UserResource } from "@clerk/types"
import { useComprasStore } from "../../store/comprasStore";
interface useMisComprasProps {
    user?: UserResource | null;
}

export function useMisCompras({ user }: useMisComprasProps) {
    const [pedidosCargados, setPedidosCargados] = useState(false);
    const { fetchPedidos } = useComprasStore();

    useEffect(() => {
        if (!user) return;

        const email = user?.emailAddresses?.[0]?.emailAddress ?? "";
        if (!email) return;

        fetchPedidos(email).then(() => setPedidosCargados(true));
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