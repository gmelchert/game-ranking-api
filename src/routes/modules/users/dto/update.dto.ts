import { t } from "elysia";

export const updateBodyDto = t.Object({
    image: t.Optional(t.String({
        error: "Image",
    })),
    steam: t.Optional(t.String({
        error: "Steam",
    })),
    email: t.Optional(t.String({
        format: "email",
        error: "Email",
    })),
    name: t.Optional(t.String({
        error: "Name",
    })),
    discord: t.Optional(t.String({
        error: "Discord",
    })),
})