import axios, { Axios } from 'axios';

import { ILoginBody, ILoginResponse, IVerifyTokenResponse } from '../types';

class AuthService {
  private client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://page-manager-server-production.up.railway.app/',
    });
  }

  async login(body: ILoginBody): Promise<ILoginResponse> {
    const { data } = await this.client.post('/login', body);

    return data;
  }

  async verifyToken(token: string): Promise<IVerifyTokenResponse> {
    const { data } = await this.client.get('/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

export default new AuthService();
