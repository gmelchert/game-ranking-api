import { PrismaClient } from "@prisma/client";
import { IUserModel, IUserVisibleFieldsModel } from "./users.model";

export class UsersService {
    userVisibleFields: IUserVisibleFieldsModel;

    constructor(
        private readonly prisma: PrismaClient
    ) {
        this.userVisibleFields = {
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
                message: "Failed to find user by ID.",
                err,
                status: 500,
            }
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
}