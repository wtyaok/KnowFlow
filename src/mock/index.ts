import type { ChatMessage, DocumentItem, LoginPayload, TicketHistoryItem, TicketItem } from '../types';
import { chatHistory, dashboardStats, documents, mockUserList, tickets, trendPoints } from './data';

const text = {
  invalidLogin: '\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef',
  untitledDoc: '\u672a\u547d\u540d\u6587\u6863',
  tech: '\u6280\u672f',
  currentUser: '\u5f53\u524d\u7528\u6237',
  uploadSummary: '\u6587\u4ef6\u5df2\u4e0a\u4f20\uff0c\u7cfb\u7edf\u6b63\u5728\u89e3\u6790\u5185\u5bb9\u3002',
  uploadQueue: '\u4e0a\u4f20\u5b8c\u6210\uff0c\u6b63\u5728\u8fdb\u5165\u89e3\u6790\u961f\u5217\u3002',
  uploadApi: '\u4e0a\u4f20\u63a5\u53e3',
  uploadingTag: '\u4e0a\u4f20\u4e2d',
  parsingSummary: '\u89e3\u6790\u7ed3\u6784\u5df2\u5b8c\u6210\uff0c\u6b63\u5728\u63d0\u53d6\u5173\u952e\u4fe1\u606f\u3002',
  activeSummary: '\u6587\u6863\u5df2\u5b8c\u6210\u89e3\u6790\u5e76\u8fdb\u5165\u77e5\u8bc6\u5e93\u3002',
  parsedLine1: '\u5df2\u8bc6\u522b\u6807\u9898\u7ed3\u6784\u3002',
  parsedLine2: '\u5df2\u63d0\u53d6\u5173\u952e\u6bb5\u843d\u3002',
  parsedLine3: '\u5df2\u5efa\u7acb\u68c0\u7d22\u7d22\u5f15\u3002',
  docMissing: '\u6587\u6863\u4e0d\u5b58\u5728',
  overview: '\u6982\u89c8',
  answerSummary: '\u5efa\u8bae\u5148\u6309\u6807\u51c6\u6d41\u7a0b\u5904\u7406\uff0c\u518d\u67e5\u770b\u6743\u9650\u4e0e\u7533\u8bf7\u8bb0\u5f55\u3002',
  answerReasoning: '\u7cfb\u7edf\u5339\u914d\u4e86\u6700\u76f8\u5173\u7684\u77e5\u8bc6\u6761\u76ee\uff0c\u5e76\u5c06\u7b54\u6848\u62c6\u6210\u7ed3\u8bba\u3001\u4f9d\u636e\u548c\u6765\u6e90\u3002',
  newTicket: '\u65b0\u5de5\u5355',
  unassigned: '\u5f85\u5206\u914d',
  submit: '\u63d0\u4ea4',
  createdTicket: '\u521b\u5efa\u5de5\u5355',
  ticketMissing: '\u5de5\u5355\u4e0d\u5b58\u5728',
  admin: '\u7ba1\u7406\u5458',
  update: '\u66f4\u65b0'
};

const wait = (min = 300, max = 800) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const ok = <T,>(data: T, message = 'ok') => ({ code: 0, message, data });
const fail = (message: string, code = 1) => ({ code, message, data: null });
const formatTime = () => new Date().toISOString().slice(0, 16).replace('T', ' ');

const buildTicketHistory = (actor: string, action: string, note: string): TicketHistoryItem => ({
  id: `h-${Date.now()}`,
  actor,
  action,
  note,
  at: formatTime()
});

