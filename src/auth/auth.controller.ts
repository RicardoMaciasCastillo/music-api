import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, Get } from '@nestjs/common';

import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

import { SingUpRequest } from '@/dto/auth/sign-up-request.dto';
import { LoginRequest } from '@/dto/auth/login-request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@ApiTags('AuthController')
@Controller({
    path: '/auth'
})
export class AuthController {

    @Inject(AuthService)
    private readonly service: AuthService;

    @ApiOperation({ summary: 'Register user' })
    @ApiResponse({ status: 201, description: 'User registrated succesfully.', })
    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    private register(@Body() body: SingUpRequest): Promise<any> {
        return this.service.register(body);
    }

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 201, description: 'User logged correctly.', })
    @Post('/login')
    private login(@Body() body: LoginRequest): Promise<any> {
        return this.service.login(body);
    }

    @ApiOperation({ summary: 'Refresh token' })
    @ApiResponse({ status: 201, description: 'Token refreshed correctly.', })
    @Post('/refresh')
    @UseGuards(JwtAuthGuard)
    private refresh(@Req() req: Request): Promise<string | never> {
        return this.service.refresh(null);
    }

}