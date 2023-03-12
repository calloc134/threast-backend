import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthuserController } from "./authuser.controller";
import { AuthuserService } from "./authuser.service";

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [AuthuserController],
    providers: [AuthuserService],
})
export class AuthuserModule {
}
