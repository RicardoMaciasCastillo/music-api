import { Constants } from "@/common/constants";
import { getS3Client } from "@/common/helper/aws.helper";
import { Injectable } from "@nestjs/common";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import { S3 } from "aws-sdk";

@Injectable()
export class FileService {

    private S3Client: S3;

    constructor() {
        this.S3Client = getS3Client();
    }

    public async uploadSong(identifier: string, albumId: number, song: any) {

        let storageConfig = Constants.storageConfig;

        let buf = Buffer.from(song.content.replace(/^data:image\/\w+;base64,/, ""), 'base64');

        let extension = song.type.includes('mp3') ? 'mp3' : (song.type.includes('mpeg') ? 'mp3' : 'mp3');
        let key = `${storageConfig.imagesKey}/songs/${albumId}/${identifier}.${extension}`;

        let putObjectRequest: PutObjectRequest = {
            Bucket: storageConfig.defaultBucket,
            Key: key,
            ContentEncoding: 'base64',
            ContentType: song.type,
            Body: buf,
            ACL: 'public-read'
        };

        await this.S3Client.putObject(putObjectRequest).promise();

        return `${Constants.storageConfig.publicBaseUrl}/${key}`;

    }
    
    public async uploadImage(identifier: string, image: any) {

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