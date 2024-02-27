import { Glob } from "bun"

import { type Context, Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";

import { RouterBuilder } from "./RouteBuilder";

interface IAuthDerive extends Context {
    jwt: any
}

const app = new Elysia();

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))

app.use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!,
    exp: '7d',
}))

app.derive(async ctx => {
    const {
        headers,
        jwt
    } = ctx as IAuthDerive

    const auth = headers.authorization;

    const [type, token] = auth?.split(' ') ?? [];

    if (type !== 'Bearer') {
        return {
            userJWT: null,
        }
    }

    const userJWT = await jwt.verify(token);
    if (!userJWT) {
        return {
            userJWT: null,
        }
    }

    delete userJWT.exp;

    return {
        userJWT,
    }
})

const routerBuilder = new RouterBuilder(app);
const glob = new Glob('**/*.controller.ts');

for (const file of glob.scanSync('./src/routes/modules')) {
    await routerBuilder.controllerFileReader(file);
}

app.listen(3000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
