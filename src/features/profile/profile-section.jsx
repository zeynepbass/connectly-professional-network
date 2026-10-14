import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileSection({ title, action, children }) {
  const id = `section-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <section aria-labelledby={id}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle id={id} className="text-lg">
            {title}
          </CardTitle>
          {action}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}
