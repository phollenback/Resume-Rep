"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { 
  CheckCircle2, 
  PhoneCall, 
  Code2, 
  Users, 
  UserPlus, 
  Award, 
  Briefcase,
  ChevronRight
} from "lucide-react";

const STEPS = [
  { label: "Applied", value: "applied", points: 10, icon: CheckCircle2 },
  { label: "Phone Screen", value: "phone_screen", points: 20, icon: PhoneCall },
  { label: "Technical Test", value: "technical_test", points: 30, icon: Code2 },
  { label: "Interview 1", value: "interview_1", points: 50, icon: Users },
  { label: "Interview 2", value: "interview_2", points: 70, icon: UserPlus },
  { label: "Offer Received", value: "offer_received", points: 100, icon: Award },
  { label: "Hired", value: "hired", points: 150, icon: Briefcase }
];

interface DetailedProgressProps {
  resumeId: number;
  initialProgress: string;
  completed: number;
}

export function DetailedProgress({ resumeId, initialProgress, completed }: DetailedProgressProps) {
  const [progress, setProgress] = useState(initialProgress);
  const currentStepIndex = STEPS.findIndex(step => step.value === progress);

  const handleProgress = async (newProgress: string) => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: newProgress }),
      });

      if (response.ok) {
        setProgress(newProgress);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className="space-y-6 font-['Times_New_Roman']">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold text-primary">Application Progress</span>
        <span className="text-lg text-muted-foreground">{completed}%</span>
      </div>
      <Progress value={completed} className="h-4 bg-background rounded-full" />
      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStepIndex;
          const isNext = index === currentStepIndex + 1;
          
          return (
            <div key={step.value} className="relative">
              {index > 0 && (
                <div className={`absolute left-4 -top-4 w-0.5 h-8 ${
                  index <= currentStepIndex ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
              <Button
                variant={isActive ? "default" : isNext ? "secondary" : "ghost"}
                className={`w-full justify-start gap-4 text-left p-4 ${
                  isActive ? 'shadow-md' : ''
                }`}
                onClick={() => handleProgress(step.value)}
                disabled={index > currentStepIndex + 1}
              >
                <Icon className={`size-6 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`} />
                <span className="flex-1">{step.label}</span>
                <span className="text-sm text-muted-foreground">
                  {step.points} pts
                </span>
                <ChevronRight className={`size-4 transition-transform ${
                  isActive ? 'rotate-90 text-primary' : 'text-muted-foreground'
                }`} />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
} 