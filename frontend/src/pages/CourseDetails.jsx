import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock3, GraduationCap, Phone, Users } from "lucide-react";
import { catalogCourses } from "../data/courses";

const courseDetails = {
 "vi-to-xii-all-subjects": { overview: "Complete academic coaching for students from Class VI to XII, with subject-wise guidance, regular practice and progress tracking.", subjects: "All subjects", support: "Concept classes, study material, doubt clearing and mock tests." },
 "cbse-coaching": { overview: "Focused CBSE coaching that builds strong fundamentals and prepares students for school examinations with confidence.", subjects: "CBSE curriculum and all subjects", support: "Chapter revision, regular assessments and personalized attention." },
 "icse-coaching": { overview: "Structured ICSE preparation with clear explanations, guided practice and support for every stage of the academic year.", subjects: "ICSE curriculum and all subjects", support: "Detailed study material, doubt support and performance analysis." },
 "chse-coaching": { overview: "Senior secondary coaching for CHSE students with disciplined preparation and focused academic support.", subjects: "CHSE curriculum and all subjects", support: "Regular tests, revision plans and experienced faculty guidance." },
 "jee-main-advanced": { overview: "A concept-first JEE program for students who want focused preparation for both Main and Advanced examinations.", subjects: "Physics, Chemistry and Mathematics", support: "Problem-solving practice, test series and performance feedback." },
 "neet-preparation": { overview: "Focused NEET preparation that combines concept mastery, question practice and regular testing for medical aspirants.", subjects: "Physics, Chemistry and Biology", support: "Revision support, doubt clearing and exam-readiness assessments." },
 "foundation-course": { overview: "A strong academic foundation for Classes VI to X, helping students develop concepts and confidence before higher-level preparation.", subjects: "Mathematics, Science and core subjects", support: "Activity-based learning, study material and regular progress checks." }
};

const slugify = title => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function CourseDetails() {
 const { slug } = useParams();
 const course = catalogCourses.find(item => (item.slug || slugify(item.title)) === slug);
 if (!course) return <main className="container-x py-20"><h1 className="text-3xl font-extrabold">Course not found</h1><Link to="/courses" className="mt-5 inline-flex text-indigo-600">Back to courses</Link></main>;
 const details = courseDetails[slug] || courseDetails[slugify(course.title)];
 return <main>
  <section className="courses-hero"><div className="container-x py-8"><Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={16}/>All Courses</Link><div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center"><div><span className="course-category">{course.category}</span><h1 className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">{course.title}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{details.overview}</p><div className="mt-7 flex flex-wrap gap-5 text-sm text-slate-600"><span className="inline-flex items-center gap-2"><Users size={17} className="text-indigo-600"/>{course.level}</span><span className="inline-flex items-center gap-2"><Clock3 size={17} className="text-indigo-600"/>{course.duration}</span></div></div><img className="h-72 w-full rounded-2xl object-cover shadow-lg lg:h-80" src={course.image} alt={course.title}/></div></div></section>
  <section className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_320px]"><div><h2 className="text-2xl font-extrabold">Course overview</h2><p className="mt-4 leading-7 text-slate-600">Study Point Coaching Centre provides experienced faculty, modern classrooms and a supportive learning environment for this program. Students receive structured guidance throughout the 2026–27 batch.</p><div className="mt-10 grid gap-5 sm:grid-cols-2"><div className="card p-6"><GraduationCap className="text-indigo-600"/><h3 className="mt-4 font-bold">Subjects covered</h3><p className="mt-2 text-sm leading-6 text-slate-500">{details.subjects}</p></div><div className="card p-6"><CheckCircle2 className="text-indigo-600"/><h3 className="mt-4 font-bold">Student support</h3><p className="mt-2 text-sm leading-6 text-slate-500">{details.support}</p></div></div></div><aside className="self-start rounded-2xl bg-indigo-600 p-7 text-white"><h2 className="text-2xl font-extrabold">Admissions open</h2><p className="mt-3 leading-7 text-indigo-100">Enquire now for the 2026–27 batch and get course guidance from our counselling team.</p><a href="tel:8280971995" className="mt-6 flex items-center gap-2 font-bold"><Phone size={17}/>8280971995</a><a href="tel:8763464066" className="mt-2 block font-bold">8763464066</a><Link to="/contact" className="mt-7 inline-flex w-full justify-center rounded-xl bg-white px-5 py-3 font-bold text-indigo-700">Make an Enquiry</Link></aside></section>
 </main>;
}
