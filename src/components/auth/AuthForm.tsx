"use client";

import Link from "next/link";
import {
  createContext,
  startTransition,
  useActionState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { AuthActionState } from "@/app/auth/actions";
import {
  firstInvalidField,
  validateAuthForm,
} from "@/components/auth/auth-form-validation";

interface AuthFormProps {
  action: (
    prev: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>;
  children: React.ReactNode;
  submitLabel: string;
  compact?: boolean;
  /** Navbar profile panel — tighter spacing and controls */
  panel?: boolean;
  className?: string;
  /** Red destructive styling for delete-account etc. */
  variant?: "default" | "danger";
  /** Shows “Discard changes” beside submit (account settings layout). */
  discardHref?: string;
}

type AuthFormValidationContextValue = {
  errors: Record<string, string>;
  clearError: (name: string) => void;
};

const AuthFormValidationContext =
  createContext<AuthFormValidationContextValue | null>(null);

export function useAuthFieldValidation(name: string) {
  const ctx = useContext(AuthFormValidationContext);
  return {
    error: ctx?.errors[name],
    clearError: () => ctx?.clearError(name),
  };
}

function AuthFieldError({
  id,
  message,
  panel,
}: {
  id: string;
  message: string;
  panel?: boolean;
}) {
  return (
    <p
      id={id}
      className={`auth-field-error ${panel ? "text-[11px]" : ""}`}
      role="alert"
    >
      {message}
    </p>
  );
}

export function AuthForm({
  action,
  children,
  submitLabel,
  compact = false,
  panel = false,
  className = "",
  variant = "default",
  discardHref,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.fieldErrors && Object.keys(state.fieldErrors).length > 0) {
      setFieldErrors(state.fieldErrors);
      requestAnimationFrame(() => {
        if (formRef.current) {
          firstInvalidField(formRef.current, state.fieldErrors!)?.focus();
        }
      });
      return;
    }

    if (state.error) {
      setFieldErrors({ _form: state.error });
    }
  }, [state.fieldErrors, state.error]);

  const clearError = useCallback((name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const validationContext = useMemo(
    () => ({ errors: fieldErrors, clearError }),
    [fieldErrors, clearError],
  );

  const spacing = panel ? "space-y-3" : compact ? "space-y-4" : "space-y-6";
  const submitSize = panel
    ? "py-2.5 text-sm"
    : "py-3 text-sm lg:py-3.5 lg:text-base";
  const submitVariant =
    variant === "danger" ? "auth-submit auth-submit--danger" : "auth-submit";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const errors = validateAuthForm(form);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      firstInvalidField(form, errors)?.focus();
      return;
    }

    setFieldErrors({});
    startTransition(() => {
      formAction(new FormData(form));
    });
  }

  return (
    <AuthFormValidationContext.Provider value={validationContext}>
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className={`w-full ${spacing} ${className}`}
      >
        {children}

        {fieldErrors._form && (
          <AuthFieldError
            id="auth-form-error"
            message={fieldErrors._form}
            panel={panel}
          />
        )}
        {state.success && (
          <p
            className="flex items-start gap-2 rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-3 py-2.5 text-sm text-emerald-300"
            role="status"
          >
            <span aria-hidden>✓</span>
            {state.success}
          </p>
        )}

        <div
          className={
            discardHref
              ? "account-form-actions"
              : "w-full"
          }
        >
          {discardHref && (
            <Link href={discardHref} className="account-form-discard">
              Discard changes
            </Link>
          )}
          <button
          type="submit"
          disabled={pending}
          className={`${submitVariant} group relative overflow-hidden rounded-lg font-bold tracking-wide transition-all duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.99] disabled:opacity-60 ${submitSize} ${discardHref ? "account-form-submit" : "w-full"}`}
        >
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-amber-dim via-amber to-[#fbbf24]"
          />
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="relative z-10 text-zinc-950">
            {pending ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950" />
                Please wait…
              </span>
            ) : (
              submitLabel
            )}
        </span>
      </button>
        </div>
    </form>
    </AuthFormValidationContext.Provider>
  );
}

const fieldWrapClass = "auth-field group min-w-0 w-full";

const labelAboveClass =
  "mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-zinc-600 transition-colors group-focus-within:text-amber";

const panelLabelAboveClass =
  "mb-1 block text-[10px] font-medium uppercase tracking-wider text-zinc-600 transition-colors group-focus-within:text-amber";

