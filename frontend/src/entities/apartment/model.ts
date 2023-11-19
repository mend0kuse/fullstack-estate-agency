import { TUser } from '@/entities/user';
import { FileWithPath } from '@mantine/dropzone';

export type TApartmentCreate = {
    title: string;
    rooms: number;
    city: string;
    address: string;
    description: string;
    price: number;
    prepayment: number;
    pledge: number;
    communalIncluded: boolean;
    images: FileWithPath[];
    characteristic: {
        square: string;
        kitchen: string;
        live: string;
        year: string;
        floor: string;
    };
};

export type TApartment = Omit<TApartmentCreate, 'images'> & {
    id: number;
    createdAt: Date;
    views: number;
    user: TUser;
    images: { src: string }[];
};

export type TUrlState = {
    rooms?: string[] | string;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    order?: 'asc' | 'desc';
    sort?: 'views' | 'createdAt' | 'price';
};
