import { Anchor, Box, Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing';
import { useLogin } from '@/features/login/lib';
import { Text } from '@mantine/core';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { useForm } from '@mantine/form';

export const Login = () => {
    const { login, isPending, error } = useLogin();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (user: typeof form.values) => {
        login(user);
    };

    return (
        <Box maw={340} mx='auto'>
            {error && <Text c={'red'}>{transformAxiosError(error)}</Text>}

            <form onSubmit={form.onSubmit(onSubmit)}>
                <TextInput {...form.getInputProps('email')} withAsterisk label='Email' placeholder='your@email.com' />
                <PasswordInput {...form.getInputProps('password')} withAsterisk label='Password' />

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
