import React from 'react'

const ShortenUrlForm = ({link,setLink,shortLink,handleSubmit}) => {
  return (
    <div>
      <div className="linkInput flex gap-3 bg-zinc-900/80 backdrop-blur-md rounded-2xl p-2.5 border border-zinc-800 shadow-2xl shadow-black/50 w-full max-w-2xl">
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
            <div className='mt-4'>
          {shortLink && (
            <a
              className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-2 rounded-xl transition-all font-mono text-sm"
              target="_blank"
              rel="noreferrer"
              href={`http://localhost:3000/${shortLink}`}
            >
              http://localhost:3000/{shortLink}
            </a>
          )}</div>
    </div>
  )
}

export default ShortenUrlForm
