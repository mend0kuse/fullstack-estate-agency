import { useMutation } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { TApartment } from '@/entities/apartment';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';

export const useCreateApartment = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (apartment: FormData) => {
            return $api.post<TApartment>(API_ENDPOINTS.APARTMENT, apartment);
        },
        mutationKey: [QUERY_KEYS.APARTMENT],
        onSuccess: (data) => {
            navigate(ROUTES.APARTMENT(data.data.id));
        },
    });

    return { createApartment: mutation.mutate, ...mutation };
};
