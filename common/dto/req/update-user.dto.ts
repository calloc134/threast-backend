import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength, IsAlphanumeric } from "class-validator";

export class UpdateUserRequestDto {

    @IsOptional()
    @IsAlphanumeric()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({ required: false })
    screenName?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(40)
    @ApiProperty({ required: false })
    userName?: string;

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
}
