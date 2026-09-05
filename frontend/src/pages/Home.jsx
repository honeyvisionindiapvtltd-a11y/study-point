import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Play,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react";

// Your real images
import image1 from "../accests/WhatsApp Image 2026-08-24 at 12.57.04 PM.jpeg";
import image2 from "../accests/WhatsApp Image 2026-08-24 at 12.57.05 PM.jpeg";
import image3 from "../accests/WhatsApp Image 2026-08-24 at 12.57.05 PM (1).jpeg";
import image4 from "../accests/WhatsApp Image 2026-08-24 at 12.57.05 PM.jpeg";
import image5 from "../accests/A1.png";
import image6 from "../accests/A2.png";
import image7 from "../accests/A3.png";
import image8 from "../accests/A4.png";


// Your videos
import heroVideo from "../accests/AI_Video_Generator_Prompt_Veo.mp4";
import experienceVideo from "../accests/A_realistic_cinematic_scene_in.mp4";

const programs = [
  {
    title: "School Coaching",
    subtitle: "Classes VI–XII",
    description:
      "Complete academic support with strong concepts, regular practice and individual guidance.",
    image: image1,
  },
  {
    title: "CBSE Coaching",
    subtitle: "Structured Learning",
    description:
      "Focused preparation with concept clarity, revision plans and regular assessments.",
    image: image6,
  },
  {
    title: "ICSE & CHSE",
    subtitle: "Academic Excellence",
    description:
      "Detailed subject guidance designed to help students learn with confidence.",
    image: image8,
  },
  {
    title: "JEE Main & Advanced",
    subtitle: "Engineering Preparation",
    description:
      "Concept-first preparation with problem-solving practice, test series and expert guidance.",
    image: image5,
  },
  {
    title: "NEET Preparation",
    subtitle: "Medical Preparation",
    description:
      "Focused preparation with strong concepts, regular practice and exam-ready assessments.",
    image: image7,
  },
  {
    title: "Foundation Course",
    subtitle: "Classes VI–X",
    description:
      "Build strong fundamentals and confidence for future academic success through guided learning.",
    image: image3,
  },
];

const reasons = [
  "Experienced and supportive faculty",
  "Individual attention for every student",
  "Regular tests and performance tracking",
  "Doubt-clearing and academic guidance",
  "Structured learning for better results",
];

const testimonials = [
  {
    name: "Student Experience",
    role: "Academic Program",
    text: "The learning environment is focused and supportive. Regular practice and guidance helped me become more confident in my studies.",
  },
  {
    name: "Parent Feedback",
    role: "Student Support",
    text: "The teachers are approachable and the progress of students is regularly monitored. It gives parents confidence and clarity.",
  },
  {
    name: "Learning Journey",
    role: "Study Point",
    text: "The combination of structured classes, doubt solving and regular tests creates a strong foundation for academic growth.",
  },
];

