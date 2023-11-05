import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { $api, API_ENDPOINTS } from '@/shared/api/api';
import { TUser, user } from '@/entities/user';
import { ROUTES } from '@/shared/routing';
import { UserInput } from '@/entities/user/model';

export const useLogin = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (user: UserInput) => {
            return $api.post<TUser>(API_ENDPOINTS.LOGIN, user);
        },
        onSuccess: (data) => {
            const userData = data.data;
            user.setData(userData);
            navigate(ROUTES.PROFILE(userData.id));
        },
    });

    return { login: mutation.mutate, ...mutation };
};
