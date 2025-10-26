import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const NavLink = ({ to, children, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={
      "px-3 py-2 rounded-md text-sm font-medium transition-colors " +
      (isActive
        ? "text-blue-700 bg-blue-50"
        : "text-slate-700 hover:text-blue-700 hover:bg-slate-100")
    }
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/editor", label: "Editor" },
    // { to: "/about", label: "About" },
    // { to: "/dashboard", label: "Dashboard" },
    // { to: "/login", label: "Login" },
    // { to: "/signup", label: "SignUp" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-slate-600 grid place-items-center text-white font-bold shadow-sm">
              CE
            </div>
            <span className="text-xl font-semibold text-slate-800">
              CodeEditor
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} isActive={pathname === l.to}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="space-y-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  isActive={pathname === l.to}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
