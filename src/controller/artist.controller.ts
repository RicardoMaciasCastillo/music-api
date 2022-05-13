import { JwtAuthGuard } from "@/auth/auth.guard";
import { CreateArtistRequest } from "@/dto/artist/create-artist-request.dto";
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ArtistService } from "src/service/artist.service";

@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiBearerAuth('JWT')
@ApiTags('ArtistController')
@UseGuards(JwtAuthGuard)
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

    @ApiOperation({ summary: 'Gets an artist by Id' })
    @ApiResponse({ status: 200, description: 'Artist gotten succesfully.' })
    @Get('/:artistId')
    public async getArtist(@Param('artistId') artistId: number) {
        return await this.artistService.getArtist(artistId);
    }

    @ApiOperation({ summary: 'Creates an artist' })
    @ApiResponse({ status: 201, description: 'Artist created succesfully.' })
    @Post()
    public async createArtist(@Body() artist: CreateArtistRequest) {
        return await this.artistService.createArtist(artist);
    }

    @ApiOperation({ summary: 'Deletes an artist' })
    @ApiResponse({ status: 200, description: 'Artist deleted succesfully.' })
    @Delete('/:artistId')
    public async deleteArtist(@Param('artistId') artistId: number) {
        return await this.artistService.deleteArtist(artistId);
    }

}