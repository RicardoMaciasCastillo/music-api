import { CreateAlbumRequest } from "@/dto/album/create-album-request.dto";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Album } from "src/entity/album";
import { Artist } from "src/entity/artist";
import { Repository } from "typeorm";
import { FileService } from "./file.service";

import * as moment from 'moment';

@Injectable()
export class AlbumService {
    
    @Inject(FileService)
    private readonly fileService: FileService;

    constructor(@InjectRepository(Album) private albumRepository: Repository<Album>,
                @InjectRepository(Artist) private artistRepository: Repository<Artist>) {

    }

    public async getAlbum(albumId: number) {

        const album = await this.albumRepository.findOneBy({
            id: albumId
        });

        return album;
    }

    public async getAlbumsByArtistId(artistId: number) {

        const albums = await this.albumRepository.find({
            where: {
                artist: {
                    id: artistId
                }
            }
        });

        return albums;
    }

    public async createAlbum(createAlbumRequest: CreateAlbumRequest) {

        const album = plainToInstance(Album, createAlbumRequest);

        const artist = await this.artistRepository.findOne({
            where: {
                id: createAlbumRequest.artistId
            }
        });

        album.releaseDate = moment(createAlbumRequest.releaseDate, 'DD-MM-YYYY').toDate();
        album.artist = artist;

        await this.albumRepository.save(album);
        const imageUrl = await this.fileService.uploadImage(album.uuid, createAlbumRequest.image);

        await this.albumRepository.update(album.id, {
            imageUrl: imageUrl
        });

        return {
            message: 'Album created correctly'
        };
    }

}