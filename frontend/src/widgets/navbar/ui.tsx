import { observer } from 'mobx-react-lite';
import { Anchor, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { user } from '@/entities/user';

export const Navbar = observer(() => {
    return (
        <Stack>
            {user.isManager && (
                <Anchor component={Link} to={ROUTES.CREATE_APARTMENT}>
                    Создать квартиру
                </Anchor>
            )}
        </Stack>
    );
});
