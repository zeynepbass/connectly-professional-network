import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { NotificationsView } from "@/features/notifications/notifications-view";
import { resetDemoStore } from "@/test/utils";

describe("NotificationsView", () => {
  beforeEach(() => resetDemoStore());

  it("filters unread notifications and marks them as read", async () => {
    const user = userEvent.setup();
    render(<NotificationsView />);

    expect(screen.getByRole("status")).toHaveTextContent("3 unread");
    await user.click(screen.getByRole("button", { name: /Unread/ }));
    expect(screen.getAllByRole("listitem")).toHaveLength(3);

    await user.click(screen.getByRole("button", { name: "Mark notification from Priya Raman as read" }));
    expect(screen.getByRole("status")).toHaveTextContent("2 unread");

    await user.click(screen.getByRole("button", { name: "Mark all as read" }));
    expect(screen.getByRole("status")).toHaveTextContent("You're all caught up");
    expect(screen.getByText("No unread notifications")).toBeInTheDocument();
  });
});
