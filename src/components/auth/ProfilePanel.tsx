"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AuthForm,
  AuthInput,
  AuthPasswordInput,
  AuthRememberMe,
  AuthTermsAgreement,
} from "@/components/auth/AuthForm";
import { ProfileAuthInfo } from "@/components/auth/ProfileAuthInfo";
import { signIn, signOut, signUp } from "@/app/auth/actions";
import type { Profile } from "@/types/auth";

const AUTH_MODE_FADE_MS = 240;

function roleLabel(role: Profile["role"]) {
  return role === "admin" ? "Admin" : "Member";
}

function formatMemberSince(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function LoggedInProfileView({ profile }: { profile: Profile }) {
  const displayName =
    profile.display_name?.trim() ||
    profile.email?.split("@")[0] ||
    "Hunter";
  const initial = displayName.charAt(0).toUpperCase();
  const isAdmin = profile.role === "admin";

  return (
    <div className="profile-popover w-full">
      <div className="profile-popover-grid">
        <section
          className="profile-popover-identity"
          aria-labelledby="profile-account-heading"
        >
            <div className="profile-popover-hero">
              <div className="profile-popover-avatar-wrap">
                <span className="profile-popover-avatar" aria-hidden>
                  {initial}
                </span>
              </div>
              <div className="profile-popover-identity-text min-w-0">
                <p className="profile-popover-kicker">Your profile</p>
                <h2
                  id="profile-account-heading"
                  className="profile-popover-name font-display"
                >
                  {displayName}
                </h2>
                {profile.email && (
                  <p className="profile-popover-email truncate">
                    {profile.email}
                  </p>
                )}
                <span
                  className={`profile-panel-role profile-popover-role ${
                    isAdmin ? "profile-panel-role--admin" : ""
                  }`}
                >
                  {roleLabel(profile.role)}
                </span>
              </div>
            </div>

            <ul className="profile-popover-stats" aria-label="Profile details">
              <li className="profile-popover-stat">
                <span className="profile-popover-stat-label">Role</span>
                <span className="profile-popover-stat-value">
                  {roleLabel(profile.role)}
                </span>
              </li>
              <li className="profile-popover-stat">
                <span className="profile-popover-stat-label">Member since</span>
                <span className="profile-popover-stat-value">
                  {formatMemberSince(profile.created_at)}
                </span>
              </li>
            </ul>
        </section>

        <div className="profile-popover-divider" aria-hidden />

        <aside
          className="profile-popover-actions"
          aria-label="Account actions"
        >
            <div className="profile-popover-actions-head">
              <h3 className="profile-popover-links-title font-display">
                Quick <span className="text-amber">links</span>
              </h3>
              <p className="profile-popover-links-desc">
                Manage your hunter profile, update your display name, or sign
                out when you are done.
              </p>
            </div>

            <ul className="profile-popover-action-list">
              <li>
                <Link
                  href="/account?tab=profile"
                  className="profile-popover-action"
                >
                  My account
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className="profile-popover-action profile-popover-action--accent"
                  >
                    Admin panel
                  </Link>
                </li>
              )}
            </ul>

            <form action={signOut} className="profile-popover-signout-form">
              <button
                type="submit"
                className="profile-popover-action profile-popover-action--muted"
              >
                Log out
              </button>
            </form>
        </aside>
      </div>
    </div>
  );
}

type GuestAuthMode = "login" | "signup";

function LoginFormSection({
  onSwitchToSignup,
}: {
  onSwitchToSignup: () => void;
}) {
  return (
    <section aria-labelledby="profile-login-heading">
      <h2 id="profile-login-heading" className="game-section-title">
        Log in
      </h2>
      <p className="profile-panel-auth-desc">Sign in to your hunter profile.</p>
      <AuthForm action={signIn} submitLabel="Log in" panel>
        <AuthInput
          label="Email"
          name="email"
          inputId="profile-login-email"
          type="email"
          required
          autoComplete="email"
          panel
        />
        <AuthPasswordInput
          label="Password"
          name="password"
          inputId="profile-login-password"
          required
          autoComplete="current-password"
          panel
        />
        <AuthRememberMe />
      </AuthForm>
      <p className="profile-panel-toggle">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-medium text-amber transition-colors hover:text-zinc-100"
        >
          Sign up
        </button>
      </p>
    </section>
  );
}

