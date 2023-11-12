import { $api } from '@/shared/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TUser } from '@/entities/user';
import { useParams } from 'react-router-dom';
import { isNumber } from 'lodash';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { user } from '@/entities/user/model';

export const useGetUser = () => {
    const { id } = useParams<{ id: string }>();
    const idToNumber = Number(id);

    if (!id || !isNumber(idToNumber)) {
        return null;
    }

    const response = useQuery({
        queryKey: [QUERY_KEYS.USER],
        queryFn: () => $api.get<TUser>(API_ENDPOINTS.USER(idToNumber)),
    });

    return { ...response, user: response.data?.data };
};

export const useEditProfile = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const editProfile = useMutation({
        mutationFn: (profile: FormData) => {
            return $api.patch<TUser>(API_ENDPOINTS.EDIT_PROFILE, profile);
        },

        onSuccess: async (response) => {
            const updatedUser = response.data;
            user.setData(updatedUser);

            onSuccess();
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
        },
    });

    return { editProfile: editProfile.mutate, ...editProfile };
};