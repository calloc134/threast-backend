import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class DeleteUserRequestDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    password: string;
}
