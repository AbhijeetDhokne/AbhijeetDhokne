export const LoadingFallback = ({ label = 'Loading…' }: { label?: string }) => (
  <div role="status" aria-live="polite" className="flex h-full flex-col items-center justify-center gap-4 bg-ink p-8">
    <span
      aria-hidden="true"
      className="h-8 w-8 animate-spin rounded-full border-[3px] border-parchment/20 border-t-lantern"
    />
    <p className="text-sm text-slate-dim">{label}</p>
  </div>
);

export default LoadingFallback;
