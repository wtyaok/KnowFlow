import { type ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import type { DocumentCategory, DocumentItem } from '../../types';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { documentStatusLabels } from '../../utils/labels';

const text = {
  title: '\u77e5\u8bc6\u5e93',
  desc: '\u652f\u6301\u5206\u7c7b\u7b5b\u9009\u3001\u6587\u6863\u4e0a\u4f20\u3001\u89e3\u6790\u72b6\u6001\u6d41\u8f6c\u548c\u8be6\u60c5\u67e5\u770b\u3002',
  all: '\u5168\u90e8',
  tech: '\u6280\u672f',
  ops: '\u8fd0\u8425',
  product: '\u4ea7\u54c1',
  upload: '\u4e0a\u4f20\u6587\u6863',
  note: '\u6587\u6863\u4f1a\u4f9d\u6b21\u7ecf\u8fc7\u4e0a\u4f20\u4e2d\u3001\u89e3\u6790\u4e2d\u3001\u5df2\u5165\u5e93\u4e09\u4e2a\u9636\u6bb5\u3002',
  delete: '\u5220\u9664',
  emptyTitle: '\u6682\u65e0\u6587\u6863',
  emptyDesc: '\u8bf7\u4e0a\u4f20\u6587\u4ef6\uff0c\u6216\u5207\u6362\u5230\u5176\u4ed6\u5206\u7c7b\u67e5\u770b\u3002'
};

const categoryOptions: (DocumentCategory | typeof text.all)[] = [text.all, 'HR', text.tech, text.ops, text.product];

const statusTone = {
  uploading: 'warning',
  parsing: 'info',
  active: 'success',
  failed: 'danger'
} as const;

export function KnowledgePage() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<DocumentCategory | typeof text.all>(text.all);

  const load = async (selectedCategory = category) => {
    setLoading(true);
    const res = await api.listDocuments(selectedCategory === text.all ? undefined : { category: selectedCategory });
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('file', file);
    form.append('title', file.name.replace(/\.[^.]+$/, ''));
    form.append('category', category === text.all ? text.tech : category);

    await api.uploadDocument(form);
    await load();
    e.target.value = '';
  };

  const onDelete = async (id: string) => {
    await api.deleteDocument(id);
    await load();
  };

  return (
    <section className="page-stack">
      <PageHeader
        title={text.title}
        description={text.desc}
        actions={
          <label className="secondary-button">
            {text.upload}
            <input type="file" hidden accept=".pdf,.doc,.docx,.md" onChange={onUpload} />
          </label>
        }
      />

      <div className="toolbar">
        <div className="segmented">
          {categoryOptions.map((item) => (
            <button
              key={item}
              className={`segment${category === item ? ' active' : ''}`}
              onClick={() => {
                setCategory(item);
                load(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="toolbar-note">{text.note}</div>
      </div>

      {loading ? (
        <div className="skeleton-grid">
          {Array.from({ length: 3 }).map((_, index) => <div key={index} className="skeleton-card" />)}
        </div>
      ) : items.length ? (
        <div className="doc-grid">
          {items.map((item) => (
            <article key={item.id} className="doc-card">
              <div className="doc-head">
                <div>
                  <Link to={`/knowledge/${item.id}`} className="doc-title">{item.title}</Link>
                  <div className="doc-meta">{item.category} · {item.type} · {item.uploadTime}</div>
                </div>
                <StatusBadge tone={statusTone[item.status]}>{documentStatusLabels[item.status]}</StatusBadge>
              </div>
              <div className="doc-summary">{item.summary}</div>
              <div className="doc-tags">
                {item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <div className="doc-foot">
                <span>{item.uploader}</span>
                <span>{item.size}</span>
                <button className="danger-link" onClick={() => onDelete(item.id)}>{text.delete}</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title={text.emptyTitle} description={text.emptyDesc} />
      )}
    </section>
  );
}
