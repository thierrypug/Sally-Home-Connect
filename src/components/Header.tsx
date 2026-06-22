/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Mail, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenCheckout: (planName: string, price: number) => void;
  currentPage: string;
  onChangePage: (page: string) => void;
}

export default function Header({ onOpenCheckout, currentPage, onChangePage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Brand Logo - inspired by the image */}
        <button 
          onClick={() => onChangePage('accueil')} 
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <svg 
            viewBox="0 0 160 160" 
            className="w-10 h-10 drop-shadow-[0_0_8px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-transform shrink-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="logo-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="logo-platform-contour" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="logo-house-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0052d4" />
              </linearGradient>
              <linearGradient id="logo-tree-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ff87" />
                <stop offset="100%" stopColor="#60efff" />
              </linearGradient>
              <linearGradient id="logo-hill-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff87" />
                <stop offset="50%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#0052d4" />
              </linearGradient>
              <linearGradient id="logo-arc-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#7f00ff" />
              </linearGradient>
            </defs>
            <ellipse cx="80" cy="115" rx="55" ry="12" fill="#00f2fe" opacity="0.4" filter="url(#logo-glow-filter)" />
            <ellipse cx="80" cy="115" rx="58" ry="14" fill="#030712" stroke="url(#logo-platform-contour)" strokeWidth="2.5" />
            <ellipse cx="80" cy="115" rx="54" ry="11" fill="none" stroke="#00f2fe" strokeWidth="1.2" opacity="0.6" />
            <path d="M 38,102 A 43,43 0 1,1 106,53" fill="none" stroke="url(#logo-arc-grad)" strokeWidth="4.5" strokeLinecap="round" opacity="0.9" />
            <path d="M 52,100 L 52,65 L 68,48 L 84,65 L 84,100 Z" fill="url(#logo-house-grad)" />
            <rect x="63" y="78" width="10" height="22" fill="#ffffff" rx="1.5" />
            <line x1="94" y1="102" x2="94" y2="65" stroke="#00f2fe" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="94" cy="55" r="14" fill="url(#logo-tree-grad)" />
            <path d="M 34,103 Q 80,78 126,103 Q 80,128 34,103 Z" fill="url(#logo-hill-grad)" />
          </svg>
          <div className="text-left">
            <span className="font-display font-bold text-slate-100 text-lg leading-none tracking-tight block">
              Sally <span className="text-indigo-400">Home</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase leading-none block">
              Connect
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => onChangePage('accueil')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'accueil' ? 'text-white font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-indigo-400 after:rounded-full' : 'hover:text-white'}`}
          >
            Accueil
          </button>
          <button 
            onClick={() => onChangePage('fonctionnalites')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'fonctionnalites' ? 'text-white font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-indigo-400 after:rounded-full' : 'hover:text-white'}`}
          >
            Fonctionnalités
          </button>
          <button 
            onClick={() => onChangePage('solutions')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'solutions' ? 'text-white font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-indigo-400 after:rounded-full' : 'hover:text-white'}`}
          >
            Solutions & Console
          </button>
          <button 
            onClick={() => onChangePage('accessibilite')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'accessibilite' ? 'text-cyan-300 font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-cyan-400 after:rounded-full' : 'hover:text-white'}`}
          >
            Accessibilité
          </button>
          <button 
            onClick={() => onChangePage('seniors')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'seniors' ? 'text-purple-300 font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-purple-400 after:rounded-full' : 'hover:text-white'}`}
          >
            Seniors
          </button>
          <button 
            onClick={() => onChangePage('compatibilite')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'compatibilite' ? 'text-white font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-indigo-400 after:rounded-full' : 'hover:text-white'}`}
          >
            Compatibilité
          </button>
          <button 
            onClick={() => onChangePage('propos')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'propos' ? 'text-white font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-indigo-400 after:rounded-full' : 'hover:text-white'}`}
          >
            À propos
          </button>
          <button 
            onClick={() => onChangePage('contact')} 
            className={`transition-colors cursor-pointer focus:outline-none ${currentPage === 'contact' ? 'text-indigo-400 font-semibold relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-indigo-400 after:rounded-full' : 'hover:text-white'}`}
          >
            Contact
          </button>
        </nav>

        {/* Action Button & Shopping Cart */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400 font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Serveur Local Activé</span>
          </div>
          
          <button 
            onClick={() => onChangePage('contact')}
            className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/15 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Obtenir Sally</span>
          </button>
        </div>

        {/* Mobile menu triggers */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={() => onChangePage('contact')}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white cursor-pointer"
          >
            <Mail className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 border-b border-slate-900 py-6 px-6 shadow-2xl flex flex-col gap-5 text-left font-medium z-40 backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <button 
            onClick={() => {
              onChangePage('accueil');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 border-b border-slate-900/50 ${currentPage === 'accueil' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            Accueil
          </button>
          <button 
            onClick={() => {
              onChangePage('fonctionnalites');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 border-b border-slate-900/50 ${currentPage === 'fonctionnalites' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            Fonctionnalités
          </button>
          <button 
            onClick={() => {
              onChangePage('solutions');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 border-b border-slate-900/50 ${currentPage === 'solutions' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            Solutions & Console
          </button>
          <button 
            onClick={() => {
              onChangePage('accessibilite');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 border-b border-slate-900/50 ${currentPage === 'accessibilite' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            Accessibilité
          </button>
          <button 
            onClick={() => {
              onChangePage('seniors');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 border-b border-slate-900/50 ${currentPage === 'seniors' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            Seniors
          </button>
          <button 
            onClick={() => {
              onChangePage('compatibilite');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 border-b border-slate-900/50 ${currentPage === 'compatibilite' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            Compatibilité
          </button>
          <button 
            onClick={() => {
              onChangePage('propos');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 border-b border-slate-900/50 ${currentPage === 'propos' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            À propos
          </button>
          <button 
            onClick={() => {
              onChangePage('contact');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left text-base py-1 ${currentPage === 'contact' ? 'text-indigo-400 font-bold' : 'text-slate-300'}`}
          >
            Contact
          </button>

          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onChangePage('contact');
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/10 mt-2 cursor-pointer"
          >
            <span>Obtenir Sally</span>
          </button>
        </div>
      )}
    </header>
  );
}
