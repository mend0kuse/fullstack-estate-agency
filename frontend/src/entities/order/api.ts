import { $api } from '@/shared/api/api';
import { API_ENDPOINTS } from '@/shared/api/config';
import { OrderStatus, TOrder } from '@/entities/order/model';

export const createOrder = async (apartmentId: number) => {
    const response = await $api.post<TOrder>(API_ENDPOINTS.ORDER_BY_APARTMENT_ID(apartmentId));

    return response.data;
};

export const getUserOrders = async () => {
    const response = await $api.get<TOrder[]>(API_ENDPOINTS.ORDER);

    return response.data;
};

export const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
    const response = await $api.patch<TOrder>(API_ENDPOINTS.ORDER_BY_ID(orderId), { status });

    return response.data;
};
