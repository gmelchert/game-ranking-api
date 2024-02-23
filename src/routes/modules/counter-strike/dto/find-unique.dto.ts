import { t } from "elysia";

export const updateBodyDto = t.Object({
    deaths: t.Optional(t.Number({
        error: 'Deaths'
    })),
    dmr: t.Optional(t.Number({
        error: 'dmr'
    })),
    kills: t.Optional(t.Number({
        error: 'kills'
    })),
})

export const updateParamsDto = t.Object({
    id: t.String({
        format: 'uuid',
        error: 'Id'
    })
})