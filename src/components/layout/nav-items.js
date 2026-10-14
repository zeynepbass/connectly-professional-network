import { Bell, BriefcaseBusiness, House, MessageSquare, Users } from "lucide-react";
import {
  selectUnreadConversationCount,
  selectUnreadNotificationCount,
  selectUsersByConnection,
} from "@/lib/store/selectors";

export const navItems = [
  { href: "/feed", label: "Home", icon: House },
  {
    href: "/network",
    label: "Network",
    icon: Users,
    count: (state) => selectUsersByConnection(state, "incoming").length,
    countLabel: "pending invitations",
  },
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness },
  {
    href: "/messages",
    label: "Messaging",
    icon: MessageSquare,
    count: selectUnreadConversationCount,
    countLabel: "unread conversations",
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
    count: selectUnreadNotificationCount,
    countLabel: "unread notifications",
  },
];

export function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