export const mockApi = {
  async login(payload: LoginPayload) {
    await wait();
    const record = mockUserList[payload.username];
    if (!record || record.password !== payload.password) return fail(text.invalidLogin);
    const token = `token_${record.user.role}_${record.user.id}`;
    return ok({ token, user: record.user });
  },

  async getDashboard() {
    await wait();
    return ok({ stats: dashboardStats, trendPoints });
  },

  async listDocuments(params?: { category?: string }) {
    await wait();
    const list = params?.category ? documents.filter((item) => item.category === params.category) : documents;
    return ok(list);
  },

  async uploadDocument(formData: FormData) {
    await wait();
    const file = formData.get('file') as File | null;
    const title = (formData.get('title') as string) || file?.name || text.untitledDoc;
    const category = (formData.get('category') as DocumentItem['category']) || text.tech;
    const type = file?.name.endsWith('.md') ? 'Markdown' : file?.name.endsWith('.doc') || file?.name.endsWith('.docx') ? 'Word' : 'PDF';

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title,
      type,
      category,
      size: file ? `${Math.max(1, Math.round(file.size / 1024))}KB` : '512KB',
      uploader: text.currentUser,
      uploadTime: formatTime(),
      status: 'uploading',
      summary: text.uploadSummary,
      content: [text.uploadQueue],
      source: text.uploadApi,
      tags: [category, text.uploadingTag]
    };

    documents.unshift(newDoc);

    setTimeout(() => {
      newDoc.status = 'parsing';
      newDoc.summary = text.parsingSummary;
    }, 1000);

    setTimeout(() => {
      newDoc.status = 'active';
      newDoc.summary = text.activeSummary;
      newDoc.content = [text.parsedLine1, text.parsedLine2, text.parsedLine3];
    }, 2500);

    return ok(newDoc);
  },

  async deleteDocument(id: string) {
    await wait();
    const index = documents.findIndex((item) => item.id === id);
    if (index >= 0) documents.splice(index, 1);
    return ok(null);
  },

  async getDocumentDetail(id: string) {
    await wait(200, 500);
    const item = documents.find((doc) => doc.id === id);
    if (!item) return fail(text.docMissing);
    return ok(item);
  },

  async askChat(question: string, documentIds: string[]) {
    await wait();
    const pickedDocs = documents.filter((doc) => (documentIds.length ? documentIds.includes(doc.id) : true)).slice(0, 3);
    const response: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `\u6211\u67e5\u5230 ${pickedDocs.length} \u4efd\u76f8\u5173\u8d44\u6599\u3002\u9488\u5bf9\u201c${question}\u201d\uff0c\u5efa\u8bae\u5148\u6309\u6d41\u7a0b\u6587\u6863\u6267\u884c\uff0c\u518d\u786e\u8ba4\u7533\u8bf7\u8def\u5f84\u3002`,
      createdAt: formatTime(),
      summary: text.answerSummary,
      reasoning: text.answerReasoning,
      sources: pickedDocs.map((doc) => ({
        title: doc.title,
        section: doc.content[0] || text.overview,
        excerpt: doc.summary,
        source: doc.source,
        similarity: doc.id === 'doc-001' ? 91 : doc.id === 'doc-002' ? 84 : 73,
        tags: doc.tags
      }))
    };
    chatHistory.push(response);
    return ok(response);
  },

  async listTickets() {
    await wait();
    return ok(tickets);
  },

  async createTicket(payload: Partial<TicketItem>) {
    await wait();
    const item: TicketItem = {
      id: `tk-${Date.now()}`,
      title: payload.title || text.newTicket,
      requester: payload.requester || text.currentUser,
      assignee: payload.assignee || text.unassigned,
      status: 'pending',
      priority: (payload.priority || 'medium') as TicketItem['priority'],
      createdAt: formatTime(),
      updatedAt: formatTime(),
      detail: payload.detail || '',
      history: [buildTicketHistory(payload.requester || text.currentUser, text.submit, text.createdTicket)]
    };
    tickets.unshift(item);
    return ok(item);
  },

  async updateTicket(id: string, payload: Partial<TicketItem>) {
    await wait();
    const item = tickets.find((ticket) => ticket.id === id);
    if (!item) return fail(text.ticketMissing);

    if (payload.status) item.status = payload.status;
    if (payload.assignee) item.assignee = payload.assignee;
    if (payload.priority) item.priority = payload.priority;
    item.updatedAt = formatTime();
    item.history.unshift(
      buildTicketHistory(
        payload.assignee || text.admin,
        payload.status || text.update,
        `\u72b6\u6001\u66f4\u65b0\u4e3a ${payload.status || item.status}`
      )
    );
    return ok(item);
  }
};
