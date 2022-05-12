
import { Constants } from "@/common/constants";
import { getS3Client } from "@/common/helper/aws.helper";
import { CreateArtistRequest } from "@/dto/artist/create-artist-request.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { plainToClass, plainToInstance } from "class-transformer";
import { Artist } from "src/entity/artist";
import { Repository } from "typeorm";

@Injectable()
export class ArtistService {

    private S3Client: S3;

    constructor(@InjectRepository(Artist) private artistRepository: Repository<Artist>) {
        this.S3Client = getS3Client();
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
        const imageUrl = await this.uploadImage(artist.uuid, createArtistRequest.image);

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

    private async uploadImage(identifier: string, image: any) {

        let storageConfig = Constants.storageConfig;

        let buf = Buffer.from(image.content.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        let extension = image.type.includes('png') ? 'png' : (image.type.includes('jpeg') ? 'jpg' : 'jpg');
        let key = `${storageConfig.imagesKey}/artists/${identifier}.${extension}`;

        let putObjectRequest: PutObjectRequest = {
            Bucket: storageConfig.defaultBucket,
            Key: key,
            ContentEncoding: 'base64',
            ContentType: image.type,
            Body: buf,
            ACL: 'public-read'
        };

        await this.S3Client.putObject(putObjectRequest).promise();

        return `${Constants.storageConfig.publicBaseUrl}/${key}`;
    }

}