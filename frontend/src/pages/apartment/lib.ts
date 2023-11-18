import { useQuery } from '@tanstack/react-query';
import { deleteApartmentById, getApartmentById } from '@/entities/apartment/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/api/config';
import { ROUTES } from '@/shared/routing';
import { createOrder } from '@/entities/order/api';

export const useGetApartmentById = () => {
    const { id } = useParams<{ id: string }>();

    return useQuery({ queryKey: [], queryFn: () => getApartmentById(Number(id)) });
};

export const useDeleteApartmentById = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (id: number) => {
            return deleteApartmentById(id);
        },
        mutationKey: [QUERY_KEYS.APARTMENT],
        onSuccess: () => {
            navigate(ROUTES.MAIN);
        },
    });

    return { deleteApartment: mutation.mutate, ...mutation };
};

export const useCreateOrder = () => {
    const mutation = useMutation({
        mutationFn: (apartmentId: number) => {
            return createOrder(apartmentId);
        },
        mutationKey: [QUERY_KEYS.ORDER],
        onSuccess: (data) => {},
    });

    return { createOrder: mutation.mutate, ...mutation };
};
