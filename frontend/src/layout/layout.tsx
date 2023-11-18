import { AppShell, Center } from '@mantine/core';
import { ReactNode } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <AppShell footer={{ height: 60 }} header={{ height: 60 }} padding='md'>
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main px={0}>{children}</AppShell.Main>

            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};

export const CenteredLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Layout>
            <Center style={{ height: '100%' }}>{children}</Center>
        </Layout>
    );
};
