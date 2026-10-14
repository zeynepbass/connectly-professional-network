import { FeedList } from "@/features/feed/feed-list";
import { SuggestedConnections } from "@/features/network/suggested-connections";
import { ProfileSummaryCard } from "@/features/profile/profile-summary-card";

export const metadata = { title: "Feed · Connectly" };

export default function FeedPage() {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_300px] lg:gap-6">
      <aside aria-label="Your profile" className="hidden md:block">
        <div className="sticky top-[calc(var(--header-height)+1.5rem)]">
          <ProfileSummaryCard />
        </div>
      </aside>
      <section aria-labelledby="feed-heading" className="min-w-0 space-y-4">
        <h1 id="feed-heading" className="sr-only">
          Home feed
        </h1>
        <FeedList />
      </section>
      <aside aria-label="Suggestions" className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-height)+1.5rem)]">
          <SuggestedConnections />
        </div>
      </aside>
    </div>
  );
}
