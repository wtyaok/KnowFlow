const TOKEN_KEY = 'knowflow_token';
const USER_KEY = 'knowflow_user';
const AUTH_EVENT = 'knowflow-auth-change';

export const storage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    window.dispatchEvent(new Event(AUTH_EVENT));
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  },
  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setUser(user: unknown) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(AUTH_EVENT));
  },
  clearUser() {
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  },
  clearAuth() {
    this.clearToken();
    this.clearUser();
  }
};

export { AUTH_EVENT as authEventName };
