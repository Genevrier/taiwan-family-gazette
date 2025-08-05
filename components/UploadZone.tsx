'use client';

import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';

interface Photo {
  file: File;
  preview: string;
  description: string;
}

interface UploadZoneProps {
  onUpload: (files: Photo[]) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const [files, setFiles] = useState<Photo[]>([]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      const filesWithPreview = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        description: ''
      }));
      setFiles(filesWithPreview);
      onUpload(filesWithPreview);
    }
  });

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const updateDescription = (index: number, description: string) => {
    const updatedFiles = [...files];
    updatedFiles[index].description = description;
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  return (
    <>
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <div className="text-gray-600">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-lg font-medium">拖放照片或點擊上傳</p>
          <p className="text-sm mt-1">支援 JPG, PNG 格式</p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {files.map((file, idx) => (
            <div key={idx} className="border rounded-lg p-3">
              <img 
                src={file.preview} 
                alt={`預覽 ${idx + 1}`}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <textarea
                placeholder="添加描述..."
                value={file.description}
                onChange={(e) => updateDescription(idx, e.target.value)}
                className="w-full p-2 border rounded text-sm resize-none"
                rows={2}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
