"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function CreateResumeForm() {
  const [file, setFile] = useState<File | null>(null);
  const { startUpload, isUploading } = useUploadThing("resumeUploader", {
    onUploadError: (error) => {
      toast.error("Upload Error", {
        description: error.message,
      });
      console.error("UploadThing Error:", error);
    },
    onUploadBegin: (file) => {
      toast.info("Upload Starting", {
        description: `Uploading file: ${file}`,
      });
    },
    onClientUploadComplete: (res) => {
      toast.success("Upload Completed", {
        description: `File uploaded successfully: ${res[0].url}`,
      });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Maximum file size is 4MB",
      });
      return;
    }

    await startUpload([file]);
  };

  return (
    <div className="w-full space-y-4">
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
        Upload Resume
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        disabled={isUploading}
      />
      <Button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="w-full"
      >
        {isUploading ? "Uploading..." : "Upload Resume"}
      </Button>
    </div>
  );
} 