import { TSchema, InputSchema } from "elysia";
import { BodyValidatorType } from "../routeEnum/body-validator.enum";

export interface IFields {
    field: string;
    typeValidation: BodyValidatorType;
    isArray?: boolean;
    isOptional?: boolean;
}

interface IRoutes {
    path: string;
    body?: TSchema;
    query?: InputSchema<never>["query"];
    params?: InputSchema<never>["params"];
}

export interface IBodyValidator {
    forRoutes: IRoutes[];
}