import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { skills as bentoCards } from '../data/skills';

const SkillCard = memo(({ card, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      className={`bento-card ${card.span === 'wide' ? 'bento-wide' : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(114, 125, 115, 0.05)',
        borderRadius: '20px',
        border: '1px solid var(--border-soft)',
        padding: card.span === 'wide' ? '1.75rem' : '1.25rem',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease'
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 16px 40px ${card.color}22, 0 0 0 2px ${card.color}44`
      }}
    >
      {/* Accent glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: card.color,
          opacity: 0.08,
          filter: 'blur(30px)'
        }}
        animate={{
          opacity: isHovered ? 0.18 : 0.08,
          scale: isHovered ? 1.3 : 1
        }}
        transition={{ duration: 0.4 }}
      />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: card.span === 'wide' ? '0.75rem' : '0.5rem'
      }}>
        <motion.img
          src={card.icon}
          alt={card.name}
          style={{
            width: card.span === 'wide' ? '44px' : '36px',
            height: card.span === 'wide' ? '44px' : '36px',
            objectFit: 'contain',
            borderRadius: '10px',
            padding: '6px',
            background: `${card.color}12`
          }}
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 400 }}
        />
        <div>
          <h4 style={{
            fontSize: card.span === 'wide' ? '1.15rem' : '1rem',
            fontWeight: '700',
            color: 'var(--text-main)',
            margin: 0,
            letterSpacing: '0.01em'
          }}>
            {card.name}
          </h4>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: card.color,
            opacity: 0.85
          }}>
            {card.category}
          </span>
        </div>
      </div>

      <motion.p
        style={{
          fontSize: '0.85rem',
          lineHeight: '1.6',
          color: 'var(--text-muted)',
          margin: 0
        }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: isHovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        {card.description}
      </motion.p>
    </motion.div>
  );
});

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = useMemo(() => {
    const cats = [...new Set(bentoCards.map(card => card.category))];
    return ['All', ...cats.sort()];
  }, []);

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'All') return bentoCards;
    return bentoCards.filter(card => card.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      className="skills-section"
      style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Category Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: selectedCategory === cat ? '2px solid var(--army-olive)' : '1px solid var(--border-soft)',
              background: selectedCategory === cat ? 'var(--army-olive)' : 'rgba(114, 125, 115, 0.06)',
              color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease'
            }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="bento-grid">
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card, index) => (
            <SkillCard key={card.id} card={card} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default memo(Skills);
