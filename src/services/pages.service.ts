import axios, { Axios, AxiosResponse } from 'axios';

import { IGetPageResponse, IGetPagesResponse, IPage } from '../types';

class PagesService {
  private client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://page-manager-server-production.up.railway.app/',
    });
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');

      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
  }

  async fetchPage(slug: string): Promise<IGetPageResponse> {
    const { data } = await this.client.get(`/pages/${slug}`);

    return data;
  }

  async fetchPages(): Promise<IGetPagesResponse> {
    const { data } = await this.client.get('/pages');

    return data;
  }

  async deletePage(slug: string): Promise<AxiosResponse> {
    const response = await this.client.delete(`/pages/${slug}`);

    return response;
  }

  async createPage(body: IPage): Promise<AxiosResponse> {
    const response = await this.client.post('/pages', body);

    return response;
  }
}

export default new PagesService();
