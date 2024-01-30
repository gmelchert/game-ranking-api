import { Get, Post } from "../../../RouteBuilder";

import { IAuthModel } from "./auth.model";
import { AuthService } from "./auth.service";

import { t } from "elysia";

import { IControllerRouteModel } from "../../shared/models";
import { IUserModel } from "../users/users.model";

export class GetAuthController extends Get('/auth', AuthService, {
    protected: {}
}) {
    async '/me'({ service, elysia }: IControllerRouteModel<AuthService>) {
        const { userJWT: user } = elysia;

        const counterStrike = await service.getAuthenticatedUser(user.id);

        return ({
            data: {
                user,
                counterStrike,
            }
        });
    }
}

export class PostAuthController extends Post('/auth', AuthService, {
    valueValidator: {
        forRoutes: [
            {
                path: '/sign-in',
                body: t.Object({
                    login: t.String({
                        error: "Login is required and must be a string.",
                    }),
                    password: t.String({
                        minLength: 6,
                        error: "Password is required and must be a string with at least 6 characters.",
                    }),
                }),
            },
            {
                path: '/sign-on',
                body: t.Object({
                    name: t.String({
                        error: "Name",
                    }),
                    email: t.String({
                        format: "email",
                        error: "Email",
                    }),
                    steam: t.String({
                        error: "Steam",
                    }),
                    discord: t.Optional(t.String({
                        error: "Discord",
                    })),
                    image: t.Optional(t.String({
                        error: "Image",
                    })),
                    password: t.String({
                        minLength: 6,
                        error: "Password",
                    }),
                })
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
            data: accessToken,
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
            data: { accessToken },
            message: "User created with success.",
        }
    }
}