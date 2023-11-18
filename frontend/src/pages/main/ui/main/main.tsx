import { Layout } from '@/layout';
import { MainPreview } from '../main-preview/main-preview';
import { Contacts } from '../contacts/contacts';

export const Main = () => {
    return (
        <Layout>
            <MainPreview />
            <Contacts />
        </Layout>
    );
};
