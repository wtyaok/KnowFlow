import type { ChatMessage, DashboardStat, DocumentItem, TicketItem, UserInfo } from '../types';

const C = {
  adminName: '\u7cfb\u7edf\u7ba1\u7406\u5458',
  opsDept: '\u5e73\u53f0\u8fd0\u8425\u90e8',
  userName: '\u5f20\u6668',
  supportDept: '\u77e5\u8bc6\u652f\u6301\u90e8',
  tech: '\u6280\u672f',
  ops: '\u8fd0\u8425',
  product: '\u4ea7\u54c1'
};

export const mockUserList: Record<string, { password: string; user: UserInfo }> = {
  admin: {
    password: 'admin123',
    user: { id: 'u-1', name: C.adminName, role: 'admin', department: C.opsDept }
  },
  user: {
    password: 'user123',
    user: { id: 'u-2', name: C.userName, role: 'user', department: C.supportDept }
  }
};

export const dashboardStats: DashboardStat[] = [
  { label: '\u6587\u6863\u603b\u6570', value: '128', delta: '+12%' },
  { label: 'AI \u95ee\u7b54', value: '864', delta: '+18%' },
  { label: '\u5de5\u5355\u603b\u6570', value: '42', delta: '+6%' },
  { label: '\u5f85\u5904\u7406', value: '7', delta: '-2' }
];

export const trendPoints = [32, 42, 38, 54, 58, 49, 67];

export const documents: DocumentItem[] = [
  {
    id: 'doc-001',
    title: '\u65b0\u5458\u5de5\u5165\u804c\u624b\u518c',
    type: 'PDF',
    category: 'HR',
    size: '2.4MB',
    uploader: '\u4eba\u4e8b\u90e8',
    uploadTime: '2026-06-26 09:15',
    status: 'active',
    summary: '\u8986\u76d6\u5165\u804c\u6d41\u7a0b\u3001\u6743\u9650\u5f00\u901a\u4e0e\u5e38\u89c1\u95ee\u9898\u3002',
    content: ['\u5165\u804c\u5f53\u5929\u9700\u5b8c\u6210\u8d26\u53f7\u521d\u59cb\u5316\u3002', '\u8bd5\u7528\u671f\u4e3a\u4e09\u4e2a\u6708\u3002', '\u8bbe\u5907\u7533\u8bf7\u8bf7\u8d70\u5de5\u5355\u6d41\u7a0b\u3002'],
    source: 'HR \u624b\u518c 2026',
    tags: ['\u5165\u804c', 'HR', '\u6d41\u7a0b']
  },
  {
    id: 'doc-002',
    title: '\u7cfb\u7edf\u63a5\u5165\u8bf4\u660e',
    type: 'Word',
    category: C.tech,
    size: '1.1MB',
    uploader: '\u5e73\u53f0\u7ec4',
    uploadTime: '2026-06-25 16:40',
    status: 'active',
    summary: '\u8bf4\u660e\u767b\u5f55\u65b9\u5f0f\u3001\u63a5\u5165\u5165\u53e3\u4e0e\u6743\u9650\u7533\u8bf7\u8def\u5f84\u3002',
    content: ['\u7edf\u4e00\u767b\u5f55\u540e\u53ef\u8bbf\u95ee\u77e5\u8bc6\u5e93\u4e0e\u5de5\u5355\u7cfb\u7edf\u3002', '\u5916\u90e8\u7cfb\u7edf\u901a\u8fc7\u5ba1\u6279\u540e\u5206\u914d\u8bbf\u95ee\u6743\u9650\u3002', '\u5f02\u5e38\u767b\u5f55\u8bf7\u8054\u7cfb\u7ba1\u7406\u5458\u3002'],
    source: '\u5e73\u53f0\u63a5\u5165\u6307\u5357',
    tags: ['\u767b\u5f55', '\u6743\u9650', '\u63a5\u5165']
  },
  {
    id: 'doc-003',
    title: '\u57f9\u8bad\u6750\u6599\u8349\u7a3f',
    type: 'Markdown',
    category: C.ops,
    size: '680KB',
    uploader: '\u57f9\u8bad\u7ec4',
    uploadTime: '2026-06-27 11:10',
    status: 'parsing',
    summary: '\u6b63\u5728\u89e3\u6790\u7ae0\u8282\u7ed3\u6784\uff0c\u5b8c\u6210\u540e\u5c06\u81ea\u52a8\u5165\u5e93\u3002',
    content: ['\u7b2c\u4e00\u7ae0\uff1a\u4ea7\u54c1\u6982\u89c8', '\u7b2c\u4e8c\u7ae0\uff1a\u64cd\u4f5c\u6b65\u9aa4', '\u7b2c\u4e09\u7ae0\uff1a\u5e38\u89c1\u6545\u969c'],
    source: '\u57f9\u8bad\u7b14\u8bb0',
    tags: ['\u57f9\u8bad', '\u89e3\u6790\u4e2d', '\u77e5\u8bc6\u5e93']
  },
  {
    id: 'doc-004',
    title: '\u4ea7\u54c1\u53d1\u5e03\u5468\u62a5',
    type: 'PDF',
    category: C.product,
    size: '940KB',
    uploader: '\u4ea7\u54c1\u90e8',
    uploadTime: '2026-06-24 18:30',
    status: 'failed',
    summary: '\u4e0a\u4f20\u6821\u9a8c\u5931\u8d25\uff0c\u9700\u8981\u91cd\u65b0\u786e\u8ba4\u9644\u4ef6\u5b8c\u6574\u6027\u3002',
    content: ['\u7b2c 12 \u9875\u7f3a\u5c11\u56fe\u8868\u3002', '\u9644\u4ef6\u7b7e\u540d\u6821\u9a8c\u5931\u8d25\u3002', '\u8bf7\u91cd\u65b0\u4e0a\u4f20\u5b8c\u6574\u7248\u672c\u3002'],
    source: '\u53d1\u5e03\u5468\u62a5',
    tags: ['\u5468\u62a5', '\u4ea7\u54c1', '\u5931\u8d25']
  }
];

