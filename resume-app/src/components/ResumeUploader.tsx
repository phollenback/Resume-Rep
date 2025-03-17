"use client";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

export function ResumeUploader({ userId }: { userId: number }) {
  return (
    <div className="w-full">
      <UploadButton
        endpoint="resumeUploader"
        headers={{ userId: userId.toString() }}
        onClientUploadComplete={() => {
          toast("Upload Completed", {
            description: "Your resume has been successfully uploaded",
          });
        }}
        onUploadError={(error: Error) => {
          toast.error("Upload Error", {
            description: error.message,
          });
        }}
        appearance={{
          button: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors",
          container: "w-full flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-700",
          allowedContent: "text-sm text-gray-500 dark:text-gray-400",
        }}
      />
    </div>
  );
} 