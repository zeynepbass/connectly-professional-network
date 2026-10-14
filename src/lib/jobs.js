import { jobs } from "@/data/jobs";

const byId = new Map(jobs.map((job) => [job.id, job]));

export function getAllJobs() {
  return jobs;
}

export function findJobById(id) {
  return byId.get(id) ?? null;
}

export function filterJobs(list, { q = "", workplace = "", type = "", level = "" } = {}) {
  const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return list.filter((job) => {
    if (workplace && job.workplace !== workplace) return false;
    if (type && job.type !== type) return false;
    if (level && job.level !== level) return false;
    if (terms.length === 0) return true;
    const haystack = [job.title, job.company, job.location, ...job.skills].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
