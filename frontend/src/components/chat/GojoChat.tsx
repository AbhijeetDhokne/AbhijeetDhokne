// GOJO — the floating portfolio guide (bottom-right). Talks to the same
// island state as the rest of the UI: replies can fly the camera, open
// detail panels, or pull up the in-site resume viewer.

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useIslands } from '../../state/useIslands';
import { useReducedMotion } from '../../hooks/device';
import { GojoBrain, gojoWelcome } from './gojoBrain';
import type { GojoAction, GojoLink, GojoReply } from './gojoBrain';

interface ChatMessage {
  id: number;
  from: 'gojo' | 'visitor';
  text: string;
  links?: GojoLink[];
  suggestions?: string[];
}

const STREAM_TICK_MS = 22;
const STREAM_TICKS = 130;

const GojoChat = () => {
  const { requestTravel, select, setResumeOpen } = useIslands();
  const reduced = useReducedMotion();
  const brain = useRef(new GojoBrain());
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [streamingId, setStreamingId] = useState<number | null>(null);
  const [visibleChars, setVisibleChars] = useState(0);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const w = gojoWelcome();
    return [{ id: 1, from: 'gojo', text: w.text, suggestions: w.suggestions }];
  });
  const idRef = useRef(1);
  const timersRef = useRef<number[]>([]);
  const intervalsRef = useRef<number[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
      intervalsRef.current.forEach((t) => window.clearInterval(t));
    },
    [],
  );

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, typing, open, visibleChars]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
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

  const applyActions = (actions?: GojoAction[]) => {
    if (!actions || actions.length === 0) return;
    const closeAfter = actions.some((a) => a.type !== 'travel');
    for (const a of actions) {
      if (a.type === 'travel') requestTravel(a.dest);
      else if (a.type === 'select') select(a.selection);
      else setResumeOpen(true);
    }
    if (closeAfter) {
      timersRef.current.push(window.setTimeout(() => setOpen(false), 1100));
    }
  };

  /** Live writing: reveal the reply progressively, then apply its actions. */
  const startStream = (id: number, reply: GojoReply) => {
    if (reduced) {
      applyActions(reply.actions);
      return;
    }
    const total = reply.text.length;
    const step = Math.max(1, Math.round(total / STREAM_TICKS));
    setStreamingId(id);
    setVisibleChars(0);
    let chars = 0;
    const interval = window.setInterval(() => {
      chars = Math.min(chars + step, total);
      setVisibleChars(chars);
      if (chars >= total) {
        window.clearInterval(interval);
        setStreamingId(null);
        timersRef.current.push(window.setTimeout(() => applyActions(reply.actions), 140));
      }
    }, STREAM_TICK_MS);
    intervalsRef.current.push(interval);
  };

  const busy = typing || streamingId !== null;

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    const nextId = () => {
      idRef.current += 1;
      return idRef.current;
    };
    setMessages((m) => [...m, { id: nextId(), from: 'visitor', text }]);
    setInput('');
    setTyping(true);
    const delay = 420 + Math.min(text.length * 14, 420);
    timersRef.current.push(
      window.setTimeout(() => {
        const reply = brain.current.reply(text);
        const id = nextId();
        setTyping(false);
        setMessages((m) => [
          ...m,
          { id, from: 'gojo', text: reply.text, links: reply.links, suggestions: reply.suggestions },
        ]);
        startStream(id, reply);
      }, delay),
    );
  };

  const lastId = messages[messages.length - 1]?.id;

  return (
    <div ref={rootRef} className="gojo-root">
      <AnimatePresence>
        {open && (
          <motion.section
            key="gojo-panel"
            className="gojo-panel"
            role="dialog"
            aria-label="GOJO — portfolio guide chat"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            data-ui-scroll="true"
          >
            <header className="gojo-head">
              <span className="gojo-avatar" aria-hidden="true">∞</span>
              <div className="gojo-head-text">
                <p className="gojo-title">GOJO</p>
                <p className="gojo-subtitle">Portfolio guide — ask me about Abhijeet</p>
              </div>
              <button
                type="button"
                className="gojo-close"
                onClick={() => setOpen(false)}
                aria-label="Close chat (Esc)"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </header>

            <div ref={listRef} className="gojo-messages no-scrollbar" aria-live="polite">
              {messages.map((m) => {
                const isStreaming = m.id === streamingId;
                return (
                  <div key={m.id} className={`gojo-row${m.from === 'visitor' ? ' is-visitor' : ''}`}>
                    <div className={`gojo-bubble${m.from === 'visitor' ? ' is-visitor' : ''}`}>
                      {isStreaming ? (
                        <>
                          <span aria-hidden="true">{m.text.slice(0, visibleChars)}</span>
                          <span className="gojo-caret" aria-hidden="true" />
                        </>
                      ) : (
                        m.text
                      )}
                    </div>
                    {!isStreaming && m.links && m.links.length > 0 && (
                      <div className="gojo-links">
                        {m.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gojo-link"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                    {m.id === lastId && !busy && m.suggestions && m.suggestions.length > 0 && (
                      <div className="gojo-suggestions">
                        {m.suggestions.map((s) => (
                          <button key={s} type="button" className="gojo-suggestion" onClick={() => send(s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {typing && (
                <div className="gojo-row">
                  <div className="gojo-bubble gojo-typing" aria-label="GOJO is typing">
                    <span className="gojo-dot" />
                    <span className="gojo-dot" />
                    <span className="gojo-dot" />
                  </div>
                </div>
              )}
            </div>

            <form
              className="gojo-form"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                ref={inputRef}
                className="gojo-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Abhijeet…"
                aria-label="Ask GOJO a question"
              />
              <button type="submit" className="gojo-send" disabled={!input.trim() || busy} aria-label="Send">
                <Send size={15} aria-hidden="true" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="gojo-launcher"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close GOJO chat' : 'Chat with GOJO — portfolio guide'}
      >
        <span className="gojo-launcher-symbol" aria-hidden="true">∞</span>
        <span className="gojo-launcher-label">GOJO</span>
      </button>
    </div>
  );
};

export default GojoChat;
