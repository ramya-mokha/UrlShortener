import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const ShortenUrlForm = ({ link, setLink, shortLink, handleSubmit,customAlias,setCustomAlias,tags,setTags}) => {
  const [adv, setAdv] = useState(false);
  
  return (
    <div className="w-full max-w-3xl">
      <div className="linkInput gap-3 bg-zinc-900/80 backdrop-blur-md rounded-2xl p-2.5 border border-zinc-800 shadow-2xl shadow-black/50  flex flex-col transistion-all duration-500">
        <div className="flex space-between gap-2 w-full">
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
        </div>
        <div className="flex flex-col gap-2 text-zinc-100 cursor-pointer">
          <div className="flex items-center" onClick={() => setAdv((prev)=>!prev)}>
               <RiArrowDropDownLine size={20} className={`transition-transform duration-500 ${adv ? 'rotate-180': 'rotate-0'}`}/>
              <span className="text-sm font-light">Advanced Options</span>
          </div>
           
            <div className={`grid grid-cols-2 gap-2 transition-all overflow-hidden duration-500 ease-in-out  ${adv ? " max-h-40 opacity-100": " opacity-0 max-h-0 "}`}>
              <div className="flex flex-col gap-2">
                <label htmlFor="customAlias" className="text-zinc-400 text-sm">
                  Custom alias
                </label>
                <input
                  type="text"
                  className="border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none rounded-xl text-sm transition-all p-2"
                  placeholder="slnk.io/my-brand" value={customAlias}
                onChange={(e)=>setCustomAlias(e.target.value)}/>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="Password" className="text-zinc-400 text-sm">
                  Password Protection
                </label>
                <input
                  type="password"
                  className="border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none rounded-xl text-sm transition-all p-2"
                  placeholder="Secret passphrase"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-zinc-400 text-sm">
                  Expiry date
                </label>
                <input
                  type="datetime-local"
                  className="border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none rounded-xl text-sm transition-all p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="tags" className="text-zinc-400 text-sm">
                  Tags
                </label>
                <input
                  type="text"
                  className="border border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none rounded-xl text-sm transition-all p-2"
                  placeholder="marketing , campaign" value={tags}
                  onChange={(e)=>setTags(e.target.value)}
                />
              </div>
            </div>
          
        </div>
      </div>
      <div className="mt-4">
        {shortLink && (
          <a
            className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-2 rounded-xl transition-all font-mono text-sm"
            target="_blank"
            rel="noreferrer"
            href={`http://localhost:3000/${shortLink}`}
          >
            http://localhost:3000/{shortLink}
          </a>
        )}
      </div>
    </div>
  );
};

export default ShortenUrlForm;
