import create from 'zustand';

type RoleDetectorStore = {
  role: string | null;
  setRole: (role: string) => void;
};

export const useRoleDetectorStore = create<RoleDetectorStore>(set => ({
  role: JSON.parse(window.localStorage.getItem('dashboard_role') as string),
  setRole: (role: string) =>
    set(() => ({
      role: role,
    })),
}));
