import { Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from "@nestjs/common";
import { ArtistService } from "src/service/artist.service";
import { SongService } from "src/service/song.service";

@Controller({
    path: '/artists'
})
export class ArtistController {

    constructor(private readonly artistService: ArtistService) {

    }

    @Get()
    public async getArtist(@Query() req: any) {
        return await this.artistService.getArtist(req.name);
    }

}