"use client";

import { useState, useEffect } from "react";
import { X, Coffee } from "lucide-react";

export default function DonationPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user has dismissed the popup recently
    const dismissed = localStorage.getItem("chai_donated_dismissed");
    if (!dismissed) {
      // Small 5-second delay before showing so it's not jarring on page load
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    // Don't show again once they dismiss it or click support
    localStorage.setItem("chai_donated_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div 
      className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 md:max-w-sm bg-[var(--card)]/95 dark:bg-[var(--card)]/90 backdrop-blur-xl border border-[var(--amber)]/30 shadow-2xl rounded-2xl p-4 md:p-5 z-50 transition-all duration-500 ease-out translate-y-0 opacity-100"
      style={{ animation: 'slideUp 0.5s ease-out' }}
    >
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      
      <button 
        onClick={handleDismiss} 
        className="absolute top-3 right-3 text-[var(--muted)] hover:text-[var(--fg)] transition-colors bg-[var(--bg2)] hover:bg-[var(--border)] rounded-full p-1"
        aria-label="Close"
      >
        <X size={16} />
      </button>
      
      <div className="flex items-start gap-4 pr-4">
        <div className="bg-[var(--bg2)] text-[var(--amber)] p-3 rounded-2xl flex-shrink-0 shadow-inner mt-1">
          <Coffee size={24} />
        </div>
        <div>
          <h3 className="font-bold text-[var(--fg)] text-base mb-1 tracking-tight">Buy me a Chai? ☕</h3>
          <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed font-medium">
            Help this broke dude maintain the server bandwidth so everyone can keep enjoying the ambience!
          </p>
          <a 
            href="https://www.buymeachai.in/kattanchaya" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleDismiss}
            className="inline-flex bg-gradient-to-r from-[var(--amber)] to-[#B45309] dark:to-[#D97706] text-white font-bold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            Support the Server
          </a>
        </div>
      </div>
    </div>
  );
}
