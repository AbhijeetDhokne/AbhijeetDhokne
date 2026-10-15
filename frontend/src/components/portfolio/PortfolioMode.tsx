// DEVSLAYER Portfolio mode — a complete redesign, not a reskin.
// Dark premium editorial layout. All content from verified data files.

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, Github, Linkedin, Twitter, Mail, MapPin, FileText,
  Swords, GraduationCap, Briefcase, Cpu, Award, ExternalLink, CheckCircle2,
} from 'lucide-react';
import { profile, socials, codingProfiles, certificates, certificatesBase } from '../../data/profile';
import { projects } from '../../data/projects';
import { skills, skillCategories } from '../../data/skills';
import { experience, education } from '../../data/experience';
import { useGame } from '../../state/useGame';

const Reveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const SectionHead = ({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) => (
  <Reveal>
    <p className="text-xs font-bold tracking-[0.3em] text-lantern uppercase">{eyebrow}</p>
    <h2 className="font-display mt-2 text-3xl font-black text-parchment sm:text-4xl">{title}</h2>
    {lede && <p className="mt-3 max-w-2xl leading-relaxed text-slate-dim">{lede}</p>}
  </Reveal>
);

const SocialIcon = ({ id }: { id: string }) => {
  if (id === 'github') return <Github size={18} />;
  if (id === 'linkedin') return <Linkedin size={18} />;
  return <Twitter size={18} />;
};

const TopBar = () => {
  const { setMode } = useGame();
  return (
    <header className="sticky top-0 z-40 border-b border-parchment/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <p className="font-display text-sm font-black tracking-widest text-lantern">DEVSLAYER</p>
        <nav aria-label="Portfolio sections" className="hidden items-center gap-5 text-sm font-semibold text-parchment/75 md:flex">
          {[
            ['Skills', '#skills'], ['Projects', '#projects'], ['Experience', '#experience'],
            ['Achievements', '#achievements'], ['Contact', '#contact'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-lantern">{label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={profile.resumePath} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-parchment/20 px-4 py-1.5 text-sm font-semibold text-parchment transition hover:border-lantern hover:text-lantern">
            <FileText size={14} /> Resume
          </a>
          <button type="button" onClick={() => setMode('adventure')}
            className="flex items-center gap-1.5 rounded-full bg-lantern px-4 py-1.5 text-sm font-bold text-ink-2 transition hover:brightness-110">
            <Swords size={14} /> Adventure
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="intro" className="relative overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-lantern/10 blur-3xl" />
    <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24">
      <Reveal>
        <p className="text-xs font-bold tracking-[0.3em] text-lantern uppercase">The Path to Code Hashira</p>
        <h1 className="font-display mt-4 text-5xl font-black text-parchment sm:text-7xl">{profile.name}</h1>
        <p className="mt-3 text-xl font-semibold text-parchment/85 sm:text-2xl">{profile.title}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-dim">{profile.tagline}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#projects" className="rounded-xl bg-lantern px-6 py-3 font-bold text-ink-2 transition hover:brightness-110">
            Explore Projects
          </a>
          <a href={profile.resumePath} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-parchment/25 px-6 py-3 font-semibold text-parchment transition hover:border-lantern hover:text-lantern">
            <FileText size={16} /> Resume (PDF)
          </a>
          <a href="#contact" className="flex items-center gap-2 rounded-xl border border-parchment/25 px-6 py-3 font-semibold text-parchment transition hover:border-lantern hover:text-lantern">
            <Mail size={16} /> Contact
          </a>
        </div>
        <p className="mt-6 flex items-center gap-2 text-sm text-slate-dim">
          <MapPin size={14} className="text-lantern" /> {profile.location}
        </p>
      </Reveal>
    </div>
  </section>
);

const About = () => (
  <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Education">
    <SectionHead eyebrow="Origins" title="Education" lede="The foundation chapters of the journey." />
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {education.map((e, i) => (
        <Reveal key={e.id} delay={i * 0.08}>
          <article className="h-full rounded-2xl border border-parchment/10 bg-ink-2 p-6">
            <GraduationCap size={22} className="text-lantern" />
            <h3 className="mt-3 font-bold text-parchment">{e.degree}</h3>
            <p className="mt-1 text-sm font-semibold text-parchment/75">{e.school}</p>
            <p className="mt-1 text-xs tracking-wide text-slate-dim uppercase">{e.period}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-dim">{e.detail}</p>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
    <SectionHead eyebrow="Trials" title="Experience" lede="Production work and professional training." />
    <div className="mt-8 space-y-4">
      {experience.map((job, i) => (
        <Reveal key={job.id} delay={i * 0.06}>
          <article className="rounded-2xl border border-parchment/10 bg-ink-2 p-6 sm:p-8">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-parchment/5">
                {job.logo ? (
                  <img src={job.logo} alt="" className="h-full w-full object-contain" loading="lazy" />
                ) : (
                  <Briefcase size={24} className="text-lantern" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-parchment">{job.role}</h3>
                <p className="text-sm font-semibold text-parchment/75">{job.org}</p>
                <p className="mt-0.5 text-xs tracking-wide text-slate-dim uppercase">
                  {job.period}{job.team ? ` · ${job.team}` : ''}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-dim">{job.summary}</p>
            <ul className="mt-3 space-y-1.5">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-parchment/85">
                  <CheckCircle2 size={14} className="mt-1 shrink-0 text-lantern" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.techStack.map((t) => (
                <span key={t} className="rounded-full border border-parchment/15 bg-parchment/5 px-2.5 py-1 text-xs font-semibold text-parchment/85">{t}</span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

const Skills = () => {
  const [cat, setCat] = useState<string>('All');
  const list = cat === 'All' ? skills : skills.filter((s) => s.category === cat);
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
      <SectionHead eyebrow="Training" title="Technical Skills" lede="Areas of practice — no inflated proficiency scores." />
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
        {skillCategories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              cat === c ? 'bg-lantern text-ink-2' : 'border border-parchment/20 text-parchment/80 hover:border-lantern hover:text-lantern'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((s, i) => (
          <Reveal key={s.id} delay={Math.min(i * 0.03, 0.3)}>
            <article className="flex h-full items-center gap-3 rounded-2xl border border-parchment/10 bg-ink-2 p-4">
              <img src={s.icon} alt="" className="h-10 w-10 shrink-0 rounded-lg bg-parchment/5 object-contain p-1" loading="lazy" />
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-parchment">{s.name}</h3>
                <p className="truncate text-xs text-slate-dim">{s.category}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const Projects = () => (
  <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
    <SectionHead eyebrow="Missions" title="Projects" lede="Full case briefings: problem, solution, features, stack, verified links." />
    <div className="mt-8 space-y-5">
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i * 0.05, 0.2)}>
          <article className="overflow-hidden rounded-2xl border border-parchment/10 bg-ink-2">
            <div className="grid md:grid-cols-5">
              {p.image && (
                <div className="relative min-h-48 md:col-span-2 md:min-h-full">
                  <img src={p.image} alt={`${p.title} preview`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-6 sm:p-8 md:col-span-3">
                <p className="text-xs font-bold tracking-[0.25em] text-lantern uppercase">{p.role} · {p.date}</p>
                <h3 className="font-display mt-2 text-2xl font-black text-parchment">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-dim">{p.summary}</p>
                <div className="mt-3 space-y-2 text-sm">
                  <p><strong className="text-parchment">Problem — </strong><span className="text-slate-dim">{p.problem}</span></p>
                  <p><strong className="text-parchment">Solution — </strong><span className="text-slate-dim">{p.solution}</span></p>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-parchment/85">
                      <CheckCircle2 size={14} className="mt-1 shrink-0 text-lantern" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.techStack.map((t) => (
                    <span key={t} className="rounded-full border border-parchment/15 bg-parchment/5 px-2.5 py-1 text-xs font-semibold text-parchment/85">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.links.live && (
                    <a href={p.links.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg bg-lantern px-4 py-2 text-sm font-bold text-ink-2 hover:brightness-110">
                      Live Demo <ArrowUpRight size={14} />
                    </a>
                  )}
                  {p.links.github && (
                    <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg border border-parchment/25 px-4 py-2 text-sm font-semibold text-parchment hover:border-lantern hover:text-lantern">
                      <Github size={14} /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

const Achievements = () => (
  <section id="achievements" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
    <SectionHead eyebrow="Proof of Training" title="Achievements" lede="Competitive programming profiles and verified certificates." />
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {codingProfiles.map((c, i) => (
        <Reveal key={c.id} delay={i * 0.06}>
          <a href={c.url} target="_blank" rel="noopener noreferrer"
            className="flex h-full items-center justify-between rounded-2xl border border-parchment/10 bg-ink-2 p-5 transition hover:border-lantern">
            <div>
              <h3 className="font-bold text-parchment">{c.label}</h3>
              <p className="text-sm text-slate-dim">@{c.username}</p>
            </div>
            <ExternalLink size={16} className="text-lantern" />
          </a>
        </Reveal>
      ))}
    </div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {certificates.map((c, i) => (
        <Reveal key={c.id} delay={i * 0.05}>
          <article className="flex h-full items-start gap-3 rounded-2xl border border-parchment/10 bg-ink-2 p-5">
            <Award size={20} className="mt-0.5 shrink-0 text-lantern" />
            <div>
              <h3 className="text-sm font-bold text-parchment">{c.title}</h3>
              <p className="text-sm text-slate-dim">{c.org}</p>
              <p className="mt-1 text-xs text-slate-dim">{c.detail}</p>
              <a href={`${certificatesBase}${encodeURIComponent(c.file)}`} target="_blank" rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-lantern hover:underline">
                View certificate <ArrowUpRight size={12} />
              </a>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6">
    <SectionHead eyebrow="Summit" title="Contact" lede="Open to internships, collaborations, and good conversations." />
    <Reveal>
      <div className="mt-8 rounded-2xl border border-lantern/25 bg-gradient-to-br from-indigo-deep to-ink-2 p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-4">
          <Cpu size={28} className="text-lantern" />
          <div>
            <h3 className="font-display text-2xl font-black text-parchment">{profile.name}</h3>
            <p className="flex items-center gap-1.5 text-sm text-slate-dim">
              <MapPin size={13} /> {profile.location}
            </p>
          </div>
        </div>
        <a href={`mailto:${profile.email}`}
          className="mt-6 flex items-center gap-3 rounded-xl border border-parchment/15 bg-ink/60 px-5 py-4 font-semibold text-parchment transition hover:border-lantern hover:text-lantern">
          <Mail size={18} className="shrink-0 text-lantern" /> {profile.email}
        </a>
        <div className="mt-4 flex flex-wrap gap-2">
          {socials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-parchment/15 bg-ink/60 px-4 py-2.5 text-sm font-semibold text-parchment transition hover:border-lantern hover:text-lantern">
              <SocialIcon id={s.id} /> {s.label} <ArrowUpRight size={13} />
            </a>
          ))}
          <a href={profile.resumePath} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-lantern px-4 py-2.5 text-sm font-bold text-ink-2 transition hover:brightness-110">
            <FileText size={15} /> Resume (PDF)
          </a>
        </div>
      </div>
    </Reveal>
  </section>
);

const Footer = () => (
  <footer className="border-t border-parchment/10 py-8 text-center text-sm text-slate-dim">
    <p>© {new Date().getFullYear()} {profile.name} · DEVSLAYER — The Path to Code Hashira</p>
  </footer>
);

const PortfolioMode = () => (
  <div className="min-h-full bg-ink text-parchment">
    <TopBar />
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default PortfolioMode;
