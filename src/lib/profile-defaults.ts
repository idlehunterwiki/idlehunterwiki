import type { Profile } from "@/types/auth";

export function profileNotificationDefaults(profile: Profile) {
  return {
    email_notify_wiki: profile.email_notify_wiki ?? true,
    email_notify_replies: profile.email_notify_replies ?? true,
    email_notify_newsletter: profile.email_notify_newsletter ?? false,
  };
}
