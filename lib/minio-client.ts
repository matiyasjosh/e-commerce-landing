// lib/minioClient.ts
import * as Minio from 'minio';

const minioClient: Minio.Client = new Minio.Client({
  endPoint: '127.0.0.1', // Your MinIO host (localhost when running locally)
  port: 9000,           // Your MinIO API port
  useSSL: false,        // Set to true if you configure SSL for MinIO
  accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
});

export default minioClient;