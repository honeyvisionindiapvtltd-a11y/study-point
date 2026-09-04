import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export default function HeroVideo({ video, onOpen }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [playing, setPlaying] = useState(true);
  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
  };
  const changeVolume = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (videoRef.current) {
      videoRef.current.volume = nextVolume;
      videoRef.current.muted = nextVolume === 0;
    }
    setMuted(nextVolume === 0);
  };
  const togglePlaying = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(!playing);
  };

  return <div className="relative mx-auto w-full max-w-[640px]">
    <div className="absolute -right-4 -top-5 hidden h-24 w-24 rounded-full border border-yellow-300/40 lg:block" />
    <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
      <video ref={videoRef} className="hero-video-frame w-full rounded-[1.5rem] bg-[#030B24] object-contain" autoPlay muted={muted} loop playsInline poster={video.poster} aria-label="Study Point classroom session"><source src={video.src} type="video/mp4" /></video>
      <div className="absolute inset-x-7 bottom-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/25 bg-[#071A41]/90 px-4 py-3 text-white backdrop-blur"><span><span className="block text-xs text-blue-200">Inside the classroom</span><strong className="text-sm">Focused learning in motion</strong></span><div className="flex items-center gap-2"><button type="button" onClick={togglePlaying} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label={playing ? "Pause video" : "Play video"} title={playing ? "Pause video" : "Play video"}>{playing ? <Pause size={17}/> : <Play size={17} fill="currentColor"/>}</button><button type="button" onClick={toggleMute} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label={muted ? "Unmute video" : "Mute video"} title={muted ? "Unmute video" : "Mute video"}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button><label className="flex items-center gap-2" aria-label="Video volume"><Volume2 size={15} className="text-blue-200"/><input type="range" min="0" max="1" step="0.05" value={volume} onChange={changeVolume} className="w-20 accent-yellow-400" /></label><button type="button" onClick={() => onOpen(video)} className="grid h-10 w-10 place-items-center rounded-full bg-yellow-400 text-[#071A41]" aria-label={`Watch ${video.title}`} title="Watch video"><Play size={16} fill="currentColor" /></button></div></div>
    </div>
    <div className="absolute -left-5 top-12 rounded-xl bg-yellow-400 px-4 py-3 text-[#071A41] shadow-xl"><strong className="block text-lg leading-none">2026-27</strong><span className="text-xs font-bold uppercase">Admissions open</span></div>
    <div className="absolute -bottom-5 -right-4 rounded-xl border border-white/20 bg-white px-4 py-3 text-[#071A41] shadow-xl"><strong className="block text-xl leading-none">95%+</strong><span className="text-xs font-semibold text-slate-500">Success focus</span></div>
  </div>;
}
