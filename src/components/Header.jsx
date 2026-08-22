import { useState } from "react";

import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
