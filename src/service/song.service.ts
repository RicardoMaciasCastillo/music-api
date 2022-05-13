import { CreateSongRequest } from "@/dto/song/create-song-request.dto";
import { Album } from "@/entity/album";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Song } from "src/entity/song";
import { Repository } from "typeorm";
import { FileService } from "./file.service";

@Injectable()
export class SongService {

    @Inject(FileService)
    private readonly fileService: FileService;

    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>,
        @InjectRepository(Song) private albumRepository: Repository<Album>) {

    }

    public async getSongsByAlbumId(albumId: number) {

        const songs = await this.songRepository.find({
            where: {
                album: {
                    id: albumId
                }
            }
        });

        return songs;

    }

    public async getSongs(type?: string) {

        if (type)
            return await this.songRepository.find({
                where: {
                    type: type
                }
            });

        return await this.songRepository.find();
    }

    public async getSong(id: number) {

        if (await this.songExists(id)) {

            const foundSong = await this.songRepository.findOneBy({
                id: id
            });

            return foundSong;

        } else {
            return {
                message: 'Error. Id does not exist'
            };
        }
    }

    public async createSong(createSongRequest: CreateSongRequest) {

        console.log('CREATE SONG:', createSongRequest);

        const song = plainToInstance(Song, createSongRequest);

        const album = await this.albumRepository.findOne({
            where: {
                id: createSongRequest.albumId
            }
        });

        song.album = album;

        await this.songRepository.save(song);

        const previewUrl = await this.fileService.uploadSong(
            song.uuid, album.id, createSongRequest.previewFile);

        await this.songRepository.update(song.id, {
            previewUrl: previewUrl
        });

        return {
            message: 'Song created well'
        };
    }

    public async updateSong(id: number, song: Song ) {

        const foundSong = await this.songRepository.findOneBy({
            id: id
        });

        if (foundSong) {

            foundSong.name = song.name;
            foundSong.duration = song.duration;
            foundSong.type = song.type;
            foundSong.previewUrl = song.previewUrl;
            foundSong.price  = song.price;
            foundSong.top = song.top;

            await this.songRepository.save(foundSong);

            return {
                message: 'Song updated well'
            };

        } else {
            return {
                message: 'Error. Id does not exist'
            };
        }

    }
    
    public async partialUpdateSong(id: number, song: Song ) {

        if (await this.songExists(id)) {

            const foundSong = await this.songRepository.findOneBy({
                id: id
            });
    
            if (song.name)
                foundSong.name = song.name;
            
            if (song.duration)
                foundSong.duration = song.duration;
    
            if (song.type)
                foundSong.type = song.type;
    
            if (song.previewUrl)
                foundSong.previewUrl = song.previewUrl;
    
            if (song.price)
                foundSong.price = song.price;
    
            if (song.top)
                foundSong.top = song.top;
            
            await this.songRepository.save(foundSong);
    
            return {
                message: 'Partial update worked'
            };

        } else {
            return {
                message: 'Error. Id does not exist'
            };
        }

    }

    public async deleteSong(id: number) {

        if (await this.songExists(id)) {

            await this.songRepository.delete(id);

            return {
                message: 'Song deleted'
            };

        } else {
            return {
                message: 'Error. Id does not exist'
            };
        }
    }

    private async songExists(id: number): Promise<boolean> {

        const count = await this.songRepository.countBy({
            id: id
        });

        return count > 0;
    }

}