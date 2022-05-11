import { LoginRequest } from '@/dto/auth/login-request.dto';
import { SingUpRequest } from '@/dto/auth/sign-up-request.dto';
import { User } from '@/entity/user';
import { UserType } from '@/type/user.type';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {

    @InjectRepository(User)
    private readonly repository: Repository<User>;

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    public async register(body: SingUpRequest): Promise<any> {

        const { name, email, password }: SingUpRequest = body;

        let user: User = await this.repository.findOne({ where: { email } });

        if (user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        user = new User();

        user.name = name;
        user.email = email;
        user.type = UserType.Customer;
        user.password = this.helper.encodePassword(password);

        await this.repository.save(user);

        return {
            message: 'User registered correctly'
        };
    }

    public async login(body: LoginRequest): Promise<any> {

        const { email, password }: LoginRequest = body;

        const user: User = await this.repository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

        if (!isPasswordValid) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        this.repository.update(user.id, { lastLoginAt: new Date() });

        return {
            accessToken: this.helper.generateToken(user)
        };
    }

    public async refresh(user: User): Promise<string> {
        
        this.repository.update(user.id, { lastLoginAt: new Date() });

        return this.helper.generateToken(user);
    }
}