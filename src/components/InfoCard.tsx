import type { ReactNode } from 'react';

export function InfoCard({
  title,
  value,
  delta,
  hint
}: {
  title: string;
  value: ReactNode;
  delta?: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="info-card">
      <div className="info-title">{title}</div>
      <div className="info-value-row">
        <div className="info-value">{value}</div>
        {delta ? <div className="info-delta">{delta}</div> : null}
      </div>
      {hint ? <div className="info-hint">{hint}</div> : null}
    </div>
  );
}
