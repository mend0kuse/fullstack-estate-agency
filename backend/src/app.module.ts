import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DelayMiddleware } from './delay.service';
import { ApartmentModule } from './apartment/apartment.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [UserModule, AuthModule, ApartmentModule, OrderModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        if (process.env.NODE_ENV === 'development') {
            consumer.apply(DelayMiddleware).forRoutes('*');
        }
    }
}
