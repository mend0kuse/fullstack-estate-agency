import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './schemas/profile.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    private include = {
        profile: true,
    };

    async getOne({ id, email }: { id?: number; email?: string }) {
        const user = await this.prisma.user.findFirst({
            where: { OR: [{ id: { equals: id } }, { email: { equals: email } }] },
            include: this.include,
        });

        if (!user) {
            return null;
        }

        return user;
    }

    async createUser(data: Prisma.UserCreateInput) {
        const found = await this.getOne({ email: data.email });

        if (found) {
            throw new BadRequestException(
                'There is a unique constraint violation, a new user cannot be created with this email'
            );
        }

        const created = await this.prisma.user.create({
            data: {
                ...data,
                profile: { create: {} },
            },
        });

        return excludeFields(created, ['password']);
    }

    async updateProfile(params: { email?: string; profile: ProfileDto }) {
        const { email, profile } = params;

        const updated = await this.prisma.user.update({
            where: { email },
            data: {
                profile: {
                    update: profile,
                },
            },
            include: this.include,
        });

        return excludeFields(updated, ['password']);
    }
}
