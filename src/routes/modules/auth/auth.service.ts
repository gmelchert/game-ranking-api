import Bun from 'bun';

import { PrismaClient } from '@prisma/client';

import { IUserModel } from '../users/users.model';

export class AuthService {
    unauthorizedError: {
        message: "Username or password is wrong.";
        status: 401;
    }

    constructor(
        private readonly prisma: PrismaClient,
    ) {
        this.unauthorizedError = {
            message: "Username or password is wrong.",
            status: 401,
        }
    }

    private async findUserByLogin(login: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { name: login },
                        { email: login }
                    ],
                },
            });

            return user;
        } catch (error) {
            throw this.unauthorizedError;
        }
    }

    async signIn(login: string, password: string) {
        const userByLogin = await this.findUserByLogin(login);
        if (!userByLogin) throw this.unauthorizedError;

        const ifPasswordMatch = await Bun.password.verify(password, userByLogin.password);
        if (!ifPasswordMatch) throw this.unauthorizedError;

        return ({
            name: userByLogin.name,
            id: userByLogin.id,
            image: userByLogin.image,
            steam: userByLogin.steam,
            email: userByLogin.email,
            discord: userByLogin.discord,
            createdAt: userByLogin.createdAt,
        })
    }

    async signOn(data: IUserModel) {
        try {
            const user = await this.prisma.user.create({
                data,
                select: {
                    id: true,
                    image: true,
                    name: true,
                    steam: true,
                    discord: true,
                    email: true,
                    createdAt: true,
                },
            })

            return user;
        } catch (err) {
            throw ({
                message: "Failed to create user.",
                err,
                status: 500,
            })
        }
    }

    async getAuthenticatedUser(userId: string) {
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
}