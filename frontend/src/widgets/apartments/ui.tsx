import { useGetApartments } from './lib';
import { useLoadingAndErrorHandler } from '@/shared/ui';
import { ApartmentPreview } from '@/entities/apartment';
import { Flex } from '@mantine/core';
import classes from './ui.module.css';

export const Apartments = () => {
    const { data, isLoading, error } = useGetApartments();

    const item = useLoadingAndErrorHandler({ isLoading, error });

    if (item) {
        return item;
    }

    return (
        <Flex className={classes.inner} gap={20} wrap={'wrap'}>
            {data?.map((apartment) => (
                <ApartmentPreview key={apartment.id} apartment={apartment} />
            ))}
        </Flex>
    );
};
