import { MinLength, MaxLength } from "class-validator"
import { Exclude, Expose } from "class-transformer"

export class UserEntity {
    @Expose()
    id: number;
    
    @MinLength(6)
    @MaxLength(100)
    @Exclude({ toPlainOnly: true })
    password: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
