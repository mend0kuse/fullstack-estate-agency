import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TApartmentDtoCreate } from './models/apartment';

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

    // async update(params: { id: number; dto: TArticleDtoUpdate }) {
    //     const { types, codeBlocks, imageBlocks, likes, dislikes, textBlocks, ...data } = params.dto;
    //     try {
    //         return await this.prismaService.article.update({
    //             where: { id: params.id },
    //             include: this.apartmentInclude,
    //
    //             data: {
    //                 ...data,
    //
    //                 ArticleStats: {
    //                     update: {
    //                         ...(likes && {
    //                             likes: likes,
    //                         }),
    //                         ...(dislikes && {
    //                             dislikes: dislikes,
    //                         }),
    //                     },
    //                 },
    //
    //                 types: {
    //                     ...(types && {
    //                         deleteMany: { id: { in: types.map(({ id }) => id) } },
    //                         createMany: { data: types },
    //                     }),
    //                 },
    //
    //                 codeBlocks: {
    //                     ...(codeBlocks && {
    //                         deleteMany: { id: { in: codeBlocks.map(({ id }) => id) } },
    //                         createMany: { data: codeBlocks },
    //                     }),
    //                 },
    //
    //                 imageBlocks: {
    //                     ...(imageBlocks && {
    //                         deleteMany: { id: { in: imageBlocks.map(({ id }) => id) } },
    //                         createMany: { data: imageBlocks },
    //                     }),
    //                 },
    //
    //                 textBlocks: {
    //                     ...(textBlocks && {
    //                         deleteMany: { id: { in: textBlocks.map(({ id }) => id) } },
    //                         createMany: { data: textBlocks },
    //                     }),
    //                 },
    //             },
    //         });
    //     } catch (error) {
    //         throw new NotFoundException();
    //     }
    // }

    // async deleteOne(id: number) {
    //     const deleteCode = this.prismaService.articleBlockCode.deleteMany({ where: { articleId: id } });
    //     const deleteStats = this.prismaService.articleStats.deleteMany({ where: { articleId: id } });
    //     const deleteText = this.prismaService.articleBlockText.deleteMany({ where: { articleId: id } });
    //     const deleteImages = this.prismaService.articleBlockImage.deleteMany({ where: { articleId: id } });
    //     const deleteTypes = this.prismaService.articleType.deleteMany({ where: { articleId: id } });
    //     const deleteComments = this.prismaService.comment.deleteMany({
    //         where: { articleId: id },
    //     });
    //     const deleteArticle = this.prismaService.article.delete({ where: { id }, include: this.apartmentInclude });
    //
    //     try {
    //         return await this.prismaService.$transaction([
    //             deleteCode,
    //             deleteStats,
    //             deleteText,
    //             deleteImages,
    //             deleteTypes,
    //             deleteComments,
    //             deleteArticle,
    //         ]);
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }

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
