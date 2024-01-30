import { IRouteConfigOptions } from "../routeConfigOptions";
import { RouteMethods } from "../routeEnum/route-methods.enum";

export interface IRouteDto {
    path: string;
    method: RouteMethods;
    service: any;
    routeConfigs: null | IRouteConfigOptions;
    functionName: string;
    callback: ({
        elysia,
        service,
    }: {
        elysia: any;
        service: any;
    }) => Promise<any>;
}