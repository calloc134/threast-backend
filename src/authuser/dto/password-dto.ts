import {
    IsNotEmpty,
    IsString,
    IsStrongPassword
} from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class PasswordUserAuthRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    currentpassword: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @ApiProperty({ required: true })
    newpassword: string;

}