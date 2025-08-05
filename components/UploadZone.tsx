'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Photo {
  file: File;
  preview: string;
  description: string;
}

interface UploadZoneProps {
  onUpload: (photos: Photo[]) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos: Photo[] = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      description: ''
    }));
    onUpload(newPhotos);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`
        p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">放開來上傳照片...</p>
      ) : (
        <p className="text-gray-600">
          拖放照片到這裡，或點擊選擇照片
          <br />
          <span className="text-sm text-gray-400">
            支援的格式: JPG, PNG, WebP
          </span>
        </p>
      )}
    </div>
  );
}
