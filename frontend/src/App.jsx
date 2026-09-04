import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home"; import Courses from "./pages/Courses"; import CourseDetails from "./pages/CourseDetails"; import About from "./pages/About"; import Contact from "./pages/Contact"; import Login from "./pages/Login"; import Register from "./pages/Register"; import StudentDashboard from "./pages/StudentDashboard"; import TeacherDashboard from "./pages/TeacherDashboard"; import AdminDashboard from "./pages/AdminDashboard"; import AdminCourses from "./pages/AdminCourses"; import AdminEnquiries from "./pages/AdminEnquiries"; import AdminAnnouncements from "./pages/AdminAnnouncements"; import AdminTeachers from "./pages/AdminTeachers"; import Unauthorized from "./pages/Unauthorized";

function Private({ children, roles }) { const { user, loading } = useAuth(); if(loading)return <div className="grid min-h-screen place-items-center">Loading...</div>; if(!user)return <Navigate to="/login" replace/>; if(roles && !roles.includes(user.role))return <Navigate to="/unauthorized" replace/>; return children; }
function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [pathname]); return null; }
function App(){return <AuthProvider><BrowserRouter><ScrollToTop/><Routes>
<Route path="/" element={<PublicLayout><Home/></PublicLayout>}/><Route path="/courses" element={<PublicLayout><Courses/></PublicLayout>}/><Route path="/courses/:slug" element={<PublicLayout><CourseDetails/></PublicLayout>}/><Route path="/about" element={<PublicLayout><About/></PublicLayout>}/><Route path="/contact" element={<PublicLayout><Contact/></PublicLayout>}/><Route path="/login" element={<PublicLayout><Login/></PublicLayout>}/><Route path="/register" element={<PublicLayout><Register/></PublicLayout>}/>
<Route path="/dashboard" element={<Private roles={["student"]}><StudentDashboard/></Private>}/><Route path="/teacher" element={<Private roles={["teacher"]}><TeacherDashboard/></Private>}/>
<Route path="/admin" element={<Private roles={["admin"]}><AdminDashboard/></Private>}/><Route path="/admin/courses" element={<Private roles={["admin"]}><AdminCourses/></Private>}/><Route path="/admin/enquiries" element={<Private roles={["admin"]}><AdminEnquiries/></Private>}/><Route path="/admin/announcements" element={<Private roles={["admin"]}><AdminAnnouncements/></Private>}/><Route path="/admin/teachers" element={<Private roles={["admin"]}><AdminTeachers/></Private>}/>
<Route path="/admin/dashboard" element={<Private roles={["admin"]}><AdminDashboard/></Private>}/>
<Route path="/unauthorized" element={<PublicLayout><Unauthorized/></PublicLayout>}/>
<Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></BrowserRouter></AuthProvider>}
export default App;
