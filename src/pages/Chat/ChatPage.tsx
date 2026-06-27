import { useMemo, useState } from 'react';
import { api } from '../../api';
import { chatHistory } from '../../mock/data';
import type { ChatMessage } from '../../types';
import { EmptyState } from '../../components/EmptyState';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';

const text = {
  title: 'AI \u5bf9\u8bdd',
  desc: '\u6309\u7ed3\u8bba\u3001\u4f9d\u636e\u548c\u5f15\u7528\u6765\u6e90\u5c55\u793a\u7ed3\u6784\u5316\u56de\u7b54\u3002',
  user: '\u7528\u6237',
  assistant: 'AI \u52a9\u624b',
  conclusion: '\u7ed3\u8bba',
  reasoning: '\u4f9d\u636e',
  sources: '\u5f15\u7528\u6765\u6e90',
  fallbackSummary: '\u7cfb\u7edf\u5df2\u6839\u636e\u77e5\u8bc6\u5e93\u751f\u6210\u5efa\u8bae\u3002',
  fallbackReasoning: '\u7cfb\u7edf\u4f18\u5148\u5339\u914d\u76f8\u5173\u6587\u6863\u5e76\u6574\u7406\u4e3a\u53ef\u6267\u884c\u7b54\u590d\u3002',
  noSources: '\u6682\u65e0\u5f15\u7528\u6765\u6e90',
  emptyTitle: '\u6682\u65e0\u5bf9\u8bdd',
  emptyDesc: '\u8f93\u5165\u95ee\u9898\u540e\uff0c\u7cfb\u7edf\u4f1a\u8fd4\u56de\u7ed3\u6784\u5316\u7b54\u6848\u548c\u6765\u6e90\u5361\u7247\u3002',
  loading: 'AI \u6b63\u5728\u68c0\u7d22\u77e5\u8bc6\u5e93...',
  placeholder: '\u8bf7\u8f93\u5165\u4f60\u7684\u95ee\u9898',
  send: '\u53d1\u9001'
};

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory.slice());
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const documents = useMemo(() => ['doc-001', 'doc-002', 'doc-004'], []);

  const send = async () => {
    if (!question.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: question,
      createdAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    const res = await api.askChat(userMsg.content, documents);
    setMessages((prev) => [...prev, res.data]);
    setLoading(false);
  };

  return (
    <section className="page-stack">
      <PageHeader title={text.title} description={text.desc} />

      <div className="chat-shell">
        <div className="chat-list">
          {messages.length ? messages.map((msg) => (
            <article key={msg.id} className={`chat-item ${msg.role}`}>
              <div className="chat-head">
                <span className="chat-role">{msg.role === 'user' ? text.user : text.assistant}</span>
                <span className="chat-time">{msg.createdAt}</span>
              </div>
              <div className="chat-content">{msg.content}</div>
              {msg.role === 'assistant' ? (
                <div className="chat-structure">
                  <div className="structure-block">
                    <div className="structure-label">{text.conclusion}</div>
                    <div>{msg.summary || text.fallbackSummary}</div>
                  </div>
                  <div className="structure-block">
                    <div className="structure-label">{text.reasoning}</div>
                    <div>{msg.reasoning || text.fallbackReasoning}</div>
                  </div>
                  <div className="structure-block">
                    <div className="structure-label">{text.sources}</div>
                    <div className="source-stack">
                      {msg.sources?.length ? msg.sources.map((source) => (
                        <div key={`${source.title}-${source.section}`} className="source-card">
                          <div className="source-top">
                            <strong>{source.title}</strong>
                            <StatusBadge tone="info">{source.similarity}%</StatusBadge>
                          </div>
                          <div className="source-sub">{source.section}</div>
                          <p>{source.excerpt}</p>
                          <div className="doc-tags">
                            {source.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                          </div>
                          <div className="source-foot">{source.source}</div>
                        </div>
                      )) : <div className="empty-inline">{text.noSources}</div>}
                    </div>
                  </div>
                </div>
              ) : null}
            </article>
          )) : (
            <EmptyState title={text.emptyTitle} description={text.emptyDesc} />
          )}

          {loading ? <div className="loading-line">{text.loading}</div> : null}
        </div>

        <div className="chat-composer">
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={text.placeholder} />
          <button className="primary-button" onClick={send}>{text.send}</button>
        </div>
      </div>
    </section>
  );
}
