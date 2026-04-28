// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Award, BookOpen, Flame, LogOut, RefreshCw, Download, User } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useProgressStore from "../store/useProgressStore";
import { getCertificates } from "../firebase/helpers";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { generateCertificate } from "../utils/generateCertificate";
import { languages } from "../data/languages";
import BadgeCard from "../components/ui/BadgeCard";
import ProgressBar from "../components/ui/ProgressBar";
import { achievements } from "../data/achievements";

export default function Profile() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const { progress } = useProgressStore();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user?.uid) {
      getCertificates(user.uid).then((c) => {
        setCerts(c || []);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleRestartTour = () => {
    localStorage.removeItem("uic_tour_done");
    navigate("/");
    toast.success("Tour restarted! Head to home page.");
  };

  const totalCompleted = Object.values(progress).reduce((sum, lang) => {
    return sum + (lang.completedTopics?.length || 0);
  }, 0);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Coder";
  const initials = displayName.slice(0, 2).toUpperCase();

  const tabs = ["overview", "certificates", "achievements", "settings"];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Profile Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-orange-950 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl font-bold shadow-xl">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold text-white">{displayName}</h1>
              <p className="text-gray-400 mt-1">{user?.email}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                <div className="flex items-center gap-2 text-orange-400">
                  <Flame size={18} />
                  <span className="font-semibold">7 day streak</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <BookOpen size={18} />
                  <span className="font-semibold">{totalCompleted} topics done</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Award size={18} />
                  <span className="font-semibold">{certs.length} certificates</span>
                </div>
              </div>
            </div>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-800 hover:bg-red-900 border border-gray-700 hover:border-red-700 text-gray-300 hover:text-red-300 px-4 py-2 rounded-xl transition-all text-sm"
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-1 border-b border-gray-800 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize rounded-t-lg transition-colors ${
                activeTab === tab
                  ? "text-orange-400 border-b-2 border-orange-400 bg-orange-900/10"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Language Progress</h2>
                    {languages.length === 0 ? (
                      <p className="text-gray-500">No progress yet. Start learning!</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {languages.map((lang) => {
                          const langProgress = progress[lang.id];
                          const percent = langProgress?.percentComplete || 0;
                          return (
                            <motion.div
                              key={lang.id}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => navigate(`/learn/${lang.id}`)}
                              className="cursor-pointer bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-600 transition-all"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{lang.logo}</span>
                                  <div>
                                    <p className="font-semibold text-white">{lang.name}</p>
                                    <p className="text-xs text-gray-500">{lang.tagline}</p>
                                  </div>
                                </div>
                                <span className="text-orange-400 font-bold text-lg">{percent}%</span>
                              </div>
                              <ProgressBar value={percent} color={lang.theme?.accent || "#f97316"} />
                              <p className="text-xs text-gray-500 mt-2">
                                {langProgress?.completedTopics?.length || 0} topics completed
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CERTIFICATES TAB */}
              {activeTab === "certificates" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Your Certificates</h2>
                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-gray-800 rounded-2xl animate-pulse" />
                      ))}
                    </div>
                  ) : certs.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">🏆</div>
                      <p className="text-gray-400 text-lg">No certificates yet.</p>
                      <p className="text-gray-600 text-sm mt-1">Solve problems to earn certificates!</p>
                      <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                      >
                        Start Learning
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {certs.map((cert, i) => (
                        <motion.div
                          key={cert.uniqueId || i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-gray-900 border border-yellow-800/40 rounded-2xl p-5 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-bl-full" />
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-bold text-yellow-400 text-lg">🏅 {cert.problemTitle || cert.problemId}</p>
                              <p className="text-gray-400 text-sm mt-1 capitalize">{cert.langId} — {cert.topicId}</p>
                              <p className="text-gray-600 text-xs mt-2">
                                {cert.earnedAt ? new Date(cert.earnedAt).toLocaleDateString("en-IN") : ""}
                              </p>
                              <p className="text-gray-700 text-xs font-mono mt-1">{cert.uniqueId}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => generateCertificate(cert)}
                              className="flex items-center gap-1 text-xs bg-yellow-900/40 hover:bg-yellow-900/60 border border-yellow-700 text-yellow-300 px-3 py-2 rounded-xl transition-all"
                            >
                              <Download size={12} />
                              PDF
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ACHIEVEMENTS TAB */}
              {activeTab === "achievements" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {achievements.map((achievement, i) => {
                      const unlocked =
                        achievement.condition === "first_cert"
                          ? certs.length >= 1
                          : achievement.condition === "five_certs"
                          ? certs.length >= 5
                          : achievement.condition === "first_topic"
                          ? totalCompleted >= 1
                          : false;
                      return (
                        <BadgeCard
                          key={achievement.id}
                          achievement={achievement}
                          unlocked={unlocked}
                          index={i}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === "settings" && (
                <div className="max-w-lg space-y-6">
                  <h2 className="text-xl font-bold text-white mb-4">Settings</h2>

                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-gray-200 flex items-center gap-2">
                      <User size={18} /> Account
                    </h3>
                    <div className="text-sm text-gray-400 space-y-2">
                      <p><span className="text-gray-500">Name:</span> {displayName}</p>
                      <p><span className="text-gray-500">Email:</span> {user?.email}</p>
                      <p><span className="text-gray-500">Member since:</span> {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("en-IN") : "—"}</p>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-gray-200">Onboarding</h3>
                    <p className="text-sm text-gray-500">Restart the guided tour to learn how the platform works.</p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleRestartTour}
                      className="flex items-center gap-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-600 text-orange-300 px-5 py-2 rounded-xl transition-all text-sm font-medium"
                    >
                      <RefreshCw size={16} />
                      Restart Tour
                    </motion.button>
                  </div>

                  <div className="bg-gray-900 border border-red-900/40 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-red-400">Danger Zone</h3>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-300 px-5 py-2 rounded-xl transition-all text-sm font-medium"
                    >
                      <LogOut size={16} />
                      Logout
                    </motion.button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}