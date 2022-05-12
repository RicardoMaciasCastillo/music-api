import { IsObject, IsString } from "class-validator";

export class CreateArtistRequest {

    @IsString()
    name: string;

    @IsString()
    genre: string;

    @IsString()
    nationality: string;

    @IsObject()
    image: any;
    
}