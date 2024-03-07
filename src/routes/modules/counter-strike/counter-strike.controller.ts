import { t } from "elysia";

import { Get, Post, Put, Delete } from "../../../RouteBuilder";

import { CounterStrikeService } from "./counter-strike.service";

import { IControllerRouteModel } from "../../shared/models";
import { ICounterStrikeDto, ICounterStrikeModel } from "./counter-strike.model";

import {
    findUniqueParamsDto,
    createBodyDto,
    updateBodyDto,
    updateParamsDto,
    deleteParamsDto,
} from "./dto";

export class GetCounterStrikeController extends Get('/counter-strike', CounterStrikeService, {
    protected: {
        publicRoutes: [{
            path: '',
        }],
    },
    valueValidator: {
        forRoutes: [
            {
                path: '/find/:id',
                params: findUniqueParamsDto,
            },
            {
                path: '/latest',
                params: findUniqueParamsDto,
            }
        ],
    },
}) {
    async ''({ service, elysia }: IControllerRouteModel<CounterStrikeService>) {
        const data = await service.findAll();

        return {
            data,
            message: "Stats for Counter-Strike.",
        }
    }

    async '/latest'({ service, elysia }: IControllerRouteModel<CounterStrikeService>) {
        const page = elysia.query.page || 1;

        const data = await service.findLatest(+page);

        return {
            data,
            message: "Stats for Counter-Strike.",
        }
    }

    async '/find/:id'({ service, elysia }: IControllerRouteModel<CounterStrikeService>) {
        const id = elysia.params.id as string;
        const data = await service.findUnique(id);

        return {
            data,
            message: "Stats for Counter-Strike.",
        }
    }
}

export class PostCounterStrikeControlle extends Post('/counter-strike', CounterStrikeService, {
    protected: {},
    valueValidator: {
        forRoutes: [{
            path: '',
            body: createBodyDto,
        }],
    },
}) {
    async ''({ service, elysia }: IControllerRouteModel<CounterStrikeService>) {
        const {
            id: userId,
        } = elysia.userJWT;

        const {
            deaths,
            dmr,
            kills,
            won,
            map,
        } = elysia.body as ICounterStrikeModel;

        const data = await service.create({
            userId,
            deaths,
            dmr,
            kills,
            won,
            map,
        });

        return {
            data,
            message: "Stat created with success.",
            status: 201,
        }
    }
}

export class PutCounterStrikeService extends Put('/counter-strike', CounterStrikeService, {
    protected: {},
    valueValidator: {
        forRoutes: [{
            path: '/:id',
            body: updateBodyDto,
            params: updateParamsDto,
        }],
    },
}) {
    async '/:id'({ elysia, service }: IControllerRouteModel<CounterStrikeService>) {
        const { id: userId } = elysia.userJWT;
        const id = elysia.params.id;
        const body = elysia.body as Partial<ICounterStrikeDto>

        const data = await service.update(userId, id, body);

        return {
            message: "Stat updated.",
            data,
        }
    }
}

export class DeleteCounterStrikeController extends Delete('/counter-strike', CounterStrikeService, {
    protected: {},
    valueValidator: {
        forRoutes: [{
            path: '/:id',
            params: deleteParamsDto,
        }]
    }
}) {
    async '/:id'({ service, elysia }: IControllerRouteModel<CounterStrikeService>) {
        const { id: userId } = elysia.userJWT;
        const id = elysia.params.id;

        await service.delete(userId, id);

        return {
            message: "Counter Strike stat deleted."
        }
    }
}