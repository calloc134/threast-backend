import { SetMetadata } from "@nestjs/common";
import { Role } from "@prisma/client";

export const SetRole = (...roles: Role[]) => 
    SetMetadata("roles", roles)
