import { Trim } from "class-sanitizer";
import { IsEmail, IsString } from "class-validator";

export class LoginRequest {

    @Trim()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
}