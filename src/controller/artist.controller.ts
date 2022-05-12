import { CreateArtistRequest } from "@/dto/artist/create-artist-request.dto";
import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ArtistService } from "src/service/artist.service";

@Controller({
    path: '/artists'
})
export class ArtistController {

    constructor(private readonly artistService: ArtistService) {

    }

    @Get()
    public async getArtists(@Query() req: any) {
        return await this.artistService.getArtists(req.name);
    }

    @Get('/:artistId')
    public async getArtist(@Param('artistId') artistId: number) {
        return await this.artistService.getArtist(artistId);
    }

    @Post()
    public async createArtist(@Body() artist: CreateArtistRequest) {
        return await this.artistService.createArtist(artist);
    }

    @Delete('/:artistId')
    public async deleteArtist(@Param('artistId') artistId: number) {
        return await this.artistService.deleteArtist(artistId);
    }

}