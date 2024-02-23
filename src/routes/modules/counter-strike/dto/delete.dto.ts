import { t } from "elysia";

export const deleteParamsDto = t.Object({
    id: t.String({
        format: 'uuid',
        error: 'Id'
    })
})