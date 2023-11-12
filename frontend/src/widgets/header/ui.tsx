import { ActionIcon, Anchor, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { user } from '@/entities/user';
import { AiOutlineLogin, AiOutlineUser } from 'react-icons/ai';
import { observer } from 'mobx-react-lite';

export const Header = observer(() => {
    return (
        <Group justify={'space-between'} p={'sm'}>
            <Anchor component={Link} to={ROUTES.MAIN}>
                Logo
            </Anchor>
            {user.data ? (
                <ActionIcon to={ROUTES.PROFILE(user.data.id)} component={Link} variant='filled' aria-label='Settings'>
                    <AiOutlineUser />
                </ActionIcon>
            ) : (
                <ActionIcon to={ROUTES.LOGIN} component={Link} variant='filled' aria-label='Settings'>
                    <AiOutlineLogin />
                </ActionIcon>
            )}
        </Group>
    );
});
