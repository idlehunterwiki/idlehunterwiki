"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { AuthActionState } from "@/app/auth/actions";
import { mapAuthError, type AuthFieldErrors } from "@/lib/auth-action-errors";
import { createClient } from "@/lib/supabase/server";

export type AccountActionState = AuthActionState;

const NOTIFICATION_KEYS = [
  "email_notify_wiki",
  "email_notify_replies",
  "email_notify_newsletter",
] as const;

type NotificationKey = (typeof NOTIFICATION_KEYS)[number];

function isNotificationKey(value: string): value is NotificationKey {
  return (NOTIFICATION_KEYS as readonly string[]).includes(value);
}

export async function updatePassword(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const currentPassword = String(formData.get("current_password") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  const fieldErrors: AuthFieldErrors = {};
  if (!currentPassword) {
    fieldErrors.current_password = "Please enter your current password.";
  }
  if (!newPassword) {
    fieldErrors.new_password = "Please enter a new password.";
  } else if (newPassword.length < 8) {
    fieldErrors.new_password = "Password must be at least 8 characters.";
  }
  if (!confirmPassword) {
    fieldErrors.confirm_password = "Please confirm your new password.";
  } else if (newPassword && newPassword !== confirmPassword) {
    fieldErrors.confirm_password = "Passwords do not match.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: "You must be signed in." };
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (verifyError) {
    return {
      fieldErrors: {
        current_password: "Current password is incorrect.",
      },
    };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    const mapped = mapAuthError(error);
    if (mapped.fieldErrors) return { fieldErrors: mapped.fieldErrors };
    return { error: mapped.formError ?? error.message };
  }

  revalidatePath("/account");
  return { success: "Password updated." };
}

export async function updateNotificationPreference(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const key = String(formData.get("key") ?? "");
  const enabled = formData.get("enabled") === "true";

  if (!isNotificationKey(key)) {
    return { error: "Invalid notification setting." };
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
    .update({ [key]: enabled })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/account");
  return { success: "Notification preference saved." };
}

export async function deleteAccount(
  _prev: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const password = String(formData.get("password") ?? "");
  const confirmText = String(formData.get("confirm_delete") ?? "").trim();
  const understood = formData.get("understand") === "on";

  const fieldErrors: AuthFieldErrors = {};
  if (!password) {
    fieldErrors.password = "Enter your password to confirm deletion.";
  }
  if (confirmText !== "DELETE") {
    fieldErrors.confirm_delete = 'Type DELETE to confirm.';
  }
  if (!understood) {
    fieldErrors.understand =
      "Please confirm that you understand this cannot be undone.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: "You must be signed in." };
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password,
  });

  if (verifyError) {
    return { fieldErrors: { password: "Password is incorrect." } };
  }

  const { error: deleteError } = await supabase.rpc("delete_own_account");

  if (deleteError) {
    return {
      error:
        deleteError.message.includes("function")
          ? "Run supabase/patch-account-settings.sql in Supabase, then try again."
          : deleteError.message,
    };
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/?account_deleted=1");
}
