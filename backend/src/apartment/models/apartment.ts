import { z } from 'zod';
import { User } from '../../user/schemas/user.dto';

export const apartmentDto = z.object({
    title: z.string(),
    images: z.array(z.string()),
    address: z.string(),
    description: z.string(),
    price: z.string(),
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
