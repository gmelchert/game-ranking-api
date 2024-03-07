import { t } from "elysia";

export const findLatestQueryDto = t.Object({
    page: t.Number({
        error: 'Page'
    })
})