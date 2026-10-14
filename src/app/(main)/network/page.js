import { Users } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = { title: "Network · Connectly" };

export default function NetworkPage() {
  return <EmptyState icon={Users} title="Network" description="Grow your professional network." />;
}
