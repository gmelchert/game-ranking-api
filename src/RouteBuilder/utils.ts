import { Elysia } from "elysia";

import { protectedRouteConfig, IProtectedConfig } from "./beforeHandles";

import { invalidFunction } from "../routes/shared/constants/invalid-functions";

import { IRouteDto } from "./interfaces/routeDto/route-dto.interface";

export function getClassMethods(className: any) {
    let ret = new Set() as Set<string>;

    function methods(obj: any) {
        if (obj) {
            let ps = Object.getOwnPropertyNames(obj);

            ps.forEach(p => {
                if (obj[p] instanceof Function) {
                    ret.add(p);
                }
            });

            methods(Object.getPrototypeOf(obj));
        };
    };

    methods(className.prototype);

    return Array.from(ret).filter((fn) => !invalidFunction.includes(fn) && !fn.startsWith('#'));
};

export class RouterBuilder {
    app: Elysia;

    constructor(app: Elysia) {
        this.app = app;
    }

    controllerFileReader = async (filePath: string) => {
        const importedObject = await import(`../routes/modules/${filePath}`);

        for (const ClassRoute of Object.values(importedObject) as any) {
            const route = new ClassRoute();

            getClassMethods(ClassRoute).forEach((functionName: string) =>
                this.route({
                    path: route.rootPath + functionName,
                    callback: route[functionName],
                    method: route.method,
                    service: route.service,
                    routeConfigs: route.routeConfigs,
                    functionName
                })
            )
        }
    }

    private route({
        path,
        callback,
        method,
        service,
        routeConfigs,
        functionName
    }: IRouteDto) {
        const checkerIfCanExecuteValidation = {
            routeConfigs,
            functionName,
        }

        const body = routeConfigs?.valueValidator?.forRoutes?.find((p) => p.path === functionName)?.body;
        const query = routeConfigs?.valueValidator?.forRoutes?.find((p) => p.path === functionName)?.query;
        const params = routeConfigs?.valueValidator?.forRoutes?.find((p) => p.path === functionName)?.params;

        return this.app[method](path, async (elysia) => {
            try {
                const response = await callback({ elysia, service });
                if (response.status) elysia.set.status = response.status;
                return {
                    success: true,
                    ...response,
                };
            } catch (error: any) {
                if (error.status) elysia.set.status = error.status;
                return {
                    success: false,
                    error,
                };
            };
        }, {
            beforeHandle(ctx) {
                protectedRouteConfig(
                    ctx as IProtectedConfig,
                    checkerIfCanExecuteValidation
                );
            },
            body,
            params,
            query,
            error({ error, code }) {
                if (code === 'VALIDATION') {
                    console.log(error.all)
                    const errors: Array<{ field: string; errors: string[] }> = [];

                    error.all.forEach(err => {
                        const errorsObject = errors.find(({ field }) => field === err.schema.error.toLowerCase());
                        if (errorsObject) {
                            return errorsObject.errors.push(err.message)
                        }
                        errors.push({ field: err.schema.error.toLowerCase(), errors: [err.message] })
                    })

                    return {
                        success: false,
                        message: "Validation error.",
                        code,
                        errors,
                    }
                }

                return {
                    success: false,
                    message: error.message,
                }
            }
        })
    }
}