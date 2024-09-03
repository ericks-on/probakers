export type User = {
    id: string;
    username: string;
    password?: string;
    email: string;
    name: string;
    role: string;
    createdat: Date;
}

export type Kitchen = {
    id: string;
    rawproduct: string;
    type: string;
    quantity: number;
    createdat: Date;
}

export type Sale = {
    id: string;
    typeproduct: string;
    typesale: string;
    quantity: number;
    price: number;
    createdat: Date;
}

export type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    createdat: Date;
}
