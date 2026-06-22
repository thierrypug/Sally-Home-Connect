/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Mic,
  MicOff,
  Home,
  Users,
  Accessibility,
  Volume2,
  VolumeX,
  Sparkles,
  Lightbulb,
  LockKeyhole,
  Sliders,
  Thermometer,
  ShieldCheck,
  Compass,
  ArrowRight,
  ChevronRight,
  Settings,
  Plus
} from 'lucide-react';
import { HouseState } from '../types';

interface FonctionnalitesProps {
  houseState: HouseState;
  setHouseState: (state: HouseState | ((prev: HouseState) => HouseState)) => void;
  triggerNotification: (msg: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
}

import HERO_HOUSE_IMAGE from '../assets/images/sally_hero_house_new_1780924228781.png';

export default function Fonctionnalites({
  houseState,
  setHouseState,
  triggerNotification
}: FonctionnalitesProps) {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [speechFeedback, setSpeechFeedback] = useState("Cliquez sur le micro ou sur un des boutons rapides ci-dessous pour parler.");
  const [isMuted, setIsMuted] = useState(false);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Suggested Voice commands list
  const suggestedCommands = [
    { text: "Sally, allume le salon", actionId: "turn_on_salon", badge: "Lumière" },
    { text: "Sally, ferme les volets à 100%", actionId: "close_shutters", badge: "Sécurité" },
    { text: "Sally, règle le chauffage à 22 degrés", actionId: "heat_22", badge: "Confort" },
    { text: "Sally, active la surveillance alarme", actionId: "arm_alarm", badge: "Alerte de nuit" },
    { text: "Sally, éteins toutes les lumières", actionId: "all_off", badge: "Sommeil" }
  ];

  // Simulated vocal text recognition processing
  const handleVocalCommand = (commandText: string, actionId: string) => {
    setIsListening(true);
    setVoiceText(`« ${commandText} »`);
    setSpeechFeedback("Sally écoute...");

    // Clean any prior scheduled response
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }

    speechTimeoutRef.current = setTimeout(() => {
      setIsListening(false);
      let localizedReply = "D'accord, commande reçue.";
      
      setHouseState((prev) => {
        const next = { ...prev };
        switch (actionId) {
          case 'turn_on_salon':
            next.salonLights = true;
            localizedReply = "J'ai allumé les lumières du salon.";
            triggerNotification("Commande vocale PMR : Salon allumé", "success");
            break;
          case 'close_shutters':
            next.voletsOpenPercent = 0;
            localizedReply = "J'ai abaissé les volets motorisés pour votre confort.";
            triggerNotification("Commande vocale PMR : Fermeture des volets (0%)", "info");
            break;
          case 'heat_22':
            next.chauffageTemp = 22.0;
            localizedReply = "Le chauffage du logement est configuré à 22 degrés.";
            triggerNotification("Commande vocale PMR : Consigne chauffage réglée à 22°C", "success");
            break;
          case 'arm_alarm':
            next.alarmActive = true;
            localizedReply = "Le système de sécurité local est maintenant armé et actif.";
            triggerNotification("Commande vocale PMR : Alarme maison armée localement", "alert");
            break;
          case 'all_off':
            next.salonLights = false;
            next.cuisineLights = false;
            next.chambreLights = false;
            next.exterieurLights = false;
            localizedReply = "C'est fait, toutes les lumières de votre maison sont éteintes.";
            triggerNotification("Commande vocale PMR : Extinction globale appliquée", "warning");
            break;
          default:
            break;
        }
        return next;
      });

      setSpeechFeedback(localizedReply);

      // Web Speech API execution if supported and allowed
      if (!isMuted && typeof window !== 'undefined' && window.speechSynthesis) {
        // Cancel first
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(localizedReply);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, []);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    triggerNotification(`Retour sonore vocal ${!isMuted ? 'désactivé' : 'activé'}.`, 'info');
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* ================= SECTION PRINCIPALE : AUTONOMIE PMR ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Glow behind section */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Header indicator match */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Column Left (5/12 grid spacing) - Copywriting */}
          <div className="lg:col-span-6 space-y-8 relative z-10">
            
            <div className="space-y-4">
              <p className="text-sm font-mono tracking-widest text-cyan-400 font-extrabold uppercase leading-none">
                AUTONOMIE PMR
              </p>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-[1.08]">
                La maison obéit <br />
                à votre <span className="text-indigo-400">voix.</span>
              </h1>
              
              <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Déclenchez lumières, volets, chauffage et plus encore, depuis votre fauteuil ou à la voix.
              </p>
            </div>

            {/* Vocal simulation interactive widget workspace */}
            <div className="bg-[#0b0f19]/90 border border-indigo-500/20 rounded-3xl p-6.5 relative overflow-hidden shadow-2xl shadow-indigo-950/20">
              
              {/* Outer decorative glowing ring */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-indigo-500/10 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isListening ? 'bg-indigo-400' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isListening ? 'bg-indigo-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  <span className="text-xs font-mono text-slate-300 tracking-wider">
                    MODULE VOCAL INTELLIGENT (LOCAL)
                  </span>
                </div>

                {/* Mute output synthesis toggler */}
                <button 
                  onClick={handleToggleMute}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${isMuted ? 'bg-rose-500/15 border-rose-500/25 text-rose-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                  title={isMuted ? "Activer le retour sonore" : "Couper le retour sonore"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Animated Waveform if listening */}
              <div className="bg-slate-950/60 rounded-2xl p-5 border border-white/5 space-y-4">
                
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Reconnaissance locale</span>
                  <span>{isListening ? 'Traitement local...' : 'En attente'}</span>
                </div>

                <div className="h-10 flex items-center justify-center gap-1">
                  {/* Waveform graphic bars with CSS animations */}
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-linear-to-t from-indigo-500 via-cyan-400 to-indigo-600 rounded-full transition-all duration-150"
                      style={{
                        height: isListening ? `${Math.floor(Math.random() * 32) + 8}px` : '4px',
                        animation: isListening ? `pulse 0.6s infinite alternate ${i * 0.05}s` : 'none'
                      }}
                    />
                  ))}
                </div>

                <div className="text-center space-y-1.5 py-1">
                  <div className="text-[15px] font-bold text-indigo-300 font-mono italic">
                    {voiceText || "« Cliquez sur une commande ci-dessous »"}
                  </div>
                  <p className="text-xs text-slate-400">
                    {speechFeedback}
                  </p>
                </div>

              </div>

              {/* Preset buttons layout with badges */}
              <div className="mt-5 space-y-2.5">
                <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest block uppercase">COMMANDES RAPIDES PMR</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  {suggestedCommands.map((command, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleVocalCommand(command.text, command.actionId)}
                      disabled={isListening}
                      className="p-3 bg-slate-900/60 hover:bg-indigo-950/20 border border-slate-800 hover:border-indigo-500/30 rounded-xl transition-all text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between cursor-pointer disabled:opacity-50"
                    >
                      <span className="truncate mr-2">{command.text}</span>
                      <span className="text-[8px] font-mono bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded shrink-0 uppercase">
                        {command.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Column Right (6/12 grid spacing) - Graphical Autonomy Visualization & Smartphone screen overlay */}
          <div className="lg:col-span-6 relative group/img-section">
            
            {/* Glowing neon paths & light flows for high impact "Wow" factor */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none z-10 animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-400/15 rounded-full blur-[140px] pointer-events-none z-10" />
            <div className="absolute inset-0 bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

            {/* Main Img Container mimicking the design layout */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-900 shadow-[0_0_50px_rgba(99,102,241,0.25)] group-hover/img-section:border-indigo-500/40 transition-all duration-500">
              
              {/* Image representing wheelchair interaction with the smart house */}
              <div className="relative h-140 overflow-hidden">
                <img 
                  src={HERO_HOUSE_IMAGE}
                  alt="Sally Home Connect Autonomie PMR" 
                  className="w-full h-full object-cover brightness-[0.85] contrast-[1.18] saturate-[1.4] transition-all duration-[10s] group-hover/img-section:scale-105 filter drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                />
                
                {/* Visual Glassmorphic overlays resembling the wheelchair lady of the screenshot */}
                <div className="absolute inset-0 bg-radial-at-t from-[#030712]/15 via-[#030712]/40 to-[#030712]/90 pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-tr from-indigo-950/60 via-slate-900/30 to-transparent pointer-events-none" />
                
                {/* Floating SVG Connections matching the image style with glowing blue indicators */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Glowing routes on the house windows */}
                  <path d="M 230,170 C 180,120 150,110 110,110" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.8" strokeDasharray="4 4" />
                  <path d="M 240,170 C 220,100 180,50 210,50" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.8" strokeDasharray="4 4" />
                  <path d="M 260,180 C 270,120 300,90 350,90" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.8" strokeDasharray="4 4" />
                  <path d="M 280,190 C 310,190 340,190 380,190" fill="none" stroke="#ec4899" strokeWidth="2" opacity="0.8" strokeDasharray="4 4" />
                </svg>

                {/* Simulated circular nodes connected on house layout */}
                {/* 1. Shutters (Top-Left Window) */}
                <div className="absolute top-27.5 left-27.5 -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-10 h-10 rounded-full bg-slate-950/90 border border-blue-400 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Sliders className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[8px] font-mono text-blue-400 bg-slate-950/80 px-1 py-0.5 rounded mt-1.5 inline-block">VOLETS</span>
                </div>

                {/* 2. Light (Top-Center window) */}
                <div className="absolute top-12.5 left-52.5 -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className={`w-10 h-10 rounded-full bg-slate-950/90 border flex items-center justify-center transition-all ${houseState.salonLights ? 'border-yellow-400 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]' : 'border-slate-700 text-slate-500'}`}>
                    <Lightbulb className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[8px] font-mono bg-slate-950/80 px-1 py-0.5 rounded mt-1.5 inline-block ${houseState.salonLights ? 'text-yellow-400' : 'text-slate-500'}`}>
                    {houseState.salonLights ? 'SALON ON' : 'SALON OFF'}
                  </span>
                </div>

                {/* 3. Climate/Temp (Top-Right Window) */}
                <div className="absolute top-22.5 left-87.5 -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce" style={{ animationDuration: '3.5s' }}>
                  <div className="w-10 h-10 rounded-full bg-slate-950/90 border border-orange-400 text-orange-400 flex items-center justify-center shadow-[0_0_15px_rgba(251,146,60,0.5)]">
                    <Thermometer className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[8px] font-mono text-orange-400 bg-slate-950/80 px-1 py-0.5 rounded mt-1.5 inline-block">CHAUFFAGE</span>
                </div>

                {/* 4. Padlock (Far Right Window) */}
                <div className="absolute top-47.5 right-10 -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce" style={{ animationDuration: '4.5s' }}>
                  <div className={`w-10 h-10 rounded-full bg-slate-950/90 border flex items-center justify-center transition-all ${houseState.alarmActive ? 'border-fuchsia-500 text-fuchsia-400 shadow-[0_0_18px_rgba(217,70,239,0.5)]' : 'border-slate-700 text-slate-500'}`}>
                    <LockKeyhole className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[8px] font-mono bg-slate-950/80 px-1 py-0.5 rounded mt-1.5 inline-block ${houseState.alarmActive ? 'text-fuchsia-400' : 'text-slate-500'}`}>
                    {houseState.alarmActive ? 'ARMÉE' : 'SÉCURISÉ'}
                  </span>
                </div>

                {/* High tech glass panel indicator text top right matching AUTONOMIE */}
                <div className="absolute top-6 right-6 text-right bg-slate-950/80 border border-white/10 p-3.5 rounded-xl backdrop-blur-md">
                  <span className="text-[10px] font-mono text-cyan-400 block tracking-wider uppercase font-extrabold leading-none">FAUTEUIL ACTIF</span>
                  <div className="text-white text-xs font-bold mt-1">Liaison EnOcean locale sans fil</div>
                  <div className="text-[9px] text-slate-500 mt-0.5 font-mono">ID: PMR-H202C-001</div>
                </div>

                {/* Smartphone Screen Layout matching bottom right overlay corner */}
                <div className="absolute bottom-4 right-4 w-72 rounded-4xl border-4 border-[#1e1b4b] bg-slate-950 p-2 shadow-2xl sally-glow-purple flex flex-col overflow-hidden text-left scale-90 sm:scale-100 origin-bottom-right">
                  
                  {/* Smartphone top status bar */}
                  <div className="h-5 flex items-center justify-between px-4 text-[9px] font-mono text-slate-400">
                    <span>9:41</span>
                    <div className="w-16 h-3 bg-slate-900 rounded-full" />
                    <div className="flex items-center gap-1">
                      <span>LTE</span>
                      <span className="w-3.5 h-1.5 bg-emerald-400 rounded-xs" />
                    </div>
                  </div>

                  {/* Inner screen content */}
                  <div className="bg-[#050b18] rounded-3xl p-4 text-left space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                          <Home className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-slate-100 leading-none">Sally Home</h4>
                          <span className="text-[8px] text-emerald-400 font-mono tracking-wide leading-none block mt-0.5">Connect</span>
                        </div>
                      </div>
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Section Label */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">Maison</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>

                    {/* Smartphone Toggles Block - Matching colors and structure from the image */}
                    <div className="grid grid-cols-2 gap-2">
                      
                      {/* item 1: Lumières (Yellow highlighted if on) */}
                      <button 
                        onClick={() => {
                          setHouseState(prev => {
                            const next = !prev.salonLights;
                            triggerNotification(`Salon ${next ? 'allumé' : 'éteint'} via simulated mobile screen.`, next ? 'success' : 'info');
                            return { ...prev, salonLights: next };
                          });
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border ${houseState.salonLights ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-slate-900/40 border-slate-900 text-slate-400'}`}
                      >
                        <Lightbulb className={`w-4 h-4 mb-1.5 ${houseState.salonLights ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
                        <span className="text-[9px] text-slate-400 block leading-none">Lumières</span>
                        <span className="text-[10px] font-bold mt-0.5 leading-tight block">{houseState.salonLights ? 'On' : 'Off'}</span>
                      </button>

                      {/* item 2: Volets (Blue Highlighted) */}
                      <button 
                        onClick={() => {
                          setHouseState(prev => {
                            const nextVal = prev.voletsOpenPercent === 100 ? 0 : 100;
                            triggerNotification(`Volets motorisés ${nextVal === 100 ? 'ouverts à 100%' : 'fermés'} via mobile.`, 'info');
                            return { ...prev, voletsOpenPercent: nextVal };
                          });
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border ${houseState.voletsOpenPercent > 0 ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' : 'bg-slate-900/40 border-slate-900 text-slate-400'}`}
                      >
                        <Sliders className={`w-4 h-4 mb-1.5 ${houseState.voletsOpenPercent > 0 ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <span className="text-[9px] text-slate-400 block leading-none">Volets</span>
                        <span className="text-[10px] font-bold mt-0.5 leading-tight block">{houseState.voletsOpenPercent > 0 ? 'Ouverts' : 'Fermés'}</span>
                      </button>

                      {/* item 3: Chauffage (Red styled) */}
                      <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-900 text-left flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <Thermometer className="w-4 h-4 text-rose-500" />
                          <span className="text-[8px] font-mono text-slate-500">CONSIM</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block leading-none">Chauffage</span>
                          <span className="text-[10px] font-bold mt-0.5 leading-tight block">{houseState.chauffageTemp}°C</span>
                        </div>
                      </div>

                      {/* item 4: Ambiance (Nighthawks custom purple vibe) */}
                      <button 
                        onClick={() => {
                          setHouseState(prev => {
                            const nextScen = prev.activeScenario === 'soir' ? 'idle' : 'soir';
                            const activeNow = nextScen === 'soir';
                            triggerNotification(`Scénario ${activeNow ? 'Soirée appliqué' : 'Idle'} via mobile.`, 'success');
                            return { ...prev, activeScenario: nextScen, salonLights: activeNow, exterieurLights: activeNow };
                          });
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border ${houseState.activeScenario === 'soir' ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300' : 'bg-slate-900/40 border-slate-900 text-slate-400'}`}
                      >
                        <Sparkles className="w-4 h-4 mb-1.5 text-indigo-400" />
                        <span className="text-[9px] text-slate-400 block leading-none">Ambiance</span>
                        <span className="text-[10px] font-bold mt-0.5 leading-tight block">{houseState.activeScenario === 'soir' ? 'Soirée Active' : 'Aucune'}</span>
                      </button>

                    </div>

                    {/* Smartphone bottom navigational bar strictly mimicking: Accueil, Pièces, Scénarios, Plus */}
                    <div className="grid grid-cols-4 gap-1 pt-2.5 border-t border-white/5 text-center text-slate-400 text-[8px] font-mono leading-none">
                      <div className="space-y-1 text-indigo-400">
                        <Home className="w-3.5 h-3.5 mx-auto" />
                        <span>Accueil</span>
                      </div>
                      <div className="space-y-1 hover:text-white cursor-pointer">
                        <Plus className="w-3.5 h-3.5 mx-auto" />
                        <span>Pièces</span>
                      </div>
                      <div className="space-y-1 hover:text-white cursor-pointer">
                        <Sliders className="w-3.5 h-3.5 mx-auto" />
                        <span>Scénarios</span>
                      </div>
                      <div className="space-y-1 hover:text-white cursor-pointer">
                        <Settings className="w-3.5 h-3.5 mx-auto" />
                        <span>Plus</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Feature blocks at the bottom layout straight from screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-900 text-left mt-16">
          
          {/* Card 1: 100% Locale / Sans cloud */}
          <div className="flex items-start gap-4">
            <div className="p-3 w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">100% Locale</h3>
              <p className="text-xs text-slate-500 leading-normal mt-0.5">Sans serveur distant, sans cloud externe.</p>
            </div>
          </div>

          {/* Card 2: Accessible à tous */}
          <div className="flex items-start gap-4">
            <div className="p-3 w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Accessible à tous</h3>
              <p className="text-xs text-slate-500 leading-normal mt-0.5">Pensée pour le confort unifié de chaque proche.</p>
            </div>
          </div>

          {/* Card 3: Contrôle vocal */}
          <div className="flex items-start gap-4">
            <div className="p-3 w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Contrôle vocal</h3>
              <p className="text-xs text-slate-500 leading-normal mt-0.5">La maison obéit à la voix hors ligne.</p>
            </div>
          </div>

          {/* Card 4: Interface simplifiée */}
          <div className="flex items-start gap-4">
            <div className="p-3 w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Accessibility className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Interface simplifiée</h3>
              <p className="text-xs text-slate-500 leading-normal mt-0.5">Facile, claire, et très contrastée.</p>
            </div>
          </div>

        </div>

      </section>

      {/* ================= INTERACTIVE COMPLEMENTS: PILOT LOCAL VOICE LAB ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-linear-to-tr from-slate-950 to-indigo-950/20 border border-slate-900 rounded-3xl p-8 md:p-14 text-center space-y-8 sally-glow-purple">
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xs font-mono tracking-widest text-[#a21caf] font-extrabold uppercase">
              RECHERCHE & EXPÉRIENCE PMR
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 leading-tight">
              Une autonomie totale et d&apos;une <br />
              <span className="font-bold text-cyan-400">fiabilité absolue sans ondes polluantes.</span>
            </h2>
            <p className="text-slate-400 font-light max-w-2xl mx-auto text-sm leading-relaxed">
              Pour une personne à mobilité réduite (PMR) ou dépendante, la domotique n&apos;est pas un gadget : c&apos;est la clé de l&apos;autonomie. Sally garantit le fonctionnement physique des automatismes même si votre accès Internet tombe en panne.
            </p>
          </div>

          {/* Value cards for PMR specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-6">
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
              <h4 className="text-sm font-bold text-slate-100 mb-2">Technologie EnOcean active</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Les poussoirs muraux sans fil fonctionnent sur une technologie piezoléectrique sans pile. Aucun besoin d&apos;entretien périodique, aucune panne d&apos;alimentation.
              </p>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
              <h4 className="text-sm font-bold text-slate-100 mb-2">Synthèse de retour auditif</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Garantit aux personnes souffrant de déficience visuelle d&apos;entendre la confirmation physique en français des états des lampes et volets de la maison.
              </p>
            </div>

            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80">
              <h4 className="text-sm font-bold text-slate-100 mb-2">Débranchement externe total</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Nos modules n&apos;ont besoin d&apos;aucun abonnement cloud payant mensuel. La protection de votre souveraineté familiale est gravée dans l&apos;architecture même du boîtier.
              </p>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
