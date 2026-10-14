"use client";

import { useState } from "react";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_CREDENTIALS } from "@/data/users";
import { applyToJob } from "@/lib/store/actions";
import { APPLICATION_NOTE_MAX_LENGTH, validateApplication } from "@/lib/validation";

export function ApplicationForm({ job, user, onCancel }) {
  const [values, setValues] = useState({
    name: user.name,
    email: DEMO_CREDENTIALS.email,
    phone: "",
    note: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateApplication(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      document.getElementById(`apply-${Object.keys(validationErrors)[0]}`)?.focus();
      return;
    }
    applyToJob(job.id, {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      note: values.note.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label={`Apply to ${job.title}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="apply-name" label="Full name" error={errors.name}>
          {(field) => (
            <Input {...field} name="name" autoComplete="name" value={values.name} onChange={handleChange} className="h-10" />
          )}
        </FormField>
        <FormField id="apply-email" label="Email" error={errors.email}>
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
      </div>
      <FormField id="apply-phone" label="Phone (optional)" error={errors.phone}>
        {(field) => (
          <Input
            {...field}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange}
            className="h-10"
          />
        )}
      </FormField>
      <FormField
        id="apply-note"
        label="Cover note (optional)"
        hint={`${values.note.length}/${APPLICATION_NOTE_MAX_LENGTH} characters`}
        error={errors.note}
      >
        {(field) => (
          <Textarea
            {...field}
            name="note"
            rows={4}
            value={values.note}
            onChange={handleChange}
            maxLength={APPLICATION_NOTE_MAX_LENGTH}
          />
        )}
      </FormField>
      <p className="text-xs text-muted-foreground">
        This is a simulated application. Nothing is sent to {job.company}.
      </p>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" className="h-10" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="h-10">
          Submit application
        </Button>
      </div>
    </form>
  );
}
