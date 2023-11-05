import { $api, API_ENDPOINTS } from '@/shared/api/api';
import { useQuery } from '@tanstack/react-query';
import { TUser } from '@/entities/user';
import { useParams } from 'react-router-dom';
import { isNumber } from 'lodash';

export const useGetUser = () => {
    const { id } = useParams<{ id: string }>();
    const idToNumber = Number(id);

    if (!id || !isNumber(idToNumber)) {
        return null;
    }

    const response = useQuery({
        queryKey: ['user'],
        queryFn: () => $api.get<TUser>(API_ENDPOINTS.USER(idToNumber)),
    });

    return { ...response, user: response.data?.data };
};
