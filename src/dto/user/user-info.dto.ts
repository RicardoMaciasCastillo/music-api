import { UserType } from "@/type/user.type";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserInfo {

    @Expose() name: string;
    @Expose() email: string;
    @Expose() type: UserType;

}