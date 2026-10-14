import Link from "next/link";
import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-app flex flex-1 items-center justify-center py-16">
      <EmptyState
        icon={SearchX}
        title="Page not found"
        description="The page or profile you are looking for doesn't exist in this demo."
        action={
          <Button asChild>
            <Link href="/feed">Back to feed</Link>
          </Button>
        }
        className="w-full max-w-md"
      />
    </main>
  );
}
