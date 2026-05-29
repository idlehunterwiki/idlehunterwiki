const REQUIRED_MESSAGES: Record<string, string> = {
  email: "Please enter your email.",
  password: "Please enter your password.",
  confirm_password: "Please confirm your password.",
  display_name: "Please enter a username.",
  terms: "Please accept the Terms of Service and Community Guidelines.",
};

const DEFAULT_REQUIRED = "This field is required.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthForm(
  form: HTMLFormElement,
): Record<string, string> {
  const errors: Record<string, string> = {};

  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "[data-auth-validate]",
    )
    .forEach((el) => {
      const name = el.getAttribute("data-auth-field");
      if (!name) return;

      const rule = el.getAttribute("data-auth-validate");
      if (rule !== "required") return;

      if (el instanceof HTMLInputElement && el.type === "checkbox") {
        if (!el.checked) {
          errors[name] = REQUIRED_MESSAGES[name] ?? DEFAULT_REQUIRED;
        }
        return;
      }

      const value = el.value.trim();
      if (!value) {
        errors[name] = REQUIRED_MESSAGES[name] ?? DEFAULT_REQUIRED;
        return;
      }

      if (el instanceof HTMLInputElement && el.type === "email" && !EMAIL_PATTERN.test(value)) {
        errors[name] = "Please enter a valid email address.";
      }
    });

  return errors;
}

export function firstInvalidField(
  form: HTMLFormElement,
  errors: Record<string, string>,
): HTMLElement | null {
  const invalid = new Set(Object.keys(errors));
  const fields = form.querySelectorAll<HTMLElement>("[data-auth-field]");

  for (const el of fields) {
    const name = el.getAttribute("data-auth-field");
    if (name && invalid.has(name)) {
      return el;
    }
  }

  return null;
}
