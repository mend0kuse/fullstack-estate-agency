import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { Profile } from '@/pages/profile';
import { LoginPage } from '@/pages/login';
import { RegistrationPage } from '@/pages/registration';
import { CreateApartment } from '@/pages/create-apartment';
import { ApartmentPage } from '@/pages/apartment';
import { Main } from '@/pages/main';

export const router = createBrowserRouter([
    {
        path: '/profile/:id',
        element: <Profile />,
    },
    {
        path: ROUTES.MAIN,
        element: <Main />,
    },
    {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
    },
    {
        path: ROUTES.REGISTRATION,
        element: <RegistrationPage />,
    },
    {
        path: ROUTES.CREATE_APARTMENT,
        element: <CreateApartment />,
    },
    {
        path: '/apartment/:id',
        element: <ApartmentPage />,
    },
]);
