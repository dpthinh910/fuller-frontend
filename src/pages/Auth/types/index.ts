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
