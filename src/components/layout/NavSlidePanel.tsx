interface NavSlidePanelProps {
  open: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
  /** No horizontal padding — used for search so glow is not clipped at the panel edge. */
  flush?: boolean;
  /** Absolutely positioned overlay — no panel border (parent provides chrome). */
  overlay?: boolean;
}

export function NavSlidePanel({
  open,
  children,
  "aria-label": ariaLabel,
  flush = false,
  overlay = false,
}: NavSlidePanelProps) {
  const contentPad = flush
    ? "px-0 py-2"
    : "px-4 py-3 sm:px-8 lg:px-10";

  return (
    <div
      className={`nav-slide-panel ${overlay ? "nav-slide-panel--overlay" : ""} ${open ? "nav-slide-panel--open" : ""}`}
      aria-hidden={!open}
    >
      <div className="nav-slide-panel-inner">
        <div
          className={`nav-slide-panel-content scrollbar-none mx-auto max-w-[90rem] ${contentPad}`}
          role={ariaLabel ? "region" : undefined}
          aria-label={ariaLabel}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
