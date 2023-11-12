import { AppShell, Center } from '@mantine/core';
import { ReactNode } from 'react';
import { Header } from '@/widgets/header';
import { Navbar } from '@/widgets/navbar';

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm' }} padding='md'>
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Navbar p='md'>
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
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
