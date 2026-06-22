/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Home,
  LockKeyhole,
  Radio,
  ShieldCheck,
  Wifi,
  Mic,
  CloudOff,
  CreditCard,
  SlidersHorizontal,
  EyeOff,
  Lightbulb,
  Thermometer,
  Sparkles,
  HeartHandshake,
  Accessibility,
  Users,
  Power,
  ChevronUp,
  ChevronDown,
  Info
} from 'lucide-react';
import { HouseState } from '../types';

interface AccueilProps {
  houseState: HouseState;
  setHouseState: (state: HouseState | ((prev: HouseState) => HouseState)) => void;
  triggerNotification: (msg: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
  onOpenCheckout: (planName: string, price: number) => void;
  onChangePage: (page: string) => void;
}

import HERO_HOUSE_IMAGE from '../assets/images/sally_hero_house_new_1780924228781.png';

export default function Accueil({ 
  houseState, 
  setHouseState, 
  triggerNotification, 
  onOpenCheckout,
  onChangePage
}: AccueilProps) {

  const technologies = [
    {
      icon: <Radio className="w-6 h-6 text-indigo-400" />,
      title: "EnOcean",
      text: "Des interrupteurs sans pile pour commander la maison simplement.",
    },
    {
      icon: <Wifi className="w-6 h-6 text-indigo-400" />,
      title: "Zigbee",
      text: "Des ampoules, prises et capteurs connectés facilement intégrés.",
    },
    {
      icon: <Mic className="w-6 h-6 text-indigo-400" />,
      title: "Vocal",
      text: "Une commande vocale locale pour piloter sans effort.",
    },
  ];

  const limites = [
    {
      icon: <CloudOff className="w-5 h-5 text-rose-400" />,
      title: "Dépendance au cloud",
      text: "Vos données peuvent dépendre de serveurs distants.",
    },
    {
      icon: <CreditCard className="w-5 h-5 text-rose-400" />,
      title: "Abonnements coûteux",
      text: "Des frais récurrents peuvent s'accumuler avec le temps.",
    },
    {
      icon: <SlidersHorizontal className="w-5 h-5 text-rose-400" />,
      title: "Complexité inutile",
      text: "Des interfaces parfois pensées pour les experts.",
    },
    {
      icon: <EyeOff className="w-5 h-5 text-rose-400" />,
      title: "Confidentialité limitée",
      text: "Vos habitudes peuvent quitter votre logement.",
    },
  ];

  const reponses = [
    {
      icon: <Home className="w-5 h-5 text-emerald-400" />,
      title: "100% locale",
      text: "Votre maison fonctionne chez vous, sans dépendance inutile.",
    },
    {
      icon: <LockKeyhole className="w-5 h-5 text-emerald-400" />,
      title: "Sans abonnement",
      text: "Vous achetez une fois, sans frais cachés.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: "Simple et sécurisée",
      text: "Une interface claire pour piloter votre logement.",
    },
    {
      icon: <Info className="w-5 h-5 text-emerald-400" />,
      title: "Évolutive",
      text: "Ajoutez progressivement lumières, volets, chauffage et capteurs.",
    },
  ];

  const scenarios = [
    {
      id: "depart" as const,
      title: "Je pars travailler",
      items: [
        "Les lumières s'éteignent.",
        "Le chauffage passe en mode économie.",
        "Les volets se fement automatiquement.",
      ],
      description: "Appuyez pour tester : Extinction globale, Chauffage éco (17°C) & Alarme armée."
    },
    {
      id: "soir" as const,
      title: "Je rentre à la maison",
      items: [
        "La maison retrouve la bonne température.",
        "Les lumières d'accueil s'allument.",
        "Tout est prêt sans que j'aie à y penser.",
      ],
      description: "Appuyez pour tester : Salon & Extérieur allumés, Température idéale (21.5°C)."
    },
    {
      id: "vacances" as const,
      title: "Je pars en vacances",
      items: [
        "La maison peut simuler une présence.",
        "Je garde un œil sur mon logement.",
        "La consommation reste maîtrisée.",
      ],
      description: "Appuyez pour tester : Simulation de présence active & Chauffage hors-gel."
    },
  ];

  const handleApplyScenario = (id: 'depart' | 'soir' | 'vacances') => {
    setHouseState((prev) => {
      let next = { ...prev };
      if (id === 'depart') {
        next.salonLights = false;
        next.cuisineLights = false;
        next.exterieurLights = false;
        next.chambreLights = false;
        next.voletsOpenPercent = 0;
        next.chauffageTemp = 17.0;
        next.alarmActive = true;
        triggerNotification("Scénario 'Soirée' désactivé et 'Départ' appliqué : extinction globale et alarme activée.", "warning");
      } else if (id === 'soir') {
        next.salonLights = true;
        next.cuisineLights = true;
        next.exterieurLights = true;
        next.chambreLights = false;
        next.voletsOpenPercent = 100;
        next.chauffageTemp = 21.5;
        next.alarmActive = false;
        triggerNotification("Scénario 'Soirée' activé : maison accueillante et chaleureuse.", "success");
      } else if (id === 'vacances') {
        next.salonLights = false;
        next.cuisineLights = false;
        next.exterieurLights = true; // simulation lights on
        next.chambreLights = false;
        next.voletsOpenPercent = 0;
        next.chauffageTemp = 15.0;
        next.alarmActive = true;
        triggerNotification("Scénario de sécurité 'Vacances' activé : simulation de présence.", "info");
      }
      return next;
    });
  };

  const toggleLight = (key: 'salonLights' | 'cuisineLights' | 'exterieurLights') => {
    setHouseState((prev) => {
      const nextVal = !prev[key];
      const name = key === 'salonLights' ? 'Salon' : key === 'cuisineLights' ? 'Cuisine' : 'Extérieur';
      triggerNotification(`Lumière ${name} ${nextVal ? 'allumée' : 'éteinte'} via mobile local.`, nextVal ? 'success' : 'info');
      return { ...prev, [key]: nextVal };
    });
  };

  const adjustHeating = (amount: number) => {
    setHouseState((prev) => {
      const nextTemp = Math.round((prev.chauffageTemp + amount) * 10) / 10;
      if (nextTemp >= 14 && nextTemp <= 28) {
        return { ...prev, chauffageTemp: nextTemp };
      }
      return prev;
    });
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 text-left">
        
        {/* Ambient Glowing Backgrounds */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Copywriting */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-mono text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Sally Home Connect</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight text-white">
                La domotique locale,
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-cyan-400 to-emerald-400 font-extrabold sally-text-glow">
                  libre et sans abonnement.
                </span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                Automatisez votre maison, gagnez en confort et gardez vos données en sécurité chez vous.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button 
                onClick={() => onChangePage('propos')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold rounded-xl text-base shadow-lg shadow-indigo-600/20 transition-all text-center cursor-pointer"
              >
                Découvrir Sally
              </button>
              <button 
                onClick={() => onChangePage('solutions')}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-850 active:scale-[0.98] border border-slate-800 text-slate-200 hover:text-white font-semibold rounded-xl text-base transition-all text-center cursor-pointer"
              >
                Voir la démo
              </button>
            </div>

            {/* Premium assurances badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-900">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">100% Locale</h4>
                  <p className="text-[10px] text-slate-500">Aucun cloud</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <LockKeyhole className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Sans commission</h4>
                  <p className="text-[10px] text-slate-500">Aucun frais caché</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Zigbee / EnOcean</h4>
                  <p className="text-[10px] text-slate-500">Copie native</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Sécurisée</h4>
                  <p className="text-[10px] text-slate-500">Haute protection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Smartphone & Villa Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Backlit house glass enclosure background */}
            <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 to-cyan-500/5 rounded-3xl blur-2xl pointer-events-none" />
            
            <div className="relative w-full max-w-sm rounded-[40px] border-[5px] border-slate-800 bg-slate-950 p-2.5 shadow-2xl overflow-hidden sally-glow-purple">
              
              {/* Smartphone Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-850 rounded-full z-20 flex items-center justify-between px-4">
                <div className="w-2 h-2 rounded-full bg-slate-900" />
                <div className="w-16 h-1 rounded-full bg-slate-900" />
              </div>
              
              {/* Phone Content Screen */}
              <div className="relative bg-[#050b18] rounded-[30px] p-5 h-full space-y-6 pt-8 text-left">
                
                {/* Simulated Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                      <span>Sally App</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <p className="text-[9px] font-mono text-emerald-400">RÉSEAU SOUVERAIN</p>
                  </div>
                  <span className="text-[10px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full font-mono">
                    Local Unit
                  </span>
                </div>

                {/* Smartphone Photo of the Luxury Smart Villa */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 group h-40">
                  <img 
                    src={HERO_HOUSE_IMAGE}
                    alt="Premium House Model" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Glowing Window Overlays overlaying the simulated states */}
                  <div className={`absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-14 h-10 bg-yellow-400/20 blur-lg transition-opacity duration-300 ${houseState.salonLights ? 'opacity-100' : 'opacity-0'}`} />
                  <div className={`absolute top-2/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-8 bg-yellow-400/25 blur-md transition-opacity duration-300 ${houseState.exterieurLights ? 'opacity-100' : 'opacity-0'}`} />

                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md rounded-lg p-2 flex justify-between items-center border border-white/10 text-[10px]">
                    <span className="text-slate-300">Statut Villa</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      Sécurisé
                    </span>
                  </div>
                </div>

                {/* Control Toggles list inside the mock app */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">CLAVIER DE COMMANDE EXPRESS</span>
                  
                  {/* Heating adjustment Widget */}
                  <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Chauffage Salon</span>
                      <strong className="text-sm text-slate-200">{houseState.chauffageTemp}°C</strong>
                    </div>
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => adjustHeating(-0.5)}
                        className="w-7 h-7 bg-slate-950 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center justify-center text-xs active:scale-95"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => adjustHeating(0.5)}
                        className="w-7 h-7 bg-slate-950 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center justify-center text-xs active:scale-95"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lamp switches */}
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => toggleLight('salonLights')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${houseState.salonLights ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-300' : 'bg-slate-900/50 border-slate-800/80 text-slate-400'}`}
                    >
                      <Lightbulb className={`w-4 h-4 mb-1.5 ${houseState.salonLights ? 'text-indigo-400' : 'text-slate-500'}`} />
                      <div className="text-[9px] text-slate-500 leading-none">Salon</div>
                      <div className="text-[10px] font-bold leading-normal">{houseState.salonLights ? 'Allumé' : 'Éteint'}</div>
                    </button>

                    <button 
                      onClick={() => toggleLight('exterieurLights')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${houseState.exterieurLights ? 'bg-cyan-600/10 border-cyan-500/40 text-cyan-300' : 'bg-slate-900/50 border-slate-800/80 text-slate-400'}`}
                    >
                      <Lightbulb className={`w-4 h-4 mb-1.5 ${houseState.exterieurLights ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <div className="text-[9px] text-slate-500 leading-none">Jardin</div>
                      <div className="text-[10px] font-bold leading-normal">{houseState.exterieurLights ? 'Allumé' : 'Éteint'}</div>
                    </button>
                  </div>

                  {/* Alarm status banner list */}
                  <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${houseState.alarmActive ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'}`}>
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <div className="leading-tight">
                      <p className="font-semibold text-[10px]">{houseState.alarmActive ? 'Alarme Domestique Activée' : 'Alarme : Standby'}</p>
                      <p className="text-[8.5px] opacity-70">Protection système 100% locale</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= POURQUOI SALLY EXISTE ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top block: Mission Statement (Left) & Premium Interactive Villa Hub Illustration (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 text-left">
          
          {/* Left Column: Mission copy */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase leading-none">
              Notre mission
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight">
              Pourquoi Sally <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-cyan-400 to-[#b5179e] font-extrabold pb-1">
                existe.
              </span>
            </h2>
            <div className="space-y-4 text-slate-300 font-light text-base leading-relaxed">
              <p>
                La domotique devrait simplifier votre vie, pas la compliquer.
              </p>
              <p>
                Nous avons créé Sally Home Connect pour offrir une solution{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400 font-bold">
                  locale, sécurisée
                </span>{" "}
                et{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400 font-bold">
                  accessible à tous.
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: High-tech Villa Connections Illustration */}
          <div className="lg:col-span-7 relative h-90 rounded-3xl overflow-hidden border border-slate-900 group shadow-2xl shadow-black/80">
            {/* Background twilight villa house image */}
            <img
              src={HERO_HOUSE_IMAGE}
              alt="Villa de luxe avec Sally Home Connect"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.45] saturate-[1.2] transition-transform duration-[8s] group-hover:scale-105"
            />
            
            {/* Ambient vignette background overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
            
            {/* Glowing lines connecting Hub to local nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current" xmlns="http://www.w3.org/2000/svg">
              {/* Path 1: To Lightbulb node */}
              <path d="M 330,190 C 280,140 180,120 120,120 M 120,120 L 120,124" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              {/* Path 2: To Shutters node */}
              <path d="M 360,190 C 350,110 320,60 260,60" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              {/* Path 3: To Map node */}
              <path d="M 390,190 C 400,120 420,80 480,80" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              {/* Path 4: To padlock node */}
              <path d="M 420,200 C 460,190 530,190 570,190" fill="none" stroke="#a21caf" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            </svg>

            {/* Floating glassmorphic circular nodes with glowing highlights */}
            {/* 1. Bulb (Top Left) */}
            <div className="absolute top-30 left-30 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-cyan-400 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-110 transition-transform cursor-help" title="Lumières du Salon">
                <Lightbulb className="w-4 h-4" />
              </div>
            </div>

            {/* 2. Shutters/Blinds (Top Center-Left) */}
            <div className="absolute top-15 left-65 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-indigo-400 text-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(129,140,248,0.4)] hover:scale-110 transition-transform cursor-help" title="Volets Motorisés">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* 3. Maps/Presence (Top Center-Right) */}
            <div className="absolute top-20 left-120 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-blue-400 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(96,165,250,0.4)] hover:scale-110 transition-transform cursor-help" title="Données de Présence">
                <Home className="w-4 h-4" />
              </div>
            </div>

            {/* 4. Radiator/Heating (Middle-Left) */}
            <div className="absolute top-47.5 left-15 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-orange-400 text-orange-400 flex items-center justify-center shadow-[0_0_15px_rgba(251,146,60,0.4)] hover:scale-110 transition-transform cursor-help" title="Température Chauffage">
                <Thermometer className="w-4 h-4" />
              </div>
            </div>

            {/* 5. Padlock (Middle-Right) */}
            <div className="absolute top-47.5 right-17.5 translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 rounded-full bg-slate-900/90 border border-fuchsia-500 text-fuchsia-400 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:scale-110 transition-transform cursor-help" title="Alarme & Accès Sûrs">
                <LockKeyhole className="w-4 h-4" />
              </div>
            </div>

            {/* Smart Sally Hub Floating Widget (Centered at lower third) */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-[#050b18]/95 border-2 border-indigo-500/40 rounded-2xl px-6 py-3.5 shadow-[0_0_35px_rgba(99,102,241,0.5)] flex items-center gap-4 hover:scale-103 transition-transform duration-300">
                {/* Hub LED Gradient Icon */}
                <div className="relative w-11 h-11 rounded-xl bg-linear-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center">
                    <Home className="w-5 h-5 text-indigo-400 animate-pulse" />
                  </div>
                </div>
                
                {/* Node Metadata label */}
                <div className="text-left">
                  <span className="font-display font-black text-slate-100 text-sm tracking-tight block">
                    Logiciel <span className="text-indigo-400">Sally</span>
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-mono tracking-wider text-emerald-400 uppercase leading-none block font-semibold">
                      SOUVERAIN LOCALE CONNECTÉ
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom grid: Triple panel split match mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Card 1: Les limites des solutions actuelles (5/12 grid span) */}
          <article className="lg:col-span-5 bg-[#060a16]/80 border border-slate-900 rounded-3xl p-8 relative flex flex-col justify-between hover:border-slate-800/60 transition-colors text-left overflow-hidden">
            
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 pb-3 border-b border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>Les limites des solutions actuelles</span>
              </h3>
              
              <div className="space-y-5">
                {/* Row 1 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-rose-950/20 border border-rose-900/20 text-rose-400 flex items-center justify-center shrink-0">
                    <CloudOff className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Dépendance au cloud</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Vos données stockées sur des serveurs distants, hors de votre contrôle.
                    </p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-rose-950/20 border border-rose-900/20 text-rose-400 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Abonnements coûteux</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Des frais récurrents qui s&apos;accumulent sans jamais vous appartenir.
                    </p>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-rose-950/20 border border-rose-900/20 text-rose-400 flex items-center justify-center shrink-0">
                    <SlidersHorizontal className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Complexité inutile</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Des interfaces techniques, conçues pour des experts, pas pour le quotidien.
                    </p>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-rose-950/20 border border-rose-900/20 text-rose-400 flex items-center justify-center shrink-0">
                    <EyeOff className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Manque de confidentialité</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Vos habitudes et votre vie privée exploitées à des fins commerciales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Intersecting caret right arrow button on card border */}
            <button 
              onClick={() => onChangePage('solutions')}
              className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/35 transition-all shadow-xl shadow-black z-20 cursor-pointer"
              aria-label="Voir les solutions"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </article>

          {/* Card 2: Notre réponse : Sally Home Connect (4/12 grid span - Highlighted glow card) */}
          <article className="lg:col-span-4 bg-[#050916] border-2 border-[#1e1b4b] rounded-3xl p-8 relative shadow-[0_0_25px_rgba(99,102,241,0.15)] flex flex-col justify-between text-left overflow-hidden">
            
            {/* Glowing decorative light spill */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 pb-3 border-b border-indigo-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span>Notre réponse : <span className="text-indigo-400">Sally Home Connect</span></span>
              </h3>

              <div className="space-y-5">
                {/* Row 1 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-emerald-950/20 border border-emerald-900/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Home className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">100% locale, 100% privée</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Vos données restent chez vous, sur votre réseau local. Aucun cloud, aucune dépendance.
                    </p>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-emerald-950/20 border border-emerald-900/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Achat unique</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Payez une fois, utilisez à vie. Zéro abonnement, zéro surprise.
                    </p>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-emerald-950/20 border border-emerald-900/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <SlidersHorizontal className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Simple et intuitive</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Une interface pensée pour tous, accessible en quelques clics.
                    </p>
                  </div>
                </div>

                {/* Row 4 */}
                <div className="flex items-start gap-4">
                  <div className="p-2 w-9 h-9 rounded-full bg-emerald-950/20 border border-emerald-900/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <LockKeyhole className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Sécurité et liberté</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Vous gardez le contrôle total sur votre maison et vos informations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </article>

          {/* Card 3: Core Quote Block & Conçue en France Map (3/12 grid span) */}
          <article className="lg:col-span-3 bg-[#060a16]/80 border border-slate-900 rounded-3xl p-6 relative flex flex-col justify-between hover:border-slate-800/60 transition-colors text-left overflow-hidden">
            
            {/* Elegant double-quotes decoration inside quote card */}
            <span className="text-[75px] text-indigo-500/10 font-serif absolute -top-3 -left-1 select-none pointer-events-none font-bold leading-none">
              “
            </span>
            
            <div className="space-y-4 pt-8 relative z-10">
              <p className="text-slate-300 font-light text-xs italic leading-relaxed">
                Nous croyons en une domotique éthique, respectueuse de votre vie privée et conçue pour améliorer votre quotidien.
              </p>
            </div>

            {/* Conçue en France Badge Match */}
            <div className="border-t border-white/5 pt-6 mt-6 flex flex-col gap-4 relative z-10">
              <div className="flex items-center gap-3">
                {/* Round French Flag circle */}
                <div className="w-5 h-5 rounded-full overflow-hidden flex shrink-0 border border-white/10 shadow-sm">
                  <div className="w-1/3 h-full bg-[#002395]" />
                  <div className="w-1/3 h-full bg-white" />
                  <div className="w-1/3 h-full bg-[#ED2939]" />
                </div>
                <div>
                  <p className="text-slate-200 font-bold text-xs leading-none">Conçue en France</p>
                  <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mt-1">avec passion</p>
                </div>
              </div>

              {/* Minimalist vector map projection silhouette in the background */}
              <svg className="w-20 h-20 text-indigo-500/10 absolute right-1 bottom-1 pointer-events-none fill-none stroke-current" viewBox="0 0 100 100" strokeWidth="1">
                <path d="M 50,15 L 75,22 L 85,55 L 68,85 L 32,85 L 15,55 L 25,22 Z" strokeDasharray="3 2" />
                <circle cx="50" cy="50" r="1.5" className="fill-indigo-500 text-indigo-400" />
              </svg>
            </div>

          </article>

        </div>

        {/* Horizontal bottom row: 4 features bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-900/80 text-left">
          
          {/* Benefit 1 */}
          <div className="flex items-center gap-3">
            <div className="p-2 w-9 h-9 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Protection des données</h4>
              <p className="text-[10px] text-slate-500 font-medium">Vos données restent chez vous</p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-3">
            <div className="p-2 w-9 h-9 rounded-xl bg-indigo-950/25 border border-indigo-900/30 text-indigo-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Performance locale</h4>
              <p className="text-[10px] text-slate-500 font-medium">Rapide et fiable même sans Internet</p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-3">
            <div className="p-2 w-9 h-9 rounded-xl bg-violet-950/20 border border-violet-900/25 text-violet-400 flex items-center justify-center shrink-0">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Compatibilité maximale</h4>
              <p className="text-[10px] text-slate-500 font-medium">Zigbee, EnOcean, Wi-Fi, MQTT...</p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="flex items-center gap-3">
            <div className="p-2 w-9 h-9 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-200">Évolutif et durable</h4>
              <p className="text-[10px] text-slate-500 font-medium">Mises à jour régulières et gratuites</p>
            </div>
          </div>

        </div>

      </section>

      {/* ================= UNE JOURNÉE AVEC SALLY ================= */}
      <section className="relative bg-slate-950/40 border-y border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">Scénarios du quotidien</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">Une journée avec Sally.</h2>
            <p className="text-slate-400 font-light leading-relaxed">
              Sally automatise les gestes simples de la maison pour vous faire gagner en confort au quotidien à la seconde près.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {scenarios.map((scenario) => (
              <article 
                key={scenario.title} 
                className="bg-slate-950/60 border border-slate-900 rounded-2xl p-6.5 hover:border-indigo-600/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => handleApplyScenario(scenario.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {scenario.title}
                    </h3>
                    <span className="text-[10px] bg-slate-900 text-slate-500 border border-slate-800 px-2.5 py-0.5 rounded-full font-mono uppercase">
                      Cliquez
                    </span>
                  </div>
                  
                  <ul className="space-y-2.5">
                    {scenario.items.map((item, i) => (
                      <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-indigo-400 mt-1 text-xs">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-900/80 text-[10px] font-mono text-slate-500 leading-normal">
                  {scenario.description}
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ================= BÉNÉFICES ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">Ce que Sally vous apporte</p>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 leading-tight">
              Une maison plus confortable,<br />
              <span className="text-indigo-400 font-bold">plus simple et plus sûre.</span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              Sally centralise les fonctions essentielles de votre logement de façon unifiée : lumières, volets, chauffage, accès et équipements connectés.
            </p>
            
            <button 
              onClick={() => onChangePage('solutions')}
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-all group cursor-pointer focus:outline-none"
            >
              <span>Voir les fonctionnalités de la console</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">
              <div className="p-2 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">
                <Lightbulb className="w-full h-full" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Confort</h3>
              <p className="text-xs text-slate-400 mt-2">Les lumières et les volets s&apos;adaptent intelligemment à votre rythme biologique.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">
              <div className="p-2 w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-4">
                <Thermometer className="w-full h-full" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Économies</h3>
              <p className="text-xs text-slate-400 mt-2">Le chauffage et la climatisation fonctionnent uniquement quand c&apos;est vraiment nécessaire.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">
              <div className="p-2 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
                <ShieldCheck className="w-full h-full" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Sécurité</h3>
              <p className="text-xs text-slate-400 mt-2">Gardez un œil constant et privé sur l&apos;état global de votre habitat à tout instant.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">
              <div className="p-2 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4">
                <SlidersHorizontal className="w-full h-full" />
              </div>
              <h3 className="text-base font-bold text-slate-200">Automatisation</h3>
              <p className="text-xs text-slate-400 mt-2">Déléguez les gestes quotidiens et répétitifs à des capteurs invisibles et autonomes.</p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= PUBLICS ================= */}
      <section className="relative bg-slate-950/40 border-y border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">Accessible à tous</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">Sally s&apos;adapte à chaque besoin.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <article className="bg-[#0b0f19] border border-slate-900 p-8 rounded-2xl">
              <div className="p-3 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
                <HeartHandshake className="w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Pour les seniors</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Plus d&apos;autonomie, moins de contraintes quotidiennes, avec une interface simplifiée, très contrastée et hautement rassurante.
              </p>
            </article>

            <article className="bg-[#0b0f19] border border-slate-900 p-8 rounded-2xl">
              <div className="p-3 w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6">
                <Users className="w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Pour les proches</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Assurez le confort et la sécurité d&apos;un parent âgé ou dépendant sans être intrusif grâce à nos alertes passives.
              </p>
            </article>

            <article className="bg-[#0b0f19] border border-slate-900 p-8 rounded-2xl">
              <div className="p-3 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
                <Accessibility className="w-full h-full" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Pour l&apos;autonomie PMR</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Contrôle par scénarios, voix locale intégrée, et commutateurs adaptés à portée de main sous toutes circonstances.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* ================= TECHNOLOGIES ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">Technologies compatibles</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">EnOcean, Zigbee et commande vocale.</h2>
          <p className="text-slate-400 font-light max-w-2xl mx-auto">
            La technologie reste puissante sous le capot, mais elle s&apos;efface complètement pour l&apos;utilisateur au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((item) => (
            <article 
              key={item.title} 
              className="bg-linear-to-b from-[#090d16] to-[#04070f] border border-slate-900 rounded-2xl p-8 text-center space-y-4 hover:border-slate-800 transition-colors"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-200">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>

      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-linear-to-tr from-indigo-950/45 to-slate-950 p-8 md:p-14 rounded-3xl border border-indigo-500/20 text-center space-y-8 sally-glow-purple overflow-hidden">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 leading-tight">
              Prêt à découvrir <span className="font-bold text-indigo-400">Sally Home Connect</span> ?
            </h2>
            <p className="text-slate-400 font-light max-w-lg mx-auto">
              Une domotique de confiance, simpliste, locale et de haute longévité conçue uniquement pour sécuriser et valoriser votre foyer.
            </p>
          </div>

          <div className="flex justify-center relative z-10">
            <button 
              onClick={() => onOpenCheckout('Licence Sally OS', 79)}
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>Réserver mon accès</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
