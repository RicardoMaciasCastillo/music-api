import { UserInfo } from "@/dto/user/user-info.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass, plainToInstance } from "class-transformer";
import { User } from "src/entity/user";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {


    }

    public getUserInfo(req: any) {
        return plainToInstance(UserInfo, req.user);
    }

}