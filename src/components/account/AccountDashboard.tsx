import { AccountCategoryNav } from "@/components/account/AccountCategoryNav";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import {
  ACCOUNT_SECTION_META,
  parseAccountTab,
} from "@/components/account/account-nav-config";
import {
  AccountDangerZone,
  AccountNotificationSettings,
  AccountOverview,
  AccountPasswordSettings,
  AccountProfileSettings,
} from "@/components/account/AccountSections";
import type { Profile } from "@/types/auth";

interface AccountDashboardProps {
  profile: Profile;
  initialTab?: string;
}

export function AccountDashboard({
  profile,
  initialTab,
}: AccountDashboardProps) {
  const tab = parseAccountTab(initialTab);
  const meta = ACCOUNT_SECTION_META[tab];

  return (
    <div className="account-shell-wrap">
      <div className="account-shell">
        <AccountSidebar profile={profile} />
        <AccountCategoryNav active={tab} />

        <div className="account-main min-w-0">
          <header className="account-main-header">
            <h2 className="account-main-title">{meta.title}</h2>
            <p className="account-main-subtitle">{meta.subtitle}</p>
          </header>

          <div className="account-main-body">
            {tab === "overview" && <AccountOverview profile={profile} />}
            {tab === "profile" && <AccountProfileSettings profile={profile} />}
            {tab === "password" && <AccountPasswordSettings />}
            {tab === "notifications" && (
              <AccountNotificationSettings profile={profile} />
            )}
            {tab === "danger" && <AccountDangerZone />}
          </div>
        </div>
      </div>
    </div>
  );
}
