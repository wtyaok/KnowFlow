import axios from 'axios';
import { mockApi } from '../mock';

const sleep = (min = 300, max = 800) =>
  new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

axios.defaults.adapter = async (config) => {
  const url = `${config.baseURL || ''}${config.url || ''}`;
  const method = (config.method || 'get').toLowerCase();

  if (!url.startsWith('/api')) {
    throw new Error(`Unhandled request: ${method.toUpperCase()} ${url}`);
  }

  await sleep();

  const fullUrl = new URL(url, 'http://local.mock');
  const path = fullUrl.pathname.replace('/api', '');
  const queryCategory = fullUrl.searchParams.get('category') || undefined;

  const parseBody = () => {
    if (!config.data) return {};
    if (typeof config.data === 'string') {
      try {
        return JSON.parse(config.data);
      } catch {
        return config.data;
      }
    }
    return config.data;
  };

  const responseData =
    method === 'post' && path === '/login' ? await mockApi.login(parseBody()) :
    method === 'get' && path === '/dashboard' ? await mockApi.getDashboard() :
    method === 'get' && path === '/documents' ? await mockApi.listDocuments(queryCategory ? { category: queryCategory } : undefined) :
    method === 'post' && path === '/documents/upload' ? await mockApi.uploadDocument(config.data as FormData) :
    method === 'delete' && path.startsWith('/documents/') ? await mockApi.deleteDocument(path.split('/').pop() || '') :
    method === 'get' && path.startsWith('/documents/') ? await mockApi.getDocumentDetail(path.split('/').pop() || '') :
    method === 'post' && path === '/chat/ask' ? await mockApi.askChat(parseBody().question, parseBody().documentIds || []) :
    method === 'get' && path === '/tickets' ? await mockApi.listTickets() :
    method === 'post' && path === '/tickets' ? await mockApi.createTicket(parseBody()) :
    method === 'put' && path.startsWith('/tickets/') ? await mockApi.updateTicket(path.split('/').pop() || '', parseBody()) :
    null;

  if (!responseData) {
    throw new Error(`Unhandled mock route: ${method.toUpperCase()} ${path}`);
  }

  return {
    data: responseData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config
  };
};
