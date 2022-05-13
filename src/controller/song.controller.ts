import { JwtAuthGuard } from "@/auth/auth.guard";
import { CreateSongRequest } from "@/dto/song/create-song-request.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Song } from "src/entity/song";
import { SongService } from "src/service/song.service";

@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiBearerAuth('JWT')
@ApiTags('SongController')
@UseGuards(JwtAuthGuard)
@Controller({
    path: '/songs'
})
export class SongController {

    constructor(private readonly songService: SongService) {

    }

    @ApiOperation({ summary: 'Get songs by album id' })
    @ApiResponse({ status: 200, description: 'Songs list obtained correctly.', })
    @Get('/get-by-album/:albumId')
    public async getSongsByAlbumId(@Param('albumId') albumId: number) {
        return await this.songService.getSongsByAlbumId(albumId);
    }

    @ApiOperation({ summary: 'Get songs' })
    @ApiResponse({ status: 200, description: 'Songs obtained correctly.', })
    @Get()
    public async getSongs(@Query() req: any) {
        return await this.songService.getSongs(req.type);
    }

    @ApiOperation({ summary: 'Get song by id' })
    @ApiResponse({ status: 200, description: 'Song obtained correctly.', })
    @Get('/:id')
    public async getSong(@Param('id') id: number) {
        return await this.songService.getSong(id);
    }

    @ApiOperation({ summary: 'Create a song' })
    @ApiResponse({ status: 201, description: 'Songs created correctly.', })
    @Post()
    public async createSong(@Body() song: CreateSongRequest) {
        return await this.songService.createSong(song);
    }

    @ApiOperation({ summary: 'Update song' })
    @ApiResponse({ status: 200, description: 'Songs updated correctly.', })
    @Put('/:id')
    public async update(@Param('id') id: number, @Body() song: Song) {
        return await this.songService.updateSong(id, song);
    }

    @ApiOperation({ summary: 'Partially update a song' })
    @ApiResponse({ status: 200, description: 'Song updated partially.', })
    @Patch('/:id')
    public async partialUpdate(@Param('id') id: number, @Body() song: Song) {
        return await this.songService.partialUpdateSong(id, song);
    }

    @ApiOperation({ summary: 'Delete a song' })
    @ApiResponse({ status: 200, description: 'Song deleted.', })
    @Delete('/:id')
    public async delete(@Param('id') id: number) {
        return await this.songService.deleteSong(id);
    }

}