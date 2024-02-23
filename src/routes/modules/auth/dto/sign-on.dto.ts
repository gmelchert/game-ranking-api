import { t } from "elysia";

export const signOnBodyDto = t.Object({
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