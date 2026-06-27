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

export const api = {
  login(payload: LoginPayload) {
    return http.post<ApiResponse<{ token: string; user: UserInfo }>>('/login', payload);
  },
  getDashboard() {
    return http.get<ApiResponse<{ stats: DashboardStat[]; trendPoints: number[] }>>('/dashboard');
  },
  listDocuments(params?: { category?: string }) {
    const query = params?.category ? `?category=${encodeURIComponent(params.category)}` : '';
    return http.get<ApiResponse<DocumentItem[]>>(`/documents${query}`);
  },
  uploadDocument(formData: FormData) {
    return http.post<ApiResponse<DocumentItem>>('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  deleteDocument(id: string) {
    return http.delete<ApiResponse<null>>(`/documents/${id}`);
  },
  getDocumentDetail(id: string) {
    return http.get<ApiResponse<DocumentItem>>(`/documents/${id}`);
  },
  askChat(question: string, documentIds: string[]) {
    return http.post<ApiResponse<ChatMessage>>('/chat/ask', { question, documentIds });
  },
  listTickets() {
    return http.get<ApiResponse<TicketItem[]>>('/tickets');
  },
  createTicket(payload: Partial<TicketItem>) {
    return http.post<ApiResponse<TicketItem>>('/tickets', payload);
  },
  updateTicket(id: string, payload: Partial<TicketItem>) {
    return http.put<ApiResponse<TicketItem>>(`/tickets/${id}`, payload);
  }
};
