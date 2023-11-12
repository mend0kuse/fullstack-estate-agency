import { useMutation } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { TApartment } from '@/entities/apartment';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';

export const useCreateApartment = () => {
    const mutation = useMutation({
        mutationFn: (apartment: FormData) => {
            for (const [key, value] of apartment.entries()) {
                console.log(key, value);
            }

            return $api.post<TApartment>(API_ENDPOINTS.APARTMENT, apartment);
        },
        mutationKey: [QUERY_KEYS.APARTMENT],
        onSuccess: () => {},
    });

    return { createApartment: mutation.mutate, ...mutation };
};
