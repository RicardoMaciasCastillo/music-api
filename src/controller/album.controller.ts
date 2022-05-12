import { Controller, Get, Param, Query } from "@nestjs/common";
import { AlbumService } from "src/service/album.service";

@Controller({
    path: '/albums'
})
export class AlbumController {

    constructor(private readonly albumService: AlbumService) {

    }

    @Get('/get-by-artist/:artistId')
    public async getAlbumsByArtistId(@Param('artistId') artistId: number) {
        console.log('ARTIST_ID:', artistId);
        return await this.albumService.getAlbumsByArtistId(artistId);
    }

    @Get()
    public async getAlbums(@Query() req: any) {
        return await this.albumService.getAlbums(req.artistName);
    }

}