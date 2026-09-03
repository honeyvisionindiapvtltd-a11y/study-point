import allSubjectsImage from "../accests/WhatsApp Image 2026-08-24 at 12.57.04 PM.jpeg";
import foundationImage from "../accests/WhatsApp Image 2026-08-24 at 3.35.35 PM.jpeg";
import cbseImage from "../accests/A2.png";
import icseImage from "../accests/A4.png";
import jeeImage from "../accests/A1.png";
import neetImage from "../accests/A3.png";

export const demoCourses = [
 { title:"JEE Foundation", category:"Engineering", level:"Foundation", duration:"12 Months", image:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80", description:"Strong concepts, structured practice and regular tests for engineering aspirants." },
 { title:"NEET Excellence", category:"Medical", level:"Advanced", duration:"12 Months", image:"https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80", description:"Focused preparation for medical entrance with concept mastery and tests." },
 { title:"Board Exam Mastery", category:"School", level:"Class 10–12", duration:"10 Months", image:"https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80", description:"Complete academic support with notes, doubt solving and mock exams." }
];

export const catalogCourses = [
 { title:"VI to XII All Subjects", category:"School Coaching", level:"Classes VI–XII", duration:"Academic Year", description:"Complete academic support with strong concepts, regular practice and individual guidance.", rating:"4.8", reviews:256, image:allSubjectsImage },
 { title:"CBSE Courses", category:"CBSE", level:"Classes VI–XII", duration:"Academic Year", description:"Focused preparation with concept clarity, revision plans and regular assessments.", rating:"4.9", reviews:312, image:cbseImage },
 { title:"ICSE Courses", category:"ICSE", level:"Classes VI–XII", duration:"Academic Year", description:"Detailed subject guidance designed to help students learn with confidence.", rating:"4.7", reviews:189, image:icseImage },
 { title:"JEE Main & Advanced", category:"Engineering Preparation", level:"Classes XI–XII", duration:"2 Years", description:"Concept-first preparation with problem-solving practice, test series and expert guidance.", rating:"4.8", reviews:256, image:jeeImage },
 { title:"NEET Preparation", category:"Medical Preparation", level:"Classes XI–XII", duration:"2 Years", description:"Focused preparation with strong concepts, regular practice and exam-ready assessments.", rating:"4.9", reviews:312, image:neetImage },
 { title:"Foundation Course", category:"Classes VI–X", level:"Classes VI–X", duration:"2 Years", description:"Build strong fundamentals and confidence for future academic success through guided learning.", rating:"4.7", reviews:189, image:foundationImage }
];