export default function Home() {
  const heroVideoRef = useRef(null);
  const [isHeroVideoMuted, setIsHeroVideoMuted] = useState(true);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) return undefined;

    video.muted = true;
    const startVideo = () => {
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    video.addEventListener("loadedmetadata", startVideo);
    video.addEventListener("canplay", startVideo);
    observer.observe(video);
    startVideo();

    return () => {
      video.removeEventListener("loadedmetadata", startVideo);
      video.removeEventListener("canplay", startVideo);
      observer.disconnect();
    };
  }, []);

  const toggleHeroVideoSound = () => {
    const video = heroVideoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setIsHeroVideoMuted(video.muted);
  };

  return (
    <main className="overflow-hidden bg-slate-50">
      {/* =====================================================
          1. HERO SECTION
      ====================================================== */}
      <section className="relative isolate min-h-[760px] overflow-hidden bg-[#050b1d] text-white">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(99,102,241,0.28),transparent_30%),radial-gradient(circle_at_15%_80%,rgba(59,130,246,0.15),transparent_28%)]" />

        {/* Decorative lines */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full border border-indigo-400/10" />
        <div className="absolute -left-24 bottom-10 h-64 w-64 rounded-full border border-indigo-400/10" />

        <div className="container-x relative z-10 grid min-h-[760px] items-center gap-14 py-24 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Hero content */}
          <div className="home-hero-copy max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200">
              <Sparkles size={15} />
              Admissions Open for 2026–27
            </div>

            <h1 className="font-[Space_Grotesk] text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl">
              Shape your future.
              <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Learn with confidence.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              A focused learning environment for students from Classes VI
              to XII, with academic guidance and preparation for a stronger
              future.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 font-bold text-white shadow-xl shadow-indigo-500/25 transition hover:-translate-y-1 hover:bg-indigo-400"
              >
                Explore Programs
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10"
              >
                Admission Enquiry
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Mini statistics */}
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-7">
              <div>
                <div className="text-2xl font-extrabold sm:text-3xl">
                  VI–XII
                </div>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Academic Programs
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-2xl font-extrabold sm:text-3xl">
                  5.0 <Star size={18} className="fill-amber-300 text-amber-300" />
                </div>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Student Reviews
                </p>
              </div>

              <div>
                <div className="text-2xl font-extrabold sm:text-3xl">25+</div>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  Faculty Support
                </p>
              </div>
            </div>
          </div>

          {/* Hero video */}
          <div className="home-hero-visual relative mx-auto w-full max-w-xl">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full border border-indigo-300/20" />
            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-900 sm:aspect-[16/12]">
                <video
                  ref={heroVideoRef}
                  autoPlay
                  muted={isHeroVideoMuted}
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050b1d]/80 via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={toggleHeroVideoSound}
                  aria-label={isHeroVideoMuted ? "Turn sound on" : "Mute video"}
                  title={isHeroVideoMuted ? "Turn sound on" : "Mute video"}
                  className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-[#071126]/75 text-white shadow-lg backdrop-blur-xl transition hover:scale-105 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white/80"
                >
                  {isHeroVideoMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#071126]/75 px-4 py-2 text-sm backdrop-blur-xl">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Inside Study Point
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    Learning that moves you forward.
                  </h3>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-white px-5 py-4 text-slate-900 shadow-2xl lg:block">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <TrendingUp size={21} />
                </div>

                <div>
                  <strong className="block text-lg">Progress Focused</strong>
                  <span className="text-xs text-slate-500">
                    Learn. Practice. Improve.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. TRUST / STATISTICS BAR
      ====================================================== */}
      <section className="relative z-20 -mt-1 border-b border-slate-200 bg-white">
        <div className="container-x">
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 lg:grid-cols-4 lg:divide-y-0">
            {[
              ["5.0", "Trusted Rating"],
              ["25+", "Faculty Support"],
              ["VI–XII", "Academic Classes"],
              ["2026–27", "Admissions Open"],
            ].map(([number, label]) => (
              <div key={label} className="px-5 py-7 text-center sm:px-8">
                <div className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  {number}
                </div>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. WHY STUDY POINT
      ====================================================== */}
      <section className="container-x py-20 sm:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Images */}
          <div className="relative pb-8 sm:pb-10 md:pb-12">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src={image1}
                alt="Students learning at Study Point"
                className="aspect-video h-auto w-full object-contain"
              />
            </div>

            <div className="absolute bottom-0 right-0 hidden w-44 overflow-hidden rounded-2xl border-8 border-slate-50 shadow-2xl sm:block md:w-52">
              <img
                src={image2}
                alt="Study Point classroom"
                className="h-64 w-full object-cover"
              />
            </div>

            <div className="absolute -left-4 top-8 hidden rounded-2xl bg-[#081226] px-5 py-4 text-white shadow-xl sm:block">
              <div className="text-2xl font-extrabold">Focused</div>
              <div className="text-sm text-slate-300">Learning Environment</div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="font-bold uppercase tracking-[0.18em] text-indigo-600">
              Why Study Point
            </p>

            <h2 className="mt-4 font-[Space_Grotesk] text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              More than coaching.
              <span className="block text-indigo-600">
                A place to grow.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-600">
              Study Point provides a supportive and structured environment
              where students can strengthen their fundamentals, practice
              consistently and move towards their academic goals with
              confidence.
            </p>

            <div className="home-features mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-indigo-600"
                  />
                  <span className="font-semibold text-slate-700">
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 font-bold text-indigo-600 transition hover:gap-3"
            >
              Discover Study Point
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. PROGRAMS
      ====================================================== */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="font-bold uppercase tracking-[0.18em] text-indigo-600">
                Our Programs
              </p>

              <h2 className="mt-4 font-[Space_Grotesk] text-4xl font-bold text-slate-900 sm:text-5xl">
                Find the right path for your goals.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Explore structured academic programs designed to support
                students at different stages of their learning journey.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 font-bold text-indigo-600 transition hover:gap-3"
            >
              View all programs
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <article
                key={program.title}
                className="home-course-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-indigo-600">
                    {program.subtitle}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">
                    {program.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {program.description}
                  </p>

                  <Link
                    to="/courses"
                    className="mt-auto pt-6 inline-flex items-center gap-2 font-bold text-indigo-600 transition hover:gap-3"
                  >
                    Explore program
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          5. LEARNING JOURNEY
      ====================================================== */}
      <section className="bg-[#081226] py-24 text-white lg:py-32">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-bold uppercase tracking-[0.18em] text-indigo-300">
              Your Learning Journey
            </p>

            <h2 className="mt-4 font-[Space_Grotesk] text-4xl font-bold sm:text-5xl">
              A simple path towards better results.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              A focused process that helps students move from understanding
              concepts to applying them with confidence.
            </p>
          </div>

          <div className="home-journey mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: BookOpen,
                title: "Choose Your Program",
                description:
                  "Find the academic program that matches your class, board and learning goals.",
              },
              {
                number: "02",
                icon: GraduationCap,
                title: "Learn & Practice",
                description:
                  "Build strong concepts through structured classes, guidance and consistent practice.",
              },
              {
                number: "03",
                icon: Award,
                title: "Test & Improve",
                description:
                  "Track progress through regular assessments, feedback and focused improvement.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="home-journey-card relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-indigo-300">
                      {step.number}
                    </span>

                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-indigo-500/15 text-indigo-300">
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="mt-10 text-2xl font-bold">{step.title}</h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          6. LIFE AT STUDY POINT - GALLERY
      ====================================================== */}
      <section className="container-x py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.18em] text-indigo-600">
            Life at Study Point
          </p>

          <h2 className="mt-4 font-[Space_Grotesk] text-4xl font-bold text-slate-900 sm:text-5xl">
            Learning together. Growing together.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            A glimpse into the learning environment, classroom experience and
            everyday journey of our students.
          </p>
        </div>

        <div className="home-gallery mt-14 grid auto-rows-[180px] gap-5 md:grid-cols-12">
          <div className="overflow-hidden rounded-[1.5rem] md:col-span-7 md:row-span-2">
            <img
              src={image1}
              alt="Study Point learning environment"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="overflow-hidden rounded-[1.5rem] md:col-span-5">
            <img
              src={image2}
              alt="Students at Study Point"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="overflow-hidden rounded-[1.5rem] md:col-span-3">
            <img
              src={image3}
              alt="Study Point classroom session"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] bg-indigo-600 md:col-span-2">
            <img
              src={image4}
              alt="Study Point students"
              className="h-full w-full object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-indigo-900/30" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Users size={35} className="text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          7. VIDEO EXPERIENCE
      ====================================================== */}
      <section className="bg-white py-24 lg:py-32">
        <div className="container-x">
          <div className="overflow-hidden rounded-[2rem] bg-[#071126] p-4 shadow-2xl sm:p-6">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-5 sm:p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm font-semibold text-indigo-200">
                  <Play size={15} fill="currentColor" />
                  Experience Study Point
                </div>

                <h2 className="mt-6 font-[Space_Grotesk] text-4xl font-bold leading-tight text-white">
                  See learning in action.
                </h2>

                <p className="mt-5 leading-8 text-slate-400">
                  Step inside the Study Point learning environment and see how
                  students learn, interact, practice and grow together.
                </p>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:-translate-y-1"
                >
                  Visit Study Point
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="relative overflow-hidden rounded-[1.5rem]">
                <video
                  controls
                  playsInline
                  poster={image4}
                  className="aspect-video h-full w-full bg-slate-900 object-cover"
                >
                  <source src={experienceVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          8. TESTIMONIALS
      ====================================================== */}
      <section className="container-x py-24 lg:py-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-bold uppercase tracking-[0.18em] text-indigo-600">
              Student Voices
            </p>

            <h2 className="mt-4 font-[Space_Grotesk] text-4xl font-bold text-slate-900 sm:text-5xl">
              Built around learning, guidance and confidence.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-amber-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={20} fill="currentColor" />
            ))}
            <span className="ml-2 font-bold text-slate-700">
              5.0 Student Rating
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="home-testimonial rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Quote className="text-indigo-200" size={40} fill="currentColor" />

              <p className="mt-6 leading-8 text-slate-600">
                "{testimonial.text}"
              </p>

              <div className="mt-7 border-t border-slate-100 pt-5">
                <strong className="block text-slate-900">
                  {testimonial.name}
                </strong>
                <span className="text-sm text-indigo-600">
                  {testimonial.role}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          9. FINAL ADMISSION CTA
      ====================================================== */}
      <section className="container-x pb-24 lg:pb-32">
        <div className="home-cta relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 px-7 py-14 text-white shadow-2xl sm:px-12 lg:px-16 lg:py-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-32 left-1/2 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-indigo-100">
                Admissions Open 2026–27
              </div>

              <h2 className="mt-6 font-[Space_Grotesk] text-4xl font-bold leading-tight sm:text-5xl">
                Ready to take the next step?
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-indigo-100">
                Start your learning journey with focused guidance, structured
                preparation and a supportive academic environment.
              </p>

              <p className="mt-6 text-sm text-indigo-100">
                Call{" "}
                <a
                  href="tel:8280971995"
                  className="font-bold text-white underline"
                >
                  8280971995
                </a>{" "}
                or{" "}
                <a
                  href="tel:8763464066"
                  className="font-bold text-white underline"
                >
                  8763464066
                </a>{" "}
                for admission enquiries.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-indigo-700 shadow-xl transition hover:-translate-y-1"
              >
                Admission Enquiry
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}