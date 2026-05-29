export type AuthFieldErrors = Record<string, string>;

type AuthErrorLike = {
  message?: string;
  code?: string;
};

/** Maps Supabase / server messages to per-field copy for inline display. */
export function mapAuthError(error: AuthErrorLike): {
  fieldErrors?: AuthFieldErrors;
  formError?: string;
} {
  const message = (error.message ?? "").toLowerCase();
  const code = (error.code ?? "").toLowerCase();

  if (
    code === "over_email_send_rate_limit" ||
    message.includes("rate limit") ||
    message.includes("too many")
  ) {
    return {
      fieldErrors: {
        email:
          "Too many sign-up attempts for this email. Please wait a few minutes and try again.",
      },
    };
  }

  if (
    code === "user_already_exists" ||
    code === "email_exists" ||
    message.includes("already registered") ||
    message.includes("already been registered") ||
    message.includes("user already registered")
  ) {
    return {
      fieldErrors: {
        email:
          "An account with this email already exists. Try logging in instead.",
      },
    };
  }

  if (
    code === "weak_password" ||
    message.includes("password should be at least") ||
    message.includes("weak password")
  ) {
    return {
      fieldErrors: {
        password: "Password must be at least 8 characters.",
      },
    };
  }

  if (
    code === "email_not_confirmed" ||
    message.includes("email not confirmed")
  ) {
    return {
      fieldErrors: {
        email: "Please confirm your email before signing in.",
      },
    };
  }

  if (
    code === "invalid_credentials" ||
    message.includes("invalid login credentials") ||
    message.includes("invalid email or password")
  ) {
    return {
      fieldErrors: {
        password: "Invalid email or password.",
      },
    };
  }

  if (message.includes("invalid email") || message.includes("unable to validate email")) {
    return {
      fieldErrors: {
        email: "Please enter a valid email address.",
      },
    };
  }

  if (message.includes("password")) {
    return {
      fieldErrors: {
        password: "Please check your password and try again.",
      },
    };
  }

  if (message.includes("email")) {
    return {
      fieldErrors: {
        email: "Please check your email and try again.",
      },
    };
  }

  return {
    formError: "Something went wrong. Please try again.",
  };
}
