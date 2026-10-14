import { errorResponse } from "@/lib/mock-api";
import { findUserByUsername } from "@/lib/users";

export async function GET(_request, { params }) {
  const { username } = await params;
  const user = findUserByUsername(username);
  if (!user) return errorResponse("User not found.", 404);
  return Response.json({ data: user });
}