function SignupFormSection({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  return (
    <section aria-labelledby="profile-signup-heading">
      <h2 id="profile-signup-heading" className="game-section-title">
        Sign up
      </h2>
      <p className="profile-panel-auth-desc">Create an account to join the wiki.</p>
      <AuthForm action={signUp} submitLabel="Create account" panel>
        <div className="profile-panel-signup-grid">
          <AuthInput
            label="Username"
            name="display_name"
            inputId="profile-signup-username"
            autoComplete="username"
            hint="Shown on your profile."
            panel
          />
          <AuthPasswordInput
            label="Password"
            name="password"
            inputId="profile-signup-password"
            required
            autoComplete="new-password"
            hint="At least 8 characters."
            panel
          />
          <AuthInput
            label="Email"
            name="email"
            inputId="profile-signup-email"
            type="email"
            required
            autoComplete="email"
            panel
          />
          <AuthPasswordInput
            label="Confirm password"
            name="confirm_password"
            inputId="profile-signup-confirm-password"
            required
            autoComplete="new-password"
            panel
          />
        </div>
        <AuthTermsAgreement />
      </AuthForm>
      <p className="profile-panel-toggle">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-amber transition-colors hover:text-zinc-100"
        >
          Log in
        </button>
      </p>
    </section>
  );
}

function GuestAuthForms({ panelOpen }: { panelOpen: boolean }) {
  const [mode, setMode] = useState<GuestAuthMode>("login");
  const [visible, setVisible] = useState(true);
  const [formHeight, setFormHeight] = useState(0);
  const formInnerRef = useRef<HTMLDivElement>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modeRef = useRef<GuestAuthMode>("login");
  modeRef.current = mode;

  const switchMode = useCallback((next: GuestAuthMode) => {
    if (modeRef.current === next) return;

    setVisible(false);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setMode(next);
      requestAnimationFrame(() => setVisible(true));
    }, AUTH_MODE_FADE_MS);
  }, []);

  useEffect(() => {
    if (!panelOpen) {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      setMode("login");
      setVisible(true);
    }
  }, [panelOpen]);

  useEffect(
    () => () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    },
    [],
  );

  useLayoutEffect(() => {
    const el = formInnerRef.current;
    if (!el) return;

    const updateHeight = () => setFormHeight(el.scrollHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, visible]);

  const fadeClass = visible
    ? "profile-auth-fade--visible"
    : "profile-auth-fade--hidden";

  return (
    <div className="profile-panel-guest w-full">
      <div className="profile-panel-layout">
        <div className="profile-panel-form">
          <div
            className="profile-auth-form-viewport"
            style={{ height: formHeight > 0 ? formHeight : undefined }}
          >
            <div
              ref={formInnerRef}
              className={`profile-auth-fade ${fadeClass}`}
            >
              {mode === "login" ? (
                <LoginFormSection
                  onSwitchToSignup={() => switchMode("signup")}
                />
              ) : (
                <SignupFormSection
                  onSwitchToLogin={() => switchMode("login")}
                />
              )}
            </div>
          </div>
        </div>
        <ProfileAuthInfo
          mode={mode}
          className={`profile-auth-fade ${fadeClass}`}
        />
      </div>
    </div>
  );
}

function ProfilePanelLoading() {
  return (
    <div
      className="profile-popover w-full"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <div className="profile-popover-grid profile-popover-grid--loading">
        <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-16 w-16 shrink-0 animate-pulse rounded-full bg-zinc-800/90" />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
                <div className="h-7 w-36 animate-pulse rounded bg-zinc-800" />
                <div className="h-4 w-44 animate-pulse rounded bg-zinc-800/80" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 animate-pulse rounded-lg bg-zinc-800/70" />
              <div className="h-14 animate-pulse rounded-lg bg-zinc-800/70" />
            </div>
          </div>
        <div className="profile-popover-divider hidden md:block" aria-hidden />
        <div className="hidden space-y-3 md:block">
          <div className="h-6 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="h-14 animate-pulse rounded-lg bg-zinc-800/70" />
          <div className="h-10 animate-pulse rounded-lg bg-zinc-800/50" />
        </div>
      </div>
    </div>
  );
}

interface ProfilePanelProps {
  profile: Profile | null;
  loading?: boolean;
  panelOpen: boolean;
  authConfigured?: boolean;
}

export function ProfilePanel({
  profile,
  loading = false,
  panelOpen,
  authConfigured = true,
}: ProfilePanelProps) {
  if (loading) {
    return <ProfilePanelLoading />;
  }

  if (!authConfigured && !profile) {
    return (
      <div className="profile-panel w-full">
        <p className="text-sm text-zinc-500">
          Sign-in is not available right now. Add{" "}
          <code className="text-amber">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-amber">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in
          Vercel, then redeploy.
        </p>
      </div>
    );
  }

  return (
    <div className="profile-panel w-full">
      {profile ? (
        <LoggedInProfileView profile={profile} />
      ) : (
        <GuestAuthForms panelOpen={panelOpen} />
      )}
    </div>
  );
}
