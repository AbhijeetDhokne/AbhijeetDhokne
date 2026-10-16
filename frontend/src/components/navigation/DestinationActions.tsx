// Contextual HTML controls for the current island: every 3D selection
// (project halls, crystal clusters, monoliths, portal) gets a keyboard-
// reachable button here, so no content depends on clicking 3D objects.

import { FileText } from 'lucide-react';
import { useIslands } from '../../state/useIslands';
import { projects } from '../../data/projects';
import { skillNodes } from '../../data/skills';
import { experience } from '../../data/experience';

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
  const { current, selection, select, setResumeOpen } = useIslands();
  if (current === 'overview') return null;

  return (
    <nav id="island-actions" aria-label={`${current} details`} className="dest-actions" data-ui-scroll="true">
      {current === 'home' && (
        <>
          <ActionButton
            label="About Abhijeet"
            active={selection?.type === 'home'}
            onClick={() => select({ type: 'home' })}
          />
          <button type="button" className="dest-action" onClick={() => setResumeOpen(true)}>
            <FileText size={13} aria-hidden="true" /> Resume
          </button>
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
