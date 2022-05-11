import { User } from '@/entity/user';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthHelper } from './auth.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    constructor(@Inject(ConfigService) config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_KEY'),
            ignoreExpiration: true,
        });
    }

    public validate(payload: string): Promise<User | never> {
        return this.helper.validateUser(payload);
    }
    
}