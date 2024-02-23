import { t } from "elysia";

export const signInBodyDto = t.Object({
    login: t.String({
        error: "Login is required and must be a string.",
    }),
    password: t.String({
        minLength: 6,
        error: "Password is required and must be a string with at least 6 characters.",
    }),
})