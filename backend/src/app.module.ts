import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DelayMiddleware } from './delay.service';

@Module({
    imports: [UserModule, AuthModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        if (process.env.NODE_ENV === 'development') {
            consumer.apply(DelayMiddleware).forRoutes('*');
        }
    }
}
