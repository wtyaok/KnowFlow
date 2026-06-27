import { http } from './http';
import type {
  ApiResponse,
  ChatMessage,
  DashboardStat,
  DocumentItem,
  LoginPayload,
  TicketItem,
  UserInfo
} from '../types';

function responseOf<T>(request: Promise<unknown>) {
  return request as Promise<ApiResponse<T>>;
}

export const api = {
  login(payload: LoginPayload) {
    return responseOf<{ token: string; user: UserInfo }>(http.post('/login', payload));
  },
  getDashboard() {
    return responseOf<{ stats: DashboardStat[]; trendPoints: number[] }>(http.get('/dashboard'));
  },
  listDocuments(params?: { category?: string }) {
    const query = params?.category ? `?category=${encodeURIComponent(params.category)}` : '';
    return responseOf<DocumentItem[]>(http.get(`/documents${query}`));
  },
  uploadDocument(formData: FormData) {
    return responseOf<DocumentItem>(http.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }));
  },
  deleteDocument(id: string) {
    return responseOf<null>(http.delete(`/documents/${id}`));
  },
  getDocumentDetail(id: string) {
    return responseOf<DocumentItem>(http.get(`/documents/${id}`));
  },
  askChat(question: string, documentIds: string[]) {
    return responseOf<ChatMessage>(http.post('/chat/ask', { question, documentIds }));
  },
  listTickets() {
    return responseOf<TicketItem[]>(http.get('/tickets'));
  },
  createTicket(payload: Partial<TicketItem>) {
    return responseOf<TicketItem>(http.post('/tickets', payload));
  },
  updateTicket(id: string, payload: Partial<TicketItem>) {
    return responseOf<TicketItem>(http.put(`/tickets/${id}`, payload));
  }
};
