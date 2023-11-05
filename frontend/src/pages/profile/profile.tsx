import { useGetUser } from '@/pages/profile/model';
import { Center, Loader, Text } from '@mantine/core';
import { Layout } from '@/layout';
import { ReactNode } from 'react';

export const Profile = () => {
    const response = useGetUser();

    const CenteredLayout = ({ children }: { children: ReactNode }) => {
        return (
            <Layout>
                <Center>{children}</Center>
            </Layout>
        );
    };

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

    if (isFetching) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    if (error) {
        return (
            <CenteredLayout>
                <Text c={'red'} size='lg'>
                    {error.message}
                </Text>
            </CenteredLayout>
        );
    }

    return <Layout>{user?.email}</Layout>;
};
