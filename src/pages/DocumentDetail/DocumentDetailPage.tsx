import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import type { DocumentItem } from '../../types';
import { documentStatusLabels } from '../../utils/labels';

const text = {
  loading: '\u6587\u6863\u52a0\u8f7d\u4e2d...',
  meta: '\u6587\u6863\u5143\u4fe1\u606f',
  uploader: '\u4e0a\u4f20\u8005',
  time: '\u65f6\u95f4',
  category: '\u5206\u7c7b',
  source: '\u6765\u6e90',
  back: '\u8fd4\u56de\u5217\u8868',
  analysis: '\u89e3\u6790\u7ed3\u679c'
};

const statusTone = {
  uploading: 'warning',
  parsing: 'info',
  active: 'success',
  failed: 'danger'
} as const;

export function DocumentDetailPage() {
  const { id } = useParams();
  const [doc, setDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    if (!id) return;
    api.getDocumentDetail(id).then((res) => setDoc(res.data));
  }, [id]);

  if (!doc) return <div className="page-loading">{text.loading}</div>;

  return (
    <section className="page-stack">
      <PageHeader
        title={doc.title}
        description={doc.summary}
        actions={<StatusBadge tone={statusTone[doc.status]}>{documentStatusLabels[doc.status]}</StatusBadge>}
      />

      <div className="detail-layout">
        <div className="panel">
          <div className="panel-title">{text.meta}</div>
          <div className="detail-meta">
            <div>{text.uploader}: {doc.uploader}</div>
            <div>{text.time}: {doc.uploadTime}</div>
            <div>{text.category}: {doc.category}</div>
            <div>{text.source}: {doc.source}</div>
          </div>
          <div className="doc-tags">
            {doc.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <Link to="/knowledge" className="text-link">{text.back}</Link>
        </div>

        <div className="panel">
          <div className="panel-title">{text.analysis}</div>
          <div className="analysis-box">
            {doc.content.map((line, index) => (
              <div key={index} className="analysis-line">{line}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
