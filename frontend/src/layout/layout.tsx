import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, Anchor, AppShell, Burger, Group } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { ROUTES } from '@/shared/routing';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineLogin } from 'react-icons/ai';
import { observer } from 'mobx-react-lite';
import { user } from '@/entities/user';

type Props = {};
export const Layout = observer(({ children }: PropsWithChildren<Props>) => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding='md'
        >
            <AppShell.Header>
                <Group justify={'space-between'} p={'sm'}>
                    <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
                    <Anchor component={Link} to={ROUTES.MAIN}>
                        Logo
                    </Anchor>
                    {user.data ? (
                        <ActionIcon
                            to={ROUTES.PROFILE(user.data.id)}
                            component={Link}
                            variant='filled'
                            aria-label='Settings'
                        >
                            <AiOutlineUser />
                        </ActionIcon>
                    ) : (
                        <ActionIcon to={ROUTES.LOGIN} component={Link} variant='filled' aria-label='Settings'>
                            <AiOutlineLogin />
                        </ActionIcon>
                    )}
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p='md'>Navbar</AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
});
