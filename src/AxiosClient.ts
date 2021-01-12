import axios, { AxiosInstance } from 'axios';

class AxiosClient {
  private baseURL: string;
  client: AxiosInstance;

  constructor(baseURL: string) {
    const token = localStorage.getItem('@onhomycash/jwt');

    this.baseURL = baseURL;

    this.client = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : null,
    });
  }

  setToken(token: string) {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem('@ohnomycash/jwt', token);
  }
}

export default new AxiosClient(process.env.API_URL);
