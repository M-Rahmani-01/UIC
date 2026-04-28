import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  setLoading: (loading) => set({ loading }),
}));

export default useAuthStore; // ✅ MUST BE DEFAULT EXPORT