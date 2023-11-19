import { user } from '@/entities/user';
import { AiOutlineLogin, AiOutlineUser } from 'react-icons/ai';

import { Group, Box, ActionIcon } from '@mantine/core';
import classes from './ui.module.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { observer } from 'mobx-react-lite';
import { IoMdCreate } from 'react-icons/io';
import { ThemeSwitcher } from '@/shared/ui/theme-icon/theme-switcher';

export const Header = observer(() => (
    <Box>
        <div className={classes.header}>
            <Group justify='space-between' h='100%'>
                <svg width='136' height='61' viewBox='0 0 136 61' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M3 9.18H11.52V23.1C12.84 15.3 15.54 8.28 24.9 8.28C33.78 8.28 41.4 11.58 41.4 22.02C41.4 30.36 36.84 34.08 30.84 35.64L41.16 50.94H31.44L21.66 36.54H11.52V51H3V9.18ZM13.86 17.94C11.28 27.24 11.52 35.52 11.52 35.52H20.22C25.98 35.52 32.7 34.68 32.7 22.02C32.7 14.22 32.34 8.52 23.4 9.36C19.68 9.66 15.48 12.06 13.86 17.94Z'
                        fill='#3C38FF'
                    />
                    <path d='M50 51V9.18H82.94V10.2H58.52V28.62H77.6V29.7H58.52V49.98H82.94V51H50Z' fill='#3C38FF' />
                    <path
                        d='M90.8 51L105.2 9.18H114.26L130.46 51H121.52L114.86 33.9H97.76L91.88 51H90.8ZM105.8 10.5L98.12 32.88H114.5L105.8 10.5Z'
                        fill='#3C38FF'
                    />
                </svg>

                <Group h='100%' gap={0}>
                    <Link to={ROUTES.MAIN} className={classes.link}>
                        Home
                    </Link>
                    <Link to={ROUTES.CATALOG} className={classes.link}>
                        Catalog
                    </Link>
                </Group>

                <Group>
                    <ThemeSwitcher />
                    {user.isManager && (
                        <ActionIcon to={ROUTES.CREATE_APARTMENT} component={Link} variant='filled' aria-label='Create'>
                            <IoMdCreate />
                        </ActionIcon>
                    )}
                    {user.data ? (
                        <ActionIcon
                            to={ROUTES.PROFILE(user.data.id)}
                            component={Link}
                            variant='filled'
                            aria-label='Profile'
                        >
                            <AiOutlineUser />
                        </ActionIcon>
                    ) : (
                        <ActionIcon to={ROUTES.LOGIN} component={Link} variant='filled' aria-label='Login'>
                            <AiOutlineLogin />
                        </ActionIcon>
                    )}
                </Group>
            </Group>
        </div>
    </Box>
));
