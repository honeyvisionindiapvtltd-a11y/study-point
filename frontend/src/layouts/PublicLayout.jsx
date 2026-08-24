import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageCircle } from "lucide-react";
export default function PublicLayout({ children }) { return <><Navbar/><main>{children}</main><Footer/><a className="whatsapp-float" href="https://wa.me/918280971995?text=Hello%20Study%20Point%2C%20I%20would%20like%20to%20know%20more%20about%20admissions." target="_blank" rel="noreferrer" aria-label="Chat with Study Point on WhatsApp"><MessageCircle size={24}/><span>WhatsApp</span></a></>; }
