import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = { title: "Feed · Connectly" };

export default function FeedPage() {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_300px] lg:gap-6">
      <aside aria-label="Your profile" className="hidden md:block">
        <Card>
          <CardContent className="space-y-3">
            <Skeleton className="size-14 rounded-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </CardContent>
        </Card>
      </aside>
      <section aria-label="Feed" className="min-w-0 space-y-4">
        {[0, 1, 2].map((key) => (
          <Card key={key}>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </section>
      <aside aria-label="Suggestions" className="hidden lg:block">
        <Card>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
