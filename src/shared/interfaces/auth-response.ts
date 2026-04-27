import {Role} from '@enums/role';

export interface AuthResponse {
  id: number;
  role: Role;
  token: string;
  refreshToken: string;
}
