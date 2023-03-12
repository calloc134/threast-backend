import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Ip
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserRequestDto } from "@common/dto/req/create-user.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserResponseDto } from "@common/dto/res/res-user.dto";


@Controller("api/user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOkResponse({ type: UserResponseDto })
    @Post("signup")
    async create(@Body() createUserRequestDto: CreateUserRequestDto, @Ip() ip: string) {
        return this.userService.create(createUserRequestDto, ip);
    }

    @ApiOkResponse({ type: [UserResponseDto] })
    @Get("profile/all")
    async findAll() {
        return this.userService.findAll();
    }

    @ApiOkResponse({ type: UserResponseDto })
    @Get("profile/@:screenName")
    async findOne(@Param("screenName") screenName: string) {
        return this.userService.findOne(screenName);
    }

}
