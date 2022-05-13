import { IsBoolean, IsNumber, IsObject, IsString } from "class-validator";

export class CreateSongRequest {

    @IsString()
    name: string;

    @IsNumber()
    duration: number;

    @IsString()
    type: string;

    @IsObject()
    previewFile: any;

    @IsNumber()
    price: number;

    @IsBoolean()
    top: boolean;

    @IsNumber()
    albumId: number;

}