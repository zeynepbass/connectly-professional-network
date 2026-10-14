"use client";

import Link from "next/link";
import { BriefcaseBusiness, GraduationCap, MapPin, Pencil } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileSection } from "@/features/profile/profile-section";
import { formatCount } from "@/lib/format";
import { useDemoState } from "@/lib/store/hooks";
import { selectUser } from "@/lib/store/selectors";

function TimelineItem({ icon: Icon, title, subtitle, period, description }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="space-y-0.5">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm">{subtitle}</p>
        <p className="text-xs text-muted-foreground">{period}</p>
        {description && <p className="pt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
    </li>
  );
}

export function ProfileView({ userId, actions }) {
  const state = useDemoState();
  const user = selectUser(state, userId);
  const isOwnProfile = state.session?.userId === userId;

  if (!user) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Card className="pt-0">
        <div className="h-28 bg-gradient-to-r from-primary to-violet-400 sm:h-36" aria-hidden="true" />
        <CardContent className="-mt-14 space-y-4 sm:-mt-16">
          <div className="flex items-end justify-between gap-3">
            <UserAvatar name={user.name} size="xl" className="ring-4 ring-card" />
            {isOwnProfile ? (
              <Button asChild variant="outline">
                <Link href="/settings/profile">
                  <Pencil aria-hidden="true" /> Edit profile
                </Link>
              </Button>
            ) : (
              actions
            )}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">{user.name}</h1>
            <p>{user.headline}</p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" aria-hidden="true" /> {user.location}
              </span>
              <span className="font-medium text-primary">
                {formatCount(user.connections, "connection")}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {user.about && (
        <ProfileSection title="About">
          <p className="text-sm leading-relaxed whitespace-pre-line">{user.about}</p>
        </ProfileSection>
      )}

      <ProfileSection title="Experience">
        <ul className="space-y-5">
          {user.experience.map((item) => (
            <TimelineItem
              key={item.id}
              icon={BriefcaseBusiness}
              title={item.role}
              subtitle={item.company}
              period={`${item.start} – ${item.end}`}
              description={item.description}
            />
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection title="Education">
        <ul className="space-y-5">
          {user.education.map((item) => (
            <TimelineItem
              key={item.id}
              icon={GraduationCap}
              title={item.school}
              subtitle={`${item.degree}, ${item.field}`}
              period={`${item.start} – ${item.end}`}
            />
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection title="Skills">
        <ul className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <li key={skill}>
              <Badge asChild variant="outline" className="h-7 px-3 text-sm">
                <Link href={`/search?skill=${encodeURIComponent(skill)}`}>{skill}</Link>
              </Badge>
            </li>
          ))}
        </ul>
      </ProfileSection>
    </div>
  );
}
