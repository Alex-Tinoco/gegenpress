import { JWTPayload } from "jose";

export interface Account {
  name: string;
  email: string;
  password: string;
  memory: boolean | undefined;
}

export interface Errors {
  [key: string]: string | undefined;
}

export interface Payload extends JWTPayload{
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  memory: boolean;
}
