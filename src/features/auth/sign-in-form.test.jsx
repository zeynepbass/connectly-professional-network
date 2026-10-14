import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { SignInForm } from "@/features/auth/sign-in-form";
import { getState } from "@/lib/store/store";
import { routerMock } from "@/test/setup";
import { resetDemoStore } from "@/test/utils";

describe("SignInForm", () => {
  beforeEach(() => {
    resetDemoStore({ signedIn: false });
    routerMock.replace.mockClear();
  });

  it("shows field errors linked to the inputs", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    const email = screen.getByLabelText("Email");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription("Enter your email address.");
    expect(screen.getByLabelText("Password")).toHaveAccessibleDescription("Enter your password.");
  });

  it("rejects credentials that are not the demo account", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    await user.type(screen.getByLabelText("Email"), "someone@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Those credentials don't match the demo account.")).toBeInTheDocument();
    expect(getState().session).toBeNull();
  });

  it("signs in with the demo account and redirects to a safe target", async () => {
    const user = userEvent.setup();
    render(<SignInForm next="/jobs" />);

    await user.click(screen.getByRole("button", { name: "Continue with demo account" }));

    expect(getState().session?.userId).toBe("u1");
    await waitFor(() => expect(routerMock.replace).toHaveBeenCalledWith("/jobs"));
  });
});
