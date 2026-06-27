import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { storage } from '../../utils/storage';
import type { TicketItem, TicketPriority, TicketStatus } from '../../types';
import { ticketPriorityLabels, ticketStatusLabels } from '../../utils/labels';

const text = {
  currentUser: '\u5f53\u524d\u7528\u6237',
  title: '\u5de5\u5355\u7cfb\u7edf',
  desc: '\u652f\u6301\u63d0\u5355\u3001\u6d41\u8f6c\u3001\u5904\u7406\u8bb0\u5f55\u548c\u7ba1\u7406\u5458\u72b6\u6001\u66f4\u65b0\u3002',
  pending: '\u5f85\u5904\u7406',
  processing: '\u5904\u7406\u4e2d',
  resolved: '\u5df2\u89e3\u51b3',
  titlePlaceholder: '\u5de5\u5355\u6807\u9898',
  detailPlaceholder: '\u5de5\u5355\u63cf\u8ff0',
  submitting: '\u63d0\u4ea4\u4e2d...',
  create: '\u521b\u5efa\u5de5\u5355',
  stateHelp: '\u5f53\u524d\u72b6\u6001\u8bf4\u660e',
  history: '\u5904\u7406\u8bb0\u5f55',
  start: '\u5f00\u59cb\u5904\u7406',
  markResolved: '\u6807\u8bb0\u89e3\u51b3',
  close: '\u5173\u95ed\u5de5\u5355',
  reopen: '\u91cd\u5f00',
  emptyTitle: '\u6682\u65e0\u5de5\u5355',
  emptyDesc: '\u5f53\u524d\u6ca1\u6709\u9700\u8981\u5904\u7406\u7684\u5de5\u5355\u3002'
};

const statusTone = {
  pending: 'warning',
  processing: 'info',
  resolved: 'success',
  closed: 'neutral'
} as const;

const priorityTone = {
  low: 'neutral',
  medium: 'info',
  high: 'warning',
  urgent: 'danger'
} as const;

const statusHelp: Record<TicketStatus, string> = {
  pending: '\u7b49\u5f85\u7ba1\u7406\u5458\u53d7\u7406\uff0c\u666e\u901a\u7528\u6237\u53ea\u80fd\u67e5\u770b\u5904\u7406\u8fdb\u5ea6\u3002',
  processing: '\u7ba1\u7406\u5458\u6b63\u5728\u5904\u7406\uff0c\u53ef\u63a8\u8fdb\u4e3a\u5df2\u89e3\u51b3\u6216\u5173\u95ed\u3002',
  resolved: '\u95ee\u9898\u5df2\u89e3\u51b3\uff0c\u5982\u4ecd\u6709\u95ee\u9898\u53ef\u91cd\u5f00\u56de\u5230\u5904\u7406\u4e2d\u3002',
  closed: '\u5de5\u5355\u5df2\u5173\u95ed\uff0c\u5904\u7406\u94fe\u8def\u7ed3\u675f\u3002'
};

export function TicketPage() {
  const [items, setItems] = useState<TicketItem[]>([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');
  const [loading, setLoading] = useState(false);
  const currentUser = storage.getUser();
  const canManage = currentUser?.role === 'admin';

  const load = async () => {
    const res = await api.listTickets();
    setItems(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const summary = useMemo(
    () => ({
      pending: items.filter((item) => item.status === 'pending').length,
      processing: items.filter((item) => item.status === 'processing').length,
      resolved: items.filter((item) => item.status === 'resolved').length
    }),
    [items]
  );

  const create = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await api.createTicket({
      title,
      detail,
      priority,
      requester: currentUser?.name || text.currentUser
    });
    setTitle('');
    setDetail('');
    setPriority('medium');
    await load();
    setLoading(false);
  };

  const update = async (id: string, status: TicketStatus) => {
    await api.updateTicket(id, { status });
    await load();
  };

  return (
    <section className="page-stack">
      <PageHeader title={text.title} description={text.desc} />

      <div className="ticket-summary-grid">
        <div className="summary-card"><div>{text.pending}</div><strong>{summary.pending}</strong></div>
        <div className="summary-card"><div>{text.processing}</div><strong>{summary.processing}</strong></div>
        <div className="summary-card"><div>{text.resolved}</div><strong>{summary.resolved}</strong></div>
      </div>

      <div className="ticket-create">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={text.titlePlaceholder} />
        <input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder={text.detailPlaceholder} />
        <select value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)}>
          <option value="low">{ticketPriorityLabels.low}</option>
          <option value="medium">{ticketPriorityLabels.medium}</option>
          <option value="high">{ticketPriorityLabels.high}</option>
          <option value="urgent">{ticketPriorityLabels.urgent}</option>
        </select>
        <button className="primary-button" disabled={loading} onClick={create}>
          {loading ? text.submitting : text.create}
        </button>
      </div>

      <div className="ticket-list">
        {items.length ? items.map((item) => (
          <article key={item.id} className="ticket-card">
            <div className="ticket-head">
              <div>
                <h3>{item.title}</h3>
                <div className="ticket-meta">{item.requester} · {item.updatedAt}</div>
              </div>
              <div className="ticket-badges">
                <StatusBadge tone={statusTone[item.status]}>{ticketStatusLabels[item.status]}</StatusBadge>
                <StatusBadge tone={priorityTone[item.priority]}>{ticketPriorityLabels[item.priority]}</StatusBadge>
              </div>
            </div>
            <div className="ticket-detail">{item.detail}</div>
            <div className="structure-block">
              <div className="structure-label">{text.stateHelp}</div>
              <div>{statusHelp[item.status]}</div>
            </div>
            <div className="history-title">{text.history}</div>
            <div className="timeline">
              {item.history.map((entry) => (
                <div key={entry.id} className="timeline-item">
                  <div className="timeline-time">{entry.at}</div>
                  <div>
                    <strong>{entry.actor}</strong> {entry.action}
                    <div className="timeline-note">{entry.note}</div>
                  </div>
                </div>
              ))}
            </div>
            {canManage ? (
              <div className="ticket-actions">
                {item.status === 'pending' ? (
                  <button className="secondary-button" onClick={() => update(item.id, 'processing')}>{text.start}</button>
                ) : null}
                {item.status === 'processing' ? (
                  <>
                    <button className="secondary-button" onClick={() => update(item.id, 'resolved')}>{text.markResolved}</button>
                    <button className="secondary-button" onClick={() => update(item.id, 'closed')}>{text.close}</button>
                  </>
                ) : null}
                {item.status === 'resolved' ? (
                  <>
                    <button className="danger-button" onClick={() => update(item.id, 'processing')}>{text.reopen}</button>
                    <button className="secondary-button" onClick={() => update(item.id, 'closed')}>{text.close}</button>
                  </>
                ) : null}
              </div>
            ) : null}
          </article>
        )) : (
          <EmptyState title={text.emptyTitle} description={text.emptyDesc} />
        )}
      </div>
    </section>
  );
}
