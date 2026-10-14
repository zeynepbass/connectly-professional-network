"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEMO_CREDENTIALS, DEMO_USER_ID } from "@/data/users";
import { useDemoState } from "@/lib/store/hooks";
import { dispatch } from "@/lib/store/store";
import { getSafeRedirect, validateSignIn } from "@/lib/validation";

export function SignInForm({ next }) {
  const router = useRouter();
  const { session } = useDemoState();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const redirectTo = getSafeRedirect(next);

  useEffect(() => {
    if (session) router.replace(redirectTo);
  }, [session, redirectTo, router]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors((current) => ({ ...current, [name]: undefined, form: undefined }));
    }
  }

  function signIn(credentials) {
    const validationErrors = validateSignIn(credentials);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const matches =
      credentials.email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      credentials.password === DEMO_CREDENTIALS.password;
    if (!matches) {
      setErrors({ form: "Those credentials don't match the demo account." });
      return;
    }
    dispatch({ type: "auth/signIn", userId: DEMO_USER_ID, at: new Date().toISOString() });
  }

  function handleSubmit(event) {
    event.preventDefault();
    signIn(values);
  }

  function signInWithDemoAccount() {
    setValues(DEMO_CREDENTIALS);
    signIn(DEMO_CREDENTIALS);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-describedby="sign-in-status">
      <div id="sign-in-status" role="alert" className="empty:hidden">
        {errors.form && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.form}
          </p>
        )}
      </div>

      <FormField id="email" label="Email" error={errors.email}>
        {(field) => (
          <Input
            {...field}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            className="h-10"
          />
        )}
      </FormField>

      <FormField id="password" label="Password" error={errors.password}>
        {(field) => (
          <Input
            {...field}
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            className="h-10"
          />
        )}
      </FormField>

      <Button type="submit" className="h-10 w-full">
        <LogIn aria-hidden="true" /> Sign in
      </Button>
      <Button type="button" variant="outline" className="h-10 w-full" onClick={signInWithDemoAccount}>
        Continue with demo account
      </Button>
    </form>
  );
}
