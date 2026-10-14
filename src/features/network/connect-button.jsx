"use client";

import { Check, Clock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setConnectionStatus } from "@/lib/store/actions";
import { useDemoState } from "@/lib/store/hooks";
import { selectConnectionStatus } from "@/lib/store/selectors";

export function ConnectButton({ userId, name, size = "default", className }) {
  const state = useDemoState();
  const status = selectConnectionStatus(state, userId);

  if (userId === state.session?.userId) return null;

  if (status === "connected") {
    return (
      <Button variant="secondary" size={size} className={className} disabled>
        <Check aria-hidden="true" /> Connected
      </Button>
    );
  }

  if (status === "pending") {
    return (
      <Button
        variant="outline"
        size={size}
        className={className}
        onClick={() => setConnectionStatus(userId, null)}
        aria-label={`Withdraw connection request to ${name}`}
      >
        <Clock aria-hidden="true" /> Pending
      </Button>
    );
  }

  if (status === "incoming") {
    return (
      <Button
        size={size}
        className={className}
        onClick={() => setConnectionStatus(userId, "connected")}
        aria-label={`Accept connection request from ${name}`}
      >
        <Check aria-hidden="true" /> Accept
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size={size}
      className={className}
      onClick={() => setConnectionStatus(userId, "pending")}
      aria-label={`Connect with ${name}`}
    >
      <UserPlus aria-hidden="true" /> Connect
    </Button>
  );
}
