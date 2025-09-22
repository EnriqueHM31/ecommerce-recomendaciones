
export interface CheckoutSessionLineItem {
    id: string;             // ID interno de tu DB
    quantity: number;
    price: {
        price: number;        // precio unitario
        amount_total: number; // subtotal
    };
    product?: {
        id?: string;          // opcional, solo si usas metadata
        name?: string;
        description?: string;
        images?: string[];
        metadata?: Record<string, string>;
    };
}

export interface CheckoutSessionAddress {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
}

export interface CheckoutSessionShipping {
    name?: string;
    phone?: string;
    address?: CheckoutSessionAddress;
}

export interface CheckoutSessionMetadata {
    customer_id?: string;
    carrito?: string;       // JSON string con los items
    [key: string]: string | undefined;
}

export interface CheckoutSession {
    id: string;
    object: 'checkout.session';
    url: string;
    amount_total: number;
    currency: string;
    created: number;
    mode: 'payment' | 'subscription' | 'setup';
    payment_status: 'paid' | 'unpaid' | 'no_payment_required';
    customer_email?: string;
    customer_details?: {
        email?: string;
        name?: string;
        phone?: string;
        address?: CheckoutSessionAddress;
    };
    customer?: string; // Stripe customer ID
    metadata?: CheckoutSessionMetadata;
    line_items: {
        data: StripeLineItem[];
    }
    shipping?: CheckoutSessionShipping;
    shipping_address_collection?: {
        allowed_countries?: string[];
    };
    payment_intent?: string;
    subscription?: string;
    created?: number;
    currency?: string;
    [key: string]: string; // campos adicionales
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