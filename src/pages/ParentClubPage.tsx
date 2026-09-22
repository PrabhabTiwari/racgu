import React from 'react';

export const ParentClubPage: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
        <div className="lg:col-span-5 flex min-h-[420px] items-center justify-center bg-slate-50 p-8 sm:p-12">
          <div className="flex h-72 w-72 items-center justify-center rounded-full bg-white p-5 shadow-xl">
            <img src="/assets/parent-club/rotaract-lekhnath-logo.webp" alt="Rotaract Club of Lekhnath logo" className="h-full w-full object-contain mix-blend-multiply" />
          </div>
        </div>
        <div className="lg:col-span-7 bg-[#0A1931] p-8 sm:p-12 text-white lg:min-h-[420px] flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Our Parent Club</p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black">Rotaract Club of Lekhnath</h1>
          <p className="mt-5 text-sm sm:text-base leading-7 text-slate-300">A dynamic group of young leaders and changemakers dedicated to making a tangible difference in the local community and beyond through service, fellowship and leadership development.</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/15 bg-white/5 p-4"><p className="text-[10px] uppercase text-slate-400">Community</p><p className="mt-1 font-bold">Pokhara-27</p></div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4"><p className="text-[10px] uppercase text-slate-400">President</p><p className="mt-1 font-bold">Rtr. Sushant Mani Dahal</p></div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-4"><p className="text-[10px] uppercase text-slate-400">Rotary Year</p><p className="mt-1 font-bold">2026–27</p></div>
          </div>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">The relationship</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">Guidance that helped establish RACGU</h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
          <p>The Rotaract Club of Lekhnath played an important role in guiding the formation of RACGU, supporting its charter leadership and helping the club build a responsible institutional foundation.</p>
          <p>The relationship continues through leadership mentoring, joint programmes, fellowship, district and zonal participation and collaboration on community-focused projects.</p>
        </div>
      </div>
      <div className="lg:col-span-5 rounded-3xl border border-pink-200 bg-pink-50 p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Shared commitment</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">Fellowship through service</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">Its work spans community service, international service and professional development, helping young adults build knowledge, leadership skills, friendship and meaningful service experience.</p>
      </div>
    </section>

    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 flex min-h-[420px] items-center justify-center bg-[#0A1931] p-10">
          <div className="text-center text-white">
            <img src="/assets/parent-club/rotaract-lekhnath-logo.webp" alt="Rotaract Club of Lekhnath" className="mx-auto h-48 w-48 rounded-full bg-white p-3 object-contain" />
            <p className="mt-5 text-lg font-bold">Rtr. Sushant Mani Dahal</p>
            <p className="mt-1 text-xs text-slate-300">President, Rotaract Club of Lekhnath<br />Rotary Year 2026-27</p>
          </div>
        </div>
        <div className="lg:col-span-8 p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Message from the Parent Club President</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Turning Sankalpa into Sambhav</h2>
          <blockquote className="mt-5 border-l-4 border-[#D91B5C] pl-5 text-sm italic leading-7 text-slate-700">“Success is achieved when every member becomes a better leader, every project leaves a meaningful impact, every partnership strengthens our mission, and every act of service transforms lives—turning Sankalpa into Sambhav while Transforming Self and Inspiring Service.”</blockquote>
          <div className="mt-7 border-t border-slate-200 pt-5"><p className="font-bold text-slate-900">Rtr. Sushant Mani Dahal</p><p className="text-xs text-slate-500">President, Rotaract Club of Lekhnath, RY 2026-27</p></div>
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-100 p-7 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Work together</p><h2 className="mt-2 text-2xl font-black text-slate-900">Explore collaborative club activities</h2><p className="mt-2 text-sm text-slate-600">Official contact: Pokhara-27, Nepal · +977 9856061178</p></div><div className="flex flex-wrap gap-3"><a href="https://rotaractlekhnath.org.np/" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50">Official Website</a><button onClick={() => setActiveTab('events')} className="rounded-xl bg-[#D91B5C] px-5 py-3 text-sm font-bold text-white hover:bg-[#BE123C]">View Events and Projects</button></div></div>
    </section>
  </div>
);
