import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="mt-20 bg-slate-950 text-slate-300">
    <div className="container-x grid gap-10 py-14 md:grid-cols-4">
      <div className="md:col-span-2"><Link to="/" className="mb-4 inline-flex items-center gap-2 text-xl font-extrabold text-white"><span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600"><BookOpen size={18}/></span>Study Point</Link><p className="max-w-md text-slate-400">A modern learning platform built to help students learn smarter, practice consistently and achieve their goals.</p></div>
      <div><h4 className="mb-4 font-bold text-white">Quick Links</h4><nav className="flex flex-col items-start gap-2 text-sm"><Link to="/" className="hover:text-white">Home</Link><Link to="/courses" className="hover:text-white">Courses</Link><Link to="/about" className="hover:text-white">About</Link><Link to="/contact" className="hover:text-white">Contact</Link></nav></div>
      <div><h4 className="mb-4 font-bold text-white">Contact</h4><div className="space-y-3 text-sm"><p className="flex items-start gap-2"><Phone className="mt-0.5 shrink-0" size={16}/><span><a href="tel:8280971995" className="hover:text-white">8280971995</a><br/><a href="tel:8763464066" className="hover:text-white">8763464066</a></span></p><p className="flex items-start gap-2"><Mail className="mt-0.5 shrink-0" size={16}/><a href="mailto:studypointbbsr@gmail.com" className="break-all hover:text-white">studypointbbsr@gmail.com</a></p><p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0" size={16}/><a href="https://maps.google.com/?q=Plot+No+HIG-87+K-6+Kalinga+Vihar+Bhubaneshwar" target="_blank" rel="noreferrer" className="hover:text-white">Plot No: HIG-87, K-6, Kalinga Vihar,<br/>Bhubaneshwar</a></p></div></div>
    </div><div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">© {new Date().getFullYear()} Study Point. All rights reserved.</div>
  </footer>
}
