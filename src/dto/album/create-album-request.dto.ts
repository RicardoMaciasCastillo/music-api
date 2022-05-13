import { IsNumber, IsObject, IsString } from "class-validator";

export class CreateAlbumRequest {

    @IsString()
    name: string;

    @IsString()
    type: string;
    
    @IsNumber()
    price: number;

    @IsString()
    releaseDate: string;

    @IsObject()
    image: any;

    @IsNumber()
    artistId: number;

}