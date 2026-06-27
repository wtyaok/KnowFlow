import type { ReactNode } from 'react';

export function StatusBadge({
  children,
  tone = 'default'
}: {
  children: ReactNode;
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
