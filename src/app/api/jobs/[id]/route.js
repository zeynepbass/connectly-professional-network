import { findJobById } from "@/lib/jobs";
import { errorResponse } from "@/lib/mock-api";

export async function GET(_request, { params }) {
  const { id } = await params;
  const job = findJobById(id);
  if (!job) return errorResponse("Job not found.", 404);
  return Response.json({ data: job });
}
