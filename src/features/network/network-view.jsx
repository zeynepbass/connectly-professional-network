"use client";

import { UserCheck, Users } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton } from "@/features/network/connect-button";
import { PersonRow } from "@/features/network/person-row";
import { setConnectionStatus } from "@/lib/store/actions";
import { useDemoState } from "@/lib/store/hooks";
import { selectUsersByConnection } from "@/lib/store/selectors";

function Section({ id, title, count, children }) {
  return (
    <section aria-labelledby={id}>
      <Card>
        <CardHeader>
          <CardTitle id={id} className="text-base">
            {title} {typeof count === "number" && <span className="text-muted-foreground">({count})</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}

export function NetworkView() {
  const state = useDemoState();
  const invitations = selectUsersByConnection(state, "incoming");
  const connections = selectUsersByConnection(state, "connected");
  const pending = selectUsersByConnection(state, "pending");
  const suggestions = selectUsersByConnection(state, "none");

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">My network</h1>
        <DemoBadge label="Simulated requests" />
      </div>

      <Section id="invitations-heading" title="Invitations" count={invitations.length}>
        {invitations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending invitations.</p>
        ) : (
          <ul className="space-y-4">
            {invitations.map((user) => (
              <li key={user.id}>
                <PersonRow user={user}>
                  <Button
                    variant="ghost"
                    onClick={() => setConnectionStatus(user.id, null)}
                    aria-label={`Ignore invitation from ${user.name}`}
                  >
                    Ignore
                  </Button>
                  <ConnectButton userId={user.id} name={user.name} />
                </PersonRow>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {pending.length > 0 && (
        <Section id="sent-heading" title="Sent requests" count={pending.length}>
          <ul className="space-y-4">
            {pending.map((user) => (
              <li key={user.id}>
                <PersonRow user={user}>
                  <ConnectButton userId={user.id} name={user.name} />
                </PersonRow>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="suggestions-heading" title="People you may know">
        {suggestions.length === 0 ? (
          <EmptyState icon={UserCheck} title="All caught up" description="No new suggestions right now." />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {suggestions.map((user) => (
              <li key={user.id} className="rounded-lg border p-3">
                <PersonRow user={user} />
                <ConnectButton userId={user.id} name={user.name} className="mt-3 w-full" />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section id="connections-heading" title="Connections" count={connections.length}>
        {connections.length === 0 ? (
          <EmptyState icon={Users} title="No connections yet" description="Accept an invitation or connect with suggested people." />
        ) : (
          <ul className="divide-y">
            {connections.map((user) => (
              <li key={user.id} className="py-3 first:pt-0 last:pb-0">
                <PersonRow user={user}>
                  <Button
                    variant="ghost"
                    onClick={() => setConnectionStatus(user.id, null)}
                    aria-label={`Remove ${user.name} from connections`}
                  >
                    Remove
                  </Button>
                </PersonRow>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}
