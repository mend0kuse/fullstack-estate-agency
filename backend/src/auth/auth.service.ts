import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { excludeFields } from 'src/shared/lib/excludeFields';
import { UserService } from 'src/user/user.service';
import { saltOrRounds } from './constans';
import { SignInDto } from './schemas/sign-in.dto';
import { SignUpDto } from './schemas/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(dto: SignInDto) {
        const user = await this.usersService.getOne({ email: dto.email });

        if (!user) {
            throw new UnauthorizedException('Неправильная почта');
        }

        const isMatch = await bcrypt.compare(dto.password, user?.password);

        if (!isMatch) {
            throw new UnauthorizedException('Неправильный пароль');
        }

        return {
            access_token: await this.jwtService.signAsync(excludeFields(user, ['password'])),
        };
    }

    async signUp(user: SignUpDto) {
        const hashed = await bcrypt.hash(user.password, saltOrRounds);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.usersService.createUser({
            ...user,
            role: 'user',
            password: hashed,
        });
    }
}
