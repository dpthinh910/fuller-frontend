export const API = {
  login: `/auth/login`,
  getUserProfile: `/auth/profile`,
  postEffect: `admin/effects`,
  deleteEffect: (effectId: string) => `admin/effects/${effectId}`,
  getOneEffect: (effectId: string | number | undefined) => `admin/effects/${effectId}`,
  updateEffect: (effectId: string | number) => `admin/effects/${effectId}`,
};
