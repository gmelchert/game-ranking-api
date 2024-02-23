import { PrismaClient } from "@prisma/client";
import { IUserModel, IUserVisibleFieldsModel } from "./users.model";

export class UsersService {
    constructor(
        private readonly prisma: PrismaClient
    ) {}

    private get userVisibleFields(): IUserVisibleFieldsModel {
        return {
            id: true,
            image: true,
            name: true,
            steam: true,
            discord: true,
            email: true,
        }
    }

    async findAll() {
        const users = await this.prisma.user.findMany({
            select: this.userVisibleFields,
        });

        return users;
    }

    async findUnique(id: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: this.userVisibleFields,
            });

            return user;
        } catch (err) {
            throw {
                message: "Failed to find user.",
                err,
                status: 500,
            }
        }
    }

    async getFirstCounterStrikeStats(userId: string) {
        try {
            const counterStrikeStats = await this.prisma.counterStrike.findMany({
                where: { userId },
                take: 10,
                orderBy: {
                    createdAt: 'desc'
                }
            })

            return counterStrikeStats;
        } catch (error) {
            throw ({
                success: false,
                message: "Failed to find stats for Counter-Strike.",
                status: 500,
            })
        }
    }

    async create(data: IUserModel) {
        try {
            const user = await this.prisma.user.create({
                data,
                select: this.userVisibleFields,
            })

            return user;
        } catch (err) {
            throw {
                message: "Failed to create user.",
                err,
                status: 500,
            }
        }
    }

    async update(id: string, data: Partial<IUserModel>) {
        try {
            const user = await this.prisma.user.update({
                where: { id },
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
                select: this.userVisibleFields,
            })

            return user;
        } catch (err) {
            throw {
                message: "Failed to update user.",
                err,
                status: 500,
            }
        }
    }

    async deleteProfile(id: string) {
        try {
            await this.prisma.user.delete({
                where: { id }
            });
        } catch (error) {
            throw {
                message: "Failed to delete profile.",
                error,
                status: 500,
            }
        }
    }
}