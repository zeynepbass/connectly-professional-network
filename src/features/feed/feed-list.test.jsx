import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { FeedList } from "@/features/feed/feed-list";
import { resetDemoStore } from "@/test/utils";

describe("FeedList", () => {
  beforeEach(() => resetDemoStore());

  it("renders posts from the mock data", () => {
    render(<FeedList />);
    expect(screen.getAllByRole("article")).toHaveLength(7);
    expect(screen.getByRole("heading", { name: "Sofia Lindqvist" })).toBeInTheDocument();
  });

  it("publishes a new post at the top of the feed", async () => {
    const user = userEvent.setup();
    render(<FeedList />);

    const postButton = screen.getByRole("button", { name: "Post" });
    expect(postButton).toBeDisabled();

    await user.type(screen.getByLabelText("Share an update"), "Shipping the new Connectly feed today");
    await user.click(postButton);

    const [firstPost] = screen.getAllByRole("article");
    expect(within(firstPost).getByText("Shipping the new Connectly feed today")).toBeInTheDocument();
    expect(within(firstPost).getByRole("heading", { name: "Alex Morgan" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Your post was published.");
    expect(screen.getByLabelText("Share an update")).toHaveValue("");
  });

  it("toggles a like and updates the count", async () => {
    const user = userEvent.setup();
    render(<FeedList />);
    const post = screen.getAllByRole("article")[0];

    expect(within(post).getByText("4 likes")).toBeInTheDocument();
    await user.click(within(post).getByRole("button", { name: "Like" }));

    expect(within(post).getByRole("button", { name: "Liked" })).toHaveAttribute("aria-pressed", "true");
    expect(within(post).getByText("5 likes")).toBeInTheDocument();
  });

  it("adds a comment and focuses the comment field when opened", async () => {
    const user = userEvent.setup();
    render(<FeedList />);
    const post = screen.getAllByRole("article")[0];

    await user.click(within(post).getByRole("button", { name: "Comment" }));
    const input = within(post).getByLabelText("Add a comment");
    expect(input).toHaveFocus();

    await user.type(input, "Great idea{Enter}");

    expect(within(post).getByText("Great idea")).toBeInTheDocument();
    expect(within(post).getByText("2 comments")).toBeInTheDocument();
  });

  it("lets the author delete their own post", async () => {
    const user = userEvent.setup();
    render(<FeedList />);

    await user.type(screen.getByLabelText("Share an update"), "Temporary post");
    await user.click(screen.getByRole("button", { name: "Post" }));
    await user.click(screen.getByRole("button", { name: "Delete post" }));

    expect(screen.queryByText("Temporary post")).not.toBeInTheDocument();
  });
});
