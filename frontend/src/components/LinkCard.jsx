import React, { useState } from "react";
import { IoCopyOutline, IoQrCodeSharp,IoOpenOutline  } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { TiTick } from "react-icons/ti";
import { handleDeleteUrl } from "../services/urlService";
import QRModal from "./QRModal";
const LinkCard = ({ url, shortCode, clicks ,setMyUrls,createdAt}) => {
  const [qrOpen, setQrOpen] = useState(false);
  const [copied,setCopied]=useState(false);
  const handleCopy=async ()=>{
    const shortUrl=`${import.meta.env.VITE_GET_URL}/${shortCode}`
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(()=>{setCopied(false)},3000)
  }
  const handleRedirect=async (shortCode)=>{
   const url=`${import.meta.env.VITE_GET_URL}/${shortCode}`
   window.open(url, "_blank", "noopener,noreferrer")
   
  }
  return (
    <div className="bg-zinc-900/60  hover:bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700/80 ">
      <div className="flex flex-col transition-all gap-2 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col gap-1 pl-2">
          <p className="text-indigo-400 font-semibold hover:text-indigo-300 text-sm cursor-pointer transition-colors">
            {import.meta.env.VITE_GET_URL}/{shortCode}
          </p>
          <p className="text-zinc-400 text-xs truncate max-w-md">{url}</p>
          <div className="flex items-center gap-2 text-zinc-500 text-xs mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Active</span>
            <span>•</span>
            <span>{clicks} clicks</span>
            <span>•</span>
            <span>{new Date(createdAt).toLocaleDateString("en-IN")}</span>
          </div>
        </div>
        <div className="flex gap-2 text-zinc-400">
          <button
            className="p-2 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
            title="QR Code" 
            onClick={() => setQrOpen((prev)=>!prev)}
          >
            <IoQrCodeSharp size={18} />
          </button>
          <button
            className="p-2 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
            title="Copy Link" onClick={handleCopy}
          >
            {!copied && <IoCopyOutline size={18} />}
            {copied && <TiTick size={18} color="green"/>}
          </button>
          <button
            className="p-2 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer transition-colors"
            title="Original Link"
            onClick={()=>handleRedirect(shortCode)}
          >
            <IoOpenOutline size={18} />
          </button>
          <button
            className="p-2 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
            title="Analytics"
          >
            <SiSimpleanalytics size={16} />
          </button>
          <button
            className="p-2 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors"
            title="Delete" onClick={()=>handleDeleteUrl(shortCode,setMyUrls)}
          >
            <MdDeleteOutline size={19} />
          </button>
          
        </div>
      </div>
      <div className={` transition-all overflow-hidden duration-500 ease-in-out  ${qrOpen ? " max-h-40 opacity-100 pointer-events-auto": " opacity-0 max-h-0 pointer-events-none"}`}>
        
          <QRModal shortUrl={`${import.meta.env.VITE_GET_URL}/${shortCode}`} />
        
      </div>
    </div>
  );
};

export default LinkCard;
