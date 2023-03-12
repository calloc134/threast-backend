import { UserAuthResponseDto } from '@common/dto/res/resauth-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserAdminRequestDto } from './dto/update-admin.dto';
import { hash } from 'argon2';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<UserAuthResponseDto[]> {
        const resultarray = (
            await this.prisma.user.findMany({
                orderBy: {
                    id: 'asc',
                },
            })
        ).map((one) => {
            return new UserAuthResponseDto(one);
        });
        return resultarray;
    }

    async findOne(reqScreenName: string): Promise<UserAuthResponseDto> {
        const result = await this.prisma.user.findUniqueOrThrow({
            where: {
                screenName: reqScreenName,
            },
        });

        return new UserAuthResponseDto(result);
    }
    async update(
        reqCurrentscreenName,
        updateUserAdminRequestDto: UpdateUserAdminRequestDto,
    ): Promise<UserAuthResponseDto> {
        const {
            screenName: reqNewscreenName,
            comment: reqComment,
            privateComment: reqPrivateComment,
            role: reqRole,
            password: reqNewPassword,
        } = updateUserAdminRequestDto;

        const result = await this.prisma.user.update({
            where: {
                screenName: reqCurrentscreenName,
            },
            data: {
                screenName: reqNewscreenName,
                password: await hash(reqNewPassword),
                comment: reqComment,
                privateComment: reqPrivateComment,
                role: reqRole,
                lastUpdateDate: new Date(),
            },
        });

        return new UserAuthResponseDto(result);
    }

    async delete(reqScreenName: string): Promise<UserAuthResponseDto> {
        const result = await this.prisma.user.delete({
            where: {
                screenName: reqScreenName,
            },
        });

        return new UserAuthResponseDto(result);
    }
}
