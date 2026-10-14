import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = { title: "Messaging · Connectly" };

export default function MessagingPage() {
  return <EmptyState icon={MessageSquare} title="Messaging" description="Conversations with your connections." />;
}
