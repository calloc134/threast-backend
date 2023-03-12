import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class SessionGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (!request.session.userid) {
            return false;
        } else {
            return true;
        }
    }
}
