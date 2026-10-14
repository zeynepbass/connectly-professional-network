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
