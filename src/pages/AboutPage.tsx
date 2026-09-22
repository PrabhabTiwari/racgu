import React from 'react';

const objectives = [
  'Develop leadership and professional skills among university students.',
  'Identify and respond to the needs of the university and surrounding communities.',
  'Promote ethical leadership, responsibility and integrity.',
  'Encourage fellowship, teamwork and cultural understanding.',
  'Support youth empowerment and meaningful student participation.',
  'Promote digital innovation and technology-based service.',
  'Organize sustainable projects in education, health and the environment.',
  'Strengthen cooperation with the parent club, Rotary and other Rotaract clubs.',
  'Encourage international understanding and peace.',
  'Prepare members for long-term community and Rotary leadership.'
];

const values = [
  ['Service', 'Placing community needs at the centre of club action'],
  ['Leadership', 'Developing confident, responsible and ethical leaders'],
  ['Fellowship', 'Building lasting friendships through shared experiences'],
  ['Integrity', 'Acting honestly, transparently and responsibly'],
  ['Inclusion', 'Respecting different backgrounds, identities and perspectives'],
  ['Innovation', 'Applying creative and technological solutions'],
  ['Accountability', 'Taking responsibility for decisions and commitments'],
  ['Collaboration', 'Working with the university, clubs and communities']
];

export const AboutPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#0A1931] text-white">
      <div className="absolute right-[-80px] top-[-100px] h-96 w-96 rounded-full bg-[#D91B5C]/20 blur-3xl" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-7 sm:p-12">
        <div className="lg:col-span-4 flex justify-center">
          <div className="flex h-64 w-64 sm:h-80 sm:w-80 items-center justify-center rounded-full bg-white p-5 shadow-2xl ring-8 ring-white/10">
            <img src="/assets/official/racgu-official-logo.webp" alt="Rotaract Club of Gandaki University official logo" className="h-full w-full object-contain" />
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Established at Gandaki University</p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black leading-tight">Rotaract Club of Gandaki University</h1>
          <p className="mt-5 max-w-3xl text-sm sm:text-base leading-7 text-slate-300">A university-based, non-profit, non-political and non-sectarian service and leadership organization that develops students through fellowship, professional growth and meaningful community action.</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[['Chartered','22 January 2026'],['Club ID','8828026'],['District','3292'],['Zone','XVI']].map(([label,value]) => <div key={label} className="rounded-xl border border-white/15 bg-white/5 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-white">{value}</p></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Who we are</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">Leadership, fellowship and service in action</h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700"><p>Chartered on 22 January 2026, RACGU provides Gandaki University students with a structured platform for leadership development, professional growth, fellowship and community service.</p><p>Guided by Service Above Self, the club brings together energetic students committed to addressing community needs, strengthening fellowship and converting knowledge and ideas into sustainable impact.</p></div>
      </div>
      <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#D91B5C] to-[#9F1239] p-7 sm:p-10 text-white"><p className="text-xs font-bold uppercase tracking-wider text-pink-100">Founding story</p><h2 className="mt-2 text-2xl font-black">A foundation built by students</h2><p className="mt-5 text-sm leading-7 text-pink-50">RACGU was established to create a formal student-led platform where young people could develop leadership skills, build meaningful connections and serve their communities. Its charter team began with a focus on good governance, responsible leadership, fellowship, digital innovation and sustainable community projects.</p></div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Our vision</p><h2 className="mt-2 text-2xl font-black text-slate-900">A resilient and sustainable club</h2><p className="mt-4 text-sm leading-7 text-slate-700">To build a resilient and sustainable Rotaract Club of Gandaki University through strategic recruitment, meaningful engagement, leadership development and impactful community service.</p><p className="mt-4 border-l-4 border-[#D91B5C] pl-4 text-sm leading-7 text-slate-600">To become a leading student-led organization that inspires leadership, innovation and service while creating sustainable positive change within Gandaki University and the wider community.</p></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-wider text-blue-700">Our mission</p><h2 className="mt-2 text-2xl font-black text-slate-900">Develop ethical and responsible leaders</h2><p className="mt-4 text-sm leading-7 text-slate-700">To engage and develop university students as ethical and responsible leaders by providing opportunities for community service, professional growth, fellowship, innovation and collaboration while upholding the values of Rotary and Rotaract.</p></div>
    </section>

    <section className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10">
      <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Our goals</p><h2 className="mt-2 text-2xl font-black text-slate-900">What the club is working to achieve</h2></div>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">{objectives.map((goal,index)=><div key={goal} className="flex gap-4 rounded-xl bg-slate-50 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0A1931] text-xs font-bold text-white">{index+1}</span><p className="text-sm leading-6 text-slate-700">{goal}</p></div>)}</div>
    </section>

    <section><div className="mb-6"><p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Core values</p><h2 className="mt-2 text-2xl font-black text-slate-900">The standards behind every action</h2></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{values.map(([name,description])=><div key={name} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">{name}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{description}</p></div>)}</div></section>

    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white"><div className="grid grid-cols-1 lg:grid-cols-12 items-center"><div className="lg:col-span-5 bg-slate-50 p-8 flex justify-center"><img src="/assets/official/insight-to-impact.webp" alt="Insight to Impact" className="max-h-64 w-full object-contain" /></div><div className="lg:col-span-7 p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-wider text-[#D91B5C]">Charter theme RY 2026-27</p><h2 className="mt-2 text-3xl font-black text-slate-900">Insight to Impact</h2><p className="mt-4 text-sm leading-7 text-slate-700">Insight begins with understanding the challenges around us. Impact is created when that understanding becomes purposeful action. The theme guides RACGU to apply academic knowledge, creativity and compassion through projects that benefit the university and wider community.</p></div></div></section>
  </div>
);
