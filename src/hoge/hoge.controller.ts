import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { UserEntity } from "./hogeclass";
import { UseInterceptors } from "@nestjs/common";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { ApiOkResponse } from '@nestjs/swagger';
import { HogeService } from './hoge.service';

@Controller('api/hoge')
export class HogeController {

    constructor (private readonly hogeservice: HogeService){}

    @Get("hogeapi")
    @ApiOkResponse({ type: UserEntity })
    findOne(): UserEntity {

        const hoge = {
            id: 1,
            password: "password",
            unko: "unko"
        }

        return new UserEntity(hoge);
    }


}
