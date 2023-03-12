import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsAlphanumeric,
    MaxLength,
    MinLength,
    IsStrongPassword,
} from "class-validator";

export class CreateUserRequestDto {
    @IsNotEmpty()
    @IsAlphanumeric()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: true })
    screenName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(40)
    @ApiProperty({ required: false })
    userName: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @ApiProperty({ required: true })
    password: string;
}
