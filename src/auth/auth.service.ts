import { Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginAuthRequestDto } from "./dto/login-auth.dto";
import { verify } from "argon2";
import { PasswordDoesNotMatch } from "@common/exceptions/exceptions";
import { LoginAuthResponseDto } from "./dto/response-auth.dto";
import { Role } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async login(
        loginAuthRequestDto: LoginAuthRequestDto,
        request: Request
    ): Promise<LoginAuthResponseDto> {
        const regeneratePromise = new Promise((resolve) => {
            request.session.regenerate(resolve);
        });

        const { screenName: reqScreenName, password: reqPassword } =
            loginAuthRequestDto;
        const { id, password: hashed_password } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    screenName: reqScreenName,
                },
            });

        if (!(await verify(hashed_password, reqPassword))) {
            throw new PasswordDoesNotMatch();
        }

        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                lastLoginDate: new Date(),
            },
        });

        await regeneratePromise;
        request.session.userid = id;

        return { id };
    }

    async logout(request: Request, response: Response): Promise<LoginAuthResponseDto> {
        const id = request.session.userid;
        request.session.destroy(null);
        response.clearCookie("SESSIONID")

        return { id };
    }

    async getRole(myId: number, setRoles: Role[]): Promise<boolean> {

        const { role: myRole } = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: myId,
            },
        });

        if (setRoles.includes(myRole)) {
            return true;
        } else {
            return false;
        }
    }
}
