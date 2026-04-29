"use client";

import { useState } from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import MobileDrawer from "./MobileDrawer";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DesktopHeader />
      <MobileHeader onOpenMenu={() => setOpen(true)} />
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
