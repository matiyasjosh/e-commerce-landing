// app/api/presigned-upload-url/route.ts
import { NextResponse } from 'next/server';
import minioClient from '@/lib/minioClient'; // Adjust path based on your lib folder location
import { requireAuth } from '@/lib/serverAuth';
import { v4 as uuid } from 'uuid';

export async function POST(request: Request) {
  await requireAuth();
  const { filenames } = await request.json()
  const bucketName = 'my-nextjs-bucket';
  
  
  try {
    const bucketExists: boolean = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
    }

    const urls = await Promise.all(
      filenames.map(async (filename: string) => {
        const ext = filename?.split(".").pop();
        const objectName = `products/${uuid()}.${ext}`;

        const uploadUrl = await minioClient.presignedPutObject(bucketName, objectName, 24 * 60 * 60);
        const fileUrl = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${objectName}`;

        return { uploadUrl, fileUrl};
      })
    )

    return NextResponse.json({ urls })
  } catch (error: any) {
    console.error('Error generating pre-signed URL:', error);
    return NextResponse.json({ message: 'Failed to generate pre-signed URL.' }, { status: 500 });
  }
}