const inputClass =
  "auth-field-input w-full bg-transparent px-0 pb-2 pt-0 text-base text-zinc-100 placeholder:text-zinc-600 focus:outline-none";

const panelInputClass =
  "auth-field-input w-full bg-transparent px-0 pb-1.5 pt-0 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none";

export function AuthInput({
  label,
  name,
  inputId,
  type = "text",
  required,
  autoComplete,
  hint,
  panel = false,
  defaultValue,
}: {
  label: string;
  name: string;
  inputId?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  panel?: boolean;
  defaultValue?: string;
}) {
  const id = inputId ?? name;
  const { error, clearError } = useAuthFieldValidation(name);
  const errorId = `${id}-error`;

  return (
    <div className={`${fieldWrapClass}${error ? " auth-field--error" : ""}`}>
      <label htmlFor={id} className={panel ? panelLabelAboveClass : labelAboveClass}>
        {label}
      </label>
      <div className="underline-field">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          className={panel ? panelInputClass : inputClass}
          data-auth-field={name}
          data-auth-validate={required ? "required" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onInput={() => clearError()}
        />
      </div>
      {error ? (
        <AuthFieldError id={errorId} message={error} panel={panel} />
      ) : (
        hint && (
          <p
            className={`mt-1 text-zinc-600 ${panel ? "text-[11px]" : "mt-1.5 text-xs"}`}
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function EyeShowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeHideIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export function AuthPasswordInput({
  label,
  name,
  inputId,
  required,
  autoComplete,
  hint,
  panel = false,
}: {
  label: string;
  name: string;
  inputId?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  panel?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const id = inputId ?? name;
  const inputCls = panel ? panelInputClass : inputClass;
  const { error, clearError } = useAuthFieldValidation(name);
  const errorId = `${id}-error`;

  return (
    <div className={`${fieldWrapClass}${error ? " auth-field--error" : ""}`}>
      <label
        htmlFor={id}
        className={panel ? panelLabelAboveClass : labelAboveClass}
      >
        {label}
      </label>
      <div className="underline-field relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          className={`${inputCls} pr-10`}
          data-auth-field={name}
          data-auth-validate={required ? "required" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onInput={() => clearError()}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-0 bottom-2 text-zinc-500 transition-colors hover:text-amber"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeHideIcon /> : <EyeShowIcon />}
        </button>
      </div>
      {error ? (
        <AuthFieldError id={errorId} message={error} panel={panel} />
      ) : (
        hint && (
          <p
            className={`mt-1 text-zinc-600 ${panel ? "text-[11px]" : "mt-1.5 text-xs"}`}
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function CheckboxCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 text-amber"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AuthCheckbox({
  name,
  required,
  className = "",
  children,
}: {
  name: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { error, clearError } = useAuthFieldValidation(name);
  const errorId = `${name}-error`;

  return (
    <div className={`${error ? "auth-field--error" : ""}`}>
      <label
        className={`auth-remember group flex cursor-pointer select-none items-start gap-3 ${className}`}
      >
        <input
          type="checkbox"
          name={name}
          className="sr-only"
          data-auth-field={name}
          data-auth-validate={required ? "required" : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={() => clearError()}
        />
        <span
          aria-hidden
          className="auth-checkbox-box mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-zinc-700/90 bg-zinc-950/40 transition-all duration-200 group-has-[:checked]:border-amber/80 group-has-[:checked]:bg-amber/10 group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-amber/25 group-hover:border-zinc-500"
        >
          <span className="scale-75 opacity-0 transition-all duration-200 group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100">
            <CheckboxCheckIcon />
          </span>
        </span>
        <span className="text-xs leading-relaxed text-zinc-500 transition-colors duration-200 group-has-[:checked]:text-zinc-400">
          {children}
        </span>
      </label>
      {error && <AuthFieldError id={errorId} message={error} panel />}
    </div>
  );
}

export function AuthRememberMe() {
  return (
    <AuthCheckbox name="remember" className="-mt-1 items-center">
      <span className="font-medium tracking-wide group-hover:text-zinc-400">
        Remember me
      </span>
    </AuthCheckbox>
  );
}

export function AuthTermsAgreement() {
  return (
    <AuthCheckbox name="terms" required className="-mt-1">
      I agree to the{" "}
      <a
        href="/terms"
        className="font-medium text-amber underline-offset-2 hover:text-zinc-100 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href="/terms#community-guidelines"
        className="font-medium text-amber underline-offset-2 hover:text-zinc-100 hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        Community Guidelines
      </a>
      .
    </AuthCheckbox>
  );
}
