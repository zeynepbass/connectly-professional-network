export const conversations = [
  {
    id: "c1",
    participantId: "u7",
    unread: true,
    messages: [
      {
        id: "c1-m1",
        senderId: "u7",
        minutesAgo: 95,
        content: "Hi Alex! I saw your work on the design system. Would you be open to a quick chat about our Frontend Engineer role?",
      },
    ],
  },
  {
    id: "c2",
    participantId: "u2",
    unread: false,
    messages: [
      {
        id: "c2-m1",
        senderId: "u1",
        minutesAgo: 1500,
        content: "Your post about inline error messages was great. Did you test it with VoiceOver too?",
      },
      {
        id: "c2-m2",
        senderId: "u2",
        minutesAgo: 1440,
        content: "Thanks! Yes, VoiceOver and NVDA. I'll share the full study notes next week.",
      },
      {
        id: "c2-m3",
        senderId: "u1",
        minutesAgo: 1430,
        content: "Perfect, looking forward to it.",
      },
    ],
  },
  {
    id: "c3",
    participantId: "u10",
    unread: true,
    messages: [
      {
        id: "c3-m1",
        senderId: "u10",
        minutesAgo: 300,
        content: "Hey! Are you joining the accessibility meetup on Thursday?",
      },
    ],
  },
];
