import { Logo } from "@/components/layout/logo";
import { DemoBadge } from "@/components/shared/demo-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_CREDENTIALS } from "@/data/users";
import { SignInForm } from "@/features/auth/sign-in-form";

export const metadata = { title: "Sign in · Connectly" };

export default async function SignInPage({ searchParams }) {
  const { next } = await searchParams;

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-4xl items-center gap-10 md:grid-cols-2">
        <section className="space-y-5">
          <Logo href="/sign-in" />
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Grow your career with the people who move it forward.
          </h1>
          <p className="text-muted-foreground">
            Connectly is a professional networking demo. Share updates, discover people and
            roles, and keep conversations going. All data is mock data stored in your browser.
          </p>
        </section>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-xl">Sign in</CardTitle>
              <DemoBadge label="Demo login" />
            </div>
            <CardDescription>
              Use <span className="font-medium text-foreground">{DEMO_CREDENTIALS.email}</span> with
              password <span className="font-medium text-foreground">{DEMO_CREDENTIALS.password}</span>,
              or continue with the demo account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm next={next} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
