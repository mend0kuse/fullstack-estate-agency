import { $api } from '@/shared/api/api';
import { TApartment } from '@/entities/apartment/model';
import { API_ENDPOINTS } from '@/shared/api/config';

export const getApartments = async () => {
    const response = await $api.get<TApartment[]>(API_ENDPOINTS.APARTMENT_WITH_QUERY(window.location.search));

    return response.data;
};

export const getApartmentById = async (id: number) => {
    const response = await $api.get<TApartment>(API_ENDPOINTS.APARTMENT_BY_ID(id));

    return response.data;
};

export const deleteApartmentById = async (id: number) => {
    const response = await $api.delete<TApartment>(API_ENDPOINTS.APARTMENT_BY_ID(id));

    return response.data;
};
