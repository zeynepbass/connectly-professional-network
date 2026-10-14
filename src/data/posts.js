export const posts = [
  {
    id: "p1",
    authorId: "u4",
    minutesAgo: 45,
    content:
      "We replaced our weekly status meeting with a short written update and a 15-minute open Q&A. Six weeks in: fewer interruptions, better notes, and the Q&A is where the real conversations happen.\n\nWhat rituals has your team dropped recently?",
    likedBy: ["u2", "u3", "u11", "u8"],
    comments: [
      {
        id: "p1-c1",
        authorId: "u11",
        minutesAgo: 30,
        content: "We did the same with sprint demos. Recorded walkthroughs plus a live AMA works great.",
      },
    ],
  },
  {
    id: "p2",
    authorId: "u2",
    minutesAgo: 180,
    content:
      "Small accessibility win this week: we moved every error message next to its field and linked them with aria-describedby. Screen reader users in our study completed the booking form 40% faster.",
    likedBy: ["u1", "u10", "u12", "u4", "u6", "u9"],
    comments: [
      {
        id: "p2-c1",
        authorId: "u10",
        minutesAgo: 150,
        content: "Love this. Error summaries at the top plus inline messages are our go-to pattern too.",
      },
      {
        id: "p2-c2",
        authorId: "u12",
        minutesAgo: 120,
        content: "Would be great to see the research write-up if you can share it!",
      },
    ],
  },
  {
    id: "p3",
    authorId: "u7",
    minutesAgo: 320,
    content:
      "Northwind Labs is hiring two Frontend Engineers (React, design systems) in Berlin or remote across the EU. Friendly team, strong mentorship culture and a four-day focus week. Check the Jobs tab for details.",
    likedBy: ["u1", "u9"],
    comments: [],
  },
  {
    id: "p4",
    authorId: "u3",
    minutesAgo: 600,
    content:
      "Postgres tip: before adding another index, run EXPLAIN (ANALYZE, BUFFERS) on your slowest queries. Half the time the fix is rewriting a query, not adding an index.",
    likedBy: ["u8", "u5", "u9"],
    comments: [
      {
        id: "p4-c1",
        authorId: "u8",
        minutesAgo: 540,
        content: "And watch out for index bloat on high-write tables.",
      },
    ],
  },
  {
    id: "p5",
    authorId: "u5",
    minutesAgo: 1440,
    content:
      "Forecast accuracy is not the whole story. A slightly less accurate model that planners trust and understand often beats a black box. Interpretability is a product feature.",
    likedBy: ["u11", "u4"],
    comments: [],
  },
  {
    id: "p6",
    authorId: "u6",
    minutesAgo: 2880,
    content:
      "Shipped offline mode for our travel app today. Biggest lesson: design the sync conflict UI first, not last.",
    likedBy: ["u1", "u2", "u9", "u10", "u3"],
    comments: [
      {
        id: "p6-c1",
        authorId: "u1",
        minutesAgo: 2700,
        content: "Congrats Hana! Would love to hear how you handled conflict resolution.",
      },
    ],
  },
  {
    id: "p7",
    authorId: "u10",
    minutesAgo: 4320,
    content:
      "Reminder: automated accessibility checks catch roughly a third of issues. Keyboard-only testing for ten minutes per feature finds a surprising amount of the rest.",
    likedBy: ["u2", "u1"],
    comments: [],
  },
];
