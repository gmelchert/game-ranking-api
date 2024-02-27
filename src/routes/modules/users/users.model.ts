export interface IUserModel {
    id?: string;
    password: string;
    image?: string;
    steam: string;
    email: string;
    name: string;
    discord: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserVisibleFieldsModel {
    id?: boolean;
    password?: boolean;
    image?: boolean;
    steam?: boolean;
    name?: boolean;
    discord?: boolean;
    email?: boolean;
    createdAt?: boolean;
}