// HTML information panel for 3D selections. Every fact renders from the
// typed data layer; links appear only when verified in data. Focus moves to
// the panel on open and Esc (global) closes it.

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, CheckCircle2, Code2, ExternalLink,
  FileText, Github, Mail, X,
} from 'lucide-react';
import { useIslands } from '../../state/useIslands';
import { projectById } from '../../data/projects';
import { skillById, skillNodes } from '../../data/skills';
import { experience } from '../../data/experience';
import { education } from '../../data/education';
import { profile, socials, certificates, certificatesBase } from '../../data/profile';

const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="info-chip">{children}</span>
);

const LinkRow = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="secondary-button info-link">
    {icon} {label} <ArrowUpRight size={14} aria-hidden="true" />
  </a>
);

/** Opens the PDF inside the site (ResumeViewer overlay), never a new tab. */
const ResumeButton = () => {
  const { setResumeOpen } = useIslands();
  return (
    <button type="button" className="secondary-button info-link" onClick={() => setResumeOpen(true)}>
      <FileText size={14} aria-hidden="true" /> View Resume
    </button>
  );
};

const ProjectDetail = ({ id }: { id: string }) => {
  const p = projectById(id);
  if (!p) return <p className="info-empty">Unknown project.</p>;
  return (
    <div>
      <p className="meta-label">{p.role} · {p.date}</p>
      <h2 className="info-title">{p.title}</h2>
      <p className="info-lede">{p.summary}</p>
      <div className="info-grid-2">
        <div className="info-box">
          <p className="info-box-label">Problem</p>
          <p>{p.problem}</p>
        </div>
        <div className="info-box">
          <p className="info-box-label">Solution</p>
          <p>{p.solution}</p>
        </div>
      </div>
      <ul className="info-list">
        {p.features.map((f) => (
          <li key={f}><CheckCircle2 size={14} aria-hidden="true" /> <span>{f}</span></li>
        ))}
      </ul>
      <div className="info-chips" aria-label="Technology stack">
        {p.techStack.map((t) => <Chip key={t}>{t}</Chip>)}
      </div>
      <div className="info-links">
        {p.links.live && <LinkRow href={p.links.live} icon={<ExternalLink size={14} />} label="Live demo" />}
        {p.links.github && <LinkRow href={p.links.github} icon={<Github size={14} />} label="Source code" />}
      </div>
    </div>
  );
};

const SkillNodeDetail = ({ id }: { id: string }) => {
  const node = skillNodes.find((n) => n.id === id);
  if (!node) return <p className="info-empty">Unknown skill group.</p>;
  const list = node.skillIds.map(skillById).filter((s) => s !== undefined);
  return (
    <div>
      <p className="meta-label">{node.area}</p>
      <h2 className="info-title">{node.title}</h2>
      <p className="info-lede">{node.description}</p>
      <div className="info-skills">
        {list.map((s) => (
          <div key={s.id} className="info-skill">
            <img
              src={s.icon}
              alt=""
              loading="lazy"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <div>
              <p className="info-skill-name">{s.name}</p>
              <p className="info-skill-desc">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceDetail = ({ id }: { id: string }) => {
  const entry = experience.find((e) => e.id === id);
  if (!entry) return <p className="info-empty">Unknown role.</p>;
  const position = experience.findIndex((e) => e.id === id) + 1;
  return (
    <div>
      <p className="meta-label">Verified role {position} of {experience.length} · most recent first</p>
      <div className="info-job">
        <h2 className="info-title">{entry.role}</h2>
        <p className="info-lede">{entry.org} · {entry.period}</p>
        <p className="info-body">{entry.summary}</p>
        <ul className="info-list">
          {entry.bullets.map((b) => (
            <li key={b}><CheckCircle2 size={14} aria-hidden="true" /> <span>{b}</span></li>
          ))}
        </ul>
        <div className="info-chips">
          {entry.techStack.map((t) => <Chip key={t}>{t}</Chip>)}
        </div>
      </div>
      <h3 className="info-h3">All roles</h3>
      <div className="info-edu">
        {experience.map((e) => (
          <div key={e.id} className="info-box">
            <p className="info-skill-name">{e.role}</p>
            <p className="info-body">{e.org}</p>
            <p className="info-period">{e.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const EducationDetail = () => (
  <div>
    <p className="meta-label">Verified schooling</p>
    <h2 className="info-title">Education</h2>
    <div className="info-edu">
      {education.map((e) => (
        <div key={e.id} className="info-box">
          <p className="info-skill-name">{e.degree}</p>
          <p className="info-body">{e.school}</p>
          <p className="info-period">{e.period}</p>
          <p className="info-body">{e.detail}</p>
        </div>
      ))}
    </div>
    <h3 className="info-h3">Certificates</h3>
    <ul className="info-list">
      {certificates.map((c) => (
        <li key={c.id}>
          <a
            href={`${certificatesBase}${encodeURIComponent(c.file)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="info-cert"
          >
            {c.title} — {c.org} <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const HomeDetail = () => (
  <div>
    <p className="meta-label">Home island · Where the journey begins</p>
    <h2 className="info-title">{profile.name}</h2>
    <p className="info-lede">{profile.title} · {profile.location}</p>
    {profile.about.map((para) => (
      <p key={para.slice(0, 24)} className="info-body">{para}</p>
    ))}
    <div className="info-links">
      <a href={`mailto:${profile.email}`} className="primary-button info-link">
        <Mail size={14} aria-hidden="true" /> {profile.email}
      </a>
      <ResumeButton />
    </div>
    <h3 className="info-h3">Professional profiles</h3>
    <div className="info-links">
      {socials.map((s) => (
        <LinkRow key={s.id} href={s.url} icon={<Code2 size={14} />} label={s.label} />
      ))}
    </div>
  </div>
);

const ContactDetail = () => (
  <div>
    <p className="meta-label">Final destination</p>
    <h2 className="info-title">Open a channel</h2>
    <p className="info-lede">
      {profile.location}
    </p>
    <div className="info-links">
      <a href={`mailto:${profile.email}`} className="primary-button info-link">
        <Mail size={14} aria-hidden="true" /> {profile.email}
      </a>
      <ResumeButton />
    </div>
    <h3 className="info-h3">Professional profiles</h3>
    <div className="info-links">
      {socials.map((s) => (
        <LinkRow key={s.id} href={s.url} icon={<Code2 size={14} />} label={s.label} />
      ))}
    </div>
  </div>
);

const InfoPanel = () => {
  const { selection, select } = useIslands();
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selection) headingRef.current?.focus();
  }, [selection]);

  return (
    <AnimatePresence>
      {selection && (
        <motion.aside
          key="info-panel"
          className="info-panel no-scrollbar"
          data-ui-scroll="true"
          role="dialog"
          aria-modal="false"
          aria-label="Island details"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 48 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div ref={headingRef} tabIndex={-1} className="info-focus" aria-hidden="true" />
          <button
            type="button"
            className="info-close"
            onClick={() => select(null)}
            aria-label="Close details panel (Esc)"
            autoFocus
          >
            <X size={16} aria-hidden="true" />
          </button>
          {selection.type === 'home' && <HomeDetail />}
          {selection.type === 'project' && <ProjectDetail id={selection.id} />}
          {selection.type === 'skill-node' && <SkillNodeDetail id={selection.id} />}
          {selection.type === 'experience' && <ExperienceDetail id={selection.id} />}
          {selection.type === 'education' && <EducationDetail />}
          {selection.type === 'contact' && <ContactDetail />}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default InfoPanel;
