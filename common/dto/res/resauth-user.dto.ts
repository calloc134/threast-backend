import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Role } from "@prisma/client";

export class UserAuthResponseDto {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    screenName: string;

    @Expose()
    @ApiProperty()
    userName: string;

    @Expose()
    @ApiProperty()
    createdAt: Date;

    @Expose()
    @ApiProperty()
    lastLoginDate: Date;

    @Expose()
    @ApiProperty()
    lastUpdateDate: Date

    @Expose()
    @ApiProperty()
    comment: string;

    @Expose()
    @ApiProperty()
    privateComment: string;

    @Expose()
    @ApiProperty()
    role: Role

    constructor(partial: Partial<UserAuthResponseDto>) {
        Object.assign(this, partial);
    }
}
