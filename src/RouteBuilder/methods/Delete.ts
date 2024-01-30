import { PrismaClient } from "@prisma/client";

import { RouteMethods } from "../interfaces/routeEnum/route-methods.enum";

import { IRouteConfigOptions } from "../interfaces";

export function Delete(
    rootPath: string,
    Service: any,
    routeConfigs = null as null | IRouteConfigOptions,
) {
    return class {
        rootPath: string;
        method: RouteMethods;
        service: any;
        routeConfigs: null | IRouteConfigOptions;

        constructor() {
            this.rootPath = rootPath;
            this.method = RouteMethods.DELETE;
            this.service = new Service(new PrismaClient());
            this.routeConfigs = routeConfigs;
        };
    };
};