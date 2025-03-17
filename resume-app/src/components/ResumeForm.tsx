"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const formSchema = z.object({
  positionTitle: z.string().min(1),
  company: z.string().min(1),
  keywords: z.string().min(1),
  fileUrl: z.string().optional(),
});

export function ResumeForm() {
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Resume created successfully");
      } else {
        throw new Error("Failed to create resume");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error("Error creating resume", {
        description: message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("positionTitle")} placeholder="Position Title" required />
      <Input {...register("company")} placeholder="Company" required />
      <Textarea {...register("keywords")} placeholder="Keywords (comma separated)" required />
      <UploadButton
        endpoint="resumeUploader"
        onClientUploadComplete={(res) => {
          setValue("fileUrl", res[0].url);
          toast.success("File uploaded successfully");
        }}
        onUploadError={(error) => {
          toast.error("File upload failed", {
            description: error.message,
          });
        }}
      />
      <Button type="submit">Create Resume</Button>
      <Button variant="outline" asChild className="ml-2">
        <Link href="/">Back to Home</Link>
      </Button>
    </form>
  );
} 