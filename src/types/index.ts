export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type UserRole = 'user' | 'admin';

export type UserInfo = {
  id: string;
  name: string;
  role: UserRole;
  department: string;
};

export type DocumentCategory = 'HR' | '\u6280\u672f' | '\u8fd0\u8425' | '\u4ea7\u54c1';
export type DocumentStatus = 'uploading' | 'parsing' | 'active' | 'failed';

export type DocumentItem = {
  id: string;
  title: string;
  type: 'PDF' | 'Word' | 'Markdown';
  category: DocumentCategory;
  size: string;
  uploader: string;
  uploadTime: string;
  status: DocumentStatus;
  summary: string;
  content: string[];
  source: string;
  tags: string[];
};

export type ChatRole = 'user' | 'assistant';

export type ChatSource = {
  title: string;
  section: string;
  excerpt: string;
  source: string;
  similarity: number;
  tags: string[];
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  summary?: string;
  reasoning?: string;
  sources?: ChatSource[];
};

export type TicketStatus = 'pending' | 'processing' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketHistoryItem = {
  id: string;
  actor: string;
  action: string;
  note: string;
  at: string;
};

export type TicketItem = {
  id: string;
  title: string;
  requester: string;
  assignee: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  detail: string;
  history: TicketHistoryItem[];
};

export type DashboardStat = {
  label: string;
  value: string;
  delta: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};
