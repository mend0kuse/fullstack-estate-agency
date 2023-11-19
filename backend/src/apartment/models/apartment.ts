import { z } from 'zod';
import { User } from '../../user/schemas/user.dto';
import { stringToNumber } from '../../validation/stringToNumber';

export const apartmentDto = z.object({
    title: z.string(),
    images: z.array(z.string()),
    address: z.string(),
    description: z.string(),
    price: z.string(),
    city: z.string(),
    rooms: z.number(),
    prepayment: z.string(),
    pledge: z.string(),
    communalIncluded: z.string(),
    square: z.string(),
    kitchen: z.string(),
    live: z.string(),
    year: z.string(),
    floor: z.string(),
});

export const apartmentDtoCreate = apartmentDto.required();

export type TApartment = z.infer<typeof apartmentDto>;
export type TApartmentWithUser = TApartment & { user: User };
export type TApartmentDtoCreate = z.infer<typeof apartmentDtoCreate>;

export const apartmentQuery = z
    .object({
        sort: apartmentDto.extend({ createdAt: z.date(), views: z.number() }).keyof(),
        order: z.union([z.literal('asc'), z.literal('desc')]),
        limit: stringToNumber,
        page: stringToNumber,
        // q: z.string(),
        city: z.string(),
        rooms: z.string(),
        minPrice: stringToNumber,
        maxPrice: stringToNumber,
    })
    .partial();

export type TApartmentQuery = z.infer<typeof apartmentQuery>;
