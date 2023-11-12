import { TUser } from '@/entities/user';
import { FileWithPath } from '@mantine/dropzone';

export type TApartmentCreate = {
    title: string;
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
