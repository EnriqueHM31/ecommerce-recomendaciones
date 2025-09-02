export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    amount_total: number;
    currency: string;
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
