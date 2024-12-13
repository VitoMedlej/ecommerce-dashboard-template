"use client";

import React, { useState } from "react";
import { CldImage } from "next-cloudinary";

const ImageUploader: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "your-upload-preset"); // Set up in Cloudinary dashboard

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ file: formData }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.url) {
        setUploadedImages((prev) => [...prev, data.url]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {uploadedImages.map((url, index) => (
          <CldImage
            key={index}
            src={url}
            width="300"
            height="300"
            alt={`Uploaded Image ${index + 1}`}
            className="rounded shadow"
          />
        ))}
      </div>
      {isUploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUploader;
