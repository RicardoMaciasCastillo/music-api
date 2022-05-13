import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, Get } from '@nestjs/common';

import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

import { SingUpRequest } from '@/dto/auth/sign-up-request.dto';
import { LoginRequest } from '@/dto/auth/login-request.dto';

@Controller({
    path: '/auth'
})
export class AuthController {

    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: SingUpRequest): Promise<any> {
        return this.service.register(body);
    }

    @Post('/login')
    private login(@Body() body: LoginRequest): Promise<any> {
        return this.service.login(body);
    }

    @Post('/refresh')
    @UseGuards(JwtAuthGuard)
    private refresh(@Req() req: Request): Promise<string | never> {
        return this.service.refresh(null);
    }

}