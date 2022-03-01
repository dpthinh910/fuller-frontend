export type AuthUser = {
  _id: string;
  username: string;
  email?: string;
  role: string;
};

export type UserResponse = {
  user: AuthUser;
  token: string;
};

export type GetProfile = {
  statusCode: number;
  result: string;
  data: AuthUser;
  errors: null | Array<{ statusCode: number; error: string }>;
};

