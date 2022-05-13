
import { Constants } from "@/common/constants";
import { getS3Client } from "@/common/helper/aws.helper";
import { CreateArtistRequest } from "@/dto/artist/create-artist-request.dto";
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { plainToClass, plainToInstance } from "class-transformer";
import { Artist } from "src/entity/artist";
import { Repository } from "typeorm";
import { FileService } from "./file.service";

@Injectable()
export class ArtistService {

    @Inject(FileService)
    private readonly fileService: FileService;

    constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>) {
    }

    public async getArtists(name: string) {

        return await this.artistRepository.find({
            where: {
                name: name
            }
        });
    }

    public async getArtist(artistId: number) {

        return await this.artistRepository.findOne({
            where: {
                id: artistId
            }
        });
    }

    public async createArtist(createArtistRequest: CreateArtistRequest) {

        const artist = plainToInstance(Artist, createArtistRequest);

        await this.artistRepository.save(artist);
        const imageUrl = await this.fileService.uploadImage(artist.uuid, createArtistRequest.image);

        await this.artistRepository.update(artist.id, {
            imageUrl: imageUrl
        });

        return {
            message: 'Artist created correctly'
        };
    }

    public async deleteArtist(artistId: number) {

        await this.artistRepository.softDelete({
            id: artistId
        });

        return {
            message: 'Artist deleted correctly'
        };
    }

}