import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsAlphanumeric,
    MaxLength,
    MinLength,
    IsStrongPassword,
} from "class-validator";

export class LoginAuthRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    screenName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    password: string;
}
