import React from 'react';

type MessageBlockProps = {
  eyebrow: string;
  title: string;
  name: string;
  designation: string;
  image: string;
  children: React.ReactNode;
};

const MessageBlock: React.FC<MessageBlockProps> = ({ eyebrow, title, name, designation, image, children }) => (
  <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="relative lg:col-span-4 bg-[#0A1931]">
        <img src={image} alt={name} className="block h-full min-h-[420px] w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061329] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-lg font-bold">{name}</p>
          <p className="mt-1 text-xs leading-5 text-slate-200">{designation}</p>
        </div>
      </div>
      <div className="lg:col-span-8 p-6 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D91B5C]">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-black text-slate-900">{title}</h2>
        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">{children}</div>
        <div className="mt-7 border-t border-slate-200 pt-5">
          <p className="font-bold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{designation}</p>
        </div>
      </div>
    </div>
  </article>
);

export const MessagesPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
    <header className="relative overflow-hidden rounded-3xl bg-[#0A1931] px-6 py-12 sm:px-12 text-white">
      <div className="absolute right-[-70px] top-[-80px] h-72 w-72 rounded-full bg-[#D91B5C]/20 blur-3xl" />
      <div className="relative max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Leadership Messages</p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-black">Messages of guidance, service and leadership</h1>
        <p className="mt-4 text-sm sm:text-base leading-7 text-slate-300">Words from Rotary International, Rotaract District 3292, Zone XVI and the Charter President of the Rotaract Club of Gandaki University.</p>
      </div>
    </header>

    <MessageBlock eyebrow="Message from the RI President" title="Create lasting impact through service" name="Olayinka H. Babalola" designation="President, Rotary International, 2026-27" image="/assets/leadership/ri-president-olayinka-babalola.webp">
      <p>Rotary has changed my life, and I’m willing to bet that it has changed yours too. It expands our world, enriches our understanding of service, creates international friendships and grounds us. It teaches us to see, to look beyond ourselves.</p>
      <p>Think about our Vision Statement: Together, we see a world where people unite and take action to create lasting change—across the globe, in our communities and in ourselves.</p>
      <p>Those final words of our Vision Statement are at the heart of what it means to <strong>Create Lasting Impact.</strong> We often share how Rotary inspires lasting change in others, but we rarely discuss how it transforms us. We must consider how Rotary has changed our lives and share our stories widely. If we can do that, we will engage current members, expand our reach and forge exciting connections with like-minded partners.</p>
      <p>We must embrace Rotary’s global diversity and build a welcoming culture, one where fresh perspectives are embraced, new ideas are celebrated and differences are met with curiosity and kindness instead of judgement. If we can do that, we will meet our membership goals and continue to grow.</p>
      <p>And finally, we must reaffirm our commitment to service. We must think bigger, understanding our struggles as interconnected and leveraging our connections to make global progress. If we can do that, we will be one step closer to a world free of polio, a world where everyone has access to clean water and a quality education—a world at peace.</p>
      <p>Let us continue to inspire one another and seek innovative solutions to some of the world’s most pressing challenges. I look forward to working alongside you in service.</p>
    </MessageBlock>

    <MessageBlock eyebrow="Message from the DRR" title="Lead with integrity and create lasting impact" name="PHF Rtr. Prakash Sharma Gaire" designation="District Rotaract Representative, Rotaract District 3292, Nepal & Bhutan, RY 2026-27" image="/assets/leadership/drr-prakash-sharma-gaire.webp">
      <p>Blissful Rotaract Greetings. It is with immense pleasure that I extend my heartfelt congratulations and best wishes to the Rotaract Club of Gandaki University. The club’s journey reflects the dedication of Rotaractors committed to service, fellowship and leadership.</p>
      <p>Our District Theme, <strong>“Integrity, Vision, Leadership,”</strong> reflects the values that define every successful Rotaractor. Integrity calls us to honesty and accountability. Vision encourages us to innovate and build a stronger future. Leadership empowers us to lead by example and create opportunities for meaningful service.</p>
      <p>Aligned with this vision, the Rotary International Theme, <strong>“Create Lasting Impact,”</strong> reminds us that our service must go beyond temporary solutions and create sustainable change. Together, let us lead with integrity, be guided by vision and inspire through leadership.</p>
    </MessageBlock>

    <MessageBlock eyebrow="Message from the DRR-E" title="Build strong foundations through fellowship and service" name="Rtr. Gaurav Subedi" designation="District Rotaract Representative Elect, Rotaract District 3292, RY 2026-27" image="/assets/leadership/drr-elect-gaurav-subedi.webp">
      <p>Warm Rotaract Greetings. I congratulate the President, Board of Directors and every member of the Rotaract Club of Gandaki University for Rotary Year 2026-27. You have been entrusted with shaping the future of your club, and I am confident your leadership will bring fresh energy, innovation and meaningful impact.</p>
      <p>A strong Rotaract club is built on effective administration, meaningful fellowship, active membership engagement, impactful service, leadership development and continuity. When these fundamentals are strong, sustainable growth naturally follows.</p>
      <p>Let Fellowship Through Service be the culture of your club. Build genuine friendships while serving the community, develop leaders by empowering members and create projects that leave a lasting impact. My door will remain open whenever you seek guidance, collaboration or support.</p>
      <p>May your leadership inspire excellence, your service create enduring impact and your fellowship continue to strengthen the Rotaract movement.</p>
    </MessageBlock>

    <MessageBlock eyebrow="Message from the ZRR" title="Leading together, serving better" name="Rtr. Saurav KC" designation="Zonal Rotaract Representative, Zone XVI, Rotaract District 3292, Nepal & Bhutan" image="/assets/leadership/zrr-saurav-kc.webp">
      <p>It is with great pleasure that I extend my heartfelt congratulations to you on assuming the role of President of the Rotaract Club of Gandaki University. This opportunity reflects the trust and confidence your members have placed in your leadership, dedication and vision. I am confident that your passion and commitment will guide the club toward another successful and impactful year.</p>
      <p>As we begin this new Rotary year, we are inspired by Rotary International’s theme, <strong>“Creating Lasting Impact.”</strong> It reminds us that every act of service, no matter how small, has the power to create meaningful change that continues to benefit communities for years to come.</p>
      <p>Guided by our District theme, <strong>“Integrity, Vision, Leadership,”</strong> we are encouraged to lead with honesty, dream with purpose and serve with determination. At the same time, our zonal theme, <strong>“Leading Together, Serving Better,”</strong> highlights the importance of unity, teamwork and collaboration in achieving greater success and stronger impact.</p>
      <p>The Rotaract Club of Gandaki University has demonstrated its dedication to service, leadership development and community engagement. I am excited to witness the innovative projects, meaningful initiatives and lasting memories your team will create throughout the year.</p>
      <p>As your Zonal Rotaract Representative, I look forward to working closely with you and your club. Let us support one another, share our strengths and build a culture where every member feels empowered to lead, serve and grow.</p>
      <p>I also extend my sincere best wishes to your Board of Directors and all club members. May this year be filled with learning, fellowship, achievements and impactful service.</p>
      <p>Together, let us lead with integrity, serve with purpose and create lasting impact in our communities. Let us continue <strong>Leading Together, Serving Better.</strong></p>
      <p className="font-bold text-slate-900">Jay Rotary!! Jay Rotaract!!</p>
    </MessageBlock>

    <MessageBlock eyebrow="Message from the Charter President" title="Insight must become purposeful action" name="Rtr. Prabhab Tiwari" designation="Charter President, Rotaract Club of Gandaki University, RY 2026-27" image="/members/prabhab-portrait.webp">
      <p>It is an honor and privilege to serve as the Charter President of the Rotaract Club of Gandaki University. Our club was founded with a shared commitment to service, leadership, fellowship and creating meaningful change.</p>
      <p>Our charter theme, <strong>“Insight to Impact,”</strong> represents our belief that understanding must lead to purposeful action. Through our projects, collaborations and initiatives, we aim to transform ideas into positive outcomes for our university and the wider community.</p>
      <p>As a charter club, we have the responsibility of building a strong, inclusive and sustainable foundation for future generations of Rotaractors at Gandaki University. I am sincerely grateful to Gandaki University, our parent club, the Rotaract Club of Lekhnath, Rotaract District 3292, our mentors, faculty members, well-wishers and every charter member for their support.</p>
      <p>Together, may we continue to learn, lead with integrity, serve with compassion and turn our <strong>Insight into Impact.</strong></p>
      <img src="/assets/official/president-signature.png" alt="Signature of Rtr. Prabhab Tiwari" className="mt-5 h-16 w-auto object-contain" />
    </MessageBlock>
  </div>
);
