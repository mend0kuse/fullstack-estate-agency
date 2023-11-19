import { TApartmentCreate } from '@/entities/apartment';

export const DEFAULT_FORM_VALUES: TApartmentCreate = {
    images: [],
    address: '',
    city: '',
    rooms: 2,
    description: '',
    communalIncluded: false,
    pledge: 0,
    price: 0,
    prepayment: 0,
    title: '',
    characteristic: {
        square: '',
        kitchen: '',
        live: '',
        year: '',
        floor: '',
    },
};
