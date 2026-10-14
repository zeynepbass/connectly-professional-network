import { DemoBadge } from "@/components/shared/demo-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileEditForm } from "@/features/profile/profile-edit-form";

export const metadata = { title: "Edit profile · Connectly" };

export default function EditProfilePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>
              <h1 className="text-xl">Edit profile</h1>
            </CardTitle>
            <DemoBadge />
          </div>
          <CardDescription>
            Changes are stored in this browser only and can be undone with “Reset demo data”.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileEditForm />
        </CardContent>
      </Card>
    </div>
  );
}
