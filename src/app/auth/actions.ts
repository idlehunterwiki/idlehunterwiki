"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mapAuthError, type AuthFieldErrors } from "@/lib/auth-action-errors";

export type AuthActionState = {
  /** Shown inline when the error is not tied to a specific field */
  error?: string;
  /** Inline errors under matching inputs (email, password, etc.) */
  fieldErrors?: AuthFieldErrors;
  success?: string;
};

export async function signUp(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim();
  const termsAccepted = formData.get("terms") === "on";

  if (!email) {
    return { fieldErrors: { email: "Please enter your email." } };
  }
  if (!password) {
    return { fieldErrors: { password: "Please enter your password." } };
  }
  if (password.length < 8) {
    return { fieldErrors: { password: "Password must be at least 8 characters." } };
  }
  if (password !== confirmPassword) {
    return { fieldErrors: { confirm_password: "Passwords do not match." } };
  }
  if (!termsAccepted) {
    return {
      fieldErrors: {
        terms: "Please accept the Terms of Service and Community Guidelines.",
      },
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || email.split("@")[0] },
    },
  });

  if (error) {
    const mapped = mapAuthError(error);
    if (mapped.fieldErrors) return { fieldErrors: mapped.fieldErrors };
    return { error: mapped.formError ?? error.message };
  }

  if (!data.session) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const mapped = mapAuthError(signInError);
      if (mapped.fieldErrors) return { fieldErrors: mapped.fieldErrors };
      return {
        error:
          mapped.formError ??
          "Account created, but sign-in failed. Confirm your email if required, then log in.",
      };
    }
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signIn(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  const fieldErrors: AuthFieldErrors = {};
  if (!email) fieldErrors.email = "Please enter your email.";
  if (!password) fieldErrors.password = "Please enter your password.";
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const supabase = await createClient({ rememberSession: remember });
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const mapped = mapAuthError(error);
    if (mapped.fieldErrors) return { fieldErrors: mapped.fieldErrors };
    return {
      fieldErrors: { password: "Invalid email or password." },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateDisplayName(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const displayName = String(formData.get("display_name") ?? "").trim();
  if (!displayName) {
    return { fieldErrors: { display_name: "Please enter a display name." } };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/account");
  return { success: "Display name updated." };
}

export async function updateUserRole(
  userId: string,
  role: "user" | "admin",
): Promise<AuthActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "You must be signed in." };
  }

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (me?.role !== "admin") {
    return { error: "Only administrators can change roles." };
  }

  if (userId === user.id && role !== "admin") {
    return { error: "You cannot remove your own admin role." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: "Role updated." };
}
