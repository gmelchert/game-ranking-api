import { PrismaClient } from "@prisma/client";
import { ICounterStrikeDto, ICounterStrikeVisibleFields } from "./counter-strike.model";

export class CounterStrikeService {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    private get visibleFields(): ICounterStrikeVisibleFields {
        return ({
            deaths: true,
            dmr: true,
            kills: true,
            userId: true,
            createdAt: true,
            id: true,
        })
    }

    async findAll() {
        try {
            const stats = await this.prisma.counterStrike.findMany();

            return stats;
        } catch (error) {
            throw ({
                message: "Failed to get Counter Strike stats.",
                status: 500,
                error,
            })
        }
    }

    async findLatest(page: number) {
        try {
            const stats = await this.prisma.counterStrike.findMany({
                take: 20,
                skip: 20 * (page - 1),
                orderBy: {
                    createdAt: 'desc',
                }
            });

            return stats;
        } catch (error) {
            throw ({
                message: "Failed to get Counter Strike stats.",
                status: 500,
                error,
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
                error,
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
                message: "Failed to create Counter Strike stat.",
                status: 500,
                error,
            })
        }
    }

    async update(userId: string, id: string, data: Partial<ICounterStrikeDto>) {
        try {
            const stat = await this.prisma.counterStrike.update({
                data,
                where: { id, userId },
                select: this.visibleFields,
            })
    
            return stat;
        } catch (error) {
            throw ({
                message: "Failed to update Counter Strike stat.",
                status: 500,
                error,
            })
        }
    }

    async delete(userId: string, id: string) {
        try {
            await this.prisma.counterStrike.delete({
                where: { id, userId },
            })
        } catch (error) {
            throw ({
                message: "Failed to delete Counter Strike stat.",
                status: 500,
                error,
            })
        }
    }
}