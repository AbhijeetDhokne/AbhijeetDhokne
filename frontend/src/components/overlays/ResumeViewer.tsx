// In-site resume viewer: the PDF opens inside the portfolio universe as an
// overlay instead of a new browser tab. The file is fetched first and rendered
// from a blob URL — a missing deploy never renders the site itself in the frame.

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, X } from 'lucide-react';
import { useIslands } from '../../state/useIslands';
import { profile } from '../../data/profile';

type LoadState = 'loading' | 'ready' | 'missing';

const ResumeViewer = () => {
  const { resumeOpen, setResumeOpen } = useIslands();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<LoadState>('loading');
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [wasOpen, setWasOpen] = useState(false);

  // Fresh load state on every open (render-phase adjustment, not an effect).
  if (resumeOpen && !wasOpen) {
    setWasOpen(true);
    setStatus('loading');
    setObjectUrl(null);
  } else if (!resumeOpen && wasOpen) {
    setWasOpen(false);
  }

  useEffect(() => {
    if (!resumeOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setResumeOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resumeOpen, setResumeOpen]);

  useEffect(() => {
    if (!resumeOpen) return;
    let live = true;
    let url: string | null = null;
    fetch(profile.resumePath)
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        if (!res.ok || !type.includes('pdf')) throw new Error(`resume unavailable (${res.status})`);
        return res.blob();
      })
      .then((blob) => {
        if (!live) return;
        url = URL.createObjectURL(blob);
        setObjectUrl(url);
        setStatus('ready');
      })
      .catch(() => {
        if (live) setStatus('missing');
      });
    return () => {
      live = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [resumeOpen, attempt]);

  return (
    <AnimatePresence>
      {resumeOpen && (
        <motion.div
          key="resume-viewer"
          className="resume-veil"
          role="dialog"
          aria-modal="true"
          aria-label="Resume viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          onClick={() => setResumeOpen(false)}
        >
          <motion.div
            className="resume-card"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-bar">
              <p className="meta-label">{profile.name} · Resume</p>
              <div className="resume-bar-actions">
                <a href={profile.resumePath} download className="secondary-button info-link">
                  <Download size={14} aria-hidden="true" /> Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  className="info-close"
                  onClick={() => setResumeOpen(false)}
                  aria-label="Close resume viewer (Esc)"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
            {status === 'loading' && (
              <p className="resume-state" role="status">Loading resume…</p>
            )}
            {status === 'ready' && objectUrl && (
              <iframe
                className="resume-frame"
                src={objectUrl}
                title={`${profile.name} resume PDF`}
              />
            )}
            {status === 'missing' && (
              <div className="resume-state" role="alert">
                <p>Resume file not found. If running locally, restart the dev server; on the live site, redeploy to publish it.</p>
                <button
                  type="button"
                  className="secondary-button info-link"
                  onClick={() => setAttempt((n) => n + 1)}
                >
                  <RefreshCw size={14} aria-hidden="true" /> Try again
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeViewer;
