export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ITransction {
    id: string;
    date: number;
    description: string;
    amount: number;
    balance: number;
    type: string;
    category: string;
    notes?: string;
}
