import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { roleLabels } from '../utils/labels';

const text = {
  workspace: '\u5de5\u4f5c\u53f0',
  business: '\u4e1a\u52a1\u6a21\u5757',
  knowledge: '\u77e5\u8bc6\u5e93',
  chat: 'AI \u5bf9\u8bdd',
  ticket: '\u5de5\u5355\u7cfb\u7edf',
  subtitle: '\u4f01\u4e1a\u77e5\u8bc6\u5e93\u4e0e\u5de5\u5355\u5e73\u53f0',
  pageTitle: '\u4f01\u4e1a\u540e\u53f0\u7ba1\u7406',
  pageSubtitle: '\u77e5\u8bc6\u68c0\u7d22\u3001\u667a\u80fd\u95ee\u7b54\u4e0e\u5de5\u5355\u534f\u540c',
  notice: '\u901a\u77e5',
  reminder: '\u63d0\u9192',
  guest: '\u8bbf\u5ba2',
  account: '\u5f53\u524d\u8d26\u53f7',
  notLogin: '\u672a\u767b\u5f55',
  logout: '\u9000\u51fa\u767b\u5f55'
};

const navGroups = [
  {
    title: text.workspace,
    items: [{ to: '/dashboard', label: text.workspace }]
  },
  {
    title: text.business,
    items: [
      { to: '/knowledge', label: text.knowledge },
      { to: '/chat', label: text.chat },
      { to: '/ticket', label: text.ticket }
    ]
  }
];

export function AppLayout() {
  const navigate = useNavigate();
  const [userOpen, setUserOpen] = useState(false);
  const user = storage.getUser();

  useEffect(() => {
    const close = () => setUserOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const logout = () => {
    storage.clearAuth();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand">KnowFlow</div>
          <div className="brand-sub">{text.subtitle}</div>
        </div>
        <div className="nav-groups">
          {navGroups.map((group) => (
            <div key={group.title} className="nav-group">
              <div className="nav-group-title">{group.title}</div>
              <nav className="nav-list">
                {group.items.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div>
            <div className="page-title">{text.pageTitle}</div>
            <div className="page-subtitle">{text.pageSubtitle}</div>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label={text.notice}>{text.notice}</button>
            <button className="icon-button" aria-label={text.reminder}>{text.reminder}</button>
            <div className="user-menu-wrap">
              <button className="user-chip" onClick={(e) => { e.stopPropagation(); setUserOpen((v) => !v); }}>
                <span className="avatar">{user?.name?.slice(0, 1) || 'U'}</span>
                <span>{user?.name || text.guest}</span>
                <span className="chev">v</span>
              </button>
              {userOpen ? (
                <div className="user-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-title">{text.account}</div>
                  <div className="dropdown-line">{user?.department || text.notLogin}</div>
                  <div className="dropdown-line">{user?.role ? roleLabels[user.role] : '-'}</div>
                  <button className="danger-button full-width" onClick={logout}>{text.logout}</button>
                </div>
              ) : null}
            </div>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
