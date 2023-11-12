import { z } from 'zod';

export const profileDto = z
    .object({
        name: z.string().nullable(),
        age: z.string().nullable(),
        avatar: z.string().nullable(),
    })
    .partial();

export type ProfileDto = z.infer<typeof profileDto>;
