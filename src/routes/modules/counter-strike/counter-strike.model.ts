import { IUserModel } from "../users/users.model";

export interface ICounterStrikeModel {
    id?: string;
    user?: IUserModel;
    userId: string;
    kills: number;
    deaths: number;
    dmr: number;
    createdAt?: Date;
}

export interface ICounterStrikeDto {
    userId: string;
    kills: number;
    deaths: number;
    dmr: number;
}

export interface ICounterStrikeVisibleFields {
    id?: boolean;
    user?: boolean;
    userId: boolean;
    kills: boolean;
    deaths: boolean;
    dmr: boolean;
    createdAt?: boolean;
}