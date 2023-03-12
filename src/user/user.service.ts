import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequestDto } from '@common/dto/req/create-user.dto';
import { hash } from 'argon2';
import { UserResponseDto } from '@common/dto/res/res-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(
        createUserRequestDto: CreateUserRequestDto,
        ip: string
    ): Promise<UserResponseDto> {

        console.log(ip)
        const { screenName: reqScreenName, userName: reqUserName,password: reqPassword } =
            createUserRequestDto;

        const result = await this.prisma.user.create({
            data: {
                userName: reqUserName,
                screenName: reqScreenName,
                password: await hash(reqPassword),
                lastLoginDate: new Date(),
                lastUpdateDate: new Date(),
                createIp: ip,
                lastLoginIp: ip,
            },
        });

        return new UserResponseDto(result);
    }

    async findAll(): Promise<UserResponseDto[]> {
        const resultarray = (
            await this.prisma.user.findMany({
                orderBy: {
                    id: 'asc',
                },
            })
        ).map((one) => {
            return new UserResponseDto(one);
        });
        return resultarray;
    }

    async findOne(reqScreenName: string): Promise<UserResponseDto> {
        const result = await this.prisma.user.findUniqueOrThrow({
            where: {
                screenName: reqScreenName,
            },
        });

        return new UserResponseDto(result);
    }
}
