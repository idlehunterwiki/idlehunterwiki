import type { Profile } from "@/types/auth";

export function displayNameFor(profile: Profile): string {
  return (
    profile.display_name?.trim() ||
    profile.email?.split("@")[0] ||
    "Hunter"
  );
}
