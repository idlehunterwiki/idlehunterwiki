import type { Metadata } from "next";
import { AccountDashboard } from "@/components/account/AccountDashboard";
import { requireAuth, getProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "My account",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await requireAuth();
  const profile = await getProfile(user.id);
  const params = await searchParams;

  if (!profile) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center text-muted">
        <p>Could not load your profile.</p>
        <p className="mt-2 text-sm">
          Run{" "}
          <code className="text-amber">supabase/patch-ensure-profile.sql</code>{" "}
          in the Supabase SQL Editor, then reload this page.
        </p>
      </div>
    );
  }

  return (
    <AccountDashboard profile={profile} initialTab={params.tab} />
  );
}
