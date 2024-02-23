import { t } from "elysia";

export const findUniqueParamsDto = t.Object({
    id: t.String({
        format: 'uuid',
    }),
})