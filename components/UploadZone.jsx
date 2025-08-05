import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

export default function UploadZone({ onUpload }) {
  const [files, setFiles] = useState([]);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        description: ''
      })));
    }
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-8">
      <input {...getInputProps()} />
      <p>拖放照片或點擊上傳</p>
    </div>
  );
}
