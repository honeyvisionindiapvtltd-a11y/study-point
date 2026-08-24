import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home"; import Courses from "./pages/Courses"; import About from "./pages/About"; import Contact from "./pages/Contact"; import Login from "./pages/Login"; import Register from "./pages/Register"; import StudentDashboard from "./pages/StudentDashboard"; import AdminDashboard from "./pages/AdminDashboard"; import AdminCourses from "./pages/AdminCourses"; import AdminEnquiries from "./pages/AdminEnquiries"; import AdminAnnouncements from "./pages/AdminAnnouncements";

function Private({ children, role }) { const { user, loading } = useAuth(); if(loading)return <div className="grid min-h-screen place-items-center">Loading…</div>; if(!user)return <Navigate to="/login" replace/>; if(role && user.role!==role)return <Navigate to={user.role==="admin"?"/admin":"/dashboard"} replace/>; return children; }
function App(){return <AuthProvider><BrowserRouter><Routes>
<Route path="/" element={<PublicLayout><Home/></PublicLayout>}/><Route path="/courses" element={<PublicLayout><Courses/></PublicLayout>}/><Route path="/about" element={<PublicLayout><About/></PublicLayout>}/><Route path="/contact" element={<PublicLayout><Contact/></PublicLayout>}/><Route path="/login" element={<PublicLayout><Login/></PublicLayout>}/><Route path="/register" element={<PublicLayout><Register/></PublicLayout>}/>
<Route path="/dashboard" element={<Private><StudentDashboard/></Private>}/>
<Route path="/admin" element={<Private role="admin"><AdminDashboard/></Private>}/><Route path="/admin/courses" element={<Private role="admin"><AdminCourses/></Private>}/><Route path="/admin/enquiries" element={<Private role="admin"><AdminEnquiries/></Private>}/><Route path="/admin/announcements" element={<Private role="admin"><AdminAnnouncements/></Private>}/>
<Route path="*" element={<Navigate to="/" replace/>}/>
</Routes></BrowserRouter></AuthProvider>}
export default App;
