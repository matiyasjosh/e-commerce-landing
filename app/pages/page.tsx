"use client"

// pages/index.tsx
import { useState, ChangeEvent, FormEvent } from 'react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setMessage('Getting pre-signed URL...');

    try {
      // 1. Get the pre-signed URL from your Next.js API route
      const getUrlResponse = await fetch(`/api/presigned_upload_url?filename=${encodeURIComponent(file.name)}`);
      if (!getUrlResponse.ok) {
        const errorData = await getUrlResponse.json();
        throw new Error(`Failed to get pre-signed URL: ${errorData.message}`);
      }
      const { presignedUrl, objectName }: { presignedUrl: string; objectName: string } = await getUrlResponse.json();

      setMessage(`Uploading ${objectName} directly to MinIO...`);

      // 2. Upload the file directly to MinIO using the pre-signed URL
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file, // Send the raw file directly
        headers: {
          'Content-Type': file.type, // Important for MinIO to set correct content type
        },
      });

      if (uploadResponse.ok) {
        setMessage(`Upload successful! Object: ${objectName}`);
        setFile(null); // Clear the file input
      } else {
        // MinIO might return an XML error body for PUT requests
        const errorText = await uploadResponse.text();
        throw new Error(`Direct upload failed: ${uploadResponse.status} - ${errorText}`);
      }
    } catch (error: any) {
      console.error('Upload process failed:', error);
      setMessage(`Upload failed: ${error.message || 'An unknown error occurred.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload File to MinIO (Direct Upload)</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} disabled={loading} />
        <button type="submit" disabled={!file || loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}