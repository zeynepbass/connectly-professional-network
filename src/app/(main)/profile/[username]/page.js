import { notFound } from "next/navigation";
import { ProfileView } from "@/features/profile/profile-view";
import { findUserByUsername, getAllUsers } from "@/lib/users";

export function generateStaticParams() {
  return getAllUsers().map((user) => ({ username: user.username }));
}

export async function generateMetadata({ params }) {
  const { username } = await params;
  const user = findUserByUsername(username);
  return { title: user ? `${user.name} · Connectly` : "Profile not found · Connectly" };
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  const user = findUserByUsername(username);
  if (!user) notFound();

  return <ProfileView userId={user.id} />;
}
