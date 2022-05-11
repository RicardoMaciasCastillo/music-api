import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SingUpRequest {

    @IsString()
    @IsNotEmpty()
    name: string;

    @Trim()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
    
}