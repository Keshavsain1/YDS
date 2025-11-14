import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Search,
  X as XIcon,
  Menu,
  Home,
  FolderOpen,
  Users,
  Phone,
  Info,
  Briefcase,
  Clipboard,
  LayoutGrid,
} from "lucide-react";
import { projects } from "../data/projects";
import { teamMembers } from "../data/team";

interface NavigationProps {
  onSearch: (query: string) => void;
}

type Suggest =
  | { type: "project"; title: string; projectId: string }
  | { type: "team"; name: string; role: string; memberId: string };

const DEBOUNCE = 250;

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/services", label: "Services", icon: Briefcase },
  { path: "/contact", label: "Contact", icon: Phone },
  { path: "/about", label: "About", icon: Info },
];

const gridItems = [
  { path: "/team", label: "Our Team", icon: Users },
  { path: "/career", label: "Career", icon: Clipboard },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/services", label: "Services", icon: Briefcase },
  { path: "/contact", label: "Contact Us", icon: Phone },
  { path: "/about", label: "About", icon: Info },
];

const Navigation: React.FC<NavigationProps> = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [deskOpen, setDeskOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const [suggests, setSuggests] = useState<Suggest[]>([]);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const debounceTimer = useRef<number | null>(null);
  const deskRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // 🟡 Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🟡 Body scroll lock when mobile nav open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  // 🟡 Reset navQuery when moving between routes
  useEffect(() => {
    setOpen(false);
    if (location.pathname.startsWith("/projects")) return;
    const navQ = searchParams.get("navSearch") || "";
    setNavQuery(navQ);
  }, [location.pathname, searchParams]);

  // 🟡 Debounced search suggestions
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = window.setTimeout(() => {
      const q = navQuery.trim().toLowerCase();
      onSearch(q);
      if (!q) {
        setSuggests([]);
        return;
      }

      const projectMatches: Suggest[] = projects
        .filter((p) =>
          `${p.title} ${p.description} ${p.category} ${p.location}`.toLowerCase().includes(q)
        )
        .slice(0, 4)
        .map((p) => ({ type: "project", title: p.title, projectId: p.id }));

      const teamMatches: Suggest[] = teamMembers
        .filter((m) =>
          `${m.name} ${m.role} ${m.expertise?.join(" ")}`.toLowerCase().includes(q)
        )
        .slice(0, 3)
        .map((m) => ({ type: "team", name: m.name, role: m.role, memberId: m.id }));

      setSuggests([...projectMatches, ...teamMatches].slice(0, 6));
    }, DEBOUNCE);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [navQuery, onSearch]);

  // 🟡 Close desktop popover when clicking outside or pressing ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (deskRef.current && !deskRef.current.contains(e.target as Node)) setDeskOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeskOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // 🟡 Search actions
  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = navQuery.trim();
    onSearch(q);
    navigate(q ? `/projects?navSearch=${encodeURIComponent(q)}` : "/projects");
    setSuggests([]);
  };

  const clearSearch = () => {
    setNavQuery("");
    setSuggests([]);
  };

  const selectSuggestion = (s: Suggest) => {
    if (s.type === "project") {
      navigate(`/projects?navSearch=${encodeURIComponent(s.title)}`);
    } else {
      navigate(`/team#${s.memberId}`);
    }
    setNavQuery("");
    setSuggests([]);
  };

  // 🟡 Keyboard navigation for search suggestions
  const handleKeyNav = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (suggests.length === 0) return;
      const focusable = listRef.current?.querySelectorAll<HTMLLIElement>("li");
      if (!focusable || focusable.length === 0) return;
      const currentIndex = Array.from(focusable).findIndex(
        (el) => document.activeElement === el
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (currentIndex + 1) % focusable.length;
        focusable[next].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (currentIndex - 1 + focusable.length) % focusable.length;
        focusable[prev].focus();
      }
    },
    [suggests.length]
  );

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl border-b ${
        scrolled
          ? "bg-gradient-to-b from-[#0D0E10]/95 via-[#17191C]/90 to-[#0D0E10]/95 shadow-lg border-[#1F1F22]"
          : "bg-[#222831]/70 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <NavLink to="/" end className="flex items-center space-x-2">
            <img
              src="/younick-logo.PNG"
              alt="Younick Design Studio"
              className="h-9 w-auto rounded-md"
            />
            <span className="text-lg font-semibold text-[#E6B566]">
              Younick Design Studio
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Primary Links */}
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                    isActive
                      ? "text-[#E6B566] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-[#E6B566] after:rounded-full"
                      : "text-gray-300 hover:text-[#E6B566]"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}

            {/* Search Box */}
            <form onSubmit={submitSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={navQuery}
                onChange={(e) => setNavQuery(e.target.value)}
                onKeyDown={handleKeyNav}
                className="pl-9 pr-9 py-2 w-64 rounded-lg bg-gray-900/60 text-gray-100 text-sm placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-[#E6B566] focus:outline-none"
                aria-label="Search"
              />
              <Search
                className="absolute left-3 top-2.5 text-[#E6B566]"
                size={16}
                aria-hidden="true"
              />
              {navQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 p-1 rounded-full hover:bg-gray-700/50"
                  aria-label="Clear search"
                >
                  <XIcon size={14} className="text-[#E6B566]" />
                </button>
              )}
              {suggests.length > 0 && (
                <ul
                  id="nav-suggestions"
                  ref={listRef}
                  className="absolute top-full left-0 mt-2 w-64 bg-white/85 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/70 z-50 overflow-hidden animate-fadeInScale"
                >
                  {suggests.map((s) => (
                    <li
                      key={s.type === "project" ? s.projectId : s.memberId}
                      tabIndex={0}
                      onClick={() => selectSuggestion(s)}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 flex items-center justify-between text-sm"
                    >
                      <div>
                        <div className="font-medium text-gray-800">
                          {s.type === "project" ? s.title : s.name}
                        </div>
                        {s.type === "team" && (
                          <div className="text-xs text-gray-500">{s.role}</div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {s.type === "project" ? "Project" : "Team"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </form>

            {/* Grid Popover */}
            <div className="relative" ref={deskRef}>
              <button
                onClick={() => setDeskOpen((v) => !v)}
                aria-expanded={deskOpen}
                aria-haspopup="menu"
                className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-[#E6B566]"
              >
                <LayoutGrid size={18} />
              </button>

              {deskOpen && (
                <div
                  role="menu"
                  aria-label="Navigation shortcuts"
                  className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-white/95 via-white/90 to-gray-50/80 backdrop-blur-xl rounded-2xl shadow-3xl border border-white/20 p-3 z-50 animate-fadeInScale"
                >
                  <div className="grid grid-cols-3 gap-3">
                    {gridItems.map(({ path, label, icon: Icon }) => (
                      <NavLink
                        key={path}
                        to={path}
                        onClick={() => setDeskOpen(false)}
                        className={({ isActive }) =>
                          `flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${
                            isActive
                              ? "bg-[#E6B566]/10 text-[#E6B566]"
                              : "text-gray-700 hover:text-[#E6B566] hover:scale-[1.03]"
                          }`
                        }
                      >
                        <div className="p-2 rounded-full bg-white/70 shadow-sm">
                          <Icon size={16} />
                        </div>
                        <span className="text-xs font-medium">{label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800/60 text-[#E6B566]"
            aria-label="Toggle menu"
          >
            {open ? <XIcon size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-nav"
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-b from-[#141516]/95 to-[#0B0C0D]/95 backdrop-blur-lg rounded-lg mx-2 p-4 border border-gray-800 shadow-lg animate-fadeInScale">
            <div className="grid grid-cols-3 gap-3">
              {gridItems.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-2 p-3 rounded-lg text-center transition-all ${
                      isActive
                        ? "bg-[#E6B566]/10 text-[#E6B566]"
                        : "text-gray-200 hover:text-[#E6B566] hover:bg-gray-800/40"
                    }`
                  }
                >
                  <div className="p-2 rounded-full bg-gray-800/40">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </NavLink>
              ))}
            </div>

            {/* Mobile Search */}
            <div className="mt-5">
              <form onSubmit={submitSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={navQuery}
                    onChange={(e) => setNavQuery(e.target.value)}
                    className="pl-9 pr-9 py-2 w-full rounded-lg bg-gray-900/60 text-gray-100 text-sm placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-[#E6B566] focus:outline-none"
                  />
                  <Search className="absolute left-3 top-2.5 text-[#E6B566]" size={16} />
                  {navQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-2.5 p-1 rounded-full hover:bg-gray-700/50"
                      aria-label="Clear search"
                    >
                      <XIcon size={14} className="text-[#E6B566]" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-5 text-xs text-gray-400 text-center">
              <div>
                Call:{" "}
                <a href="tel:+919000000000" className="text-gray-200 hover:text-[#E6B566]">
                  +91 90000 00000
                </a>
              </div>
              <div>
                Email:{" "}
                <a href="mailto:info@younickdesign.com" className="text-gray-200 hover:text-[#E6B566]">
                  info@younickdesign.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
