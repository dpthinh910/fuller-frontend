import Cookie from 'universal-cookie';

const prefix = 'dashboard_';
const cookie = new Cookie();

export const storage = {
  getToken: () => {
    try {
      JSON.parse(window.localStorage.getItem(`${prefix}token`) as string);
    } catch (e) {
      return null;
    }
    return JSON.parse(window.localStorage.getItem(`${prefix}token`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${prefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${prefix}token`);
  },
  setRole: (role: string) => {
    window.localStorage.setItem(`${prefix}role`, JSON.stringify(role));
  },
  getRole: () => {
    try {
      JSON.parse(window.localStorage.getItem(`${prefix}role`) as string);
    } catch (e) {
      return null;
    }
  },
  clearRole: () => {
    window.localStorage.removeItem(`${prefix}role`);
  },
};

export const cookieService = {
  getCookies: (key: string) => {
    return cookie.get(key);
  },
  setCookies: (key: string, value: string, options?: object) => {
    cookie.set(key, value, options);
  },
  removeCookies: (key: string) => {
    cookie.remove(key);
  },
};
