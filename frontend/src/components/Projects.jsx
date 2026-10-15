import React, { useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { Code2, ArrowUpDown } from 'lucide-react';
import ProjectCard from './ProjectCard';

import { projects as projectData } from '../data/projects';

// Adapter: data layer uses summary/links; cards consume the legacy shape.
const projects = projectData.map((p) => ({
  title: p.title,
  description: p.summary,
  image: p.image,
  imagePosition: p.imagePosition,
  liveUrl: p.links.live,
  githubUrl: p.links.github,
  techStack: p.techStack,
  role: p.role,
  date: p.date,
  year: p.year,
  order: p.order,
  isMe: p.isMe,
}));

const Projects = () => {
  const [sortBy, setSortBy] = useState('all');
  const [yearInput, setYearInput] = useState('');

  const years = useMemo(() => {
    const uniqueYears = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);
    return uniqueYears;
  }, []);

  const filteredProjects = useMemo(() => {
    const filtered = [...projects];
    if (sortBy === 'latest') {
      filtered.sort((a, b) => b.order - a.order);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.order - b.order);
    } else if (sortBy !== 'all') {
      return filtered.filter(p => p.year === parseInt(sortBy)).sort((a, b) => b.order - a.order);
    } else {
      filtered.sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.order - a.order;
      });
    }
    return filtered;
  }, [sortBy]);

  const handleYearInput = (e) => {
    const val = e.target.value;
    setYearInput(val);
    if (val.length === 4) {
      const year = parseInt(val);
      if (!isNaN(year) && year >= 2000 && year <= 2099) {
        setSortBy(String(year));
      } else {
        setSortBy('all');
      }
    } else if (val.length === 0) {
      setSortBy('all');
    }
  };

  const handleSortChange = (key) => {
    setSortBy(key);
    if (key === 'all' || key === 'latest' || key === 'oldest') {
      setYearInput('');
    }
  };

  const sortOptions = [
    { key: 'all', label: 'All' },
    { key: 'latest', label: 'Latest' },
    { key: 'oldest', label: 'Oldest' },
    ...years.map(y => ({ key: String(y), label: String(y) }))
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Sort Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--army-olive)',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          <ArrowUpDown size={18} />
          <span>Sort by:</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'latest', 'oldest'].map((key) => (
            <button
              key={key}
              onClick={() => handleSortChange(key)}
              style={{
                padding: '8px 18px',
                borderRadius: '20px',
                border: sortBy === key ? '2px solid var(--primary)' : '1px solid var(--border-soft)',
                background: sortBy === key ? 'var(--primary)' : 'rgba(114, 125, 115, 0.06)',
                color: sortBy === key ? '#fff' : 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                transform: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {key}
            </button>
          ))}
        </div>
        {years.length > 0 && (
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Type year..."
              value={yearInput}
              onChange={handleYearInput}
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                border: sortBy !== 'all' && sortBy !== 'latest' && sortBy !== 'oldest'
                  ? '2px solid var(--primary)'
                  : '1px solid var(--border-soft)',
                background: sortBy !== 'all' && sortBy !== 'latest' && sortBy !== 'oldest'
                  ? 'var(--primary)'
                  : 'rgba(114, 125, 115, 0.06)',
                color: sortBy !== 'all' && sortBy !== 'latest' && sortBy !== 'oldest'
                  ? '#fff'
                  : 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'text',
                outline: 'none',
                width: '120px',
                textAlign: 'center',
                letterSpacing: '2px',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </div>
        )}
      </div>

      {/* Project Cards Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
        {filteredProjects.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-muted)',
            fontSize: '1rem'
          }}>
            No projects found for this filter.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default memo(Projects);
