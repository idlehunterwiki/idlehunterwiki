import type { Metadata } from "next";
import Link from "next/link";
import { AuthPageShell } from "@/components/auth/AuthPageShell";
import {
  AuthForm,
  AuthInput,
  AuthPasswordInput,
  AuthTermsAgreement,
} from "@/components/auth/AuthForm";
import { signUp } from "@/app/auth/actions";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage() {
  return (
    <AuthPageShell mode="signup">
      <div className="mb-3 lg:mb-4">
        <h1 className="font-display text-xl font-bold text-zinc-50 lg:text-2xl">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-zinc-500 lg:text-base">
          Join the wiki in under a minute.
        </p>
      </div>

      <AuthForm action={signUp} submitLabel="Begin your hunt">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-x-8 lg:gap-x-10">
          <AuthInput
            label="Username"
            name="display_name"
            autoComplete="username"
            hint="Shown on your profile."
          />
          <AuthPasswordInput
            label="Password"
            name="password"
            required
            autoComplete="new-password"
            hint="At least 8 characters."
          />
          <AuthInput
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
          <AuthPasswordInput
            label="Confirm password"
            name="confirm_password"
            required
            autoComplete="new-password"
          />
        </div>
        <AuthTermsAgreement />
      </AuthForm>

      <p className="mt-6 text-sm text-zinc-500 lg:text-base">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-amber transition-colors hover:text-zinc-100"
        >
          Log in here
        </Link>
      </p>
    </AuthPageShell>
  );
}
