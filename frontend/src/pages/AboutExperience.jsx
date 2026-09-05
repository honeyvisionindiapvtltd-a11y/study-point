import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, GraduationCap, Image as ImageIcon, Play, Target, Users, X } from "lucide-react";
import image1 from "../accests/WhatsApp Image 2026-08-24 at 12.57.04 PM.jpeg";
import image2 from "../accests/WhatsApp Image 2026-08-24 at 12.57.05 PM.jpeg";
import image3 from "../accests/WhatsApp Image 2026-08-24 at 12.57.05 PM (1).jpeg";
import image4 from "../accests/WhatsApp Image 2026-08-24 at 3.35.35 PM.jpeg";
import image5 from "../accests/A1.png";
import image6 from "../accests/A2.png";
import image7 from "../accests/A3.png";
import image8 from "../accests/A4.png";
import heroVideo from "../accests/AI_Video_Generator_Prompt_Veo.mp4";
import experienceVideo from "../accests/A_realistic_cinematic_scene_in.mp4";

const galleryItems = [
  { type: "image", src: image1, title: "Learning environment", alt: "Students learning at Study Point" },
  { type: "image", src: image2, title: "Classroom moments", alt: "Study Point classroom" },
  { type: "image", src: image3, title: "Student activities", alt: "Students at Study Point" },
  { type: "image", src: image4, title: "Inside Study Point", alt: "Study Point learning session" },
  { type: "image", src: image5, title: "JEE preparation", alt: "JEE preparation material" },
  { type: "image", src: image6, title: "CBSE coaching", alt: "CBSE coaching material" },
  { type: "image", src: image7, title: "NEET preparation", alt: "NEET preparation material" },
  { type: "image", src: image8, title: "Foundation learning", alt: "Foundation course material" },
  { type: "video", src: heroVideo, poster: image1, title: "Inside the classroom" },
  { type: "video", src: experienceVideo, poster: image4, title: "Learning in action" },
];

function GalleryViewer({ item, onClose, onPrevious, onNext }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [onClose]);

  return <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="relative flex min-h-0 flex-1 items-center justify-center bg-slate-950 p-3 sm:p-8">
        {item.type === "video" ? <video controls autoPlay playsInline poster={item.poster} className="max-h-[70vh] w-full rounded-xl"><source src={item.src} type="video/mp4" /></video> : <img src={item.src} alt={item.alt} className="max-h-[70vh] w-full rounded-xl object-contain" />}
        <button type="button" onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition hover:bg-indigo-600" aria-label="Close gallery viewer"><X size={20} /></button>
        <button type="button" onClick={onPrevious} className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white transition hover:bg-indigo-600" aria-label="Previous gallery item"><ChevronLeft size={22} /></button>
        <button type="button" onClick={onNext} className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white transition hover:bg-indigo-600" aria-label="Next gallery item"><ChevronRight size={22} /></button>
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">Study Point gallery</p><h3 className="mt-1 font-bold text-slate-900">{item.title}</h3></div><span className="hidden text-sm text-slate-500 sm:block">Use arrow buttons to browse</span></div>
    </div>
  </div>;
}

export default function AboutExperience() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedItem = selectedIndex === null ? null : galleryItems[selectedIndex];
  const openNext = () => setSelectedIndex((selectedIndex + 1) % galleryItems.length);
  const openPrevious = () => setSelectedIndex((selectedIndex - 1 + galleryItems.length) % galleryItems.length);

  return <section className="container-x py-16">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center"><img className="h-[500px] w-full rounded-3xl object-cover" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1000&q=85" alt="Students" /><div><p className="font-semibold text-indigo-600">About Study Point Coaching Centre</p><h1 className="mt-2 text-4xl font-extrabold">Education with clarity, discipline and purpose.</h1><p className="mt-5 leading-8 text-slate-600">Study Point in Kalinga Vihar, Bhubaneshwar is a renowned education institution offering high-quality coaching services for many years. We support students from VI to XII across all subjects, including CBSE, ICSE and CHSE, along with focused JEE, NEET and Foundation preparation.</p><div className="mt-7 space-y-4">{["Concept-first teaching", "Regular tests and performance tracking", "Dedicated doubt support", "Student-focused learning environment"].map((item) => <div className="flex gap-3" key={item}><CheckCircle2 className="mt-1 text-indigo-600" size={20} /><span>{item}</span></div>)}</div></div></div>
    <div className="mt-16 grid gap-5 md:grid-cols-3">{[[Target, "Our Mission", "Make quality learning structured and accessible."], [GraduationCap, "Our Approach", "Teach concepts, reinforce through practice and review progress."], [Users, "Our Community", "Students, parents and faculty working toward shared goals."]].map(([Icon, title, description]) => <div className="card p-7" key={title}><Icon className="text-indigo-600" /><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div>)}</div>
    <div className="mt-16 grid gap-10 border-t border-slate-200 pt-12 lg:grid-cols-2"><div><h2 className="text-2xl font-extrabold">Support Services</h2><p className="mt-3 text-slate-600">To enhance the learning experience, Study Point offers services designed around every student’s needs.</p><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600"><li><b>Library:</b> Focused resources for regular study and revision.</li><li><b>Mentorship:</b> Guidance for academic planning and progress.</li><li><b>Parent updates:</b> Clear communication around performance and support.</li></ul></div><div className="rounded-3xl bg-indigo-50 p-8"><h2 className="text-2xl font-extrabold text-slate-900">A focused place to learn</h2><p className="mt-3 leading-7 text-slate-600">We combine strong teaching with consistent practice so students can make steady progress with confidence.</p></div></div>
    <section className="about-gallery mt-20 border-t border-slate-200 pt-16" aria-labelledby="gallery-heading"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-bold uppercase tracking-[0.18em] text-indigo-600">Inside Study Point</p><h2 id="gallery-heading" className="about-gallery-heading mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">See the learning journey.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">Browse classroom moments, study resources and videos from the Study Point experience.</p></div><div className="hidden items-center gap-2 text-sm font-semibold text-slate-500 sm:flex"><ImageIcon size={18} className="text-indigo-600" /> {galleryItems.length} moments</div></div><div className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-4 sm:auto-rows-[180px] sm:grid-cols-4">{galleryItems.map((item, index) => <button type="button" key={item.title} onClick={() => setSelectedIndex(index)} className={`about-gallery-tile group relative overflow-hidden rounded-2xl text-left focus:outline-none focus:ring-4 focus:ring-indigo-300 ${index === 0 || index === 8 ? "col-span-2 row-span-2" : ""}`} aria-label={`Open ${item.title}`}><div className="h-full w-full bg-slate-100">{item.type === "video" ? <video muted autoPlay loop playsInline poster={item.poster} className="h-full w-full object-cover"><source src={item.src} type="video/mp4" /></video> : <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />}</div><span className="absolute inset-0 bg-slate-950/10 transition group-hover:bg-slate-950/45" /><span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm font-bold text-white opacity-0 transition group-hover:opacity-100"><span>{item.title}</span>{item.type === "video" ? <Play size={18} fill="currentColor" /> : <ImageIcon size={18} />}</span></button>)}</div></section>
    {selectedItem && <GalleryViewer item={selectedItem} onClose={() => setSelectedIndex(null)} onPrevious={openPrevious} onNext={openNext} />}
  </section>;
}
