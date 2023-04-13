import { JwtPayload } from 'jwt-decode';

export interface IPage {
  title: string;
  description: string;
  content: string;
  slug: string;
}

export interface IGetPageResponse {
  message: string;
  data: IPage;
}

export interface IGetPagesResponse {
  message: string;
  data: IPage[];
}

export interface ILoginResponse {
  token: string;
}

export interface ILoginBody {
  username: string;
  password: string;
}

export interface IPayload extends JwtPayload {
  username: string;
}

export interface IVerifyTokenResponse {
  message: string;
  payload: IPayload;
}
