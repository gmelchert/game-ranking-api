import { UsersService } from "./users.service";
import { Get, Put, Delete } from "../../../RouteBuilder";

import { IControllerRouteModel } from "../../shared/models";
import { t } from 'elysia';
import { IUserModel } from "./users.model";

export class GetUsersController extends Get('/users', UsersService, {
    protected: {
        publicRoutes: [{
            path: '',
        }],
    },
    valueValidator: {
        forRoutes: [{
            path: '/find/:id',
            params: t.Object({
                id: t.String({
                    format: 'uuid',
                }),
            }),
        }],
    },
}) {
    async ''({ service }: IControllerRouteModel<UsersService>) {
        const users = await service.findAll();

        return {
            data: users,
        }
    }

    async '/find/:id'({ service, elysia }: IControllerRouteModel<UsersService>) {
        const userId = elysia.params.id;

        return {
            userId
        }
    }
}

export class PutUsersController extends Put('/user', UsersService, {
    protected: {},
    valueValidator: {
        forRoutes: [{
            path: '',
            body: t.Object({
                image: t.Optional(t.String({
                    error: "Image",
                })),
                steam: t.Optional(t.String({
                    error: "Steam",
                })),
                email: t.Optional(t.String({
                    format: "email",
                    error: "Email",
                })),
                name: t.Optional(t.String({
                    error: "Name",
                })),
                discord: t.Optional(t.String({
                    error: "Discord",
                })),
            })
        }]
    }
}) {
    async ''({ service, elysia }: IControllerRouteModel<UsersService>) {
        const { id } = elysia.userJWT;
        const data = elysia.body as Partial<IUserModel>;

        const user = await service.update(id, data);

        return ({
            data: user,
            message: "User updated.",
        })
    }
}