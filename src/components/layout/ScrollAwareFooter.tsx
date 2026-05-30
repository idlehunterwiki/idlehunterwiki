"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function ScrollAwareFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (!isHome) {
      setAtTop(false);
      return;
    }

    function onScroll() {
      setAtTop(window.scrollY <= 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  if (isHome && atTop) {
    return null;
  }

  return <SiteFooter />;
}
