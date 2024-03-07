import { t } from "elysia";

export const createBodyDto = t.Object({
    deaths: t.Number({
        error: 'deaths'
    }),
    dmr: t.Number({
        error: 'dmr'
    }),
    kills: t.Number({
        error: 'kills'
    }),
    map: t.String({
        error: 'map'
    }),
    won: t.Boolean({
        error: 'map'
    }),
})