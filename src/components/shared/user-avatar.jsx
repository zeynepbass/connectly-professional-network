import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const palette = [
  "bg-violet-100 text-violet-800",
  "bg-sky-100 text-sky-800",
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-900",
  "bg-rose-100 text-rose-800",
  "bg-teal-100 text-teal-800",
  "bg-indigo-100 text-indigo-800",
  "bg-orange-100 text-orange-900",
];

export function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function colorFor(name = "") {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return palette[hash % palette.length];
}

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-base",
  xl: "size-24 text-2xl sm:size-28",
};

export function UserAvatar({ name, size = "md", className }) {
  return (
    <Avatar className={cn(sizes[size], className)}>
      <AvatarFallback className={cn("font-semibold", colorFor(name))}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
