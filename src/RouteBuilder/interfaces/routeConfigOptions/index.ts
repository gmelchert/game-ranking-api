import { IBodyValidator } from './body-validator.interface';
import { IRouteProtectConfig } from './route-protect.interface';

export interface IRouteConfigOptions {
    protected?: IRouteProtectConfig;
    valueValidator?: IBodyValidator;
}