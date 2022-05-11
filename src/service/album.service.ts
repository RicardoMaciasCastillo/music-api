import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "src/entity/album";
import { Artist } from "src/entity/artist";
import { Repository } from "typeorm";

@Injectable()
export class AlbumService {

    constructor(@InjectRepository(Album) private albumRepository: Repository<Album>,
                @InjectRepository(Artist) private artistRepository: Repository<Artist>) {

    }

    public async getAlbums(artistName: string) {

        const artist = await this.artistRepository.findOneBy({
            name: artistName
        });

        return artist.albums;
    }

}