import create from 'zustand';

type RoleDetectorStore = {
  role: string | null;
  setRole: (role: string) => void;
};

export const useLanguageDetectorStore = create<RoleDetectorStore>(set => ({
  role: window.localStorage.getItem('dashboard_role') as string,
  setRole: (role: string) =>
    set(() => ({
      role: role,
    })),
}));
