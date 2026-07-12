export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  token: string;
  user: User;
}
