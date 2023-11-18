import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ORDER_STATUS, OrderStatus } from './statuses';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {}

    private selectUser = {
        id: true,
        role: true,
        email: true,
        profile: true,
    };

    private orderInclude = {
        client: {
            select: this.selectUser,
        },
        manager: {
            select: this.selectUser,
        },
        apartment: { include: { images: true, characteristic: true } },
    };
    create({ clientId, managerId, apartmentId }: { clientId: number; managerId: number; apartmentId: number }) {
        return this.prismaService.order.create({
            data: {
                status: ORDER_STATUS.WAITING,
                manager: {
                    connect: { id: managerId },
                },
                client: {
                    connect: { id: clientId },
                },
                apartment: {
                    connect: { id: apartmentId },
                },
            },
            include: this.orderInclude,
        });
    }

    update(orderId: number, status: OrderStatus) {
        return this.prismaService.order.update({
            where: { id: orderId },
            data: {
                status,
            },
            include: this.orderInclude,
        });
    }

    getAllByUserId(userId: number) {
        return this.prismaService.order.findMany({
            where: { clientId: userId },
            include: this.orderInclude,
        });
    }

    getAllByManagerId(managerId: number) {
        return this.prismaService.order.findMany({
            where: { managerId: managerId },
            include: this.orderInclude,
        });
    }
}
