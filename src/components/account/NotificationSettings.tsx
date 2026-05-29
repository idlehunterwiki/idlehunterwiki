"use client";

import { useEffect, useState, useTransition } from "react";
import { updateNotificationPreference } from "@/app/account/actions";
import { SettingSwitch } from "@/components/account/SettingSwitch";
import { profileNotificationDefaults } from "@/lib/profile-defaults";
import type { Profile } from "@/types/auth";

const ITEMS = [
  {
    key: "email_notify_wiki" as const,
    label: "Wiki updates",
    description: "New articles and major wiki changes.",
  },
  {
    key: "email_notify_replies" as const,
    label: "Replies & mentions",
    description: "Activity on your contributions.",
  },
  {
    key: "email_notify_newsletter" as const,
    label: "Newsletter",
    description: "Community highlights and news.",
  },
];

interface NotificationSettingsProps {
  profile: Profile;
}

export function NotificationSettings({ profile }: NotificationSettingsProps) {
  const defaults = profileNotificationDefaults(profile);
  const [prefs, setPrefs] = useState(defaults);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setPrefs(profileNotificationDefaults(profile));
  }, [profile]);

  function setPref(key: keyof typeof defaults, value: boolean) {
    const previous = prefs;
    setPrefs({ ...prefs, [key]: value });
    startTransition(async () => {
      const formData = new FormData();
      formData.set("key", key);
      formData.set("enabled", String(value));
      const result = await updateNotificationPreference({}, formData);
      if (result.error || result.fieldErrors) {
        setPrefs(previous);
      }
    });
  }

  return (
    <ul className="account-notify-grid">
      {ITEMS.map((item) => (
        <li key={item.key} className="account-notify-item game-panel">
          <SettingSwitch
            id={`notify-${item.key}`}
            label={item.label}
            description={item.description}
            checked={prefs[item.key]}
            disabled={pending}
            onChange={(checked) => setPref(item.key, checked)}
          />
        </li>
      ))}
    </ul>
  );
}
