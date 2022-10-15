
export interface AuthInfo {
    uid?: string;
    user?: string;
    email?: string;
    name?: string;
    exp: number;
    groups?: string[];
    avatarUrl: string;
  }
  