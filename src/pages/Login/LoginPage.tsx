import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import { storage } from '../../utils/storage';

const text = {
  fail: '\u767b\u5f55\u5931\u8d25',
  intro: '\u7edf\u4e00\u7ba1\u7406\u4f01\u4e1a\u77e5\u8bc6\u3001AI \u95ee\u7b54\u548c\u5de5\u5355\u534f\u540c\u3002',
  username: '\u7528\u6237\u540d',
  password: '\u5bc6\u7801',
  loading: '\u767b\u5f55\u4e2d...',
  submit: '\u767b\u5f55',
  kicker: '\u4f01\u4e1a\u77e5\u8bc6\u4e2d\u53f0',
  secure: '\u5185\u90e8\u534f\u540c\u7cfb\u7edf',
  title: '\u6b22\u8fce\u56de\u5230 KnowFlow',
  subtitle: '\u8bf7\u4f7f\u7528\u6f14\u793a\u8d26\u53f7\u8fdb\u5165\u5de5\u4f5c\u53f0\u3002',
  demo: '\u6f14\u793a\u8d26\u53f7',
  admin: '\u7ba1\u7406\u5458',
  normal: '\u666e\u901a\u7528\u6237',
  knowledge: '\u77e5\u8bc6\u68c0\u7d22',
  qa: 'AI \u95ee\u7b54',
  ticket: '\u5de5\u5355\u534f\u540c'
};

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.login({ username, password });
      if (res.code !== 0) throw new Error(res.message);
      storage.setToken(res.data.token);
      storage.setUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : text.fail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-brand-panel" aria-label="KnowFlow">
          <div className="login-kicker">{text.kicker}</div>
          <div className="login-logo-row">
            <div className="login-logo">K</div>
            <div>
              <h1>KnowFlow</h1>
              <p>{text.intro}</p>
            </div>
          </div>
          <div className="login-feature-grid">
            <div className="login-feature-card">
              <strong>128</strong>
              <span>{text.knowledge}</span>
            </div>
            <div className="login-feature-card">
              <strong>864</strong>
              <span>{text.qa}</span>
            </div>
            <div className="login-feature-card">
              <strong>42</strong>
              <span>{text.ticket}</span>
            </div>
          </div>
        </section>

        <form className="login-panel" onSubmit={submit}>
          <div className="login-panel-head">
            <div className="login-kicker">{text.secure}</div>
            <h2>{text.title}</h2>
            <p>{text.subtitle}</p>
          </div>

          <label className="login-field">
            <span>{text.username}</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label className="login-field">
            <span>{text.password}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          {error ? <div className="form-error">{error}</div> : null}

          <button className="primary-button login-submit" disabled={loading}>
            {loading ? text.loading : text.submit}
          </button>

          <div className="login-hint">
            <span>{text.demo}</span>
            <div className="login-demo-list">
              <strong>{text.admin}</strong> admin / admin123
              <strong>{text.normal}</strong> user / user123
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
