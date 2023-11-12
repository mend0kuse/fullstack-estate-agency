import { z } from 'zod';

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

export const apartmentDtoUpdate = apartmentDto.partial().extend({}).strict();

export type TApartmentDtoUpdate = z.infer<typeof apartmentDtoUpdate>;
export type TApartmentDtoCreate = z.infer<typeof apartmentDtoCreate>;
