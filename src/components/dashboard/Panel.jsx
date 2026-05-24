export function Panel({ title, children, actions }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {actions ? <div>{actions}</div> : null}
      </header>
      {children}
    </section>
  );
}
