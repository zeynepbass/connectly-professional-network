import { FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DemoBadge({ className, label = "Demo" }) {
  return (
    <Badge variant="secondary" className={cn("gap-1", className)}>
      <FlaskConical aria-hidden="true" />
      {label}
    </Badge>
  );
}
