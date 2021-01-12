import axios, { AxiosInstance } from 'axios';

const JWT_KEY = '@onhomycash/jwt';

class AxiosClient {
  private baseURL: string;
  private token: string;
  client: AxiosInstance;

  constructor(baseURL: string) {
    this.token = localStorage.getItem(JWT_KEY);
    this.baseURL = baseURL;

    this.client = axios.create({
      baseURL,
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : null,
    });

    this.client.interceptors.response.use(null, (error) => {
      if (error.response.status === 401 && window.location.pathname !== '/auth/login') {
        window.location.replace('/auth/login');
      }
    });
  }

  setToken(token: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem(JWT_KEY, token);
  }
}

export default new AxiosClient(process.env.API_URL);
