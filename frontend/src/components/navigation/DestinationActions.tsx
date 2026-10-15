// Contextual HTML controls for the current island: every 3D selection
// (project halls, crystal clusters, monoliths, portal) gets a keyboard-
// reachable button here, so no content depends on clicking 3D objects.

import { Mail, FileText, Github } from 'lucide-react';
import { useIslands } from '../../state/useIslands';
import { projects } from '../../data/projects';
import { skillNodes } from '../../data/skills';
import { experience } from '../../data/experience';
import { profile, socials } from '../../data/profile';

const ActionButton = ({ label, onClick, active }: { label: string; onClick: () => void; active?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`dest-action${active ? ' is-active' : ''}`}
  >
    {label}
  </button>
);

const DestinationActions = () => {
  const { current, selection, select } = useIslands();
  if (current === 'overview') return null;

  return (
    <nav aria-label={`${current} details`} className="dest-actions" data-ui-scroll="true">
      {current === 'home' && (
        <>
          <a className="dest-action" href={`mailto:${profile.email}`}>
            <Mail size={13} aria-hidden="true" /> Email
          </a>
          <a className="dest-action" href={profile.resumePath} target="_blank" rel="noopener noreferrer">
            <FileText size={13} aria-hidden="true" /> Résumé
          </a>
          {socials.filter((s) => s.id === 'github').map((s) => (
            <a key={s.id} className="dest-action" href={s.url} target="_blank" rel="noopener noreferrer">
              <Github size={13} aria-hidden="true" /> GitHub
            </a>
          ))}
        </>
      )}
      {current === 'projects' && projects.map((p) => (
        <ActionButton
          key={p.id}
          label={p.title}
          active={selection?.type === 'project' && selection.id === p.id}
          onClick={() => select({ type: 'project', id: p.id })}
        />
      ))}
      {current === 'skills' && skillNodes.map((n) => (
        <ActionButton
          key={n.id}
          label={n.title}
          active={selection?.type === 'skill-node' && selection.id === n.id}
          onClick={() => select({ type: 'skill-node', id: n.id })}
        />
      ))}
      {current === 'journey' && (
        <ActionButton
          label="Education & certificates"
          active={selection?.type === 'education'}
          onClick={() => select({ type: 'education' })}
        />
      )}
      {current === 'experience' && experience.map((e) => (
        <ActionButton
          key={e.id}
          label={e.role}
          active={selection?.type === 'experience' && selection.id === e.id}
          onClick={() => select({ type: 'experience', id: e.id })}
        />
      ))}
      {current === 'contact' && (
        <ActionButton
          label="Open contact channels"
          active={selection?.type === 'contact'}
          onClick={() => select({ type: 'contact' })}
        />
      )}
    </nav>
  );
};

export default DestinationActions;
