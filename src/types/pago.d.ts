export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    amount_total: number;
    currency: string;
    price?: {
        product: {
            images: [string];
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

