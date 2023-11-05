import { Anchor, Box, Button, Group, TextInput } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { useLogin } from '@/features/login/model';
import { FormEvent, useState } from 'react';
import { Text } from '@mantine/core';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';

export const Login = () => {
    const { login, isPending, error } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <Box maw={340} mx='auto'>
            {error && <Text c={'red'}>{transformAxiosError(error)}</Text>}

            <form onSubmit={onSubmit}>
                <TextInput
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    withAsterisk
                    label='Email'
                    placeholder='your@email.com'
                />
                <TextInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    withAsterisk
                    label='Password'
                    type={'password'}
                    placeholder='Asd123_-123'
                />

                <Group justify='flex-end' mt='md'>
                    <Anchor component={Link} to={ROUTES.REGISTRATION}>
                        Нет аккаунта?
                    </Anchor>
                    <Button loading={isPending} type='submit'>
                        Войти
                    </Button>
                </Group>
            </form>
        </Box>
    );
};
