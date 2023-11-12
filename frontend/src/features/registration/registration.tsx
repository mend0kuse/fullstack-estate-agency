import { TextInput, Button, Group, Box, Text, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isValidEmail, isValidPassword } from '@/shared/lib/validator/regexp';
import { useRegistration } from '@/features/registration/lib';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';

export const Registration = () => {
    const { register, error, isPending } = useRegistration();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (isValidEmail(value) ? null : 'Invalid email'),
            password: (value) => (isValidPassword(value) ? null : 'Invalid password'),
        },
    });

    const onSubmit = (user: typeof form.values) => {
        register(user);
    };

    return (
        <Box maw={340} mx='auto'>
            {error && <Text c={'red'}>{transformAxiosError(error)}</Text>}
            <form onSubmit={form.onSubmit(onSubmit)}>
                <TextInput withAsterisk label='Email' placeholder='your@email.com' {...form.getInputProps('email')} />
                <PasswordInput withAsterisk label='Password' {...form.getInputProps('password')} />

                <Group justify='flex-end' mt='md'>
                    <Button loading={isPending} type='submit'>
                        Submit
                    </Button>
                </Group>
            </form>
        </Box>
    );
};
