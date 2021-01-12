import axios, { AxiosInstance } from 'axios';

const JWT_KEY = '@onhomycash/jwt';

class AxiosClient {
  private baseURL: string;
  axios: AxiosInstance;

  constructor(baseURL: string) {
    const token = localStorage.getItem(JWT_KEY);
    this.baseURL = baseURL;

    this.axios = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : null,
    });

    this.axios.interceptors.response.use(null, (error) => {
      if (error.response.status === 401 && window.location.pathname !== '/auth/login') {
        window.location.replace('/auth/login');
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
}

export default new AxiosClient(process.env.API_URL);
