export function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <article key={item.label} className="rounded-xl bg-slate-900 p-4 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{item.label}</p>
          <p className="mt-2 text-2xl font-bold">{item.value}</p>
        </article>
      ))}
    </div>
  );
}
