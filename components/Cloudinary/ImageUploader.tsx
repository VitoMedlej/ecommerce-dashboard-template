"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { CldImage } from "next-cloudinary";

const ImageUploader = ({
  uploadedImages,
  setUploadedImages,
}: {
  uploadedImages: string[];
  setUploadedImages: Dispatch<SetStateAction<string[]>>;
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) return;

    setIsUploading(true);

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "new_present");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dwxm8f25f/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.secure_url) {
          setUploadedImages((prev) => [...prev, data.secure_url]);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setIsUploading(false);
  };

  const handleDelete = (url: string) => {
    setUploadedImages((prev) => prev.filter((image) => image !== url));
  };

  const handleClear = () => {
    setUploadedImages([]);
  };

  return (
    <div className="space-y-4 pt-2">
      <h2>Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
      <div className="flex grid grid-cols-2 md:grid-cols-3 gap-4">
        {uploadedImages.map((url, index) => (
          <div key={index} className="relative">
            <CldImage
              src={url}
              width="100"
              height="100"
              alt={`Uploaded Image ${index + 1}`}
              className="rounded shadow"
            />
            <button
              onClick={() => handleDelete(url)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              X
            </button>
          </div>
        ))}
      </div>
      {isUploading && <p>Uploading...</p>}
      {uploadedImages.length > 0 && (
        <button
          onClick={handleClear}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
