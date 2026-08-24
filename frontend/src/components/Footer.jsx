import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
export default function Footer() {
  return <footer className="mt-20 bg-slate-950 text-slate-300">
    <div className="container-x grid gap-10 py-14 md:grid-cols-4">
      <div className="md:col-span-2"><div className="mb-4 flex items-center gap-2 text-xl font-extrabold text-white"><span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600"><BookOpen size={18}/></span>Study Point</div><p className="max-w-md text-slate-400">A modern learning platform built to help students learn smarter, practice consistently and achieve their goals.</p></div>
      <div><h4 className="mb-4 font-bold text-white">Quick Links</h4><div className="space-y-2 text-sm"><p>Courses</p><p>About Us</p><p>Faculty</p><p>Contact</p></div></div>
      <div><h4 className="mb-4 font-bold text-white">Contact</h4><div className="space-y-3 text-sm"><p className="flex gap-2"><Phone size={16}/> +91 98765 43210</p><p className="flex gap-2"><Mail size={16}/> hello@studypoint.com</p><p className="flex gap-2"><MapPin size={16}/> Your City, India</p></div></div>
    </div><div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">© {new Date().getFullYear()} Study Point. All rights reserved.</div>
  </footer>
}
