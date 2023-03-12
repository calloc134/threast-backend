import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEnum, IsOptional, IsString, MaxLength, MinLength, IsStrongPassword } from "class-validator";

export class UpdateUserAdminRequestDto {

    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: false })
    screenName?: string;

    @IsOptional()
    @IsString()
    @IsStrongPassword()
    @ApiProperty({ required: true })
    password: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @ApiProperty({required: false})
    comment?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    @ApiProperty({required: false})
    privateComment?: string

    @IsOptional()
    @IsEnum(Role)
    @ApiProperty({required: false})
    role: Role
}
