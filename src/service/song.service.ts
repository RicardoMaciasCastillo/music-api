import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Song } from "src/entity/song";
import { Repository } from "typeorm";

@Injectable()
export class SongService {

    constructor(@InjectRepository(Song) private songRepository: Repository<Song>) {

    }

    public async getSongs(type?: string) {

        console.log('type:', type);

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

    public async createSong(song: Song) {

        await this.songRepository.save(song);

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