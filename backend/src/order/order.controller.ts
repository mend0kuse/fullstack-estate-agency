import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from '../user/schemas/user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { OrderService } from './order.service';
import { ApartmentService } from '../apartment/apartment.service';
import { ZodValidationPipe } from '../validation/zod-validation.pipe';
import { TOrderUpdate, updateOrderDto } from './dto';

@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
        private apartmentService: ApartmentService
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    getAll(@Request() request: RequestWithUser) {
        const { role, id: userId } = request.user;

        if (role === 'user') {
            return this.orderService.getAllByUserId(userId);
        }

        return this.orderService.getAllByManagerId(userId);
    }

    @Post(':id')
    @UseGuards(AuthGuard)
    async create(@Param('id', ParseIntPipe) apartmentId: number, @Request() req: RequestWithUser) {
        const relatedApartment = await this.apartmentService.getOne(apartmentId);

        if (!relatedApartment) {
            throw new NotFoundException('Apartment not found');
        }

        return this.orderService.create({ clientId: req.user.id, apartmentId, managerId: relatedApartment.user.id });
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(@Param('id', ParseIntPipe) orderId: number, @Body() dto: TOrderUpdate) {
        return this.orderService.update(orderId, dto.status);
    }
}
