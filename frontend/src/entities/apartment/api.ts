import { $api } from '@/shared/api/api';
import { TApartment } from '@/entities/apartment/model';
import { API_ENDPOINTS } from '@/shared/api/config';

export const getApartments = async () => {
    const response = await $api.get<TApartment[]>(API_ENDPOINTS.APARTMENT);

    return response.data;
};