export const chatHistory: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: '\u4f60\u597d\uff0c\u6211\u53ef\u4ee5\u5e2e\u4f60\u5feb\u901f\u5b9a\u4f4d\u6587\u6863\u548c\u6d41\u7a0b\u3002',
    createdAt: '09:20',
    summary: '\u5efa\u8bae\u5148\u67e5\u770b\u6d41\u7a0b\u6587\u6863\uff0c\u518d\u786e\u8ba4\u6743\u9650\u8bf4\u660e\u3002',
    reasoning: '\u7cfb\u7edf\u5339\u914d\u5230\u4e86\u4e0e\u5165\u804c\u548c\u63a5\u5165\u6700\u76f8\u5173\u7684\u8d44\u6599\u3002',
    sources: [
      {
        title: '\u65b0\u5458\u5de5\u5165\u804c\u624b\u518c',
        section: '\u8bbe\u5907\u7533\u8bf7',
        excerpt: '\u8bbe\u5907\u7533\u8bf7\u8bf7\u8d70\u5de5\u5355\u6d41\u7a0b\u3002',
        source: 'HR \u624b\u518c 2026',
        similarity: 91,
        tags: ['HR', '\u5de5\u5355']
      },
      {
        title: '\u7cfb\u7edf\u63a5\u5165\u8bf4\u660e',
        section: '\u6743\u9650\u7533\u8bf7',
        excerpt: '\u5916\u90e8\u7cfb\u7edf\u901a\u8fc7\u5ba1\u6279\u540e\u5206\u914d\u8bbf\u95ee\u6743\u9650\u3002',
        source: '\u5e73\u53f0\u63a5\u5165\u6307\u5357',
        similarity: 84,
        tags: ['\u6280\u672f', '\u6743\u9650']
      }
    ]
  }
];

export const tickets: TicketItem[] = [
  {
    id: 'tk-1001',
    title: '\u7533\u8bf7\u65b0\u7b14\u8bb0\u672c\u7535\u8111',
    requester: '\u5f20\u6668',
    assignee: '\u674e\u5de5',
    status: 'processing',
    priority: 'high',
    createdAt: '2026-06-26 10:00',
    updatedAt: '2026-06-27 09:10',
    detail: '\u7528\u4e8e\u5165\u804c\u540e\u5f00\u53d1\u73af\u5883\u914d\u7f6e\u3002',
    history: [
      { id: 'h1', actor: '\u5f20\u6668', action: '\u63d0\u4ea4', note: '\u521b\u5efa\u8bbe\u5907\u7533\u8bf7\u5de5\u5355', at: '2026-06-26 10:00' },
      { id: 'h2', actor: '\u674e\u5de5', action: '\u53d7\u7406', note: '\u786e\u8ba4\u5e93\u5b58\u5e76\u5b89\u6392\u5ba1\u6279', at: '2026-06-26 13:20' }
    ]
  },
  {
    id: 'tk-1002',
    title: '\u77e5\u8bc6\u5e93\u8bbf\u95ee\u5f02\u5e38',
    requester: '\u738b\u654f',
    assignee: '\u7ba1\u7406\u5458',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2026-06-25 14:20',
    updatedAt: '2026-06-26 08:30',
    detail: '\u65e0\u6cd5\u67e5\u770b\u67d0\u4e9b\u90e8\u95e8\u6587\u6863\u3002',
    history: [
      { id: 'h1', actor: '\u738b\u654f', action: '\u63d0\u4ea4', note: '\u53cd\u9988\u6743\u9650\u4e0d\u8db3', at: '2026-06-25 14:20' },
      { id: 'h2', actor: '\u7ba1\u7406\u5458', action: '\u5904\u7406', note: '\u5df2\u8865\u5145\u77e5\u8bc6\u5e93\u8bbf\u95ee\u6743\u9650', at: '2026-06-26 08:30' }
    ]
  },
  {
    id: 'tk-1003',
    title: '\u63d0\u4ea4\u5de5\u5355\u540e\u65e0\u901a\u77e5',
    requester: '\u8d75\u78ca',
    assignee: '\u5f85\u5206\u914d',
    status: 'pending',
    priority: 'low',
    createdAt: '2026-06-27 08:45',
    updatedAt: '2026-06-27 08:45',
    detail: '\u5e0c\u671b\u5de5\u5355\u521b\u5efa\u540e\u53ef\u4ee5\u6536\u5230\u90ae\u4ef6\u63d0\u9192\u3002',
    history: [
      { id: 'h1', actor: '\u8d75\u78ca', action: '\u63d0\u4ea4', note: '\u8bf7\u6c42\u589e\u52a0\u901a\u77e5\u63d0\u9192', at: '2026-06-27 08:45' }
    ]
  }
];
