export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="panel rounded-lg p-8 text-center">
      <h3 className="text-lg font-semibold text-mist">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}
