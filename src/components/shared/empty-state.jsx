import { cn } from "@/lib/utils";

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-card px-6 py-12 text-center",
        className
      )}
    >
      {Icon && (
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </span>
      )}
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{title}</h2>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
