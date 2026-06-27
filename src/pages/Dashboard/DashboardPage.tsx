import { useEffect, useState } from 'react';
import { api } from '../../api';
import type { DashboardStat, TicketItem } from '../../types';
import { EmptyState } from '../../components/EmptyState';
import { InfoCard } from '../../components/InfoCard';
import { PageHeader } from '../../components/PageHeader';
import { ticketStatusLabels } from '../../utils/labels';

const text = {
  title: '\u5de5\u4f5c\u53f0',
  desc: '\u56f4\u7ed5\u77e5\u8bc6\u3001\u95ee\u7b54\u548c\u5de5\u5355\u7684\u65e5\u5e38\u5904\u7406\u6982\u89c8\u3002',
  hint: '\u8f83\u4e0a\u5468',
  trend: '\u8d8b\u52bf',
  trendLabel: '\u8d8b\u52bf\u56fe',
  trendNote: '\u6700\u8fd1 7 \u5929\u7684\u77e5\u8bc6\u68c0\u7d22\u6d3b\u8dc3\u5ea6\u3002',
  pending: '\u5f85\u5904\u7406\u5de5\u5355',
  emptyTitle: '\u6682\u65e0\u5f85\u5904\u7406\u5de5\u5355',
  emptyDesc: '\u5f53\u524d\u5de5\u4f5c\u53f0\u6ca1\u6709\u65b0\u7684\u5904\u7406\u9879\u3002'
};

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [trendPoints, setTrendPoints] = useState<number[]>([]);
  const [recentTickets, setRecentTickets] = useState<TicketItem[]>([]);

  useEffect(() => {
    api.getDashboard().then((res) => {
      setStats(res.data.stats);
      setTrendPoints(res.data.trendPoints);
    });
    api.listTickets().then((res) => setRecentTickets(res.data.slice(0, 3)));
  }, []);

  return (
    <section className="page-stack">
      <PageHeader title={text.title} description={text.desc} />

      <div className="stats-grid">
        {stats.map((item) => (
          <InfoCard
            key={item.label}
            title={item.label}
            value={item.value}
            delta={item.delta}
            hint={text.hint}
          />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-title">{text.trend}</div>
          <div className="mini-chart" aria-label={text.trendLabel}>
            {trendPoints.map((value, index) => (
              <span key={index} className="chart-bar" style={{ height: `${20 + value}px` }} />
            ))}
          </div>
          <div className="panel-note">{text.trendNote}</div>
        </div>
        <div className="panel">
          <div className="panel-title">{text.pending}</div>
          {recentTickets.length ? (
            <div className="compact-list">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="compact-row">
                  <div>
                    <div className="compact-title">{ticket.title}</div>
                    <div className="compact-sub">{ticket.requester} · {ticket.updatedAt}</div>
                  </div>
                  <div className="compact-meta">{ticketStatusLabels[ticket.status]}</div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title={text.emptyTitle} description={text.emptyDesc} />
          )}
        </div>
      </div>
    </section>
  );
}
