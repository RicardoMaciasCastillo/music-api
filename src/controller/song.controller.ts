import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from "@nestjs/common";
import { Song } from "src/entity/song";
import { SongService } from "src/service/song.service";


@Controller({
    path: '/songs'
})
export class SongController {

    constructor(private readonly songService: SongService) {

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
    public async createSong(@Body() song: Song) {
        return await this.songService.createSong(song);
    }

    @Put('/:id')
    public async update(@Param('id') id: number, @Body() song: Song ) {
        return await this.songService.updateSong(id, song);
    }

    @Patch('/:id')
    public async partialUpdate(@Param('id') id: number, @Body() song: Song ) {
        return await this.songService.partialUpdateSong(id, song);
    }

    @Delete('/:id')
    public async delete(@Param('id') id: number) {
        return await this.songService.deleteSong(id);
    }
    // patch delete

}