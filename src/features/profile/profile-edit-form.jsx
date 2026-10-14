"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/lib/store/actions";
import { useCurrentUser } from "@/lib/store/hooks";
import { parseSkills, PROFILE_LIMITS, validateProfile } from "@/lib/validation";

const textFields = [
  { name: "name", label: "Full name", autoComplete: "name" },
  { name: "headline", label: "Headline", hint: "Shown under your name across Connectly." },
  { name: "title", label: "Job title", autoComplete: "organization-title" },
  { name: "company", label: "Company", autoComplete: "organization" },
  { name: "location", label: "Location", autoComplete: "address-level2" },
];

function toFormValues(user) {
  return {
    name: user.name,
    headline: user.headline,
    title: user.title,
    company: user.company,
    location: user.location,
    about: user.about,
    skills: user.skills.join(", "),
  };
}

export function ProfileEditForm() {
  const user = useCurrentUser();
  const [values, setValues] = useState(() => (user ? toFormValues(user) : null));
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  if (!user || !values) return null;

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSaved(false);
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateProfile(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstInvalid = Object.keys(validationErrors)[0];
      document.getElementById(`profile-${firstInvalid}`)?.focus();
      return;
    }
    updateProfile(user.id, {
      name: values.name.trim(),
      headline: values.headline.trim(),
      title: values.title.trim(),
      company: values.company.trim(),
      location: values.location.trim(),
      about: values.about.trim(),
      skills: parseSkills(values.skills),
    });
    setErrors({});
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {textFields.map(({ name, label, hint, autoComplete }) => (
          <div key={name} className={name === "headline" ? "sm:col-span-2" : undefined}>
            <FormField id={`profile-${name}`} label={label} hint={hint} error={errors[name]}>
              {(field) => (
                <Input
                  {...field}
                  name={name}
                  value={values[name]}
                  onChange={handleChange}
                  maxLength={PROFILE_LIMITS[name]}
                  autoComplete={autoComplete}
                  className="h-10"
                />
              )}
            </FormField>
          </div>
        ))}
      </div>

      <FormField
        id="profile-about"
        label="About"
        hint={`${values.about.length}/${PROFILE_LIMITS.about} characters`}
        error={errors.about}
      >
        {(field) => (
          <Textarea
            {...field}
            name="about"
            rows={5}
            value={values.about}
            onChange={handleChange}
            maxLength={PROFILE_LIMITS.about}
          />
        )}
      </FormField>

      <FormField
        id="profile-skills"
        label="Skills"
        hint={`Separate skills with commas. Up to ${PROFILE_LIMITS.skills}.`}
        error={errors.skills}
      >
        {(field) => (
          <Input {...field} name="skills" value={values.skills} onChange={handleChange} className="h-10" />
        )}
      </FormField>

      <div role="status" className="min-h-6">
        {saved && (
          <p className="flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="size-4" aria-hidden="true" /> Profile saved to this browser.
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button asChild variant="outline" className="h-10">
          <Link href={`/profile/${user.username}`}>View profile</Link>
        </Button>
        <Button type="submit" className="h-10">
          Save changes
        </Button>
      </div>
    </form>
  );
}
