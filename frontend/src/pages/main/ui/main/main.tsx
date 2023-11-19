import { Layout } from '@/layout';
import { MainPreview } from '../main-preview/main-preview';
import { Contacts } from '../contacts/contacts';
import { FeaturesCards } from '../features/features';

export const Main = () => {
    return (
        <Layout px={0}>
            <MainPreview />
            <Contacts />
            <FeaturesCards />
        </Layout>
    );
};
