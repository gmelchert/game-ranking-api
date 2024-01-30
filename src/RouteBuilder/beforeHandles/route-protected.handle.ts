import { type Context } from 'elysia';
import { IUserModel } from '../../routes/modules/users/users.model';
import { ICheckerIfCanExecuteValidation } from '.';

export interface IProtectedConfig extends Context {
    userJWT: IUserModel;
}

export const protectedRouteConfig = (
    { userJWT, set }: IProtectedConfig,
    { routeConfigs, functionName }: ICheckerIfCanExecuteValidation,
) => {
    if (
        !routeConfigs?.protected ||
        routeConfigs.protected.publicRoutes?.find((p) => p.path === functionName)
    ) return;

    if (!userJWT) {
        set.status = 401;
        throw ({
            message: "User unauthorized.",
            status: 401,
            needLogin: true,
        })
    }
}