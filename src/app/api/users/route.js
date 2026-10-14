import { errorResponse, shouldSimulateError, wait } from "@/lib/mock-api";
import { filterUsers } from "@/lib/search";
import { getAllUsers } from "@/lib/users";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  await wait();

  if (shouldSimulateError(searchParams)) {
    return errorResponse("Simulated server error. Try again.", 500);
  }

  const results = filterUsers(getAllUsers(), {
    q: searchParams.get("q") ?? "",
    title: searchParams.get("title") ?? "",
    skill: searchParams.get("skill") ?? "",
  });

  return Response.json({
    data: results.map(({ id, username, name, headline, title, company, location, skills }) => ({
      id,
      username,
      name,
      headline,
      title,
      company,
      location,
      skills,
    })),
    total: results.length,
  });
}
