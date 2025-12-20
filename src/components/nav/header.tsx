import React from "react";
import AuthComponent from "./auth-component";
import NavComponent from "./nav-component";
import { AdminButtons } from "./admin-component";
import { isDevMode } from "@/lib/utils/is-dev-mode";
import { ThemeSwitcher } from "@/components/theme-switcher";

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="site-container flex h-16 items-center justify-between">
        <NavComponent />
        <div className="flex items-center gap-4">
          <AdminButtons />
          <ThemeSwitcher />
          {isDevMode() && <AuthComponent />}
        </div>
      </div>
    </header>
  );
}

export default Header;
