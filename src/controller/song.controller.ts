import { JwtAuthGuard } from "@/auth/auth.guard";
import { CreateSongRequest } from "@/dto/song/create-song-request.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { Song } from "src/entity/song";
import { SongService } from "src/service/song.service";

@UseGuards(JwtAuthGuard)
@Controller({
    path: '/songs'
})
export class SongController {

    constructor(private readonly songService: SongService) {

    }

    @Get('/get-by-album/:albumId')
    public async getSongsByAlbumId(@Param('albumId') albumId: number) {
        return await this.songService.getSongsByAlbumId(albumId);
    }

    @Get()
    public async getSongs(@Query() req: any) {
        return await this.songService.getSongs(req.type);
    }

    @Get('/:id')
    public async getSong(@Param('id') id: number) {
        return await this.songService.getSong(id);
    }

    @Post()
    public async createSong(@Body() song: CreateSongRequest) {
        return await this.songService.createSong(song);
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() song: Song) {
        return await this.songService.updateSong(id, song);
    }

    @Patch('/:id')
    public async partialUpdate(@Param('id') id: number, @Body() song: Song) {
        return await this.songService.partialUpdateSong(id, song);
    }

    @Delete('/:id')
    public async delete(@Param('id') id: number) {
        return await this.songService.deleteSong(id);
    }

}