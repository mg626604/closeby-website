import React, { useState } from 'react';
import { ShieldCheck, User, KeyRound, ArrowRight, Moon, Sun } from 'lucide-react';

export default function Login({ onLogin, isDarkMode, setIsDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both Email and Password.');
      return;
    }
    
    // Simulate network authentication delay for demo
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Proceed to dashboard
    }, 1200);
  };

  const handleSimAutoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Proceed to dashboard
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-4 font-sans relative overflow-hidden transition-colors duration-300">
      
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-6 right-6 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors z-20 shadow-md"
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-300/80 dark:border-slate-700/80 rounded-3xl shadow-2xl p-8 relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="h-28 flex items-center justify-center mb-4">
             <img src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"} alt="CloseBY Logo" className="h-full w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">CloseBY</h1>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Empathetic Family Caregiver Portal</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold px-4 py-2.5 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address / Caregiver ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="w-4 h-4 text-slate-500 dark:text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="caregiver@family.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="w-4 h-4 text-slate-500 dark:text-slate-500" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>
            <div className="text-right mt-1.5">
              <a href="#" className="text-[11px] font-semibold text-red-400 hover:text-red-300">Forgot Password?</a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold text-sm px-4 py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Or for this Demo</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <button
          onClick={handleSimAutoLogin}
          disabled={isLoading}
          className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-400 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-sm px-4 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Quick Login (Demo Mode)</span>
        </button>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-500 font-medium">
        Secure SIM ICCID Authentication enabled.
      </div>
    </div>
  );
}
