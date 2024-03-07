import { AuthService } from "./auth.service";

import { Get, Post } from "../../../RouteBuilder";

import { IControllerRouteModel } from "../../shared/models";
import { IAuthModel } from "./auth.model";
import { IUserModel } from "../users/users.model";

import {
    signInBodyDto,
    signOnBodyDto
} from "./dto";

export class PostAuthController extends Post('/auth', AuthService, {
    valueValidator: {
        forRoutes: [
            {
                path: '/sign-in',
                body: signInBodyDto,
            },
            {
                path: '/sign-on',
                body: signOnBodyDto
            }
        ]
    }
}) {
    async '/sign-in'({ service, elysia }: IControllerRouteModel<AuthService>) {
        const {
            login,
            password,
        } = elysia.body as IAuthModel;

        const user = await service.signIn(login, password);

        const { jwt } = elysia;
        const accessToken = await jwt.sign(user);

        return {
            data: {
                accessToken,
                user,
            },
        }
    }

    async '/sign-on'({ service, elysia }: IControllerRouteModel<AuthService>) {
        const userDto = elysia.body as IUserModel;

        const {
            password,
        } = userDto;

        const hashPassord = await Bun.password.hash(password);

        const user = await service.signOn({
            ...userDto,
            password: hashPassord,
        });

        const { jwt } = elysia;
        const accessToken = await jwt.sign(user);

        return {
            data: { accessToken, user },
            message: "User created with success.",
        }
    }
}