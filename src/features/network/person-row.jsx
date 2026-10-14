import Link from "next/link";
import { UserAvatar } from "@/components/shared/user-avatar";

export function PersonRow({ user, children, avatarSize = "md" }) {
  return (
    <div className="flex items-center gap-3">
      <UserAvatar name={user.name} size={avatarSize} />
      <div className="min-w-0 flex-1">
        <Link href={`/profile/${user.username}`} className="block truncate font-medium hover:underline">
          {user.name}
        </Link>
        <p className="truncate text-xs text-muted-foreground">{user.headline}</p>
      </div>
      {children && <div className="flex shrink-0 gap-2">{children}</div>}
    </div>
  );
}
