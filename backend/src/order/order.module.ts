import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApartmentService } from '../apartment/apartment.service';

@Module({
    controllers: [OrderController],
    providers: [OrderService, PrismaService, ApartmentService],
})
export class OrderModule {}
