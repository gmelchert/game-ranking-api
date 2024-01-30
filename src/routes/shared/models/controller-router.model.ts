type UserJWT = {
    name: string;
    image: string;
    steam: string;
    id: string;
    discord: string;
    email: string;
    createdAt: Date;
};

type ElysiaRoute = {
    body: unknown;
    query: Record<string, string | undefined>;
    params: any;
    jwt: any;
    headers: Record<string, string | undefined>;
    userJWT: UserJWT;
}

export interface IControllerRouteModel<S> {
    service: S;
    elysia: ElysiaRoute;
}