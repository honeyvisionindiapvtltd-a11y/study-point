import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function VideoModal({ video, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current?.focus();
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return <div className="fixed inset-0 z-[70] grid place-items-center bg-[#030B24]/90 p-4" role="dialog" aria-modal="true" aria-label={video.title} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div ref={dialogRef} tabIndex="-1" className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl outline-none">
      <button type="button" onClick={onClose} className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white" aria-label="Close video"><X size={20}/></button>
      <video className="aspect-video w-full" controls autoPlay playsInline poster={video.poster}>
        <source src={video.src} type="video/mp4" />
      </video>
      <div className="bg-white px-5 py-4"><p className="text-sm font-semibold text-blue-700">Study Point media</p><h2 className="mt-1 text-xl font-bold text-slate-950">{video.title}</h2></div>
    </div>
  </div>;
}
