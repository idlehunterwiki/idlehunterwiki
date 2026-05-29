import Link from "next/link";
import {
  AuthForm,
  AuthInput,
  AuthPasswordInput,
} from "@/components/auth/AuthForm";
import { NotificationSettings } from "@/components/account/NotificationSettings";
import { displayNameFor } from "@/lib/account-profile-progress";
import { updatePassword } from "@/app/account/actions";
import { AccountDangerZone } from "@/components/account/AccountDangerZone";
import { updateDisplayName } from "@/app/auth/actions";
import { roleLabel } from "@/lib/role-label";
import type { Profile } from "@/types/auth";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(iso));
}

function AccountPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`account-settings-panel game-panel ${className}`.trim()}>
      {children}
    </div>
  );
}

function AccountSubsection({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="account-subsection">
      <h3 className="account-subsection-title">{title}</h3>
      {lead && <p className="account-subsection-lead">{lead}</p>}
      <div className={lead ? "mt-4" : "mt-3"}>{children}</div>
    </section>
  );
}

export function AccountOverview({ profile }: { profile: Profile }) {
  const displayName = displayNameFor(profile);

  return (
    <AccountPanel>
      <div className="flex items-start gap-4">
        <span className="profile-panel-avatar" aria-hidden>
          {displayName.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-lg font-semibold text-zinc-100">{displayName}</p>
          <p className="text-sm text-zinc-500">{profile.email}</p>
          <span
            className={`profile-panel-role mt-2 ${
              profile.role === "admin" ? "profile-panel-role--admin" : ""
            }`}
          >
            {roleLabel(profile.role)}
          </span>
        </div>
      </div>

      <hr className="account-divider" />

      <dl className="account-details-grid">
        <div>
          <dt>Email</dt>
          <dd>{profile.email ?? "—"}</dd>
        </div>
        <div>
          <dt>Role</dt>
          <dd>{roleLabel(profile.role)}</dd>
        </div>
        <div>
          <dt>Member since</dt>
          <dd>{formatDate(profile.created_at)}</dd>
        </div>
        <div>
          <dt>Last updated</dt>
          <dd>{formatDate(profile.updated_at)}</dd>
        </div>
      </dl>

      {profile.role === "admin" && (
        <p className="mt-5 text-sm">
          <Link href="/admin" className="text-amber hover:underline">
            Open admin panel →
          </Link>
        </p>
      )}
    </AccountPanel>
  );
}

export function AccountProfileSettings({ profile }: { profile: Profile }) {
  return (
    <AccountPanel>
      <AccountSubsection
        title="Personal information"
        lead="This information is shown on your hunter profile and used to identify you on the wiki."
      >
        <AuthForm
          action={updateDisplayName}
          submitLabel="Save changes"
          discardHref="/account?tab=profile"
          className="account-settings-form"
        >
          <div className="account-field-grid">
            <AuthInput
              label="Display name"
              name="display_name"
              required
              autoComplete="nickname"
              defaultValue={profile.display_name ?? ""}
            />
            <div className="auth-field min-w-0 w-full">
              <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                Role
              </span>
              <p className="border-b border-border pb-2 text-base text-zinc-400">
                {roleLabel(profile.role)}
              </p>
            </div>
          </div>

          <div className="auth-field min-w-0 w-full">
            <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-zinc-600">
              Email address
            </span>
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-2">
              <span className="text-base text-zinc-200">{profile.email}</span>
              {profile.email && (
                <span className="account-verified-badge">Email verified</span>
              )}
            </div>
            <p className="mt-1.5 text-xs text-zinc-600">
              Contact support to change your login email.
            </p>
          </div>
        </AuthForm>
      </AccountSubsection>
    </AccountPanel>
  );
}

export function AccountPasswordSettings() {
  return (
    <AccountPanel>
      <AccountSubsection
        title="Change password"
        lead="Use a unique password with at least 8 characters. You will stay signed in after saving."
      >
        <AuthForm
          action={updatePassword}
          submitLabel="Save changes"
          discardHref="/account?tab=password"
          className="account-settings-form"
        >
          <AuthPasswordInput
            label="Current password"
            name="current_password"
            inputId="account-current-password"
            required
            autoComplete="current-password"
          />
          <div className="account-field-grid">
            <AuthPasswordInput
              label="New password"
              name="new_password"
              inputId="account-new-password"
              required
              autoComplete="new-password"
              hint="At least 8 characters."
            />
            <AuthPasswordInput
              label="Confirm new password"
              name="confirm_password"
              inputId="account-confirm-password"
              required
              autoComplete="new-password"
            />
          </div>
        </AuthForm>
      </AccountSubsection>

      <AccountSubsection
        title="Two-factor authentication (2FA)"
        lead="Add an extra layer of security when signing in to your account."
      >
        <div className="account-coming-soon">
          <p className="text-sm text-zinc-400">
            Two-factor authentication is not available yet. It will be added in a
            future update so you can protect your account with an authenticator
            app or security key.
          </p>
          <span className="account-coming-soon-badge">Coming soon</span>
        </div>
      </AccountSubsection>
    </AccountPanel>
  );
}

export function AccountNotificationSettings({ profile }: { profile: Profile }) {
  return (
    <AccountPanel>
      <AccountSubsection
        title="Email notifications"
        lead="Choose the types of notifications you want to receive. Changes save automatically."
      >
        <NotificationSettings profile={profile} />
        <p className="mt-4 text-xs text-zinc-600">
          Security emails (password reset, sign-in alerts) may still be sent when
          required.
        </p>
      </AccountSubsection>
    </AccountPanel>
  );
}

export { AccountDangerZone } from "@/components/account/AccountDangerZone";
