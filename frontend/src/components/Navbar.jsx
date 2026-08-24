import { Link, NavLink } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import logoImage from "../accests/WhatsApp Image 2026-08-24 at 12.57.19 PM.jpeg";

const links = [["/", "Home"], ["/courses", "Courses"], ["/about", "About"], ["/contact", "Contact"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardPath = user?.role === "admin" ? "/admin" : "/dashboard";

  return <header className={`sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur transition-all ${scrolled ? "shadow-lg" : ""}`}>
    <div className={`container-x flex items-center justify-between transition-all ${scrolled ? "h-16" : "h-20"}`}>
      <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900">
        <img className="h-11 w-11 rounded-xl object-cover" src={logoImage} alt="Study Point logo" />
        <span>Study <span>Point</span></span>
      </Link>
      <nav className="hidden items-center gap-6 lg:flex">
        {links.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => isActive && to === "/" ? "nav-link nav-link-active" : "nav-link"}>{label}</NavLink>)}
      </nav>
      <div className="hidden items-center gap-3 md:flex">
        <a href="tel:8280971995" className="nav-call"><Phone size={16} />Call Us</a>
        {user ? <><Link to={dashboardPath} className="nav-login">Dashboard</Link><button type="button" onClick={logout} className="nav-login">Logout</button></> : <Link to="/contact" className="btn-primary px-4 py-2">Apply Now</Link>}
      </div>
      <button type="button" className="grid h-10 w-10 place-items-center rounded-lg text-slate-900 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto border-t border-slate-200 bg-white p-6 md:hidden">
      <nav className="flex flex-col gap-1">
        {links.map(([to, label]) => <Link onClick={() => setOpen(false)} className="border-b border-slate-100 py-4 text-lg font-bold text-slate-800" key={to} to={to}>{label}</Link>)}
        {user && <Link onClick={() => setOpen(false)} className="border-b border-slate-100 py-4 text-lg font-bold text-slate-800" to={dashboardPath}>Dashboard</Link>}
        {user && <button type="button" onClick={() => { logout(); setOpen(false); }} className="border-b border-slate-100 py-4 text-left text-lg font-bold text-slate-800">Logout</button>}
        <Link onClick={() => setOpen(false)} className="btn-gold mt-5" to="/contact">Apply Now <ArrowRightIcon /></Link>
      </nav>
    </div>}
  </header>;
}

function ArrowRightIcon() { return <span aria-hidden="true">→</span>; }
