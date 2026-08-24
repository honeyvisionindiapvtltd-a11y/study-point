import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Clock3, Users } from "lucide-react";
import { api } from "../services/api";
import { catalogCourses, demoCourses } from "../data/courses";

const slugify = title => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Courses() {
 const [courses,setCourses]=useState(catalogCourses);
 useEffect(()=>{api.get("/courses").then(r=>{const remoteCourses=Array.isArray(r.data)?r.data:Array.isArray(r.data?.courses)?r.data.courses:[];if(remoteCourses.length)setCourses(remoteCourses)}).catch(()=>{});},[]);
 return <>
  <section className="courses-hero"><div className="container-x flex min-h-36 items-center justify-between gap-8 py-8"><div><div className="mb-4 text-xs font-medium text-slate-500"><Link to="/">Home</Link><span className="mx-2">›</span>Courses</div><h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Our Courses</h1><p className="mt-2 max-w-md text-sm leading-6 text-slate-600">Explore our wide range of courses designed to help you achieve your academic goals and secure your future.</p></div><div className="courses-hero-art" aria-hidden="true">STUDY<br/><span>SMART</span></div></div></section>
    <main className="container-x courses-results py-8 lg:py-10"><div className="courses-results-head"><div><h2>All Courses</h2><p>Showing all {courses.length} courses</p></div><select aria-label="Sort courses"><option>Sort by: Popular</option><option>Sort by: Duration</option></select></div><div className="courses-grid">{courses.map((c,i)=><article className="course-tile" key={c._id||c.slug||i}><div className="course-image"><img src={c.image||demoCourses[i%demoCourses.length].image} alt={c.title}/><button aria-label={`Bookmark ${c.title}`}><Bookmark size={16}/></button><strong>{i < 3 ? "2026-27 BATCH" : ""}</strong></div><div className="course-tile-body"><span className="course-category">{c.category}</span><h3>{c.title}</h3><div className="course-meta"><span><Users size={13}/>{c.level}</span><span><Clock3 size={13}/>{c.duration}</span></div><div className="rating">★★★★★ <b>{c.rating || "4.8"}</b> ({c.reviews || 120})</div><div className="course-actions"><Link to={`/courses/${c.slug || slugify(c.title)}`} className="details-button">View Details</Link><Link to="/contact" className="enquire-button">Enquire Now</Link></div></div></article>)}</div></main>
 </>;
}