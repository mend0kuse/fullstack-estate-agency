import { useEditProfile, useGetUser } from '@/pages/profile/lib';
import { ActionIcon, LoadingOverlay, Modal, Text } from '@mantine/core';
import { CenteredLayout, Layout } from '@/layout';
import { useLoadingAndErrorHandler } from '@/shared/ui';
import { ProfileCard, ProfileForm } from '@/entities/user';
import { useDisclosure } from '@mantine/hooks';
import { AiFillEdit } from 'react-icons/ai';
import { ProfileInput } from '@/entities/user/model';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
export const Profile = () => {
    const response = useGetUser();
    const [openedEdit, { open, close }] = useDisclosure(false);

    if (!response) {
        return (
            <CenteredLayout>
                <Text c={'red'} size='lg'>
                    Пользователь не найден
                </Text>
            </CenteredLayout>
        );
    }

    const { user, error, isFetching } = response;
    const item = useLoadingAndErrorHandler({ isLoading: isFetching, error });

    const { editProfile, isPending, error: errorEdit } = useEditProfile({ onSuccess: close });

    const onSubmit = (profile: ProfileInput) => {
        editProfile(convertToFormData(profile, 'avatar'));
    };

    if (item) {
        return item;
    }

    if (!user) {
        return null;
    }

    return (
        <Layout>
            <ProfileCard user={user} />
            <ActionIcon onClick={open} variant='filled' aria-label='Edit'>
                <AiFillEdit style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
            <Modal pos={'relative'} opened={openedEdit} onClose={close} title='Edit profile'>
                <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
                <ProfileForm onSubmit={onSubmit} profile={user.profile} />
                {errorEdit && <Text c={'red'}>{transformAxiosError(errorEdit)}</Text>}
            </Modal>
        </Layout>
    );
};
