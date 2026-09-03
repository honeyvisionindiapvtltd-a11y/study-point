import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Unauthorized() {
  const { user } = useAuth();
  const destination = user?.role === "admin" ? "/admin" : user?.role === "teacher" ? "/teacher" : "/dashboard";
  return <div className="grid min-h-[calc(100vh-160px)] place-items-center px-5 py-16"><div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">403</p><h1 className="mt-3 text-3xl font-extrabold">Access denied</h1><p className="mt-3 text-slate-500">You do not have permission to view this page.</p>{user && <Link to={destination} className="btn-primary mt-6 inline-flex">Return to dashboard</Link>}</div></div>;
}