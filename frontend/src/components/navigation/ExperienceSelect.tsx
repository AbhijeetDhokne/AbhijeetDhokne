// Stylish role picker for the Experience island: a single "View" button with
// a glass menu of verified roles in sorted (most recent first) order. Shares
// the generic picker styles with ProjectSelect.

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useIslands } from '../../state/useIslands';
import { experience } from '../../data/experience';

const ExperienceSelect = () => {
  const { selection, select } = useIslands();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const activeId = selection?.type === 'experience' ? selection.id : null;
  const active = experience.find((e) => e.id === activeId);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="picker">
      <button
        ref={btnRef}
        type="button"
        className={`picker-btn${open ? ' is-open' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="picker-label">{active ? active.role : 'View'}</span>
        <ChevronDown size={14} aria-hidden="true" className="picker-chevron" />
      </button>
      {open && (
        <ul role="listbox" aria-label="Roles, most recent first" className="picker-menu">
          {experience.map((e) => {
            const isActive = e.id === activeId;
            return (
              <li key={e.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={`picker-item${isActive ? ' is-active' : ''}`}
                  onClick={() => {
                    select({ type: 'experience', id: e.id });
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                >
                  <span className="picker-item-title">{e.role}</span>
                  <span className="picker-item-meta">{e.period}</span>
                  {isActive && <Check size={14} aria-hidden="true" className="picker-check" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExperienceSelect;
