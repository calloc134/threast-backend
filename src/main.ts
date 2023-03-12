declare const module: any;

import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import { NestExpressApplication} from "@nestjs/platform-express"
import { AppModule } from "./app.module";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { PrismaErrorFilter } from "@common/exceptions/nouser/prisma.filter";
import * as session from "express-session";
import Redis from "ioredis";
import RedisStore from "connect-redis"
import { promises,} from "dns";

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    
    //app.useGlobalFilters(new NotFoundErrorFilter())

    const {address: nginxIp} = await promises.lookup("nginx")
    app.set("trust proxy", nginxIp)

    const {httpAdapter} = app.get(HttpAdapterHost)
    app.useGlobalFilters(new PrismaErrorFilter(httpAdapter))

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            //        disableErrorMessages: true,
        })
    );

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector), {
            excludeExtraneousValues: true,
        })
    )

    const config = new DocumentBuilder()
        .setTitle("EkanProton Backend API")
        .setDescription("The EkanProton Backend API description")
        .setVersion("0.0.1")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/swagger", app, document);

    const redis = new Redis(process.env.REDIS_URL);

    app.use(
        session({
            name: "SESSIONID",
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
//                secure: true,
//                sameSite: true,
//                httpOnly: true,
                maxAge: 1 * 24 * 60 * 60 * 1000,
            },
            store: new RedisStore({
                client: redis,
            }),
        })

        
    );

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
