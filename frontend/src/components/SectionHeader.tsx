export function SectionHeader({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#D7E2EA]">{eyebrow}</p> : null}
      <h2 className="hero-heading text-balance text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-muted">{body}</p> : null}
    </div>
  );
}
