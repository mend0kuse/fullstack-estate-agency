import { useGetApartments } from './lib';
import { useLoadingAndErrorHandler } from '@/shared/ui';
import { ApartmentCard } from '@/entities/apartment';
import { Flex, Text } from '@mantine/core';
import classes from './ui.module.css';

export const Apartments = () => {
    const { data, isLoading, error } = useGetApartments();

    const item = useLoadingAndErrorHandler({ isLoading, error });

    if (item) {
        return item;
    }

    return (
        <Flex className={classes.inner} gap={20} wrap={'wrap'}>
            {data?.length === 0 && <Text>Пока пусто</Text>}
            {data?.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
        </Flex>
    );
};
