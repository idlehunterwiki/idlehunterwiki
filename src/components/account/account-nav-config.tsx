import type { AccountTab } from "@/types/auth";
import type { ReactNode } from "react";

export type AccountNavItem = {
  tab: AccountTab;
  label: string;
  description: string;
  icon: ReactNode;
};

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-4 3.5-6 7-6s7 2 7 6" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 20 7v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4Z" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M15 17H9l1-12h4l1 12ZM10 17a2 2 0 0 0 4 0" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19V5M10 19V9M16 19v-6M22 19V3" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 7h16M9 7V5h6v2M10 11v6M14 11v6M7 7l1 12h8l1-12" />
    </svg>
  );
}

export const ACCOUNT_NAV_ITEMS: AccountNavItem[] = [
  {
    tab: "profile",
    label: "Account settings",
    description: "Display name and email",
    icon: <IconUser />,
  },
  {
    tab: "password",
    label: "Security",
    description: "Password and 2FA",
    icon: <IconShield />,
  },
  {
    tab: "notifications",
    label: "Notifications",
    description: "Email preferences",
    icon: <IconBell />,
  },
  {
    tab: "overview",
    label: "Overview",
    description: "Summary and membership",
    icon: <IconChart />,
  },
  {
    tab: "danger",
    label: "Delete account",
    description: "Permanent removal",
    icon: <IconTrash />,
  },
];

export const ACCOUNT_SECTION_META: Record<
  AccountTab,
  { title: string; subtitle: string }
> = {
  profile: {
    title: "Account settings",
    subtitle:
      "Update your personal information and how you appear on the wiki.",
  },
  password: {
    title: "Security",
    subtitle: "Change your password. Two-factor authentication (2FA) is coming soon.",
  },
  notifications: {
    title: "Notifications",
    subtitle: "Choose which emails you want to receive from the wiki.",
  },
  overview: {
    title: "Overview",
    subtitle: "Your account details at a glance.",
  },
  danger: {
    title: "Delete account",
    subtitle: "Permanently remove your account and profile data.",
  },
};

export function parseAccountTab(value: string | undefined): AccountTab {
  const tabs: AccountTab[] = [
    "profile",
    "password",
    "notifications",
    "overview",
    "danger",
  ];
  if (value && tabs.includes(value as AccountTab)) {
    return value as AccountTab;
  }
  return "profile";
}
