import { BriefcaseBusiness } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata = { title: "Jobs · Connectly" };

export default function JobsPage() {
  return <EmptyState icon={BriefcaseBusiness} title="Jobs" description="Discover roles that match your skills." />;
}
