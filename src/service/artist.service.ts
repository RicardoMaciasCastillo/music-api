import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "src/entity/artist";
import { Repository } from "typeorm";

@Injectable()
export class ArtistService {

    constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>) {

    }

    public async getArtist(name: string) {

        return await this.artistRepository.find({
            where: {
                name: name
            }
        });
    }

}