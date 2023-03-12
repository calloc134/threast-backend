import { Controller, Req, UseGuards, Get, Put, Delete, Body } from "@nestjs/common";
import { Request } from "express";
import { SessionGuard } from "src/auth/guard/session-auth.guard";
import { AuthuserService } from "./authuser.service";
import { UpdateUserRequestDto, } from "@common/dto/req/update-user.dto";
import { DeleteUserRequestDto } from "@common/dto/req/delete-user.dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserAuthResponseDto } from "@common/dto/res/resauth-user.dto";
import { PasswordUserAuthRequestDto } from "./dto/password-dto";
import { RoleGuard } from "src/auth/guard/role-auth.guard";
import { SetRole } from "src/auth/guard/role-auth.decorator";

@Controller("api/user")
@UseGuards(SessionGuard)
export class AuthuserController {
    constructor(private readonly authuserService: AuthuserService) {}

    @ApiOkResponse({type: UserAuthResponseDto})
    @Get("profile/me")
    async profile(@Req() request: Request) {
        return this.authuserService.profile(request);
    }

    @ApiOkResponse({type: UserAuthResponseDto})
    @Put("password")
    async password(@Req() request: Request, @Body() passwordUserAuthRequestDto:PasswordUserAuthRequestDto) {
        return this.authuserService.password(request, passwordUserAuthRequestDto)
    }

    @ApiOkResponse({type: UserAuthResponseDto})
    @Put("profile/me")
    async update(@Req() request: Request, @Body() updateUserRequestDto:UpdateUserRequestDto) {
        return this.authuserService.update(request, updateUserRequestDto)
    }

    @ApiOkResponse({type: UserAuthResponseDto})
    @Delete("profile/me")
    async delete(@Req() request: Request, @Body() deleteUserRequestDto:DeleteUserRequestDto) {
        return this.authuserService.delete(request,deleteUserRequestDto)
    }

    @ApiOkResponse({type: Boolean})
    @Get("profile/hoge")
    @SetRole("ADMIN", "SUBADMIN")
    @UseGuards(RoleGuard)
    async hoge() {
        return true
    }
}
