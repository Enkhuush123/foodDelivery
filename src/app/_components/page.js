"use client";
import { useState } from "react";
import Image from "next/image";

const UPLOAD_PRESET = "testLesson";
const CLOUD_NAME = "dgivvztkg";

export default function Home() {
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setLogoUrl(url);
      alert("Logo uploaded successfully!");
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Cloudinary Image Upload Example
        </h1>

        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Upload Single Img
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            disabled={uploading}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          {uploading && <p className="text-blue-600">Uploading...</p>}
          {logoUrl && (
            <div className="mt-4">
              <p className="text-green-600 font-semibold mb-2">
                Logo uploaded!
              </p>
              <div className="relative w-64 h-64">
                <Image
                  src={logoUrl}
                  alt="Uploaded logo"
                  fill
                  className="object-contain rounded border border-gray-300"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 break-all">{logoUrl}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
