import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ConnectButton } from "@/features/network/connect-button";
import { getState } from "@/lib/store/store";
import { resetDemoStore } from "@/test/utils";

describe("ConnectButton", () => {
  beforeEach(() => resetDemoStore());

  it("sends and withdraws a connection request", async () => {
    const user = userEvent.setup();
    render(<ConnectButton userId="u6" name="Hana Sato" />);

    await user.click(screen.getByRole("button", { name: "Connect with Hana Sato" }));
    expect(getState().connections.u6).toBe("pending");

    await user.click(screen.getByRole("button", { name: "Withdraw connection request to Hana Sato" }));
    expect(getState().connections.u6).toBeUndefined();
  });

  it("accepts an incoming request", async () => {
    const user = userEvent.setup();
    render(<ConnectButton userId="u5" name="Marco Bianchi" />);

    await user.click(screen.getByRole("button", { name: "Accept connection request from Marco Bianchi" }));
    expect(screen.getByRole("button", { name: /Connected/ })).toBeDisabled();
  });

  it("renders nothing for the signed-in user", () => {
    const { container } = render(<ConnectButton userId="u1" name="Alex Morgan" />);
    expect(container).toBeEmptyDOMElement();
  });
});
