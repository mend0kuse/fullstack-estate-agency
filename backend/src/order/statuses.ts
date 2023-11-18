export const ORDER_STATUS = {
    CANCELED: 'Отменен',
    COMPLETED: 'Выполнен',
    IN_PROGRESS: 'В процессе',
    WAITING: 'В ожидании',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
