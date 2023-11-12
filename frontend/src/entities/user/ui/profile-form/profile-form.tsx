import { TUser, ProfileInput } from '../../model';
import { useForm } from '@mantine/form';
import { Avatar, Button, FileInput, Group, TextInput } from '@mantine/core';

type Props = {
    profile: TUser['profile'];
    onSubmit: (profile: ProfileInput) => void;
};

export const ProfileForm = ({ profile, onSubmit }: Props) => {
    const form = useForm<ProfileInput>({
        initialValues: {
            name: profile.name,
            age: profile.age,
            avatar: null,
        },
    });

    const newAvatarUrl = form.values.avatar ? URL.createObjectURL(form.values.avatar) : null;

    const onReset = () => {
        form.setValues({ age: profile.age, name: profile.name, avatar: null });
    };

    return (
        <form onReset={onReset} onSubmit={form.onSubmit(onSubmit)}>
            <Avatar size={'xl'} src={newAvatarUrl ?? profile.avatar} alt="it's me" />
            <FileInput {...form.getInputProps('avatar')} label='Upload avatar' placeholder='Upload avatar' clearable />
            <TextInput label='Name' {...form.getInputProps('name')} />
            <TextInput label='Age' {...form.getInputProps('age')} />
            <Group justify='flex-end' mt='md'>
                <Button variant={'outline'} type='reset'>
                    Reset
                </Button>
                <Button type='submit'>Submit</Button>
            </Group>
        </form>
    );
};
