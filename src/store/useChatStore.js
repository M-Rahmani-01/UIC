import { create } from 'zustand'

const useChatStore = create((set) => ({
  messages: [],
  isOpen: false,
  isLoading: false,

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...message,
    }],
  })),

  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

  openChat: () => set({ isOpen: true }),

  closeChat: () => set({ isOpen: false }),

  setLoading: (isLoading) => set({ isLoading }),

  clearMessages: () => set({ messages: [] }),

  setMessages: (messages) => set({ messages }),
}))

export default useChatStore