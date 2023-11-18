import { TApartment } from '@/entities/apartment';
import { TUser } from '../user';

export const ORDER_STATUS = {
    CANCELED: 'Отменен',
    COMPLETED: 'Выполнен',
    IN_PROGRESS: 'В процессе',
    WAITING: 'В ожидании',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type TOrder = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;

    clientId: number;
    client: TUser;

    managerId: number;
    manager: TUser;

    apartmentId: number;
    apartment: TApartment;
};
