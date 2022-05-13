import { JwtAuthGuard } from "@/auth/auth.guard";
import { CreateAlbumRequest } from "@/dto/album/create-album-request.dto";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AlbumService } from "src/service/album.service";

@UseGuards(JwtAuthGuard)
@Controller({
    path: '/albums'
})
export class AlbumController {

    constructor(private readonly albumService: AlbumService) {

    }

    @Get('/get-by-artist/:artistId')
    public async getAlbumsByArtistId(@Param('artistId') artistId: number) {
        return await this.albumService.getAlbumsByArtistId(artistId);
    }

    @Get('/:albumId')
    public async getAlbum(@Param('albumId') albumId: number) {
        return await this.albumService.getAlbum(albumId);
    }

    @Post()
    public async createAlbum(@Body() album: CreateAlbumRequest) {
        return await this.albumService.createAlbum(album);
    }


}