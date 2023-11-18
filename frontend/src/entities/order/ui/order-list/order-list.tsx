import { Table, Group, Title, Box, Select, Badge, LoadingOverlay } from '@mantine/core';
import { ORDER_STATUS, TOrder, OrderStatus } from '@/entities/order';
import { UserPreview } from '@/entities/user';
import { ApartmentPreview } from '@/entities/apartment';
import _ from 'lodash';

type Props = {
    isManager: boolean;
    orders: TOrder[];
    onChangeStatus: (status: OrderStatus, orderId: number) => void;
    isLoading: boolean;
};

const colorByStatus: Record<OrderStatus, string> = {
    Выполнен: 'green.4',
    Отменен: 'red.4',
    'В процессе': 'blue.4',
    'В ожидании': 'gray.4',
};

export const OrderList = ({ isManager, orders, onChangeStatus, isLoading }: Props) => {
    const rows = orders.map((order) => (
        <Table.Tr key={order.id}>
            <Table.Td>
                <ApartmentPreview apartment={order.apartment} />
            </Table.Td>
            <Table.Td>
                <Group gap='sm'>
                    <UserPreview user={isManager ? order.client : order.manager} />
                </Group>
            </Table.Td>

            <Table.Td>{new Date(order.updatedAt).toLocaleDateString()}</Table.Td>
            <Table.Td>
                {isManager ? (
                    <Select
                        data={_.values(ORDER_STATUS)}
                        value={order.status}
                        readOnly={
                            !isManager ||
                            ([ORDER_STATUS.COMPLETED, ORDER_STATUS.CANCELED] as OrderStatus[]).includes(order.status)
                        }
                        onChange={(value) => onChangeStatus(value as OrderStatus, order.id)}
                    />
                ) : (
                    <Badge color={colorByStatus[order.status]}>{order.status}</Badge>
                )}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Box mt={30} pos={'relative'}>
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            <Title order={2}>Заявки</Title>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing='sm'>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Квартира</Table.Th>
                            <Table.Th>{isManager ? 'Клиент' : 'Менеджер'}</Table.Th>
                            <Table.Th>Обновлено</Table.Th>
                            <Table.Th>Статус</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Box>
    );
};
