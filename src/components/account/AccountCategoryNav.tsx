import Link from "next/link";
import {
  ACCOUNT_NAV_ITEMS,
  type AccountNavItem,
} from "@/components/account/account-nav-config";
import type { AccountTab } from "@/types/auth";

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="account-category-chevron"
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

interface AccountCategoryNavProps {
  active: AccountTab;
}

export function AccountCategoryNav({ active }: AccountCategoryNavProps) {
  return (
    <div className="account-categories">
      <h1 className="account-categories-title">Settings</h1>

      <ul className="account-category-list">
        {ACCOUNT_NAV_ITEMS.map((item) => (
          <CategoryLink key={item.tab} item={item} active={active} />
        ))}
      </ul>
    </div>
  );
}

function CategoryLink({
  item,
  active,
}: {
  item: AccountNavItem;
  active: AccountTab;
}) {
  const isActive = item.tab === active;

  return (
    <li>
      <Link
        href={`/account?tab=${item.tab}`}
        className={`account-category-link ${isActive ? "account-category-link--active" : ""}`}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="account-category-icon">{item.icon}</span>
        <span className="min-w-0 flex-1">
          <span className="account-category-label">{item.label}</span>
          <span className="account-category-desc">{item.description}</span>
        </span>
        <ChevronRight />
      </Link>
    </li>
  );
}
