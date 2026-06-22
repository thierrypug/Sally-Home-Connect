/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  CloudOff, 
  Wallet, 
  Sliders, 
  EyeOff, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  Unlock, 
  Quote, 
  Fingerprint, 
  Zap, 
  Layers, 
  RefreshCw, 
  ChevronRight, 
  Lightbulb, 
  Compass, 
  Thermometer, 
  Lock, 
  Check, 
  ArrowRight,
  Cpu,
  HardDrive,
  Terminal,
  Network,
  Wifi,
  AlertTriangle,
  FileText
} from "lucide-react";
import HERO_HOUSE_IMAGE from '../assets/images/sally_hero_house_new_1780924228781.png';

interface AProposProps {
  onChangePage?: (page: string) => void;
}

export default function APropos({ onChangePage }: AProposProps) {
  const [activeChapter, setActiveChapter] = useState<"ch1" | "ch2" | "ch3">("ch1");
  
  // Left: Limits items
  const limits = [
    {
      icon: <CloudOff className="w-5 h-5 text-indigo-400" />,
      title: "Dépendance au cloud",
      desc: "Vos données stockées sur des serveurs distants, hors de votre contrôle."
    },
    {
      icon: <Wallet className="w-5 h-5 text-indigo-400" />,
      title: "Abonnements coûteux",
      desc: "Des frais récurrents qui s'accumulent sans jamais vous appartenir."
    },
    {
      icon: <Sliders className="w-5 h-5 text-indigo-400" />,
      title: "Complexité inutile",
      desc: "Des interfaces techniques, conçues pour des experts, pas pour le quotidien."
    },
    {
      icon: <EyeOff className="w-5 h-5 text-indigo-400" />,
      title: "Manque de confidentialité",
      desc: "Vos habitudes et votre vie privée exploitées à des fins commerciales."
    }
  ];

  // Middle: Solution items
  const solutions = [
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: "100% locale, 100% privée",
      desc: "Vos données restent chez vous, sur votre réseau local. Aucun cloud, aucune dépendance."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      title: "Achat unique",
      desc: "Payez une fois, utilisez à vie. Zéro abonnement, zéro surprise."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      title: "Simple et intuitive",
      desc: "Une interface pensée pour tous, accessible en quelques clics."
    },
    {
      icon: <Unlock className="w-5 h-5 text-cyan-400" />,
      title: "Sécurité et liberté",
      desc: "Vous gardez le contrôle total sur votre maison et vos informations."
    }
  ];

  // Bottom Trust Bar
  const pillars = [
    {
      icon: <Fingerprint className="w-5 h-5 text-indigo-400" />,
      title: "Protection des données",
      desc: "Vos données restent chez vous"
    },
    {
      icon: <Zap className="w-5 h-5 text-indigo-400" />,
      title: "Performance locale",
      desc: "Rapide et fiable même sans Internet"
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: "Compatibilité maximale",
      desc: "Zigbee, EnOcean, Wi-Fi, MQTT..."
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-indigo-400" />,
      title: "Évolutif et durable",
      desc: "Mises à jour régulières et gratuites"
    }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#030712] pb-16 text-white text-left">
      {/* Absolute top grid flow overlays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-150 bg-indigo-900/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 w-full relative z-10 flex flex-col gap-12">
        
        {/* TOP HERO ROW: Text Content + Interactive Fiber-connected House Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Top Left: Heading */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                Notre Mission
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white mt-4">
                Pourquoi Sally <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-indigo-300 to-purple-400 font-black filter drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]">
                  existe.
                </span>
              </h1>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              <p>
                La domotique devrait simplifier votre vie, pas la compliquer.
              </p>
              <p>
                Nous avons créé <span className="text-white font-medium">Sally Home Connect</span> pour offrir une solution <span className="text-cyan-400 font-medium">locale</span>, <span className="text-cyan-400 font-medium">sécurisée</span> et <span className="text-emerald-400 font-medium">accessible à tous</span>.
              </p>
            </div>

            {onChangePage && (
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onChangePage("contact")}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                >
                  Nous contacter <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Top Right: Interactive connected network map */}
          <div className="lg:col-span-7 relative w-full aspect-4/3 rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950/45 shadow-[0_0_50px_rgba(59,130,246,0.15)] group">
            
            {/* Dusk Villa background - brightened to beautiful rendering */}
            <img 
              src={HERO_HOUSE_IMAGE} 
              alt="Villa de luxe avec Sally Connect" 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.8] saturate-[1.3] select-none transition-transform duration-[6s] group-hover:scale-[1.02]"
            />

            {/* Glowing neon background mesh overlay */}
            <div className="absolute inset-0 bg-radial-at-b from-indigo-950/30 via-transparent to-transparent pointer-events-none" />

            {/* Connected Animated SVGs Nodes (Lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              
              {/* Pulse definitions for glowing effects */}
              <defs>
                <linearGradient id="glow-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="glow-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d946ef" stopOpacity="1" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.4" />
                </linearGradient>
                <filter id="svg-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing animated fiber cords */}
              {/* Cord 1: to Lightbulb */}
              <path d="M 50 78 C 45 60, 25 40, 22 25" fill="none" stroke="url(#glow-cyan)" strokeWidth="1.2" strokeDasharray="3, 3" filter="url(#svg-neon-glow)" className="animate-[dash_25s_linear_infinite]" />
              <path d="M 50 78 C 45 60, 25 40, 22 25" fill="none" stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.6" filter="url(#svg-neon-glow)" />

              {/* Cord 2: to Shutter */}
              <path d="M 50 78 C 50 50, 52 32, 52 17" fill="none" stroke="url(#glow-cyan)" strokeWidth="1.2" strokeDasharray="4, 4" filter="url(#svg-neon-glow)" className="animate-[dash_18s_linear_infinite]" />
              <path d="M 50 78 C 50 50, 52 32, 52 17" fill="none" stroke="#a855f7" strokeWidth="0.6" strokeOpacity="0.6" filter="url(#svg-neon-glow)" />

              {/* Cord 3: to Compass automation */}
              <path d="M 50 78 C 55 60, 72 38, 75 22" fill="none" stroke="url(#glow-purple)" strokeWidth="1.2" strokeDasharray="3, 3" filter="url(#svg-neon-glow)" className="animate-[dash_30s_linear_infinite]" />
              <path d="M 50 78 C 55 60, 72 38, 75 22" fill="none" stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.6" filter="url(#svg-neon-glow)" />

              {/* Cord 4: to Thermometer far-right top */}
              <path d="M 50 78 C 65 72, 85 50, 88 32" fill="none" stroke="url(#glow-cyan)" strokeWidth="1.2" strokeDasharray="5, 5" filter="url(#svg-neon-glow)" className="animate-[dash_22s_linear_infinite]" />
              <path d="M 50 78 C 65 72, 85 50, 88 32" fill="none" stroke="#a855f7" strokeWidth="0.6" strokeOpacity="0.5" filter="url(#svg-neon-glow)" />

              {/* Cord 5: to Lock far-right mid */}
              <path d="M 50 78 C 65 80, 88 70, 91 50" fill="none" stroke="url(#glow-purple)" strokeWidth="1.2" strokeDasharray="3, 3" filter="url(#svg-neon-glow)" className="animate-[dash_15s_linear_infinite]" />
              <path d="M 50 78 C 65 80, 88 70, 91 50" fill="none" stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.6" filter="url(#svg-neon-glow)" />

            </svg>

            {/* Pulsing floating nodes */}
            {/* Node 1: Bulbe (Lighting) */}
            <div className="absolute top-[21%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-20 group/node cursor-pointer">
              <div className="absolute inset-0 bg-cyan-400/25 rounded-full blur-md animate-ping" />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 transition-all duration-300 group-hover/node:bg-cyan-500 group-hover/node:text-black shadow-[0_0_20px_rgba(34,211,238,0.7)] group-hover/node:scale-105">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 filter drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]" />
              </div>
            </div>

            {/* Node 2: Shutter (Volets) */}
            <div className="absolute top-[13%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-20 group/node cursor-pointer">
              <div className="absolute inset-0 bg-indigo-400/25 rounded-full blur-md animate-ping" />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 border-2 border-indigo-400 flex items-center justify-center text-indigo-350 transition-all duration-300 group-hover/node:bg-indigo-500 group-hover/node:text-black shadow-[0_0_20px_rgba(99,102,241,0.7)] group-hover/node:scale-105">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current filter drop-shadow-[0_0_3px_rgba(99,102,241,0.5)]" strokeWidth="2.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="3" y1="15" x2="21" y2="15" />
                  <line x1="9" y1="9" x2="9" y2="21" />
                </svg>
              </div>
            </div>

            {/* Node 3: Automation (Scénarios) */}
            <div className="absolute top-[18%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20 group/node cursor-pointer">
              <div className="absolute inset-0 bg-purple-400/25 rounded-full blur-md animate-ping" />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 border-2 border-purple-400 flex items-center justify-center text-purple-350 transition-all duration-300 group-hover/node:bg-purple-500 group-hover/node:text-black shadow-[0_0_20px_rgba(168,85,247,0.7)] group-hover/node:scale-105">
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 filter drop-shadow-[0_0_3px_rgba(168,85,247,0.5)]" />
              </div>
            </div>

            {/* Node 4: Thermometer (Température) */}
            <div className="absolute top-[28%] left-[88%] -translate-x-1/2 -translate-y-1/2 z-20 group/node cursor-pointer">
              <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-md animate-ping" />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 border-2 border-amber-400 flex items-center justify-center text-amber-350 transition-all duration-300 group-hover/node:bg-amber-500 group-hover/node:text-black shadow-[0_0_20px_rgba(245,158,11,0.7)] group-hover/node:scale-105">
                <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 filter drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]" />
              </div>
            </div>

            {/* Node 5: Lock (Sécurité) */}
            <div className="absolute top-[48%] left-[91%] -translate-x-1/2 -translate-y-1/2 z-20 group/node cursor-pointer">
              <div className="absolute inset-0 bg-emerald-400/25 rounded-full blur-md animate-ping" />
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/90 border-2 border-emerald-400 flex items-center justify-center text-emerald-355 transition-all duration-300 group-hover/node:bg-emerald-500 group-hover/node:text-black shadow-[0_0_20px_rgba(16,185,129,0.7)] group-hover/node:scale-105">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 filter drop-shadow-[0_0_3px_rgba(16,185,129,0.5)]" />
              </div>
            </div>

            {/* Node 6: Radiator / grid controller (Far left/bottom-ish) */}
            <div className="absolute top-[52%] left-[12%] -translate-x-1/2 -translate-y-1/2 z-20 group/node cursor-pointer">
              <div className="absolute inset-0 bg-cyan-400/25 rounded-full blur-md animate-ping" />
              <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-slate-950/90 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 transition-all duration-300 group-hover/node:bg-cyan-500 group-hover/node:text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover/node:scale-105">
                <Sliders className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 filter drop-shadow-[0_0_2px_rgba(6,182,212,0.5)]" />
              </div>
            </div>

            {/* Central Hardware Controller: Sleek 3D Angled Sally Box */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <div className="relative w-28 h-20 sm:w-36 sm:h-24 bg-linear-to-b from-slate-900 via-slate-950 to-indigo-950/40 border-2 border-cyan-400 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:border-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all duration-500 select-none cursor-pointer p-4 group/box hover:scale-105">
                {/* Glow ring inside */}
                <div className="absolute inset-x-2 top-1 h-px bg-linear-to-r from-transparent via-cyan-300 to-transparent opacity-80" />
                
                {/* Embedded Brand Emblem (House icon inside safe circle) */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-1 sm:mb-1.5 transition-all group-hover/box:border-cyan-400 group-hover/box:shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 transition-colors group-hover/box:text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <circle cx="12" cy="13" r="2.5" />
                  </svg>
                </div>

                <div className="text-center">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#f3f4f6] font-extrabold block">
                    SALLY <span className="text-cyan-350 group-hover/box:text-emerald-350 transition-colors">HUB</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* MIDDLE SECTION: Three-column Bento comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
          
          {/* Column A (Left): Limits (Les limites des solutions actuelles) */}
          <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-800 transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                <h2 className="text-xl font-bold tracking-tight text-slate-100">
                  Les limites des solutions actuelles
                </h2>
              </div>

              <div className="space-y-6">
                {limits.map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-left group">
                    <div className="p-2 border border-slate-800/80 rounded-xl bg-slate-900/30 shrink-0 h-fit transition-colors group-hover:border-slate-700">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200 transition-colors group-hover:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop only Chevron helper */}
            <div className="hidden lg:flex justify-end pt-10 text-slate-700">
              <ChevronRight className="w-6 h-6 animate-[bounce-x_1.5s_infinite]" />
            </div>
          </div>

          {/* Column B (Middle, Highlighted): Sally Solution */}
          <div className="lg:col-span-5 bg-linear-to-b from-indigo-950/20 via-slate-950/80 to-slate-950/50 border-2 border-indigo-600 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl shadow-indigo-500/5 hover:border-indigo-500 transition-all">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 border border-indigo-500 text-white text-[9px] font-mono font-extrabold tracking-widest uppercase px-3 py-1 rounded-full shadow-lg shadow-indigo-600/30">
              OPTIMAL
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-6 bg-cyan-400 rounded-full" />
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Notre réponse : <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-emerald-400 to-indigo-400 font-extrabold">Sally Home Connect</span>
                </h2>
              </div>

              <div className="space-y-6">
                {solutions.map((item, idx) => (
                  <div key={idx} className="flex gap-4 text-left group/item">
                    <div className="p-2 border border-cyan-500/20 rounded-xl bg-cyan-950/20 shrink-0 h-fit transition-all duration-300 group-hover/item:border-cyan-400 group-hover/item:shadow-[0_0_8px_rgba(34,211,238,0.2)]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100 transition-colors group-hover/item:text-cyan-300">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900/60 mt-8 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>SOUVERAINETÉ COMPLÈTE</span>
              <span className="text-cyan-400 animate-pulse">● PROTOCOLES SÉCURISÉS</span>
            </div>
          </div>

          {/* Column C (Right): Quote & Maps badge contour */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Upper: Quote Card */}
            <div className="bg-slate-950/30 border border-slate-900 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-800 transition-colors grow">
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-indigo-400/40 shrink-0" strokeWidth={1.5} />
                <p className="text-xs md:text-sm text-slate-350 leading-relaxed font-light italic">
                  "Nous croyons en une domotique éthique, respectueuse de votre vie privée et conçue pour améliorer votre quotidien."
                </p>
              </div>

              <div className="pt-6 border-t border-slate-900 mt-6 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>VALEURS HÉBERGÉES</span>
                <span>ZÉRO CLOUD</span>
              </div>
            </div>

            {/* Lower: France localized blueprint map outline */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 hover:border-slate-800 transition-colors flex flex-col items-center justify-between min-h-55">
              
              {/* French Flag circular icon emblem */}
              <div className="flex items-center gap-3 w-full justify-start">
                <div className="flex rounded-full overflow-hidden w-6 h-6 border border-slate-800 shrink-0 shadow-inner">
                  <div className="bg-blue-600 w-1/3 h-full" />
                  <div className="bg-white w-1/3 h-full" />
                  <div className="bg-red-650 w-1/3 h-full" />
                </div>
                <div className="text-left leading-none">
                  <span className="text-slate-200 text-xs font-semibold block">Conçue en France</span>
                  <span className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mt-0.5 block">avec passion</span>
                </div>
              </div>

              {/* Minimal SVG contour representing France with localized nodes */}
              <div className="relative w-full flex justify-center py-2 h-28 items-center">
                <svg viewBox="0 0 100 100" className="w-27.5 h-27.5 text-indigo-500/20 stroke-current" fill="none" strokeWidth="1">
                  <path d="M 50 15 L 68 18 L 84 27 L 87 47 L 83 64 L 69 84 L 51 86 L 37 82 L 23 62 L 18 49 L 26 27 L 37 17 Z" strokeLinejoin="round" />
                  
                  {/* Nodes & lines within boundaries representing decentralized edge mesh network */}
                  <line x1="50" y1="50" x2="35" y2="40" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.4" />
                  <line x1="50" y1="50" x2="65" y2="55" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.4" />
                  <line x1="50" y1="50" x2="55" y2="70" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.4" />
                  <line x1="50" y1="50" x2="45" y2="30" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.4" />

                  <circle cx="50" cy="50" r="1.5" className="fill-indigo-400 animate-pulse" />
                  <circle cx="35" cy="40" r="1" className="fill-cyan-400" />
                  <circle cx="65" cy="55" r="1" className="fill-purple-400" />
                  <circle cx="55" cy="70" r="1" className="fill-emerald-400" />
                  <circle cx="45" cy="30" r="1" className="fill-blue-400" />
                </svg>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM ROW: Horizontal bar with 4 indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-t border-b border-slate-900 mt-6 bg-slate-950/20 rounded-2xl px-6">
          {pillars.map((pil, idx) => (
            <div key={idx} className="flex gap-4 text-left items-center">
              <div className="p-3 border border-slate-800/80 rounded-xl bg-slate-950 shrink-0 h-fit shadow-md">
                {pil.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-100">{pil.title}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{pil.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE INSTALLATION GUIDE SECTION */}
        <section className="mt-16 space-y-8 text-left pb-16">
          <div className="space-y-4">
            <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#a855f7] bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full inline-block">
              SALLY ACADEMY - GUIDE TECHNIQUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Guide d'installation de <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-400 font-extrabold">Sally Home Connect sur Raspberry Pi</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light max-w-3xl leading-relaxed">
              Devenez totalement souverain en hébergeant votre propre centrale locale d'intelligence domotique. Suivez ces étapes simples pour configurer votre Raspberry Pi avec notre système local 100% privé.
            </p>
          </div>

          {/* Interactive tabs navigation */}
          <div className="flex border-b border-slate-900 overflow-x-auto scroller-hidden gap-2 pb-px select-none">
            {[
              { id: "ch1", label: "Chapitre 1 : Préparation & Installation", icon: <Cpu className="w-4 h-4" /> },
              { id: "ch2", label: "Chapitre 2 : Configuration Réseau", icon: <Network className="w-4 h-4" /> },
              { id: "ch3", label: "Chapitre 3 : Matériel Complémentaire", icon: <Layers className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChapter(tab.id as any)}
                className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer focus:outline-none ${
                  activeChapter === tab.id
                    ? "border-purple-500 text-purple-300 bg-purple-500/5 rounded-t-xl"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-slate-950/40"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: Quick details stats */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-900 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Hébergement Local
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  L'image système fournie configure un système d'exploitation minimaliste et durci, optimisé pour exécuter Sally Home de manière ininterrompue et ultra-sécurisée.
                </p>

                <div className="border-t border-slate-900 pt-4 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Compatibilité :</span>
                    <span className="text-slate-300 font-bold">Raspberry Pi 3 / 4</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Arch :</span>
                    <span className="text-slate-300 font-bold">ARM64 Local OS</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Licence :</span>
                    <span className="text-emerald-400 font-bold">Achat Unique</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Mises à jour :</span>
                    <span className="text-purple-400 font-bold">Gratuites à vie</span>
                  </div>
                </div>
              </div>

              {/* Warning/Danger info box */}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex gap-4 text-left">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-400">Règle de sécurité physique</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                    Ne débranchez jamais l'alimentation pendant le flash ou le premier démarrage. Branchez toujours vos accessoires radio EnOcean ou Zigbee avec le Pi hors tension.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: Steps panels */}
            <div className="lg:col-span-8 bg-slate-950/40 border border-slate-900 rounded-3xl p-6 sm:p-8 hover:border-slate-800/80 transition-colors">
              
              {activeChapter === "ch1" && (
                <div className="space-y-8 animate-fadeIn duration-300">
                  
                  {/* General Material Preparation */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="text-purple-400">●</span> Préparation du matériel
                    </h3>
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      Avant de commencer l'installation de Sally Home Connect, assurez-vous de disposer du matériel suivant :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {[
                        { title: "Un Raspberry Pi 3 ou Raspberry Pi 4", desc: "La base matérielle de votre passerelle locale." },
                        { title: "Une carte microSD compatible", desc: "16 Go min pour Raspberry Pi 3, ou 32 Go min pour un RPi 4." },
                        { title: "Une alimentation adaptée", desc: "Stable pour éviter les baisses de tension." },
                        { title: "Un câble réseau Ethernet", desc: "Pour relier le Pi à votre box Internet ou routeur." },
                        { title: "Une box Internet ou routeur", desc: "Pour la mise en réseau de vos interfaces." },
                        { title: "Un ordinateur sous Windows", desc: "Nécessaire pour préparer la carte microSD d'installation." },
                      ].map((device, index) => (
                        <div key={index} className="flex gap-3 text-left p-3.5 rounded-xl bg-slate-900/40 border border-slate-900">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-bold text-slate-200">{device.title}</span>
                            <span className="block text-[10px] text-slate-450 leading-relaxed font-light mt-0.5">{device.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 1 */}
                  <div className="space-y-3 pt-6 border-t border-slate-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg">Étape 1</span>
                      <h4 className="text-base font-bold text-white">Télécharger Sally Home Connect</h4>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed pl-1 pt-1">
                      Téléchargez l'image système Sally Home Connect depuis le site officiel de support. 
                      Conservez précieusement le fichier téléchargé <span className="text-slate-350 font-bold">(au format .img ou compressé)</span> sur l'ordinateur qui servira à réaliser le flash.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-4 pt-6 border-t border-slate-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg">Étape 2</span>
                      <h4 className="text-base font-bold text-white">Préparer la carte microSD</h4>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed pl-1">
                      Téléchargez et installez le logiciel gratuit <span className="text-white font-semibold">Win32 Disk Imager</span> sur votre ordinateur. Si vous ne connaissez pas son fonctionnement ou ses options, de nombreux tutoriels vidéo et guides détaillés sont facilement disponibles sur Internet.
                    </p>

                    <div className="bg-slate-900/60 rounded-2xl p-5 border border-slate-900 text-left space-y-3 pl-6">
                      <span className="text-[10px] font-mono text-purple-400 tracking-wider font-extrabold uppercase">ÉCRITURE DE L'IMAGE SYSTÈME TRÈS SIMPLE</span>
                      <ol className="list-decimal text-xs font-light space-y-1.5 text-slate-300 pl-4 leading-relaxed">
                        <li>Insérez proprement la carte microSD dans le lecteur de votre ordinateur.</li>
                        <li>Lancez l'utilitaire <span className="text-white font-bold">Win32 Disk Imager</span> avec les privilèges administrateur.</li>
                        <li>Sélectionnez le fichier image Sally Home Connect téléchargé précédemment sur votre disque dur.</li>
                        <li>Dans le menu déroulant, sélectionnez méticuleusement la lettre de lecteur correspondant à votre carte microSD.</li>
                        <li>Cliquez sur le bouton géant <span className="text-purple-350 font-black">Write</span>.</li>
                        <li>Attendez sagement la notification de fin complète de l'écriture sans déconnecter le matériel.</li>
                      </ol>

                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 mt-4 text-[11px] text-red-350 font-light">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <span><strong>Attention :</strong> toutes les données présentes originellement sur la carte seront effacées. Sauvegardez vos fichiers en amont.</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-3 pt-6 border-t border-slate-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg">Étape 3</span>
                      <h4 className="text-base font-bold text-white">Installation dans le Raspberry Pi</h4>
                    </div>
                    <div className="pl-1 space-y-3">
                      <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                        Une fois l'écriture validée :
                      </p>
                      <ul className="list-disc pl-5 text-xs font-light text-slate-300 space-y-1 leading-relaxed">
                        <li>Retirez proprement la carte microSD de votre ordinateur en utilisant l'éjection sécurisée du système.</li>
                        <li>Insérez-la fermement dans l'emplacement arrière prévu sur le Raspberry Pi.</li>
                        <li>Raccordez un câble réseau Ethernet blindé RJ45 entre votre box Internet ou routeur et le port réseau du Raspberry Pi.</li>
                        <li>Branchez enfin l'alimentation du Raspberry Pi.</li>
                      </ul>
                      <p className="text-emerald-400 text-xs font-medium pl-1">
                        ✔ Le système d'exploitation embarqué démarre automatiquement.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-4 pt-6 border-t border-slate-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-lg">Étape 4</span>
                      <h4 className="text-base font-bold text-white">Premier démarrage</h4>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed pl-1">
                      Lors du tout premier branchement, Sally Home Connect procède de manière autonome à l'expansion du système de fichiers et effectue automatiquement sa configuration interne globale. Cette opération automatique de boot peut prendre plusieurs minutes.
                    </p>

                    <div className="p-4 bg-slate-900/50 border border-slate-900 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-purple-400 font-bold block">Pendant cette phase : :</span>
                      <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1 leading-relaxed font-light">
                        <li>Ne débranchez sous aucun prétexte l'alimentation électrique.</li>
                        <li>Ne retirez pas la carte microSD.</li>
                        <li>Attendez tranquillement que le système soit complètement stabilisé et démarré.</li>
                      </ul>
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed pl-1 border-l-2 border-purple-500 ml-1">
                      Une fois l'installation complètement terminée, votre serveur de domotique locale Sally Home Connect est prêt à être configuré.
                    </p>

                    <div className="pt-4 flex justify-between items-center text-xs text-purple-400 font-bold font-mono">
                      <span>Étape suivante</span>
                      <button 
                        onClick={() => setActiveChapter("ch2")}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        Configuration réseau <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {activeChapter === "ch2" && (
                <div className="space-y-8 animate-fadeIn duration-300 text-left">
                  
                  {/* Default config warning */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="text-purple-400">●</span> Configuration réseau de Sally Home Connect
                    </h3>
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      Par défaut, après le démarrage d'usine, Sally Home Connect utilise l'adresse IP fixe suivante :
                    </p>
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center font-mono text-xl text-cyan-400 font-extrabold tracking-wider max-w-xs mx-auto shadow-inner">
                      https://192.168.1.200
                    </div>
                    <p className="text-slate-450 text-xs pl-1 font-light leading-relaxed">
                      Pour pouvoir accéder à l'interface graphique unifiée de Sally Home, votre ordinateur ou tablette de configuration doit obligatoirement utiliser le même plan d'adressage IP local (ex. 192.168.1.xxx).
                    </p>
                  </div>

                  {/* Windows CMD help */}
                  <div className="space-y-3 pt-6 border-t border-slate-900">
                    <h4 className="text-base font-bold text-white">Vérifier l'adresse de votre box Internet</h4>
                    <p className="text-slate-400 text-xs sm:text-sm font-light">
                      Depuis n'importe quel ordinateur connecté à votre réseau local :
                    </p>
                    
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 space-y-3 shadow-inner">
                      <div className="flex justify-between border-b border-slate-900 pb-2 text-slate-500 text-[10px]">
                        <span>Terminal Windows CMD</span>
                        <span>ipconfig.exe</span>
                      </div>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-400 leading-relaxed font-light">
                        <li>Appuyez simultanément sur les touches clavier <span className="text-white font-bold">Windows + R</span> pour ouvrir l'outil Exécuter.</li>
                        <li>Dans la petite invite, tapez et validez : <span className="text-purple-400 font-bold">cmd</span></li>
                        <li>Cliquez sur <span className="text-white">OK</span>.</li>
                        <li>Dans l'invite de commande noire qui s'ouvre, saisissez l'instruction suivante : <span className="text-cyan-400 font-bold">ipconfig</span></li>
                        <li>Relevez précisément l'adresse indiquée sur la ligne <span className="text-white font-semibold">Passerelle par défaut</span>.</li>
                      </ol>

                      <div className="p-3.5 bg-slate-900/60 rounded-xl space-y-1 text-left border border-slate-900 mt-2">
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">Exemple de retour : :</span>
                        <div className="text-cyan-450 text-xs pl-1 font-bold">Passerelle par défaut . . . . . . . . . : 192.168.1.1</div>
                      </div>
                    </div>

                    <p className="text-emerald-400 text-xs font-semibold pl-1">
                      ✔ Si votre passerelle est de type 192.168.1.x, aucune modification n'est nécessaire.
                    </p>
                  </div>

                  {/* Access protocol */}
                  <div className="space-y-4 pt-6 border-t border-slate-900">
                    <h4 className="text-base font-bold text-white">Accéder à Sally Home Connect</h4>
                    <p className="text-slate-455 text-xs sm:text-sm font-light pl-1 leading-relaxed">
                      Saisissez simplement l'URL de connexion pour appairer vos équipements :
                    </p>

                    <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-xl font-light space-y-3 text-xs text-slate-300 pl-6 leading-relaxed">
                      <ol className="list-decimal pl-4 space-y-2">
                        <li>Ouvrez votre navigateur Internet favori (Chrome, Edge ou Firefox).</li>
                        <li>Saisissez minutieusement l'adresse exacte : <span className="text-white font-bold bg-slate-900 px-1.5 py-0.5 rounded">https://192.168.1.200</span></li>
                        <li>Validez avec la touche <span className="text-white font-black bg-slate-900 px-1 py-0.5 rounded text-[10px]">Entrée</span>.</li>
                      </ol>
                    </div>

                    <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl space-y-1">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 leading-none">
                        ⚠️ Alerte de certificat SSL
                      </span>
                      <p className="text-slate-400 text-[11px] font-light leading-relaxed">
                        Une alerte de confiance ou de sécurité peut apparaître lors de votre toute première connexion, indiquant "La connexion n'est pas privée". Ceci est parfaitement normal puisque l'appareil n'utilise aucun serveur DNS public et résout tout localement. Cliquez simplement sur <span className="text-white font-bold">Paramètres avancés</span> puis <span className="text-white font-bold">Continuer vers le site</span>.
                      </p>
                    </div>
                  </div>

                  {/* Particular cases */}
                  <div className="space-y-3 pt-6 border-t border-slate-900">
                    <h4 className="text-base font-bold text-white">Cas particulier</h4>
                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed pl-1">
                      Si votre box utilise un autre réseau d'IP privées que le standard 192.168.1.x <span className="text-slate-300 font-bold">(par exemple 192.168.0.x ou 192.168.10.x)</span>, Sally Home Connect ne sera pas immédiatement accessible sur l'adresse par défaut. Dans ce cas particulier, veuillez consulter le chapitre de dépannage alternatif « Modification de l'adresse IP de Sally Home Connect » dans votre documentation imprimée ou contactez notre support technique dévoué.
                    </p>
                  </div>

                  {/* First deployment check screen */}
                  <div className="space-y-3 pt-6 border-t border-slate-900">
                    <h4 className="text-base font-bold text-white">Première mise en service</h4>
                    <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-3 pl-6 text-xs text-slate-300 font-light leading-relaxed">
                      <ol className="list-decimal pl-4 space-y-1.5">
                        <li>Insérez proprement la carte microSD dans le Raspberry Pi.</li>
                        <li>Raccordez temporairement un écran d'affichage physique (port micro-HDMI), un clavier USB standard et une souris.</li>
                        <li>Branchez le connecteur d'alimentation du Raspberry Pi sur votre prise secteur.</li>
                        <li>Attendez l'apparition complète de l'écran d'accueil noir Sally Home Connect.</li>
                        <li>Ouvrez le menu intitulé <span className="text-white font-bold">Configuration réseau</span>.</li>
                        <li>Sélectionnez votre mode d'accès de connexion favori : <strong>Ethernet (recommandé)</strong> ou <strong>Wi-Fi</strong>.</li>
                        <li>Si vous optez pour le Wi-Fi local de la maison, saisissez le nom exact de votre réseau SSID ainsi que son mot de passe de sécurité.</li>
                        <li>Validez la configuration.</li>
                      </ol>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-light pl-1 leading-relaxed">
                      Sally Home Connect configure alors automatiquement les paramètres réseau nécessaires. Une fois la configuration d'adressage terminée, l'adresse de connexion unique est affichée en gros caractères sous forme de texte ou de QR Code à l'écran.
                    </p>
                    <p className="text-emerald-400 text-xs font-semibold pl-1">
                      ✔ Depuis n'importe quel ordinateur, tablette ou smartphone connecté au même réseau, saisissez simplement cette adresse dans votre navigateur local pour démarrer votre interface d'habitation autonome.
                    </p>
                  </div>

                </div>
              )}

              {activeChapter === "ch3" && (
                <div className="space-y-8 animate-fadeIn duration-300 text-left">
                  
                  {/* Complements introduction */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="text-purple-400">●</span> Chapitre 3 – Matériel complémentaire
                    </h3>
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      Pour pouvoir communiquer avec les différents équipements domotiques de votre logement, l'architecture locale Sally Home Connect nécessite l'ajout d'interfaces réseau physiques adaptées aux technologies radio sans fil de votre choix.
                    </p>
                  </div>

                  {/* EnOcean USB dongle specifications */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-900 space-y-3.5 pt-5">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 bg-blue-400 rounded-full shrink-0" />
                      <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Dongle USB EnOcean</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                      Si vous utilisez des équipements radio autonomes <span className="text-white font-medium">EnOcean</span> (interrupteurs sans pile à récupération d'énergie mécanique, capteurs de température, poignées de fenêtres ou modules de commande discrets), vous devez obligatoirement disposer d'un dongle USB EnOcean compatible.
                    </p>
                    <ul className="list-disc text-slate-450 text-[11px] pl-5 space-y-1 font-mono">
                      <li>Le dongle se branche directement à chaud ou à froid sur un port USB disponible du Raspberry Pi.</li>
                      <li>Il permet à Sally Home Connect de décoder en temps réel les ondes EnOcean ultra-basses fréquences.</li>
                    </ul>
                  </div>

                  {/* Zigbee USB coordinator specifications */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-900 space-y-3.5 pt-5">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full shrink-0" />
                      <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Passerelle USB Zigbee</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed font-light">
                      Si vous utilisez des équipements radio maillés <span className="text-white font-medium">Zigbee</span> (ampoules colorées Philips Hue ou IKEA, prises gigognes, capteurs de présence de sécurité, vannes de radiateurs, thermostats de chauffage), vous devez brancher une passerelle ou clé Zigbee USB compatible.
                    </p>
                    <ul className="list-disc text-slate-450 text-[11px] pl-5 space-y-1 font-mono">
                      <li>La passerelle Zigbee se branche également sur un autre port USB du Raspberry Pi.</li>
                      <li>Elle sert de coordinateur de clé réseau radio local pour Sally Home.</li>
                    </ul>
                  </div>

                  {/* Mixed Technologies */}
                  <div className="space-y-3 pt-6 border-t border-slate-900">
                    <h4 className="text-base font-bold text-white">Utilisation simultanée des technologies</h4>
                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed pl-1">
                      L'un des avantages de notre système local est que <span className="text-white font-medium">Sally Home Connect</span> peut exploiter simultanément EnOcean et Zigbee au sein de la même pièce de vie. Vous êtes entièrement libre de combiner les fabricants majeurs d'interrupteurs auto-alimentés sans pile avec les éclairages Zigbee.
                    </p>

                    <div className="p-4 bg-slate-900/35 border border-slate-900 rounded-xl space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-extrabold uppercase">Exemple d'association locale fluide :</span>
                      <ul className="list-disc pl-5 text-[11px] text-slate-350 space-y-1 font-light leading-relaxed">
                        <li><strong>Interrupteurs physiques EnOcean sans pile :</strong> fixés au mur sans aucun trou ni passage de câbles pour commander les va-et-vient de la maison.</li>
                        <li><strong>Éclairages intelligents Zigbee :</strong> offrant des variations de nuances ou de couleurs chaleureuses.</li>
                        <li><strong>Prises connectées Zigbee :</strong> pour mesurer les veilles électriques ou désactiver les appareils sensibles.</li>
                        <li><strong>Capteurs de sécurité EnOcean :</strong> surveillant silencieusement les ouvertures.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Final steps connections detail */}
                  <div className="space-y-4 pt-6 border-t border-slate-900">
                    <h4 className="text-base font-bold text-white">Installation des interfaces</h4>
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 font-mono text-xs text-slate-300 space-y-2 shadow-inner">
                      <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-2">PROCÉDURE MATÉRIELLE PHYSIQUE</div>
                      <ol className="list-decimal pl-4 space-y-1 text-slate-400 font-light leading-relaxed">
                        <li>Éteignez proprement votre Raspberry Pi (via le bouton d'extinction logicielle dans la console ou en retirant l'alim).</li>
                        <li>Branchez le dongle EnOcean choisi sur un port USB disponible du boitier.</li>
                        <li>Branchez la clé passerelle Zigbee sur un autre port USB (utiliser de préférence une rallonge pour éloigner les signaux).</li>
                        <li>Redémarrez le Raspberry Pi.</li>
                      </ol>
                    </div>

                    <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-indigo-300 block">Installation des interfaces de communication</span>
                      <p className="text-slate-400 text-[11px] font-light leading-relaxed">
                        Avant de mettre le Raspberry Pi sous tension, branchez les interfaces de communication nécessaires : le dongle EnOcean sur un port USB, et la passerelle Zigbee sur un autre port USB.
                      </p>
                      <p className="text-amber-400 text-[11px] font-bold">
                        ⚠️ Important: Les interfaces de transmission radio doivent obligatoirement être raccordées lorsque le Raspberry Pi est hors tension physique.
                      </p>
                      <p className="text-slate-400 text-[11px] font-light leading-relaxed">
                        Lors du démarrage du boîtier, notre noyau Sally Home Connect détecte de manière automatique les équipements d'émission connectés et intègre immédiatement leurs canaux virtuels dans sa configuration logique. Une fois le redémarrage terminé, votre logement est paré à échanger localement avec tout appareil EnOcean et Zigbee !
                      </p>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

