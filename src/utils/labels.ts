import type { DocumentCategory, DocumentStatus, TicketPriority, TicketStatus, UserRole } from '../types';

export const categoryLabels: Record<DocumentCategory, string> = {
  HR: 'HR',
  '\u6280\u672f': '\u6280\u672f',
  '\u8fd0\u8425': '\u8fd0\u8425',
  '\u4ea7\u54c1': '\u4ea7\u54c1'
};

export const documentStatusLabels: Record<DocumentStatus, string> = {
  uploading: '\u4e0a\u4f20\u4e2d',
  parsing: '\u89e3\u6790\u4e2d',
  active: '\u5df2\u5165\u5e93',
  failed: '\u5931\u8d25'
};

export const ticketStatusLabels: Record<TicketStatus, string> = {
  pending: '\u5f85\u5904\u7406',
  processing: '\u5904\u7406\u4e2d',
  resolved: '\u5df2\u89e3\u51b3',
  closed: '\u5df2\u5173\u95ed'
};

export const ticketPriorityLabels: Record<TicketPriority, string> = {
  low: '\u4f4e',
  medium: '\u4e2d',
  high: '\u9ad8',
  urgent: '\u7d27\u6025'
};

export const roleLabels: Record<UserRole, string> = {
  admin: '\u7ba1\u7406\u5458',
  user: '\u666e\u901a\u7528\u6237'
};
