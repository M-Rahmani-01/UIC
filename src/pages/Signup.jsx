import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-3xl font-bold text-white">Join UIC Free!</h1>
          <p className="text-gray-400 mt-2">Start your coding journey today — it's 100% free</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <SignupForm />
          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;