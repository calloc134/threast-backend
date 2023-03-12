import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserResponseDto {
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
    comment: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
