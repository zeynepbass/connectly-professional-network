import { notFound } from "next/navigation";
import { JobDetail } from "@/features/jobs/job-detail";
import { findJobById, getAllJobs } from "@/lib/jobs";

export function generateStaticParams() {
  return getAllJobs().map((job) => ({ id: job.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = findJobById(id);
  return { title: job ? `${job.title} at ${job.company} · Connectly` : "Job not found · Connectly" };
}

export default async function JobPage({ params }) {
  const { id } = await params;
  const job = findJobById(id);
  if (!job) notFound();

  return <JobDetail job={job} />;
}
