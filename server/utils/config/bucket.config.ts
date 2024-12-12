import { S3Client } from '@aws-sdk/client-s3'

export const space = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  useAccelerateEndpoint: false,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY!,
    secretAccessKey: process.env.DO_SPACES_SECRET!,
  },
  forcePathStyle: true,
})

export const BUCKET_NAME = process.env.DO_SPACES_NAME!
