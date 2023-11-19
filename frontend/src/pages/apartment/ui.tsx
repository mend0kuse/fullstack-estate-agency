import { CenteredLayout, Layout } from '@/layout';
import { observer } from 'mobx-react-lite';
import { useCreateOrder, useDeleteApartmentById, useGetApartmentById } from '@/pages/apartment/lib';
import { useLoadingAndErrorHandler } from '@/shared/ui';
import { ApartmentCard } from '@/entities/apartment';
import { ActionIcon, Button, LoadingOverlay, Text } from '@mantine/core';
import { user } from '@/entities/user';
import { MdDeleteForever } from 'react-icons/md';
export const ApartmentPage = observer(() => {
    const { data: apartment, isPending, error } = useGetApartmentById();

    const { deleteApartment, isPending: isPendingDelete } = useDeleteApartmentById();
    const { createOrder, isPending: isPendingOrder } = useCreateOrder();

    const step = useLoadingAndErrorHandler({ isLoading: isPending, error });

    if (step) {
        return step;
    }

    if (!apartment) {
        return (
            <CenteredLayout>
                <Text c={'red'}>Квартира не найдена</Text>
            </CenteredLayout>
        );
    }

    const isAuthor = user?.id === apartment.user.id;

    const onDeleteApartment = () => {
        deleteApartment(apartment.id);
    };

    const onOrder = () => {
        createOrder(apartment.id);
    };

    return (
        <Layout>
            <LoadingOverlay
                visible={isPendingDelete || isPendingOrder}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
            />
            {isAuthor && (
                <ActionIcon onClick={onDeleteApartment} color='red'>
                    <MdDeleteForever />
                </ActionIcon>
            )}
            <Button onClick={onOrder}>Оставить заявку</Button>
            <ApartmentCard isBigView key={apartment?.id} apartment={apartment} />
            <Text>Коммуналка {apartment.communalIncluded ? 'включена' : 'не включена'}</Text>
            <Text>Залог {apartment.pledge}</Text>
            <Text>Предоплата {apartment.prepayment}</Text>
            <Text>Кол-во комнат {apartment.rooms}</Text>
            <Text>Город {apartment.city}</Text>
        </Layout>
    );
});
