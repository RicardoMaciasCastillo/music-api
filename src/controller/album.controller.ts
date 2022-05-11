import { Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from "@nestjs/common";
import { AlbumService } from "src/service/album.service";

@Controller({
    path: '/albums'
})
export class AlbumController {

    constructor(private readonly albumService: AlbumService) {

    }

    @Get()
    public async getAlbums(@Query() req: any) {
        return await this.albumService.getAlbums(req.artistName);
    }

}