import { Navigate, Route, Routes } from 'react-router-dom';
import { storage } from './utils/storage';
import { AppLayout } from './layouts/AppLayout';
import { LoginPage } from './pages/Login/LoginPage';
import { KnowledgePage } from './pages/Knowledge/KnowledgePage';
import { DocumentDetailPage } from './pages/DocumentDetail/DocumentDetailPage';
import { ChatPage } from './pages/Chat/ChatPage';
import { TicketPage } from './pages/Ticket/TicketPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';

function Protected({ children }: { children: JSX.Element }) {
  if (!storage.getToken()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Protected><AppLayout /></Protected>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="knowledge/:id" element={<DocumentDetailPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="ticket" element={<TicketPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
