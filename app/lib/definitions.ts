export type User = {
    id: string;
    username: string;
    password?: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
}

export type Kitchen = {
    id: string;
    rawproduct: string;
    type: string;
    quantity: number;
    createdAt: Date;
}

export type Sale = {
    id: string;
    typeProduct: string;
    typeSale: string;
    quantity: number;
    price: number;
    createdAt: Date;
}

export type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    createdAt: Date;
}
