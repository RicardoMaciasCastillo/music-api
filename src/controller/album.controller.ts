import { JwtAuthGuard } from "@/auth/auth.guard";
import { CreateAlbumRequest } from "@/dto/album/create-album-request.dto";
import { Album } from "@/entity/album";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AlbumService } from "src/service/album.service";

@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiBearerAuth('JWT')
@ApiTags('AlbumController')
@UseGuards(JwtAuthGuard)
@Controller({
    path: '/albums'
})
export class AlbumController {

    constructor(private readonly albumService: AlbumService) {

    }

    @Get('/get-by-artist/:artistId')
    @ApiOperation({ summary: 'Get albums by artist id' })
    @ApiResponse({ status: 200, description: 'Artist list obtained correctly.', type: Album, })
    public async getAlbumsByArtistId(@Param('artistId') artistId: number) {
        return await this.albumService.getAlbumsByArtistId(artistId);
    }

    @Get('/:albumId')
    @ApiOperation({ summary: 'Get album by album id' })
    @ApiResponse({ status: 200, description: 'Album obtained correctly.' })
    public async getAlbum(@Param('albumId') albumId: number) {
        return await this.albumService.getAlbum(albumId);
    }

    @Post()
    @ApiOperation({ summary: 'Creates an album' })
    @ApiResponse({ status: 201, description: 'Album created correctly.' })
    public async createAlbum(@Body() album: CreateAlbumRequest) {
        return await this.albumService.createAlbum(album);
    }


}