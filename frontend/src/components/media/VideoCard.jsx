import { Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export default function VideoCard({ video, onOpen, className = "" }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const toggleMute = (event) => {
    event.stopPropagation();
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
  };
  return <div role="button" tabIndex="0" onClick={() => onOpen(video)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(video); }} className={`group relative block w-full cursor-pointer overflow-hidden rounded-2xl text-left ${className}`} aria-label={`Watch ${video.title}`}>
    <video ref={videoRef} className="h-full w-full bg-[#030B24] object-contain transition duration-500 group-hover:scale-105" autoPlay muted={muted} loop playsInline poster={video.poster} aria-label={video.title}><source src={video.src} type="video/mp4" /></video>
    <span className="absolute inset-0 bg-[#030B24]/25 transition group-hover:bg-[#030B24]/45" />
    <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-yellow-400 text-[#071A41] shadow-lg"><Play size={18} fill="currentColor" /></span>
    <button type="button" onClick={toggleMute} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-[#071A41]/80 text-white hover:bg-[#071A41]" aria-label={muted ? "Unmute video" : "Mute video"} title={muted ? "Unmute video" : "Mute video"}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button>
    <span className="absolute bottom-4 left-5 font-bold text-white">{video.title}</span>
  </div>;
}
