import { useQuery } from '@tanstack/react-query';
import { getApartments } from '@/entities/apartment';
import { QUERY_KEYS } from '@/shared/api/config';

export const useGetApartments = () => {
    return useQuery({ queryKey: [QUERY_KEYS.APARTMENT], queryFn: getApartments });
};
