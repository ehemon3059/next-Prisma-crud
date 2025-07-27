export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserData {
    name: string;
    email:string;
}

export interface UpdateUserData {
    name: string;
    email:string;
}