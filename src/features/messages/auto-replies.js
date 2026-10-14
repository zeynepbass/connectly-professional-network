const replies = [
  "Thanks for reaching out! Let me get back to you later today.",
  "Sounds good to me. Want to set up a quick call this week?",
  "Great point, I hadn't thought about it that way.",
  "Appreciate it! I'll share more details soon.",
];

export const AUTO_REPLY_DELAY_MS = 1500;

export function pickAutoReply(messageCount) {
  return replies[messageCount % replies.length];
}
