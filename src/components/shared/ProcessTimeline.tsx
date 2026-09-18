export interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

export function ProcessTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li key={step.number} className="card-surface relative overflow-hidden p-6">
          <span className="font-accent block text-4xl text-[var(--color-gold-500)]">{step.number}</span>
          <h3 className="mt-3 text-lg font-semibold text-[var(--color-brown-900)]">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
