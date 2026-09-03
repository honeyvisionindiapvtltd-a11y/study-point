import { BookOpen, FileCheck2, Users } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function TeacherDashboard() {
  const { user } = useAuth();
  return <DashboardLayout teacher><div className="mb-8"><p className="text-sm text-slate-500">Teacher dashboard</p><h1 className="text-3xl font-extrabold">Hello, {user?.name?.split(" ")[0]}</h1></div><div className="grid gap-5 sm:grid-cols-3">{[[BookOpen,"Assigned courses","0"],[Users,"Enrolled students","0"],[FileCheck2,"Pending reviews","0"]].map(([Icon,label,value])=><div className="card p-6" key={label}><Icon className="text-indigo-600"/><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-extrabold">{value}</p></div>)}</div><div className="mt-8 card p-6"><h2 className="text-lg font-bold">Teaching workspace</h2><p className="mt-2 text-sm text-slate-500">Your assigned courses, student lists, and review tools will appear here when they are assigned by an administrator.</p></div></DashboardLayout>;
}