// GOJO — the brain behind the portfolio guide chat. Every answer is composed
// from the verified data layer (src/data), so GOJO can never invent facts
// about Abhijeet. Pure logic — unit-tested in gojoBrain.test.ts.

import type { IslandDestination, Selection } from '../../data/types';
import { profile, socials, certificates, certificatesBase } from '../../data/profile';
import { projects } from '../../data/projects';
import { skills, skillNodes } from '../../data/skills';
import { experience } from '../../data/experience';
import { education } from '../../data/education';

export type GojoAction =
  | { type: 'travel'; dest: IslandDestination }
  | { type: 'select'; selection: Exclude<Selection, null> }
  | { type: 'resume' };

export interface GojoLink {
  label: string;
  href: string;
}

export interface GojoReply {
  text: string;
  links?: GojoLink[];
  suggestions?: string[];
  actions?: GojoAction[];
}

type Topic =
  | { kind: 'project'; id: string }
  | { kind: 'skill'; id: string }
  | { kind: 'experience'; id: string }
  | { kind: 'certificates' };

const DEFAULT_SUGGESTIONS = [
  'Who is Abhijeet?',
  'Show his projects',
  'What tech does he know?',
  'How do I contact him?',
];

const normalize = (raw: string): string =>
  raw.toLowerCase().replace(/[^a-z0-9\s.+#/-]/g, ' ').replace(/\s+/g, ' ').trim();

const tokensOf = (q: string): Set<string> => new Set(q.split(' '));

const hits = (tokens: Set<string>, q: string, words: string[]): number => {
  let n = 0;
  for (const w of words) {
    if (w.includes(' ') ? q.includes(w) : tokens.has(w)) n += 1;
  }
  return n;
};

const GREETING_WORDS = ['hi', 'hello', 'hey', 'yo', 'namaste', 'hlo', 'hii', 'helo', 'namaskar', 'hola', 'good morning', 'good evening', 'good afternoon'];
const FOLLOWUP_WORDS = ['more', 'detail', 'details', 'aur', 'aage', 'continue', 'elaborate', 'expand', 'explain', 'else', 'uske baare', 'uske bare', 'iske baare', 'iske bare'];
const NAV_WORDS = ['open', 'show', 'view', 'go', 'take', 'visit', 'navigate', 'travel', 'jump', 'launch', 'jao', 'jake', 'kholo', 'khol', 'dikhao', 'dikha', 'dekho', 'dekh', 'chalo'];
const CONTACT_WORDS = ['contact', 'email', 'mail', 'phone', 'number', 'hire', 'hiring', 'reach', 'connect', 'linkedin', 'twitter', 'leetcode', 'socials', 'social'];
const EXPERIENCE_WORDS = ['experience', 'experiences', 'intern', 'internship', 'internships', 'job', 'jobs', 'role', 'roles', 'company', 'career', 'naukri', 'position', 'positions'];
const SKILL_CONTEXT_WORDS = ['skill', 'skills', 'tech', 'technology', 'technologies', 'technical', 'stack', 'know', 'knows', 'knowledge', 'expertise', 'aata', 'jaanta', 'use', 'uses', 'used'];

interface Rule {
  id: string;
  words: string[];
}

const RULES: Rule[] = [
  { id: 'resume', words: ['resume', 'cv'] },
  { id: 'contact', words: CONTACT_WORDS },
  { id: 'certificates', words: ['certificate', 'certificates', 'certification', 'certifications', 'certified', 'course', 'courses', 'credential', 'credentials'] },
  { id: 'education', words: ['education', 'study', 'studies', 'studied', 'college', 'university', 'school', 'degree', 'btech', 'b.tech', 'graduation', 'graduate', 'padhai', 'padha', 'journey'] },
  { id: 'projects', words: ['project', 'projects', 'apps', 'application', 'applications', 'built', 'build', 'made', 'create', 'created', 'banaya', 'banaye', 'flagship', 'flagships', 'kaam'] },
  { id: 'skills', words: [...SKILL_CONTEXT_WORDS, 'language', 'languages', 'framework', 'frameworks', 'database', 'databases', 'tool', 'tools'] },
  { id: 'portfolio', words: ['portfolio', 'website', 'site', 'universe', '3d', 'islands', 'island'] },
  { id: 'location', words: ['where', 'location', 'located', 'city', 'live', 'lives', 'based', 'kahan', 'india'] },
  { id: 'about', words: ['about', 'bio', 'introduction', 'intro', 'background', 'profile', 'who', 'abhijeet', 'dhokne', 'name', 'kaun', 'what does he do', 'what does abhijeet do'] },
  { id: 'help', words: ['help', 'guide', 'yourself', 'gojo'] },
  { id: 'thanks', words: ['thanks', 'thank', 'thankyou', 'shukriya', 'dhanyavad', 'thx'] },
  { id: 'bye', words: ['bye', 'goodbye', 'cya', 'alvida', 'tata', 'exit'] },
];

const ABOUT_GOJO = /who (are|r) (you|u)|about (yourself|you)|tum kaun|aap kaun|kaun ho|what are you/;

const PROJECT_ALIASES: Array<[string, string]> = [
  ['hostel complaint', 'hostelresolve'],
  ['hostelresolve', 'hostelresolve'],
  ['hostel resolve', 'hostelresolve'],
  ['hostel', 'hostelresolve'],
  ['hostmate', 'hostmate'],
  ['host mate', 'hostmate'],
  ['rental', 'hostmate'],
  ['weatherapp', 'weatherapp'],
  ['weather app', 'weatherapp'],
  ['weather', 'weatherapp'],
  ['framepro', 'framepro'],
  ['frame pro', 'framepro'],
  ['photographer', 'framepro'],
  ['spotify clone', 'spotify-clone'],
  ['spotify', 'spotify-clone'],
];

const SKILL_ALIASES: Array<[string, string]> = [
  ['react', 'react'],
  ['react.js', 'react'],
  ['reactjs', 'react'],
  ['javascript', 'javascript'],
  ['js', 'javascript'],
  ['java', 'java'],
  ['python', 'python'],
  ['html5', 'html'],
  ['html', 'html'],
  ['css3', 'css'],
  ['css', 'css'],
  ['tailwind', 'tailwind'],
  ['bootstrap', 'bootstrap'],
  ['node.js', 'node'],
  ['nodejs', 'node'],
  ['node', 'node'],
  ['express.js', 'express'],
  ['expressjs', 'express'],
  ['express', 'express'],
  ['mongodb', 'mongodb'],
  ['mongo', 'mongodb'],
  ['mysql', 'mysql'],
  ['sql', 'sql'],
  ['git', 'git'],
  ['github', 'git'],
  ['postman', 'postman'],
  ['vs code', 'vscode'],
  ['vscode', 'vscode'],
  ['spring boot', 'spring'],
  ['spring', 'spring'],
  ['linux', 'linux'],
  ['docker', 'docker'],
  ['kubernetes', 'kubernetes'],
  ['k8s', 'kubernetes'],
  ['jenkins', 'jenkins'],
  ['ci/cd', 'cicd'],
  ['cicd', 'cicd'],
  ['ci cd', 'cicd'],
  ['aws', 'aws'],
];

const EXPERIENCE_ALIASES: Array<[string, string]> = [
  ['societal', 'ai-intern-kv'],
  ['kendriya', 'ai-intern-kv'],
  ['vidyalaya', 'ai-intern-kv'],
  ['ai intern', 'ai-intern-kv'],
  ['aws trainee', 'aws-trainee-medicaps'],
  ['cloud trainee', 'aws-trainee-medicaps'],
  ['trainee', 'aws-trainee-medicaps'],
  ['mern', 'mern-medicaps'],
];

const matchProject = (q: string): string | null =>
  PROJECT_ALIASES.find(([alias]) => q.includes(alias))?.[1] ?? null;

const matchSkill = (tokens: Set<string>, q: string): string | null => {
  for (const [alias, id] of SKILL_ALIASES) {
    if (alias.includes(' ') ? q.includes(alias) : tokens.has(alias)) return id;
  }
  return null;
};

const matchExperience = (q: string): string | null =>
  EXPERIENCE_ALIASES.find(([alias]) => q.includes(alias))?.[1] ?? null;

const pickIntent = (tokens: Set<string>, q: string): string => {
  let best = 'fallback';
  let bestScore = 0;
  for (const rule of RULES) {
    const score = hits(tokens, q, rule.words);
    if (score > bestScore) {
      bestScore = score;
      best = rule.id;
    }
  }
  return best;
};

const hasNav = (tokens: Set<string>, q: string): boolean =>
  hits(tokens, q, NAV_WORDS) > 0 || q.includes('take me');

const linkChips = (): GojoLink[] => [
  { label: profile.email, href: `mailto:${profile.email}` },
  ...socials.filter((s) => s.verified).map((s) => ({ label: s.label, href: s.url })),
];

const techEqualsSkill = (tech: string, id: string, name: string): boolean => {
  const t = tech.toLowerCase();
  return t === id || t === name.toLowerCase() || t.replace('.js', '') === id;
};

const fallbackReply = (): GojoReply => ({
  text: "That one is outside my universe — I only carry verified facts about Abhijeet and this portfolio. Try asking about his projects, skills, experience, education, certificates, resume, or how to contact him.",
  suggestions: DEFAULT_SUGGESTIONS,
});

const greetingReply = (): GojoReply => ({
  text: "Hey, I'm GOJO — Abhijeet's portfolio guide. Ask me anything about him or his work: projects, skills, experience, education, certificates, resume, or contact.",
  suggestions: DEFAULT_SUGGESTIONS,
});

const helpReply = (): GojoReply => ({
  text: [
    "I'm GOJO — the guide of this portfolio universe, and I know everything about Abhijeet Dhokne and his work.",
    'Ask me things like:\n• "Who is Abhijeet?"\n• "Show his projects"\n• "Does he know React?"\n• "Tell me about his experience"\n• "What are his certificates?"\n• "How do I contact him?"',
    'You can even say "open skills island" and I will fly the camera there for you.',
  ].join('\n\n'),
  suggestions: DEFAULT_SUGGESTIONS,
});

const aboutReply = (navigate: boolean): GojoReply => ({
  text: [`${profile.name} — ${profile.title}.`, ...profile.about].join('\n\n'),
  links: linkChips(),
  suggestions: ['Show his projects', 'What tech does he know?', 'Open resume'],
  actions: navigate
    ? [{ type: 'travel', dest: 'home' }, { type: 'select', selection: { type: 'home' } }]
    : undefined,
});

const projectReply = (id: string, navigate: boolean): GojoReply => {
  const p = projects.find((x) => x.id === id);
  if (!p) return fallbackReply();
  const links: GojoLink[] = [];
  if (p.links.live) links.push({ label: 'Live demo', href: p.links.live });
  if (p.links.github) links.push({ label: 'GitHub', href: p.links.github });
  return {
    text: [
      `${p.title} (${p.date}) — ${p.role}`,
      p.summary,
      `Problem: ${p.problem}`,
      `Solution: ${p.solution}`,
      `Highlights:\n${p.features.map((f) => `• ${f}`).join('\n')}`,
      `Tech: ${p.techStack.join(', ')}`,
    ].join('\n\n'),
    links,
    suggestions: [`Open ${p.title}`, 'Show all projects'],
    actions: navigate
      ? [{ type: 'travel', dest: 'projects' }, { type: 'select', selection: { type: 'project', id: p.id } }]
      : undefined,
  };
};

const projectsList = (navigate: boolean): GojoReply => ({
  text: [
    `Abhijeet has ${projects.length} projects in this portfolio — two flagship full-stack builds and frontend studies:`,
    ...projects.map((p) => `• ${p.title} (${p.date}) — ${p.summary}`),
    'Ask about any one — e.g. "tell me about Hostmate" — or say "open HostelResolve".',
  ].join('\n\n'),
  suggestions: ['Tell me about Hostmate', 'Tell me about HostelResolve', 'Open projects island'],
  actions: navigate ? [{ type: 'travel', dest: 'projects' }] : undefined,
});

const skillReply = (id: string): GojoReply => {
  const s = skills.find((x) => x.id === id);
  if (!s) return fallbackReply();
  const inProjects = projects.filter((p) => p.techStack.some((t) => techEqualsSkill(t, s.id, s.name)));
  const inRoles = experience.filter((e) => e.techStack.some((t) => techEqualsSkill(t, s.id, s.name)));
  const node = skillNodes.find((n) => n.skillIds.includes(s.id));
  const lines = [`${s.name} — ${s.category}. ${s.description}.`];
  if (inProjects.length) lines.push(`Used in: ${inProjects.map((p) => p.title).join(', ')}.`);
  if (inRoles.length) lines.push(`Studied hands-on in: ${inRoles.map((e) => e.role).join(', ')}.`);
  if (node) lines.push(`Grouped under "${node.title}" on the Skills island.`);
  return {
    text: lines.join('\n\n'),
    suggestions: ['Show all skills', 'Open skills island'],
  };
};

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Cloud'];

const skillsList = (navigate: boolean): GojoReply => {
  const lines = CATEGORY_ORDER.map((cat) => {
    const names = skills.filter((s) => s.category === cat).map((s) => s.name);
    return names.length ? `${cat} — ${names.join(', ')}` : '';
  }).filter(Boolean);
  return {
    text: [
      `Abhijeet's toolkit spans the full stack — ${skills.length} verified skills:`,
      ...lines,
      'Ask about any one, e.g. "Does he know React?" — or say "open skills island".',
    ].join('\n\n'),
    suggestions: ['Does he know React?', 'Does he know AWS?', 'Open skills island'],
    actions: navigate ? [{ type: 'travel', dest: 'skills' }] : undefined,
  };
};

const experienceList = (navigate: boolean): GojoReply => ({
  text: [
    `Abhijeet has ${experience.length} verified roles, most recent first:`,
    ...experience.map((e) => `• ${e.role} — ${e.org} (${e.period})`),
    'Ask about any role, e.g. "his AI internship" or "the AWS training".',
  ].join('\n\n'),
  suggestions: ['His AI internship', 'His AWS training', 'Open experience island'],
  actions: navigate ? [{ type: 'travel', dest: 'experience' }] : undefined,
});

const experienceDetail = (id: string, navigate: boolean): GojoReply => {
  const e = experience.find((x) => x.id === id);
  if (!e) return experienceList(navigate);
  return {
    text: [
      `${e.role}\n${e.org} · ${e.period}`,
      e.summary,
      `What he did:\n${e.bullets.map((b) => `• ${b}`).join('\n')}`,
      `Tech: ${e.techStack.join(', ')}`,
    ].join('\n\n'),
    suggestions: ['Show all roles', 'What about his projects?'],
    actions: navigate
      ? [{ type: 'travel', dest: 'experience' }, { type: 'select', selection: { type: 'experience', id: e.id } }]
      : undefined,
  };
};

const educationReply = (navigate: boolean): GojoReply => ({
  text: [
    'Education (verified):',
    ...education.map((e) => `• ${e.degree} — ${e.school} (${e.period})`),
    `He also holds ${certificates.length} certificates — ask "certificates" to see them.`,
  ].join('\n\n'),
  suggestions: ['Show certificates', 'His AI internship'],
  actions: navigate
    ? [{ type: 'travel', dest: 'journey' }, { type: 'select', selection: { type: 'education' } }]
    : undefined,
});

const certificatesReply = (navigate: boolean): GojoReply => ({
  text: [
    `Abhijeet holds ${certificates.length} certificates:`,
    ...certificates.map((c) => `• ${c.title} — ${c.org}`),
    'Open any one to view the verified PDF.',
  ].join('\n\n'),
  links: certificates.map((c) => ({ label: c.title, href: `${certificatesBase}${encodeURIComponent(c.file)}` })),
  suggestions: ['Where did he study?', 'Open journey island'],
  actions: navigate
    ? [{ type: 'travel', dest: 'journey' }, { type: 'select', selection: { type: 'education' } }]
    : undefined,
});

const resumeReply = (navigate: boolean): GojoReply => ({
  text: navigate
    ? "Pulling up Abhijeet's resume right here in the portfolio — one moment."
    : 'Abhijeet\'s resume lives right here in this site, kept in sync with his work. Say "open resume" and I will pull it up for you.',
  suggestions: navigate ? DEFAULT_SUGGESTIONS : ['Open resume', 'How do I contact him?'],
  actions: navigate ? [{ type: 'resume' }] : undefined,
});

const contactReply = (navigate: boolean, tokens: Set<string>): GojoReply => {
  const wantsPhone = tokens.has('phone') || tokens.has('number');
  return {
    text: [
      wantsPhone
        ? `Abhijeet keeps his phone number private. Reach him by email at ${profile.email}.`
        : `You can reach Abhijeet directly at ${profile.email}.`,
      'He is also on GitHub, LinkedIn, X, and LeetCode — links below.',
      navigate ? '' : 'Say "open contact portal" and I will fly you to the Contact island.',
    ].filter(Boolean).join('\n\n'),
    links: linkChips(),
    suggestions: ['Open contact portal', 'Where is he based?'],
    actions: navigate
      ? [{ type: 'travel', dest: 'contact' }, { type: 'select', selection: { type: 'contact' } }]
      : undefined,
  };
};

const locationReply = (): GojoReply => ({
  text: `Abhijeet is based in ${profile.location}. Ask "contact" for his email and professional profiles.`,
  links: linkChips(),
  suggestions: DEFAULT_SUGGESTIONS,
});

const portfolioReply = (): GojoReply => ({
  text: [
    "You're standing inside it — a navigable 3D floating-islands universe, built by Abhijeet himself.",
    'The stack: React and TypeScript, Three.js (react-three-fiber) for the 3D world, GSAP for the cinematic camera travel, Framer Motion for the overlays, and Tailwind CSS for styling.',
    'Six islands: Home, Projects, Skills, Journey, Experience, and Contact. Say "open projects island" and I will fly you there.',
  ].join('\n\n'),
  suggestions: ['Open projects island', 'Open skills island', 'Open contact portal'],
});

const overviewTrip = (): GojoReply => ({
  text: 'Flying you up for the full archipelago view.',
  suggestions: DEFAULT_SUGGESTIONS,
  actions: [{ type: 'travel', dest: 'overview' }],
});

const thanksReply = (): GojoReply => ({
  text: 'Anytime! Anything else you would like to know about Abhijeet?',
  suggestions: DEFAULT_SUGGESTIONS,
});

const byeReply = (): GojoReply => ({
  text: "See you around the archipelago. Come back anytime — I'm always here with Abhijeet's work.",
  suggestions: ['Show his projects'],
});

export const gojoWelcome = (): GojoReply => greetingReply();

export class GojoBrain {
  private last: Topic | null = null;

  reply(rawInput: string): GojoReply {
    const q = normalize(rawInput);
    if (!q) return fallbackReply();
    const tokens = tokensOf(q);
    const nav = hasNav(tokens, q);

    if (tokens.has('gojo') || ABOUT_GOJO.test(q)) return helpReply();

    const projectId = matchProject(q);
    if (projectId) {
      this.last = { kind: 'project', id: projectId };
      return projectReply(projectId, nav);
    }

    const expScore = hits(tokens, q, EXPERIENCE_WORDS);
    const contactHits = hits(tokens, q, CONTACT_WORDS);
    const skillId = matchSkill(tokens, q);
    const skillCtx = hits(tokens, q, SKILL_CONTEXT_WORDS) > 0;

    if (skillId && expScore === 0 && (contactHits === 0 || skillCtx)) {
      this.last = { kind: 'skill', id: skillId };
      return skillReply(skillId);
    }

    if (expScore > 0) {
      const expId = matchExperience(q);
      this.last = expId ? { kind: 'experience', id: expId } : null;
      return expId ? experienceDetail(expId, nav) : experienceList(nav);
    }

    if (nav && (tokens.has('overview') || tokens.has('map') || q.includes('all islands'))) {
      this.last = null;
      return overviewTrip();
    }

    if (nav && (tokens.has('home') || tokens.has('intro') || q.includes('about island'))) {
      this.last = null;
      return aboutReply(true);
    }

    const intent = pickIntent(tokens, q);

    switch (intent) {
      case 'resume':
        this.last = null;
        return resumeReply(nav || tokens.has('download'));
      case 'contact':
        this.last = null;
        return contactReply(nav, tokens);
      case 'certificates':
        this.last = { kind: 'certificates' };
        return certificatesReply(nav);
      case 'education':
        this.last = null;
        return educationReply(nav || tokens.has('journey'));
      case 'projects':
        this.last = null;
        return projectsList(nav);
      case 'skills':
        this.last = null;
        return skillsList(nav);
      case 'portfolio':
        this.last = null;
        return portfolioReply();
      case 'location':
        this.last = null;
        return locationReply();
      case 'about':
        this.last = null;
        return aboutReply(nav);
      case 'help':
        this.last = null;
        return helpReply();
      case 'thanks':
        this.last = null;
        return thanksReply();
      case 'bye':
        this.last = null;
        return byeReply();
      default: {
        if (this.last && hits(tokens, q, FOLLOWUP_WORDS) > 0) return this.expand(this.last);
        if (hits(tokens, q, GREETING_WORDS) > 0) return greetingReply();
        this.last = null;
        return fallbackReply();
      }
    }
  }

  private expand(topic: Topic): GojoReply {
    switch (topic.kind) {
      case 'project':
        return projectReply(topic.id, false);
      case 'skill':
        return skillReply(topic.id);
      case 'experience':
        return experienceDetail(topic.id, false);
      case 'certificates':
        return certificatesReply(false);
    }
  }
}
