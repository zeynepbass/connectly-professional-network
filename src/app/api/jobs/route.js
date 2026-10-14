import { filterJobs, getAllJobs } from "@/lib/jobs";
import { errorResponse, shouldSimulateError, wait } from "@/lib/mock-api";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  await wait();

  if (shouldSimulateError(searchParams)) {
    return errorResponse("Simulated server error. Try again.", 500);
  }

  const results = filterJobs(getAllJobs(), {
    q: searchParams.get("q") ?? "",
    workplace: searchParams.get("workplace") ?? "",
    type: searchParams.get("type") ?? "",
    level: searchParams.get("level") ?? "",
  });

  return Response.json({ data: results, total: results.length });
}
