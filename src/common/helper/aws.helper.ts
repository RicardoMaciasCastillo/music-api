
import { awsConfig } from '@/config/aws-config';
import { S3 } from 'aws-sdk';

export const getS3Client = (): S3 => {
    return new S3(awsConfig);
};