"use client";

import {
  AuthForm,
  AuthInput,
  AuthPasswordInput,
} from "@/components/auth/AuthForm";
import { deleteAccount } from "@/app/account/actions";
import { useAuthFieldValidation } from "@/components/auth/AuthForm";

function DeleteConfirmCheckbox() {
  const { error, clearError } = useAuthFieldValidation("understand");

  return (
    <div className={error ? "auth-field--error" : ""}>
      <label className="auth-remember group flex cursor-pointer select-none items-start gap-3">
        <input
          type="checkbox"
          name="understand"
          className="sr-only"
          data-auth-field="understand"
          data-auth-validate="required"
          aria-invalid={error ? true : undefined}
          onChange={() => clearError()}
        />
        <span
          aria-hidden
          className="auth-checkbox-box mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-zinc-700/90 bg-zinc-950/40 transition-all group-has-[:checked]:border-amber/80 group-has-[:checked]:bg-amber/10"
        >
          <span className="scale-75 opacity-0 transition-all group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-3 w-3 text-amber"
              aria-hidden
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        </span>
        <span className="text-sm leading-relaxed text-zinc-500">
          I understand that my account and profile will be permanently deleted.
        </span>
      </label>
      {error && (
        <p className="auth-field-error mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function AccountDangerZone() {
  return (
    <div className="account-settings-panel account-danger-panel game-panel p-5 sm:p-6">
      <p className="account-section-lead text-red-300/90">
        Deleting your account removes your profile and sign-in permanently.
        This cannot be undone.
      </p>
      <AuthForm
        action={deleteAccount}
        submitLabel="Delete my account"
        variant="danger"
        className="mt-5"
      >
        <AuthPasswordInput
          label="Password"
          name="password"
          inputId="account-delete-password"
          required
          autoComplete="current-password"
        />
        <AuthInput
          label='Type "DELETE" to confirm'
          name="confirm_delete"
          inputId="account-delete-confirm"
          required
          autoComplete="off"
        />
        <DeleteConfirmCheckbox />
      </AuthForm>
    </div>
  );
}
