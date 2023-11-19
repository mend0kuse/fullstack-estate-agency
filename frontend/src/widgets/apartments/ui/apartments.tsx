import { useGetApartments } from '../lib';
import { useLoadingAndErrorHandler } from '@/shared/ui';
import { ApartmentCard } from '@/entities/apartment';
import { Group, SimpleGrid, Text } from '@mantine/core';
import { Filters } from './filters/filters';

export const Apartments = () => {
    const { data, isLoading, isFetching, isPending, error, refetch } = useGetApartments();

    const item = useLoadingAndErrorHandler({ isLoading: isLoading || isFetching || isPending, error });

    if (item) {
        return item;
    }

    return (
        <Group wrap={'nowrap'}>
            <Filters onApply={refetch} />
            {data?.length === 0 && <Text>Ничего не найдено</Text>}
            <SimpleGrid cols={3}>
                {data?.map((apartment) => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                ))}
            </SimpleGrid>
        </Group>
    );
};
