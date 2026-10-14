import { Bell, BriefcaseBusiness, House, MessageSquare, Users } from "lucide-react";

export const navItems = [
  { href: "/feed", label: "Home", icon: House },
  { href: "/network", label: "Network", icon: Users },
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/messages", label: "Messaging", icon: MessageSquare },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
