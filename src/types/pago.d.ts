export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    amount_total: number;
    currency: string;
    price: {
        price: number;
        product: {
            images: string[];
            name: string;
            description: string;
        }
    }
}

export interface SessionDetails {
    id: string;
    amount: string;
    currency: string;
    date: string;
    email?: string;
    name?: string;
    lineItems: LineItem[];
    address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    };
}

export interface PaymentSession {
    id: string;
    amount: string;
    currency: string;
    created: string;
    email?: string;
    name?: string;
    line_items: LineItem[];
    amount_total: number;
    customer?: {
        address: {
            city: string;
            country: string;
            line1: string;
            line2: string;
            postal_code: string;
            state: string;
        };
        email: string;
        name: string;
    }
    status: string;
}

export interface StripeCheckoutSession {
    id: string;
    amount_subtotal: number;
    amount_total: number;
    currency: string;
    created: number;
    status: string;
    payment_status: string;
    success_url: string;
    cancel_url: string;

    customer?: StripeCustomer;
    customer_email?: string;
    customer_details?: {
        email?: string;
        name?: string;
        phone?: string | null;
        address?: StripeAddress;
    };

    line_items?: {
        object: "list";
        data: StripeLineItem[];
        has_more: boolean;
        url: string;
    };

    metadata?: Record<string, string>;
}

export interface StripeCustomer {
    id: string;
    object: "customer";
    name?: string;
    email?: string;
    phone?: string | null;
    address?: StripeAddress;
    shipping?: {
        name?: string;
        phone?: string | null;
        address?: StripeAddress;
    };
}

export interface StripeAddress {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

export interface StripeLineItem {
    id: string;
    object: "item";
    description: string;
    quantity: number;
    amount_total: number;
    currency: string;
    price: StripePrice;
    metadata: Record<string, string>;
}

export interface StripePrice {
    id: string;
    object: "price";
    unit_amount: number;
    currency: string;
    product: {
        name: string;
        images: string[];
        description: string;
    }
}


export interface PedidoItem {
    id: number;
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

// Dirección de envío
export interface Direccion {
    direccion_1: string;
    direccion_2?: string | null;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    pais: string;
}

// Usuario
export interface Usuario {
    id_usuario: string;
    nombre: string;
    correo: string;
}

// Pedido completo
export interface Pedido {
    id: string;
    usuarios: Usuario; // <-- ahora incluimos nombre y correo
    fecha_pedido: string; // ISO string
    estado: "pendiente" | "confirmado" | "enviado" | "entregado" | "cancelado";
    total: number;
    direcciones: Direccion;
    pedido_items: PedidoItem[];
}

