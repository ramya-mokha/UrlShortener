import React from "react";
import Features from "../components/Features";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoLink, IoQrCodeSharp, IoLockClosedOutline } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { SiSimpleanalytics } from "react-icons/si";
import ShortenUrlForm from "../components/ShortenUrlForm";


const Dashboard = () => {
  const navigate=useNavigate();
  const fData = [
    {
      title: "Custom Aliases",
      desc: "Brand your links with memorable slugs like slnk.io/my-brand",
      icon: IoLink,
      color: "#818cf8",
    },
    {
      title: "Instant QR Codes",
      desc: "Every link gets a QR code instantly, ready to embed or print",
      icon: IoQrCodeSharp,
      color: "#f472b6",
    },
    {
      title: "Password Protection",
      desc: "Gate links with a password — perfect for private content",
      icon: IoLockClosedOutline,
      color: "#a78bfa",
    },
    {
      title: "Link Expiration",
      desc: "Set an expiry date/time so links auto-deactivate",
      icon: GoClockFill,
      color: "#fbbf24",
    },
    {
      title: "Deep Analytics",
      desc: "Clicks by time, device, browser, geography, and referrer",
      icon: SiSimpleanalytics,
      color: "#34d399",
    },
    {
      title: "UTM Builder",
      desc: "Auto-append UTM params for campaign tracking",
      icon: IoLink,
      color: "#38bdf8",
    },
  ];
  const [link,setLink]=useState();
  const [shortLink,setShortLink]=useState();
  const handleSubmit=()=>{
    navigate('/login');
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200 w-full">
      <nav className="flex justify-between items-center border-b border-zinc-800/80 px-8 py-4 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
          slnk.io
        </div>
        <div className="flex items-center gap-6">
          <Link
            className="cursor-pointer text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            to="/login"
          >
            Sign in
          </Link>
          <Link
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            to="/login"
          >
            Get Started for free
          </Link>
        </div>
      </nav>
      <div className="main flex flex-col items-center">
        <div className="hero w-full max-w-4xl flex flex-col items-center gap-7 px-6 py-16">
          <p className="border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
            The next gen url shortener now in beta
          </p>
          <div className="text-center">
            <h1 className="font-extrabold text-6xl md:text-7xl tracking-tight text-zinc-100">
              Short links,
            </h1>
            <h1 className="font-extrabold text-6xl md:text-7xl tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Big data.
            </h1>
          </div>

          <p className="text-center max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed">
            Shorten, brand, and track every click. With QR codes, password
            protection, expiry dates, and deep analytics — all in one tool.
          </p>
          {/* <div className="linkInput flex gap-3 bg-zinc-900/80 backdrop-blur-md rounded-2xl p-2.5 border border-zinc-800 shadow-2xl shadow-black/50 w-full max-w-2xl">
            <input
              type="text"
              placeholder="https://paste-your-long-url.com/very/long/path"
              className="p-3 rounded-xl flex-1 border border-zinc-800 focus:border-indigo-500 bg-zinc-950 text-zinc-100 placeholder:text-zinc-600 outline-none transition-all text-sm"
              onChange={(e) => setLink(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 cursor-pointer shadow-lg shadow-indigo-600/25 transition-all text-sm shrink-0"
              onClick={handleSubmit}
            >
              Shorten
            </button>
          </div> */}
          <ShortenUrlForm  link={link}
            setLink={setLink}
            handleSubmit={handleSubmit}
            shortLink={shortLink}/>

        </div>
        <div className="features flex flex-col gap-8 items-center w-full max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Features
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 text-center">
              Not just a shortener.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                A link command center.
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {fData.map((f) => (
              <Features
                key={f.title}
                title={f.title}
                desc={f.desc}
                icon={f.icon}
                color={f.color}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-6 mt-auto">
        <p className="text-center text-zinc-500 text-sm">
          {" "}
          &copy; 2026 slnk.io - The URL shortener
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
