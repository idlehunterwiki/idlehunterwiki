import type { Metadata } from "next";
import Link from "next/link";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { AuthAlert } from "@/components/auth/AuthAlert";
import {
  AuthForm,
  AuthInput,
  AuthPasswordInput,
  AuthRememberMe,
} from "@/components/auth/AuthForm";
import { signIn } from "@/app/auth/actions";

export const metadata: Metadata = {
  title: "Log in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthPageShell mode="login">
      <div className="mb-3 lg:mb-4">
        <h1 className="font-display text-xl font-bold text-zinc-50 lg:text-2xl">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500 lg:text-base">
          Sign in to your hunter profile.
        </p>
      </div>

      {params.error === "callback" && (
        <AuthAlert variant="error">
          Sign-in failed. Please try again.
        </AuthAlert>
      )}

      <AuthForm action={signIn} submitLabel="Enter the realm">
        <AuthInput
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <AuthPasswordInput
          label="Password"
          name="password"
          required
          autoComplete="current-password"
        />
        <AuthRememberMe />
      </AuthForm>

      <p className="mt-6 text-sm text-zinc-500 lg:text-base">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-amber transition-colors hover:text-zinc-100"
        >
          Create one here
        </Link>
      </p>
    </AuthPageShell>
  );
}
