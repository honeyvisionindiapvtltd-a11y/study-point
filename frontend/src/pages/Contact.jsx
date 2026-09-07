import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { api } from "../services/api";
import { catalogCourses } from "../data/courses";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const fields = [["name", "Full name"], ["email", "Email address"], ["phone", "Phone number"]];
  const messageSuggestions = ["Please share the course fees and batch timings.", "I would like to book a counselling call.", "Please tell me about the admission process."];

  const submit = async event => {
    event.preventDefault();
    setError("");
    const phoneValue = form.phone.trim();
    if (!/^[6-9]\d{9}$/.test(phoneValue) || /^(\d)\1{9}$/.test(phoneValue)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      await api.post("/enquiries", form);
      setSent(true);
      setForm({ name: "", email: "", phone: "", course: "", message: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit. Please try again.");
    }
  };

  return <section className="container-x py-16">
    <div className="max-w-2xl"><p className="font-semibold text-indigo-600">Get in touch</p><h1 className="mt-2 text-4xl font-extrabold">Talk to our counselling team</h1><p className="mt-4 text-slate-500">Admissions are open for the 2026-27 batch. Share your details and our team can help you choose the right program.</p></div>
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div className="card flex items-start gap-4 p-5"><Phone className="text-indigo-600"/><div><h2 className="font-bold">Call for admission</h2><p className="mt-1 text-sm text-slate-600"><a href="tel:8280971995" className="font-semibold text-indigo-600 underline">8280971995</a><br/><a href="tel:8763464066" className="font-semibold text-indigo-600 underline">8763464066</a></p></div></div>
      <div className="card flex items-start gap-4 p-5"><Mail className="text-indigo-600"/><div><h2 className="font-bold">Email us</h2><a href="mailto:studypointbbsr@gmail.com" className="mt-1 inline-block break-all text-sm font-semibold text-indigo-600 underline">studypointbbsr@gmail.com</a></div></div>
      <div className="card flex items-start gap-4 p-5"><MapPin className="text-indigo-600"/><div><h2 className="font-bold">Visit our centre</h2><p className="mt-1 text-sm text-slate-600">Plot No: HIG-87, K-6, Kalinga Vihar,<br/>Bhubaneshwar</p></div></div>
    </div>
    <div className="mt-10 max-w-3xl card p-6 sm:p-8">
      {sent ? <div className="rounded-2xl bg-emerald-50 p-6 text-emerald-800"><h2 className="font-bold">Enquiry submitted successfully.</h2><p className="mt-2">Our team will contact you soon.</p></div> : <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
        {fields.map(([key, label]) => <label className="text-sm font-semibold" key={key}>{label}<input type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} pattern={key === "phone" ? "[6-9][0-9]{9}" : undefined} maxLength={key === "phone" ? 10 : undefined} title={key === "phone" ? "Enter a valid 10-digit mobile number" : undefined} required value={form[key]} onChange={event => setForm({ ...form, [key]: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500" /></label>)}
        <label className="text-sm font-semibold">Course interested in<select required value={form.course} onChange={event => setForm({ ...form, course: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"><option value="">Select a course</option>{catalogCourses.map(course => <option key={course.title} value={course.title}>{course.title}</option>)}</select></label>
        <label className="text-sm font-semibold sm:col-span-2">Message<textarea placeholder="Example: Please share the course fees and batch timings." value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} rows="5" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"/><span className="mt-2 block text-xs font-normal text-slate-500">Suggestions</span><div className="mt-2 flex flex-wrap gap-2">{messageSuggestions.map(suggestion => <button type="button" key={suggestion} onClick={() => setForm({ ...form, message: suggestion })} className="rounded-full border border-indigo-200 px-3 py-1.5 text-left text-xs font-medium text-indigo-700 hover:bg-indigo-50">{suggestion}</button>)}</div></label>
        {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}<button className="btn-primary sm:col-span-2">Submit Enquiry</button>
      </form>}
    </div>
  </section>;
}