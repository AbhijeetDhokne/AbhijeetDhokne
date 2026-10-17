// GOJO guide-brain contract: every answer must trace back to the verified
// data layer, navigation requests must carry island actions, and unknown
// questions must fall back politely instead of inventing facts.

import { describe, expect, it } from 'vitest';
import { GojoBrain, gojoWelcome } from './gojoBrain';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { experience } from '../../data/experience';

describe('GOJO portfolio guide brain', () => {
  it('welcomes visitors with suggestions', () => {
    const w = gojoWelcome();
    expect(w.text).toContain('GOJO');
    expect(w.suggestions?.length).toBeGreaterThan(2);
  });

  it('answers greetings', () => {
    const r = new GojoBrain().reply('hello');
    expect(r.text).toContain('GOJO');
  });

  it('introduces Abhijeet from verified profile data', () => {
    const r = new GojoBrain().reply('who is Abhijeet?');
    expect(r.text).toContain(profile.name);
    expect(r.text).toContain(profile.title);
    expect(r.text).toContain(profile.about[0]);
  });

  it('lists every verified project', () => {
    const r = new GojoBrain().reply('what projects has he built?');
    for (const p of projects) expect(r.text).toContain(p.title);
  });

  it('answers a project question with verified details and links', () => {
    const r = new GojoBrain().reply('tell me about Hostmate');
    expect(r.text).toContain('Razorpay');
    expect(r.text).toContain('Highlights');
    expect(r.links?.map((l) => l.href)).toContain(projects.find((p) => p.id === 'hostmate')?.links.github);
  });

  it('flies the camera and opens the panel on explicit project navigation', () => {
    const r = new GojoBrain().reply('open HostelResolve');
    expect(r.actions).toEqual([
      { type: 'travel', dest: 'projects' },
      { type: 'select', selection: { type: 'project', id: 'hostelresolve' } },
    ]);
  });

  it('matches a skill by name with project usage', () => {
    const r = new GojoBrain().reply('does he know React?');
    expect(r.text).toContain('React');
    expect(r.text).toContain('HostelResolve');
  });

  it('lists the full verified toolkit by category', () => {
    const r = new GojoBrain().reply('what is his tech stack?');
    expect(r.text).toContain('Frontend');
    expect(r.text).toContain('Cloud');
  });

  it('covers experience, education, and certificates', () => {
    const internship = new GojoBrain().reply('his AI internship');
    expect(internship.text).toContain('Ollama');

    const edu = new GojoBrain().reply('where did he study?');
    expect(edu.text).toContain('Medicaps University, Indore');

    const certs = new GojoBrain().reply('what certificates does he have?');
    expect(certs.text).toContain('Anthropic');
    expect(certs.links?.some((l) => l.href.endsWith('.pdf'))).toBe(true);
  });

  it('lists all roles for a generic experience question', () => {
    const r = new GojoBrain().reply('tell me about his internship');
    expect(r.text).toContain(experience[0].org);
    expect(r.text).toContain(experience.length.toString());
  });

  it('shares contact details with verified socials only', () => {
    const r = new GojoBrain().reply('how can I contact him?');
    expect(r.text).toContain(profile.email);
    expect(r.links?.[0]?.href).toBe(`mailto:${profile.email}`);
    expect(r.links?.some((l) => l.href.includes('github.com'))).toBe(true);
  });

  it('keeps the phone number private', () => {
    const r = new GojoBrain().reply('what is his phone number?');
    expect(r.text.toLowerCase()).toContain('private');
    expect(r.text).toContain(profile.email);
  });

  it('routes resume requests into the in-site viewer', () => {
    const r = new GojoBrain().reply('open resume');
    expect(r.actions).toEqual([{ type: 'resume' }]);
  });

  it('travels to islands on navigation requests', () => {
    const skills = new GojoBrain().reply('take me to skills');
    expect(skills.actions).toEqual([{ type: 'travel', dest: 'skills' }]);
    expect(skills.text).toContain('Frontend');

    const contact = new GojoBrain().reply('go to contact');
    expect(contact.actions).toEqual([
      { type: 'travel', dest: 'contact' },
      { type: 'select', selection: { type: 'contact' } },
    ]);
  });

  it('understands Hinglish questions', () => {
    expect(new GojoBrain().reply('uske projects kya hain?').text).toContain('HostelResolve');
    expect(new GojoBrain().reply('uska email kya hai?').text).toContain(profile.email);
    expect(new GojoBrain().reply('uski padhai?').text).toContain('B.Tech');
  });

  it('expands the previous topic on follow-ups', () => {
    const brain = new GojoBrain();
    brain.reply('tell me about Hostmate');
    const more = brain.reply('tell me more');
    expect(more.text).toContain('Highlights');
    expect(more.text).toContain('Razorpay');
  });

  it('falls back politely without inventing facts', () => {
    const r = new GojoBrain().reply('what is his favourite food?');
    expect(r.text).toContain('verified facts');
    expect(r.suggestions?.length).toBeGreaterThan(0);
  });

  it('explains the portfolio universe itself', () => {
    const r = new GojoBrain().reply('tell me about this portfolio');
    expect(r.text).toContain('Three.js');
    expect(r.text).toContain('Six islands');
  });
});
