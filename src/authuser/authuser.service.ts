import { DeleteUserRequestDto } from '@common/dto/req/delete-user.dto';
import { UpdateUserRequestDto } from '@common/dto/req/update-user.dto';
import { UserAuthResponseDto } from '@common/dto/res/resauth-user.dto';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordDoesNotMatch } from '@common/exceptions/exceptions';
import { hash, verify } from 'argon2';
import { PasswordUserAuthRequestDto } from './dto/password-dto';

@Injectable()
export class AuthuserService {
    constructor(private prisma: PrismaService) {}

    async profile(request: Request): Promise<UserAuthResponseDto> {
        const nowId = request.session.userid;
        const result = await this.prisma.user.findUniqueOrThrow({
            where: {
                id: nowId,
            },
        });

        return new UserAuthResponseDto(result);
    }

    async update(
        request: Request,
        updateUserRequestDto: UpdateUserRequestDto,
    ): Promise<UserAuthResponseDto> {
        const nowId = request.session.userid;

        const {
            userName: reqUserName,
            screenName: reqScreenName,
            comment: reqComment,
            privateComment: reqPrivateComment,
        } = updateUserRequestDto;

        const result = await this.prisma.user.update({
            where: {
                id: nowId,
            },
            data: {
                userName: reqUserName,
                screenName: reqScreenName,
                comment: reqComment,
                privateComment: reqPrivateComment,
                lastUpdateDate: new Date(),
            },
        });

        return new UserAuthResponseDto(result);
    }

    async password(
        request: Request,
        passwordUserAuthRequestDto: PasswordUserAuthRequestDto,
    ): Promise<UserAuthResponseDto> {
        const myId = request.session.userid;
        const {
            currentpassword: reqCurrentPassword,
            newpassword: reqNewPassword,
        } = passwordUserAuthRequestDto;
        const { password: hashed_password } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: myId,
                },
            });

        if (!(await verify(hashed_password, reqCurrentPassword))) {
            throw new PasswordDoesNotMatch();
        }

        const result = await this.prisma.user.update({
            where: {
                id: myId,
            },
            data: {
                password: await hash(reqNewPassword),
            },
        });

        return new UserAuthResponseDto(result);
    }

    async delete(
        request: Request,
        deleteUserRequestDto: DeleteUserRequestDto,
    ): Promise<UserAuthResponseDto> {
        const myId = request.session.userid;

        const { password: reqPassword } = deleteUserRequestDto;
        const { password: hashed_password } =
            await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: myId,
                },
            });

        if (!(await verify(hashed_password, reqPassword))) {
            throw new PasswordDoesNotMatch();
        }

        const result = await this.prisma.user.delete({
            where: {
                id: myId,
            },
        });

        return new UserAuthResponseDto(result);
    }
}
