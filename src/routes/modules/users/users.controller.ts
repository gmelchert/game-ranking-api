import { Get, Put, Delete } from "../../../RouteBuilder";

import { UsersService } from "./users.service";

import { IControllerRouteModel } from "../../shared/models";
import { IUserModel } from "./users.model";

import { findUniqueParamsDto, updateBodyDto } from "./dto";

export class GetUsersController extends Get('/users', UsersService, {
    protected: {
        publicRoutes: [{
            path: '',
        }],
    },
    valueValidator: {
        forRoutes: [{
            path: '/find/:id',
            params: findUniqueParamsDto,
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

        const user = await service.findUnique(userId);

        return {
            data: user,
            message: 'User found.'
        }
    }

    async '/profile'({ elysia, service }: IControllerRouteModel<UsersService>) {
        const user = elysia.userJWT;

        const counterStrike = await service.getFirstCounterStrikeStats(user.id);

        return {
            data: {
                user,
                counterStrike,
            },
            message: 'Your profile.',
        }
    }
}

export class PutUsersController extends Put('/users', UsersService, {
    protected: {},
    valueValidator: {
        forRoutes: [{
            path: '',
            body: updateBodyDto,
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

export class DeleteUsersController extends Delete('/users', UsersService, {
    protected: {},
}) {
    async '/profile'({ service, elysia }: IControllerRouteModel<UsersService>) {
        const { id: userId } = elysia.userJWT;

        await service.deleteProfile(userId);

        return {
            message: "User deleted.",
        }
    }
}