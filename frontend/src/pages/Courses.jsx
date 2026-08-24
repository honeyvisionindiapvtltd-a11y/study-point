import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { demoCourses } from "../data/courses";
export default function Courses() {
 const [courses,setCourses]=useState(demoCourses);
 useEffect(()=>{api.get("/courses").then(r=>{if(r.data?.length)setCourses(r.data)}).catch(()=>{});},[]);
 return <section className="container-x py-16"><div className="max-w-2xl"><p className="font-semibold text-indigo-600">Our programs</p><h1 className="mt-2 text-4xl font-extrabold">Choose your path to success</h1><p className="mt-4 text-slate-500">Explore structured programs designed around concepts, practice and measurable progress.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.map((c,i)=><article className="card overflow-hidden" key={c._id||c.slug||i}><img className="h-48 w-full object-cover" src={c.image||demoCourses[i%demoCourses.length].image} alt={c.title}/><div className="p-6"><div className="flex justify-between text-xs font-bold uppercase tracking-wide text-indigo-600"><span>{c.category}</span><span>{c.level}</span></div><h2 className="mt-3 text-xl font-bold">{c.title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{c.description}</p><div className="mt-5 flex items-center justify-between"><span className="font-bold">{c.fee ? `₹${c.fee.toLocaleString?.()||c.fee}` : "Contact us"}</span><Link to="/contact" className="btn-primary px-4 py-2 text-sm">Enquire</Link></div></div></article>)}</div></section>
}