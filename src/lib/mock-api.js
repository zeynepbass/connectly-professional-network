export const MOCK_LATENCY_MS = 350;

export function wait(ms = MOCK_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function shouldSimulateError(searchParams) {
  return searchParams.get("simulateError") === "1";
}

export function errorResponse(message, status) {
  return Response.json({ error: { message } }, { status });
}
