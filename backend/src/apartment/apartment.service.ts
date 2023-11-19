import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TApartmentDtoCreate, TApartmentQuery } from './models/apartment';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApartmentService {
    constructor(private prismaService: PrismaService) {}

    async getAll({ sort, limit, page, order, city, rooms, minPrice, maxPrice }: TApartmentQuery) {
        const args: Prisma.ApartmentFindManyArgs = {
            where: {
                ...(city && { city: { contains: city } }),
                ...(rooms && { rooms: { in: rooms.split(',').map(Number) } }),
                ...((minPrice || maxPrice) && {
                    AND: [{ price: { gte: minPrice ?? 0 } }, { price: { lte: maxPrice ?? Number.MAX_SAFE_INTEGER } }],
                }),
            },
            ...(sort && { orderBy: { [sort]: order ?? 'asc' } }),
            ...(limit && { take: limit }),
            ...(limit && page && { take: limit, skip: (page - 1) * limit }),
        };

        return this.prismaService.apartment.findMany({ include: this.apartmentInclude, ...args });
    }

    async getOne(id: number) {
        return this.prismaService.apartment.findFirst({ where: { id }, include: this.apartmentInclude });
    }

    async update(params: { id: number; views: number }) {
        const { id, views } = params;

        try {
            return await this.prismaService.apartment.update({
                where: { id: id },
                include: this.apartmentInclude,

                data: {
                    views: views,
                },
            });
        } catch (error) {
            throw new NotFoundException();
        }
    }

    async deleteOne(id: number) {
        const deleteImages = this.prismaService.image.deleteMany({ where: { apartmentId: id } });
        const deleteStats = this.prismaService.apartmentCharacteristic.deleteMany({ where: { apartmentId: id } });
        const deleteOrders = this.prismaService.order.deleteMany({ where: { apartmentId: id } });
        const deleteArticle = this.prismaService.apartment.delete({ where: { id }, include: this.apartmentInclude });

        try {
            return await this.prismaService.$transaction([deleteImages, deleteStats, deleteOrders, deleteArticle]);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createOne(apartment: TApartmentDtoCreate, userId: number | undefined) {
        const {
            images,
            square,
            live,
            kitchen,
            year,
            floor,
            communalIncluded,
            pledge,
            description,
            prepayment,
            price,
            title,
            city,
            rooms,
            address,
        } = apartment;

        try {
            return await this.prismaService.apartment.create({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                data: {
                    communalIncluded: Boolean(communalIncluded),
                    pledge: Number(pledge),
                    prepayment: Number(prepayment),
                    price: Number(price),
                    rooms: Number(rooms),
                    city,
                    title,
                    address,
                    description,
                    views: 0,
                    images: {
                        create: images.map((el) => ({ src: el })),
                    },
                    characteristic: {
                        create: {
                            square,
                            kitchen,
                            floor,
                            year,
                            live,
                        },
                    },
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
                include: this.apartmentInclude,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    private selectUser = {
        id: true,
        role: true,
        email: true,
        profile: true,
    };

    private apartmentInclude = {
        images: true,
        characteristic: true,
        user: {
            select: this.selectUser,
        },
    };
}
