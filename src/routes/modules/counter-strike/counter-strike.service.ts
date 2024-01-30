import { PrismaClient } from "@prisma/client";
import { ICounterStrikeDto, ICounterStrikeModel, ICounterStrikeVisibleFields } from "./counter-strike.model";

export class CounterStrikeService {
    visibleFields: ICounterStrikeVisibleFields;

    constructor(
        private readonly prisma: PrismaClient
    ) {
        this.visibleFields = {
            deaths: true,
            dmr: true,
            kills: true,
            userId: true,
            createdAt: true,
            id: true,
            user: true,
        }
    }

    async findAll() {
        try {
            const stats = await this.prisma.counterStrike.findMany();

            return stats;
        } catch (error) {
            throw ({
                message: "Failed to get Counter Strike stats.",
                status: 500,
            })
        }
    }

    async findUnique(id: string) {
        try {
            const stats = await this.prisma.counterStrike.findUnique({
                where: { id }
            })

            return stats;
        } catch (error) {
            throw ({
                message: "Failed to get Counter Strike stats.",
                status: 500,
            })
        }
    }

    async create(data: ICounterStrikeDto) {
        try {
            const stat = await this.prisma.counterStrike.create({
                data,
                select: this.visibleFields,
            })

            return stat;
        } catch (error) {
            throw ({
                message: "Failed to create Counter Strike stats.",
                status: 500,
            })
        }
    }
}