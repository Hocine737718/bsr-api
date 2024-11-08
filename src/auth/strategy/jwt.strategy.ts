import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        try {

            if (!payload.name) {
                throw new UnauthorizedException('Invalid token payload');
            }

            const user = await this.userService.findOneByName(payload.name);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            user.password = undefined;

            return user;
        } catch (error) {
            console.error('JWT validation error:', error);
            throw new UnauthorizedException('Invalid token or user not found');
        }
    }
}
