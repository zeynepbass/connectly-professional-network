"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSavedJob } from "@/lib/store/actions";
import { useDemoState } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

export function SaveJobButton({ job, showLabel = false, className }) {
  const { savedJobIds } = useDemoState();
  const saved = savedJobIds.includes(job.id);
  const label = saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`;

  return (
    <Button
      variant={showLabel ? "outline" : "ghost"}
      size={showLabel ? "default" : "icon"}
      aria-pressed={saved}
      aria-label={showLabel ? undefined : label}
      onClick={() => toggleSavedJob(job.id)}
      className={cn(saved && "text-primary", className)}
    >
      <Bookmark className={cn(saved && "fill-current")} aria-hidden="true" />
      {showLabel && (saved ? "Saved" : "Save")}
    </Button>
  );
}
