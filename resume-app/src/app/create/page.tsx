"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

const formSchema = z.object({
  positionTitle: z.string().min(1, "Position title is required"),
  company: z.string().min(1, "Company name is required"),
  keywords: z.string().min(1, "Keywords are required"),
  file: z.any().optional() // Make file optional in schema
});

interface FormData {
  positionTitle: string;
  company: string;
  keywords: string;
  file?: FileList; // Make file optional
}

export default function CreatePage() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const { startUpload } = useUploadThing("resumeUploader");

  const onSubmit = async (data: FormData) => {
    try {
      const file = data.file?.[0];
      
      // Manual file validation
      if (!file) {
        setError("file", { message: "File is required" });
        return;
      }
      
      if (file.size > 4 * 1024 * 1024) {
        setError("file", { message: "File size must be less than 4MB" });
        return;
      }

      clearErrors("file");

      // First upload the file
      const uploadResult = await startUpload([file]);
      if (!uploadResult?.[0]?.url) {
        throw new Error("File upload failed");
      }

      // Then insert into database
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          positionTitle: data.positionTitle,
          company: data.company,
          keywords: data.keywords,
          fileUrl: uploadResult[0].url,
          date: new Date().toISOString(),
          completed: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Database insert failed");
      }

      toast.success("Resume created successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error("Error creating resume", {
        description: message,
      });
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Resume</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Position Title */}
          <div className="space-y-2">
            <Label htmlFor="positionTitle">Position Title</Label>
            <Input
              id="positionTitle"
              placeholder="Software Engineer"
              {...register("positionTitle")}
            />
            {errors.positionTitle && (
              <p className="text-sm text-red-500">{errors.positionTitle.message}</p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Acme Corp"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company.message}</p>
            )}
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Textarea
              id="keywords"
              placeholder="React, Node.js, TypeScript"
              className="min-h-[100px]"
              {...register("keywords")}
            />
            {errors.keywords && (
              <p className="text-sm text-red-500">{errors.keywords.message}</p>
            )}
            <p className="text-sm text-gray-500">Separate keywords with commas</p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file">Resume File</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx"
              {...register("file")}
            />
            {errors.file && (
              <p className="text-sm text-red-500">{errors.file.message?.toString()}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Creating..." : "Create Resume"}
          </Button>
        </form>
      </div>
    </div>
  );
} 