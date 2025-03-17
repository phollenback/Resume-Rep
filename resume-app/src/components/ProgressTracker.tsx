"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
}

export function ProgressTracker({ completed }: ProgressTrackerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-primary">Progress</span>
        <span className="text-sm text-muted-foreground">{completed}%</span>
      </div>
      <Progress value={completed} className="h-3 bg-background" />
    </div>
  );
} 