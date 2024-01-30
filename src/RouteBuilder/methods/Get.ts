import { PrismaClient } from "@prisma/client";

import { RouteMethods } from "../interfaces/routeEnum/route-methods.enum";

import { IRouteConfigOptions } from "../interfaces";

export function Get(
    rootPath: string,
    Service: any,
    routeConfigs = null as null | IRouteConfigOptions,
) {
    return class {
        rootPath: string;
        method: RouteMethods;
        service: {};
        routeConfigs: null | IRouteConfigOptions;

        constructor() {
            this.rootPath = rootPath;
            this.method = RouteMethods.GET;
            this.service = new Service(new PrismaClient());
            this.routeConfigs = routeConfigs;
        };
    };
};