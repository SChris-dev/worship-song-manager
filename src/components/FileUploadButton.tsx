import React, { useRef } from 'react';

interface FileUploadButtonProps {
  onFileSelect: (file: File) => void;
  label: string;
}

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect, label }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        {label}
      </button>
    </>
  );
};
