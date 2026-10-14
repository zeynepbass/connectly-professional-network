import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { JobDetail } from "@/features/jobs/job-detail";
import { findJobById } from "@/lib/jobs";
import { getState } from "@/lib/store/store";
import { resetDemoStore } from "@/test/utils";

const job = findJobById("j1");

describe("JobDetail", () => {
  beforeEach(() => resetDemoStore());

  it("saves and unsaves the job", async () => {
    const user = userEvent.setup();
    render(<JobDetail job={job} />);

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getByRole("button", { name: "Saved" })).toHaveAttribute("aria-pressed", "true");
    expect(getState().savedJobIds).toEqual(["j1"]);

    await user.click(screen.getByRole("button", { name: "Saved" }));
    expect(getState().savedJobIds).toEqual([]);
  });

  it("validates and submits a simulated application", async () => {
    const user = userEvent.setup();
    render(<JobDetail job={job} />);

    await user.click(screen.getByRole("button", { name: "Apply now" }));
    const email = screen.getByLabelText("Email");
    await user.clear(email);
    await user.type(email, "not-an-email");
    await user.click(screen.getByRole("button", { name: "Submit application" }));

    expect(email).toHaveFocus();
    expect(email).toHaveAccessibleDescription("Enter a valid email address.");

    await user.clear(email);
    await user.type(email, "alex@example.com");
    await user.click(screen.getByRole("button", { name: "Submit application" }));

    expect(screen.getByText("Application submitted")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Apply now" })).not.toBeInTheDocument();
    expect(getState().applications.j1.email).toBe("alex@example.com");
  });
});
