// Stylish project picker for the Projects island: a single "View" button that
// opens a glass menu of every project. Compact no matter how many projects
// ship in the future. Esc or outside click closes it.

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useIslands } from '../../state/useIslands';
import { projects } from '../../data/projects';

const ProjectSelect = () => {
  const { selection, select } = useIslands();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const activeId = selection?.type === 'project' ? selection.id : null;
  const active = projects.find((p) => p.id === activeId);

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
  }, [open ]);

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
        <span className="picker-label">{active ? active.title : 'View'}</span>
        <ChevronDown size={14} aria-hidden="true" className="picker-chevron" />
      </button>
      {open && (
        <ul role="listbox" aria-label="Projects" className="picker-menu">
          {projects.map((p) => {
            const isActive = p.id === activeId;
            return (
              <li key={p.id} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={`picker-item${isActive ? ' is-active' : ''}`}
                  onClick={() => {
                    select({ type: 'project', id: p.id });
                    setOpen(false);
                    btnRef.current?.focus();
                  }}
                >
                  <span className="picker-item-title">{p.title}</span>
                  <span className="picker-item-meta">{p.date}</span>
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

export default ProjectSelect;
