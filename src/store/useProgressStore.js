import { create } from 'zustand';

const useProgressStore = create((set, get) => ({
  progress: {},
  certificates: [],

  updateProgress: (langId, topicId, data) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [langId]: {
          ...state.progress[langId],
          [topicId]: {
            ...(state.progress[langId]?.[topicId] || {}),
            ...data,
            topicId, // ✅ important for tracking
          },
        },
      },
    })),

  addCertificate: (cert) =>
    set((state) => ({
      certificates: [...state.certificates, cert],
    })),

  loadProgress: (langId, data) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [langId]: data,
      },
    })),

  getTopicProgress: (langId, topicId) => {
    const state = get();
    return state.progress?.[langId]?.[topicId] || {};
  },

  isTopicCompleted: (langId, topicId) => {
    const state = get();
    return state.progress?.[langId]?.[topicId]?.completed || false;
  },

  isProblemCompleted: (langId, topicId, problemId) => {
    const state = get();
    const completed = state.progress?.[langId]?.[topicId]?.completedProblems || [];
    return completed.includes(problemId);
  },

  // ✅ THIS FIXES YOUR ERROR
  getLanguageProgress: (langId) => {
    const state = get();
    const langProgress = state.progress?.[langId] || {};

    const topics = Object.values(langProgress);

    const completedTopics = topics
      .filter((t) => t?.completed)
      .map((t) => t.topicId || "");

    const totalTopics = topics.length;
    const percentComplete =
      totalTopics > 0
        ? Math.round((completedTopics.length / totalTopics) * 100)
        : 0;

    return {
      completedTopics,
      percentComplete,
    };
  },
}));

export default useProgressStore;