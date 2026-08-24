import { Link, NavLink } from "react-router-dom";
import { BookOpen, Menu, X, UserCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const links = [["/", "Home"], ["/courses", "Courses"], ["/about", "About"], ["/contact", "Contact"]];
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
    <div className="container-x flex h-18 items-center justify-between py-4">
      <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white"><BookOpen size={21}/></span>Study<span className="text-indigo-600">Point</span></Link>
      <nav className="hidden items-center gap-7 md:flex">{links.map(([to,label]) => <NavLink key={to} to={to} className={({isActive}) => isActive ? "font-semibold text-indigo-600" : "font-medium text-slate-600 hover:text-indigo-600"}>{label}</NavLink>)}</nav>
      <div className="hidden items-center gap-3 md:flex">
        {user ? <><Link to={user.role === "admin" ? "/admin" : "/dashboard"} className="btn-secondary"><UserCircle size={18}/> Dashboard</Link><button onClick={logout} className="font-semibold text-slate-600">Logout</button></> :
        <><Link to="/login" className="font-semibold text-slate-600">Login</Link><Link to="/register" className="btn-primary">Get Started</Link></>}
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <div className="border-t border-slate-100 px-4 pb-5 md:hidden"><div className="flex flex-col gap-4 pt-4">{links.map(([to,label]) => <Link onClick={() => setOpen(false)} key={to} to={to}>{label}</Link>)}{user ? <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>Dashboard</Link> : <Link to="/login">Login</Link>}</div></div>}
  </header>
}
