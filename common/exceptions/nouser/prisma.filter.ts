import { ArgumentsHost, BadRequestException, Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import {
    Prisma,
} from "@prisma/client";
import { UserAlreadyExistException, UserNotFoundException } from "../exceptions";

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.NotFoundError)
export class PrismaErrorFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
      console.log(exception.code)
      console.log(exception.message)
        if (exception.code === "P2025") {
            super.catch(new UserNotFoundException(), host);
        }
        else if (exception.code === "P2002"){
          super.catch(new UserAlreadyExistException(), host)
        } else {
          super.catch(new BadRequestException(exception.message), host)
        }
    }
}
