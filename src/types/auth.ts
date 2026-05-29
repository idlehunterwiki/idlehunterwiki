export type UserRole = "user" | "admin";

export interface Profile {
  id: string;
  email: string | null;
  display_name: string | null;
  role: UserRole;
  email_notify_wiki?: boolean;
  email_notify_replies?: boolean;
  email_notify_newsletter?: boolean;
  created_at: string;
  updated_at: string;
}

export type AccountTab =
  | "overview"
  | "profile"
  | "password"
  | "notifications"
  | "danger";

export const ACCOUNT_TABS: AccountTab[] = [
  "overview",
  "profile",
  "password",
  "notifications",
  "danger",
];
