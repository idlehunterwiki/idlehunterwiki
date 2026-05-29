import Link from "next/link";
import { displayNameFor } from "@/lib/account-profile-progress";
import { roleLabel } from "@/lib/role-label";
import type { Profile } from "@/types/auth";

interface AccountSidebarProps {
  profile: Profile;
}

export function AccountSidebar({ profile }: AccountSidebarProps) {
  const name = displayNameFor(profile);
  const initial = name.charAt(0).toUpperCase();

  return (
    <aside className="account-sidebar" aria-label="Account navigation">
      <div className="account-sidebar-user game-panel">
        <div className="account-sidebar-user-row">
          <span className="profile-panel-avatar" aria-hidden>
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-zinc-100">{name}</p>
            <p className="truncate text-xs text-zinc-500">{profile.email}</p>
          </div>
        </div>
        <p className="account-sidebar-role mt-2 text-[10px] uppercase tracking-wider text-zinc-600">
          {roleLabel(profile.role)}
        </p>
      </div>

      <nav className="account-sidebar-nav">
        <p className="account-sidebar-nav-label">Menu</p>
        <ul>
          <li>
            <Link href="/" className="account-sidebar-link">
              <SidebarIconHome />
              <span>Back to wiki</span>
            </Link>
          </li>
          <li>
            <Link
              href="/account?tab=profile"
              className="account-sidebar-link account-sidebar-link--active"
              aria-current="page"
            >
              <SidebarIconSettings />
              <span>Settings</span>
            </Link>
          </li>
          {profile.role === "admin" && (
            <li>
              <Link href="/admin" className="account-sidebar-link">
                <SidebarIconAdmin />
                <span>Admin panel</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

function SidebarIconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="m4 11 8-6 8 6v9H4v-9Z" />
    </svg>
  );
}

function SidebarIconSettings() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function SidebarIconAdmin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3 20 8v8l-8 4-8-4V8l8-5Z" />
    </svg>
  );
}
