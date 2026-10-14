import { MessagesView } from "@/features/messages/messages-view";
import { findUserByUsername } from "@/lib/users";

export const metadata = { title: "Messaging · Connectly" };

export default async function MessagesPage({ searchParams }) {
  const params = await searchParams;
  const username = Array.isArray(params.with) ? params.with[0] : params.with;
  const participant = username ? findUserByUsername(username) : null;

  return <MessagesView key={participant?.id ?? "inbox"} initialParticipantId={participant?.id ?? null} />;
}
