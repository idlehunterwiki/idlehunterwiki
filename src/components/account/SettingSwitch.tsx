"use client";

interface SettingSwitchProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingSwitch({
  id,
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: SettingSwitchProps) {
  return (
    <div className="setting-switch flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-zinc-200"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`setting-switch-track shrink-0 ${checked ? "setting-switch-track--on" : ""} ${disabled ? "opacity-50" : ""}`}
      >
        <span className="setting-switch-thumb" aria-hidden />
      </button>
    </div>
  );
}
