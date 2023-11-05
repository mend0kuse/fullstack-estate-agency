import { createBrowserRouter } from 'react-router-dom';
import { Main } from '@/pages/main';
import { ROUTES } from '@/shared/routing';
import { Profile } from '@/pages/profile';
import { LoginPage } from '@/pages/login';
import { RegistrationPage } from '@/pages/registration';

export const router = createBrowserRouter([
    {
        path: ROUTES.MAIN,
        element: <Main />,
    },
    {
        path: '/profile/:id',
        element: <Profile />,
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
    },
]);
