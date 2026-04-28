import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-8xl mb-6">🚧</div>
        <h1 className="text-7xl font-black text-orange-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Looks like you wandered off the learning path! This page doesn't exist. Let's get you back on track.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            🏠 Go Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors border border-gray-700"
          >
            ← Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}