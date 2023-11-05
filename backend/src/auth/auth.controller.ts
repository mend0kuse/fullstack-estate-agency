import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/validation/zod-validation.pipe';
import { AuthService } from './auth.service';
import { signInDto, SignInDto } from './schemas/sign-in.dto';
import { SignUpDto, signUpDto } from './schemas/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    @UsePipes(new ZodValidationPipe(signInDto))
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn({ ...dto });
    }

    @UsePipes(new ZodValidationPipe(signUpDto))
    @Post('signup')
    signup(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }
}
