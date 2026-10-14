import React from 'react'

const Features = ({title,desc,icon,color}) => {
  const FIcon=icon;
  return (
    <div className='rounded-2xl border border-zinc-800 hover:border-zinc-700/80 p-5 bg-zinc-900/60 hover:bg-zinc-900/90 transition-all shadow-lg shadow-black/20'>
      <div className='flex flex-col gap-2.5'>
        <FIcon size={24} color={color}></FIcon>
        <p className='font-semibold text-zinc-100'>{title}</p>
        <p className='text-zinc-400 text-sm leading-relaxed'>{desc}</p>
      </div>
    </div>
  )
}

export default Features
