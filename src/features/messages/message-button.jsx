import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MessageButton({ username, name }) {
  return (
    <Button asChild variant="outline">
      <Link href={`/messages?with=${username}`} aria-label={`Message ${name}`}>
        <MessageSquare aria-hidden="true" /> Message
      </Link>
    </Button>
  );
}
