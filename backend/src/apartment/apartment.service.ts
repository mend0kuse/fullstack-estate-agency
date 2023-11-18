import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TApartmentDtoCreate } from './models/apartment';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ApartmentService {
    constructor(private prismaService: PrismaService) {}

    async getAll() {
        // const args: Prisma.ArticleFindManyArgs = {
        //     where: {
        //         ...(query.q && { ...this.search(query.q) }),
        //         ...(query.category && {
        //             types: { some: { name: query.category } },
        //         }),
        //     },
        //     ...(query.sort && { orderBy: { [query.sort]: query.order ?? 'asc' } }),
        //     ...(query.limit && { take: query.limit }),
        //     ...(query.limit && query.page && { take: query.limit, skip: (query.page - 1) * query.limit }),
        // };

        return this.prismaService.apartment.findMany({ include: this.apartmentInclude });
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
        const deleteArticle = this.prismaService.apartment.delete({ where: { id }, include: this.apartmentInclude });

        try {
            return await this.prismaService.$transaction([deleteImages, deleteStats, deleteArticle]);
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

    private search = (q: string) => ({
        OR: [
            {
                title: {
                    contains: q,
                },
            },
            {
                suptitle: {
                    contains: q,
                },
            },
            {
                codeBlocks: {
                    some: {
                        code: {
                            contains: q,
                        },
                    },
                },
            },
            {
                imageBlocks: {
                    some: {
                        title: {
                            contains: q,
                        },
                    },
                },
            },
            {
                textBlocks: {
                    some: {
                        OR: [
                            {
                                title: {
                                    contains: q,
                                },
                            },
                            {
                                paragraphs: {
                                    some: {
                                        text: {
                                            contains: q,
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        ],
    });

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
