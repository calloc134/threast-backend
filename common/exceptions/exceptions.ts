import {
    NotAcceptableException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(message: string = 'The specified user does not exist.') {
        super(message);
    }
}

export class PasswordDoesNotMatch extends UnauthorizedException {
    constructor(message: string = 'Password authentication failed.') {
        super(message);
    }
}

export class UserAlreadyExistException extends NotAcceptableException {
    constructor(message: string = 'This screenName already exists.') {
        super(message);
    }
}
