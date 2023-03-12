import { Module,  } from "@nestjs/common";
import { HogeController } from "./hoge.controller";
import { HogeService } from "./hoge.service";

@Module({
    controllers: [HogeController],
    providers: [HogeService],
})
export class HogeModule {

}
