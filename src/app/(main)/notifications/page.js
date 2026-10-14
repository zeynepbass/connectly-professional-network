import { Bell } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = { title: "Notifications · Connectly" };

export default function NotificationsPage() {
  return <EmptyState icon={Bell} title="Notifications" description="Stay up to date with your network." />;
}
