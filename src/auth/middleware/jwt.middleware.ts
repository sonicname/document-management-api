import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    use(req: any, res: any, next: () => void) {
        const jwtToken = req.headers.authorization?.replace('Bearer ', '');
        if (jwtToken) {
            try {
                const decodedJwt = this.jwtService.verify(jwtToken);
                req.user = decodedJwt;
            } catch (error) {
                console.error('Failed to verify JWT:', error.message);
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }
        }
        next();
    }
}