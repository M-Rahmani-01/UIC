// src/pages/ProblemPage.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp, Lightbulb, Play, Send, RotateCcw } from "lucide-react";
import  useAuthStore from "../store/useAuthStore";
import { useProgressStore } from "../store/useProgressStore";
import { saveProgress, saveCertificate } from "../firebase/helpers";
import CodeEditor from "../components/editor/CodeEditor";
import OutputTerminal from "../components/editor/OutputTerminal";
import LanguageSelector from "../components/editor/LanguageSelector";
import ChatWindow from "../components/chatbot/ChatWindow";
import CertificateModal from "../components/certificate/CertificateModal";
import FeedbackModal from "../components/ui/FeedbackModal";
import ConfettiBlast from "../components/ui/ConfettiBlast";
import TimerBanner from "../components/learning/TimerBanner";
import SpeakerButton from "../components/ui/SpeakerButton";
import { languages } from "../data/languages";
import { getTopicData } from "../data/topics";

export default function ProblemPage() {
  const { lang, topic, prob } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { updateProgress, addCertificate } = useProgressStore();

  const [problem, setProblem] = useState(null);
  const [langConfig, setLangConfig] = useState(null);
  const [code, setCode] = useState("// Write your solution here\n");
  const [selectedLang, setSelectedLang] = useState(lang || "javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [certData, setCertData] = useState(null);

  useEffect(() => {
    const topicData = getTopicData(lang);
    const lc = languages.find((l) => l.id === lang);
    setLangConfig(lc);

    if (topicData && topicData[topic]) {
      const p = topicData[topic].problems?.find((pr) => pr.id === prob);
      setProblem(p || null);
    }
  }, [lang, topic, prob]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 800));
    setOutput(`// Simulated Output\n> Running ${selectedLang} code...\n\nHello! Your code ran successfully.\n(Note: Full code execution requires a backend. Submit to check correctness.)`);
    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (!code.trim() || code.trim() === "// Write your solution here") {
      toast.error("Please write some code first!");
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

    const correct = code.toLowerCase().includes(problem?.expectedKeyword || "");
    setIsSubmitting(false);

    if (correct || attempts >= 1) {
      // treat as correct after hint usage for demo
      handleCorrectAnswer();
    } else {
      setAttempts((a) => a + 1);
      const newAttempts = attempts + 1;
      toast.error(`Incorrect. ${2 - newAttempts} attempt(s) remaining.`);
      if (newAttempts >= 2) {
        setShowTimer(true);
        toast("Study time! Watch the videos below and try again.", { icon: "📚" });
      }
    }
  };

  const handleCorrectAnswer = async () => {
    setIsCorrect(true);
    setShowConfetti(true);
    toast.success("Correct! 🎉 Certificate earned!");

    const cert = {
      problemId: prob,
      topicId: topic,
      langId: lang,
      earnedAt: new Date().toISOString(),
      uniqueId: `UIC-${lang.toUpperCase()}-${Date.now()}`,
      userName: user?.displayName || user?.email?.split("@")[0] || "Coder",
      problemTitle: problem?.title || prob,
    };
    setCertData(cert);

    if (user) {
      await saveCertificate(user.uid, cert);
      await saveProgress(user.uid, lang, topic, 4);
      addCertificate(cert);
      updateProgress(lang, topic, 4);
    }

    setTimeout(() => {
      setShowConfetti(false);
      setShowCertificate(true);
    }, 2500);
  };

  const handleTimerEnd = () => {
    toast("Time's up! Let's review from scratch. You got this! 🚀", { icon: "💪" });
    navigate(`/learn/${lang}/${topic}`);
  };

  const handleTryAgain = () => {
    setAttempts(0);
    setShowTimer(false);
    setOutput("");
    toast.success("Welcome back! Give it another shot 💪");
  };

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Problem not found</h2>
          <button onClick={() => navigate(-1)} className="text-orange-400 underline">Go back</button>
        </div>
      </div>
    );
  }

  const accentColor = langConfig?.theme?.accent || "#f97316";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {showConfetti && <ConfettiBlast />}

      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition-colors">
            ← Back
          </button>
          <span className="text-gray-600">|</span>
          <span className="text-sm text-gray-400">{lang?.toUpperCase()} / {topic} /</span>
          <span className="font-semibold text-white">{problem.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            problem.difficulty === "Easy" ? "bg-green-900 text-green-300" :
            problem.difficulty === "Medium" ? "bg-yellow-900 text-yellow-300" :
            "bg-red-900 text-red-300"
          }`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      {showTimer && (
        <TimerBanner
          duration={60 * 60}
          onEnd={handleTimerEnd}
          onTryAgain={handleTryAgain}
          youtubeLinks={problem.youtubeLinks || []}
        />
      )}

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">

        {/* LEFT PANEL — Problem Details */}
        <div className="w-full lg:w-[45%] overflow-y-auto border-r border-gray-800 p-6 space-y-6">

          {/* Title + Speaker */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{problem.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>⏱ {problem.timeLimit} mins</span>
                <span>•</span>
                <span style={{ color: accentColor }}>{problem.difficulty}</span>
              </div>
            </div>
            <SpeakerButton text={`${problem.title}. ${problem.description}`} />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Problem Statement</h3>
            <p className="text-gray-300 leading-relaxed">{problem.description}</p>
          </div>

          {/* Examples */}
          {problem.examples && (
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-3">Examples</h3>
              <div className="space-y-3">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Input</span>
                      <pre className="text-green-400 font-mono text-sm mt-1">{ex.input}</pre>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Output</span>
                      <pre className="text-orange-400 font-mono text-sm mt-1">{ex.output}</pre>
                    </div>
                    {ex.explanation && (
                      <div className="mt-2 text-sm text-gray-400">{ex.explanation}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Constraints */}
          {problem.constraints && (
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Constraints</h3>
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <p className="text-gray-300 font-mono text-sm">{problem.constraints}</p>
              </div>
            </div>
          )}

          {/* Hint */}
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
            >
              <Lightbulb size={18} />
              {showHint ? "Hide Hint" : "Show Hint"}
              {showHint ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-yellow-900/20 border border-yellow-800 rounded-xl p-4"
                >
                  <p className="text-yellow-200 text-sm leading-relaxed">💡 {problem.hint}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Chatbot */}
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
              🤖 Ask UIC Bot
            </h3>
            <ChatWindow
              embedded
              systemContext={`You are UIC Bot, a friendly coding tutor for complete beginners on United Indian Coders platform. The student is solving: "${problem.title}" in ${lang}. Guide them with hints, never give direct answers. Use simple language. Encourage them. Hinglish is okay.`}
            />
          </div>
        </div>

        {/* RIGHT PANEL — Code Editor */}
        <div className="w-full lg:w-[55%] flex flex-col">

          {/* Editor Toolbar */}
          <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <LanguageSelector value={selectedLang} onChange={setSelectedLang} />
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <Play size={14} />
                {isRunning ? "Running..." : "Run Code"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isSubmitting || isCorrect}
                className="submit-button flex items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <Send size={14} />
                {isSubmitting ? "Checking..." : isCorrect ? "✅ Solved!" : "Submit Answer"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCode("// Write your solution here\n")}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-xl text-sm transition-colors"
              >
                <RotateCcw size={14} />
              </motion.button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor value={code} onChange={setCode} language={selectedLang} />
          </div>

          {/* Output Terminal */}
          <div className="h-48 border-t border-gray-800">
            <OutputTerminal output={output} isLoading={isRunning} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCertificate && (
          <CertificateModal
            certData={certData}
            onClose={() => {
              setShowCertificate(false);
              setTimeout(() => setShowFeedback(true), 400);
            }}
          />
        )}
        {showFeedback && (
          <FeedbackModal
            problemId={prob}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}