import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthService } from "../auth.service";
import { Role } from "@prisma/client";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly authService: AuthService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const setRoles = this.reflector.get<Role[]>(
            "roles",
            context.getHandler()
        );
        if (!setRoles) {
            return false;
        }

        const request = context.switchToHttp().getRequest();
        return await this.authService.getRole(request.session.userid, setRoles);
    }
}
