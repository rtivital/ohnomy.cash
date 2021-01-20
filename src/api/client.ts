import axios, { AxiosInstance } from 'axios';
import { ScheduledRequest } from './types';

const JWT_KEY = '@onhomycash/jwt';

const METHODS = {
  create: 'POST',
  update: 'PUT',
  delete: 'DELETE',
} as const;

class Client {
  private cache: Record<string, any>;
  private baseURL: string;
  axios: AxiosInstance;

  constructor(baseURL: string) {
    this.cache = {};
    this.baseURL = baseURL;

    const token = localStorage.getItem(JWT_KEY);

    this.axios = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : null,
    });

    this.axios.interceptors.response.use(null, (error) => {
      if (error.response.status === 401 && window.location.pathname !== '/auth/login') {
        window.location.replace('/auth/login');
      } else {
        throw error;
      }
    });
  }

  setToken(token: string) {
    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem(JWT_KEY, token);
  }

  async refetch<T>(url: string): Promise<T> {
    return this.axios.get<T>(url).then((response) => {
      this.cache[url] = response.data;
      return response.data;
    });
  }

  async get<T>(url: string): Promise<T> {
    if (url in this.cache) {
      return this.cache[url];
    }

    return this.refetch<T>(url);
  }

  updateCache(url: string, value: any) {
    if (url in this.cache) {
      this.cache[url] = typeof value === 'function' ? value(this.cache[url]) : value;
    }
  }

  sendScheduledRequest = (request: ScheduledRequest) =>
    this.axios({
      url: request.url,
      method: METHODS[request.type],
      data: request.payload,
    });

  async sendScheduledRequests(requests: ScheduledRequest[], onFinish: () => void) {
    await Promise.all(requests.map(this.sendScheduledRequest));
    onFinish();
  }
}

export default new Client(process.env.API_URL);
