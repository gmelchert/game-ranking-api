import { IRouteConfigOptions } from '../interfaces';

export * from './route-protected.handle';

export interface ICheckerIfCanExecuteValidation {
    routeConfigs: IRouteConfigOptions | null;
    functionName: string;
}