type AuthAlertVariant = "success" | "error";

const styles: Record<AuthAlertVariant, string> = {
  success:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  error: "border-red-500/30 bg-red-500/10 text-red-300",
};

export function AuthAlert({
  variant,
  children,
}: {
  variant: AuthAlertVariant;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`mb-6 flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${styles[variant]}`}
      role="alert"
    >
      <span aria-hidden className="mt-0.5 shrink-0">
        {variant === "success" ? "✓" : "!"}
      </span>
      <span>{children}</span>
    </p>
  );
}
