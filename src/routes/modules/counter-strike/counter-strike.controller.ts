import { t } from "elysia";
import { Get, Post } from "../../../RouteBuilder";
import { BodyValidatorType } from "../../../RouteBuilder/interfaces/routeEnum/body-validator.enum";
import { RouteMethods } from "../../../RouteBuilder/interfaces/routeEnum/route-methods.enum";
import { IControllerRouteModel } from "../../shared/models";
import { ICounterStrikeModel } from "./counter-strike.model";
import { CounterStrikeService } from "./counter-strike.service";

export class GetCounterStrikeController extends Get('/counter-strike', CounterStrikeService, {
    protected: {
        publicRoutes: [{
            path: '',
        }],
    },
    valueValidator: {
        forRoutes: [{
            path: '/find/:id',
            query: t.Object({
                id: t.String({
                    format: 'uuid',
                }),
            }),
        }],
    },
}) {
    async ''({ service, elysia }: IControllerRouteModel<CounterStrikeService>) {
        const data = await service.findAll();

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
            body: t.Object({
                deaths: t.Number(),
                dmr: t.Number(),
                kills: t.Number(),
            }),
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
        } = elysia.body as ICounterStrikeModel;

        const data = await service.create({
            userId,
            deaths,
            dmr,
            kills
        });

        return {
            data,
            message: "Stat created with success.",
            status: 201,
        }
    }
}