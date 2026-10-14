const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignIn({ email, password }) {
  const errors = {};
  const trimmedEmail = email.trim();

  if (!trimmedEmail) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(trimmedEmail)) errors.email = "Enter a valid email address.";

  if (!password) errors.password = "Enter your password.";
  else if (password.length < 8) errors.password = "Password must be at least 8 characters.";

  return errors;
}

export function getSafeRedirect(target, fallback = "/feed") {
  if (typeof target !== "string") return fallback;
  if (!target.startsWith("/") || target.startsWith("//")) return fallback;
  return target;
}

export const POST_MAX_LENGTH = 1000;
export const COMMENT_MAX_LENGTH = 500;

export function validateText(value, { label, max, required = true }) {
  const trimmed = value.trim();
  if (required && !trimmed) return `${label} can't be empty.`;
  if (trimmed.length > max) return `${label} must be ${max} characters or fewer.`;
  return null;
}

export const PROFILE_LIMITS = {
  name: 60,
  headline: 120,
  title: 60,
  company: 60,
  location: 60,
  about: 600,
  skill: 30,
  skills: 15,
};

export function parseSkills(input) {
  const seen = new Set();
  return input
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => {
      const key = skill.toLowerCase();
      if (!skill || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function validateProfile(values) {
  const errors = {};
  const fields = [
    ["name", "Name", true],
    ["headline", "Headline", true],
    ["title", "Job title", true],
    ["company", "Company", false],
    ["location", "Location", false],
    ["about", "About", false],
  ];

  for (const [key, label, required] of fields) {
    const error = validateText(values[key] ?? "", { label, max: PROFILE_LIMITS[key], required });
    if (error) errors[key] = error;
  }

  const skills = parseSkills(values.skills ?? "");
  if (skills.length > PROFILE_LIMITS.skills) {
    errors.skills = `Add up to ${PROFILE_LIMITS.skills} skills.`;
  } else if (skills.some((skill) => skill.length > PROFILE_LIMITS.skill)) {
    errors.skills = `Each skill must be ${PROFILE_LIMITS.skill} characters or fewer.`;
  }

  return errors;
}

export const APPLICATION_NOTE_MAX_LENGTH = 1000;
const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;

export function validateApplication({ name, email, phone, note }) {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your full name.";
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email address.";
  if (phone.trim() && !PHONE_PATTERN.test(phone.trim())) errors.phone = "Enter a valid phone number.";
  const noteError = validateText(note, {
    label: "Cover note",
    max: APPLICATION_NOTE_MAX_LENGTH,
    required: false,
  });
  if (noteError) errors.note = noteError;
  return errors;
}

export const MESSAGE_MAX_LENGTH = 2000;
