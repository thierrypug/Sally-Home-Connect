/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Home, Shield, Smartphone, ArrowRight, Sun, Moon, Sparkles, Volume2, Bell, Power, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { HouseState, ActivityNotification } from '../types';

interface InteractiveHeroProps {
  houseState: HouseState;
  setHouseState: (state: HouseState | ((prev: HouseState) => HouseState)) => void;
  triggerNotification: (msg: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
  onOpenCheckout: (planName: string, price: number) => void;
}

import HERO_HOUSE_IMAGE from '../assets/images/sally_hero_house_new_1780924228781.png';

export default function InteractiveHero({ houseState, setHouseState, triggerNotification, onOpenCheckout }: InteractiveHeroProps) {
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Apply scenario preset
  const applyScenario = (scenario: 'soir' | 'depart' | 'nuit' | 'cinema') => {
    setHouseState((prev) => {
      let next = { ...prev, activeScenario: scenario };
      if (scenario === 'soir') {
        next.salonLights = true;
        next.cuisineLights = true;
        next.exterieurLights = true;
        next.chambreLights = false;
        next.voletsOpenPercent = 100;
        next.chauffageTemp = 21.5;
        next.alarmActive = false;
        triggerNotification("Scénario 'Soirée' activé : ambiance chaleureuse.", "success");
      } else if (scenario === 'depart') {
        next.salonLights = false;
        next.cuisineLights = false;
        next.exterieurLights = false;
        next.chambreLights = false;
        next.voletsOpenPercent = 0;
        next.chauffageTemp = 17.0;
        next.alarmActive = true;
        triggerNotification("Scénario 'Départ' : extinction complète et alarme armée.", "warning");
      } else if (scenario === 'nuit') {
        next.salonLights = false;
        next.cuisineLights = false;
        next.exterieurLights = false;
        next.chambreLights = true;
        next.voletsOpenPercent = 10;
        next.chauffageTemp = 18.5;
        next.alarmActive = true;
        triggerNotification("Scénario 'Nuit' : lumières éteintes, température abaissée.", "info");
      } else if (scenario === 'cinema') {
        next.salonLights = true;
        next.cuisineLights = false;
        next.exterieurLights = false;
        next.chambreLights = false;
        next.voletsOpenPercent = 30; // partly closed
        next.chauffageTemp = 20.0;
        next.alarmActive = false;
        triggerNotification("Scénario 'Cinéma' : volets tamisés, lumières tamisées.", "success");
      }
      return next;
    });
  };

  // Demo auto-runner
  useEffect(() => {
    if (!isPlayingDemo) return;

    const steps = [
      () => applyScenario('soir'),
      () => {
        setHouseState(prev => ({ ...prev, chauffageTemp: 23.5 }));
        triggerNotification("Ajustement intelligent de la température à 23.5°C.", "info");
      },
      () => applyScenario('cinema'),
      () => {
        setHouseState(prev => ({ ...prev, salonLights: false }));
        triggerNotification("Extinction des projecteurs, début du film.", "success");
      },
      () => applyScenario('depart'),
    ];

    const timer = setInterval(() => {
      if (demoStep < steps.length) {
        steps[demoStep]();
        setDemoStep(prev => prev + 1);
      } else {
        setIsPlayingDemo(false);
        setDemoStep(0);
        triggerNotification("Démonstration terminée. Reprenez le contrôle !", "success");
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlayingDemo, demoStep]);

  const startDemo = () => {
    setIsPlayingDemo(true);
    setDemoStep(0);
    triggerNotification("Lancement du mode démo automatique...", "info");
  };

  const toggleLight = (type: 'salon' | 'cuisine' | 'chambre' | 'exterieur') => {
    setHouseState(prev => {
      const field = `${type}Lights` as keyof HouseState;
      const newValue = !prev[field];
      triggerNotification(
        `Lumière ${type === 'salon' ? 'Salon' : type === 'cuisine' ? 'Cuisine' : type === 'chambre' ? 'Chambre' : 'Extérieur'} ${newValue ? 'allumée' : 'éteinte'}.`, 
        newValue ? 'success' : 'info'
      );
      return { 
        ...prev, 
        [field]: newValue,
        activeScenario: 'idle'
      };
    });
  };

  const adjustTemp = (change: number) => {
    setHouseState(prev => {
      const nextTemp = Math.round((prev.chauffageTemp + change) * 10) / 10;
      if (nextTemp < 15 || nextTemp > 28) return prev;
      return { ...prev, chauffageTemp: nextTemp };
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden">
      {/* Background glow filters */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column – Copywriting */}
        <div className="lg:col-span-6 space-y-6 text-left" id="hero-texts">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-mono text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>SOLUTION FRANÇAISE 100% LOCALE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium leading-[1.1] tracking-tight">
            Sally Home <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sally-purple via-sally-blue to-cyan-400 sally-text-glow font-bold">
              Connect
            </span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-slate-200">
            La domotique locale, libre et sans abonnement.
          </p>

          <p className="text-slate-400 max-w-lg leading-relaxed">
            Prenez le contrôle total de votre maison avec une solution souveraine, 100% autonome et sécurisée. Vos données restent privées, aucun abonnement requis, aucune connexion cloud externe obligatoire.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#tarifs" className="px-6 py-3.5 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 font-medium rounded-xl text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2">
              <span>Découvrir Sally</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button 
              onClick={startDemo}
              disabled={isPlayingDemo}
              className={`px-6 py-3.5 border ${isPlayingDemo ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300' : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-600'} font-medium rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`}
            >
              <Play className={`w-4 h-4 ${isPlayingDemo ? 'animate-ping' : ''}`} />
              <span>{isPlayingDemo ? 'Démo en cours...' : 'Voir la démo'}</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
            <div>
              <div className="text-2xl font-display font-bold text-slate-100 font-mono">0€</div>
              <div className="text-xs text-slate-400">Abonnement par mois</div>
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-green-500 font-mono">100%</div>
              <div className="text-xs text-slate-400">Respect de la vie privée</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-display font-bold text-cyan-400 font-mono">&lt; 15ms</div>
              <div className="text-xs text-slate-400">Temps de réponse local</div>
            </div>
          </div>
        </div>

        {/* Right column – House + Interactive Smartphone Mockup */}
        <div className="lg:col-span-6 flex flex-col justify-center relative min-h-[520px] md:min-h-[600px] w-full" id="hero-simulator">
          
          {/* House Ambient Rendering Window – Expanded & blended seamlessly */}
          <div className="w-full h-[400px] md:h-[480px] rounded-[2rem] overflow-hidden border border-slate-800/80 bg-slate-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative transition-all duration-300">
            <img 
              src={HERO_HOUSE_IMAGE} 
              alt="Maison moderne connectée" 
              className="w-full h-full object-cover select-none scale-105 transition-transform duration-700 hover:scale-100"
              referrerPolicy="no-referrer"
            />
            {/* Dark Filter Overlay based on shutters */}
            <div 
              className="absolute inset-0 bg-black/75 transition-opacity duration-[800ms] pointer-events-none" 
              style={{ opacity: Math.max(0, (100 - houseState.voletsOpenPercent) / 100 * 0.7) }}
            />

            {/* Seamless gradients to blend the villa and trees behind with the absolute dark environment */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/40 via-transparent to-slate-950/30 pointer-events-none" />

            {/* Glowing Lights Overlays (simulated house zones) */}
            {/* Salon Area Light */}
            <div 
              className="absolute left-[54%] top-[45%] w-[18%] h-[20%] bg-linear-to-b from-amber-400/50 to-transparent rounded-full blur-xl pointer-events-none transition-all duration-500"
              style={{ 
                opacity: houseState.salonLights ? 1 : 0,
                transform: houseState.salonLights ? 'scale(1.2)' : 'scale(0.8)'
              }}
            />
            
            {/* Kitchen Area Light */}
            <div 
              className="absolute left-[30%] top-[55%] w-[15%] h-[15%] bg-linear-to-b from-yellow-400/50 to-transparent rounded-full blur-lg pointer-events-none transition-all duration-500"
              style={{ 
                opacity: houseState.cuisineLights ? 1 : 0,
                transform: houseState.cuisineLights ? 'scale(1.1)' : 'scale(0.9)'
              }}
            />

            {/* Bedroom Area Light (Upstairs) */}
            <div 
              className="absolute left-[45%] top-[25%] w-[22%] h-[18%] bg-linear-to-b from-indigo-400/40 to-transparent rounded-full blur-xl pointer-events-none transition-all duration-500"
              style={{ 
                opacity: houseState.chambreLights ? 1 : 0, 
                backgroundColor: houseState.activeScenario === 'cinema' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(165, 180, 252, 0.3)',
                transform: houseState.chambreLights ? 'scale(1.1)' : 'scale(0.9)'
              }}
            />

            {/* Exterior Outdoor Lighting (LED columns) */}
            <div 
              className="absolute inset-0 bg-blue-500/10 pointer-events-none transition-opacity duration-500"
              style={{ opacity: houseState.exterieurLights ? 1 : 0 }}
            />
            <div 
              className="absolute left-[72%] top-[60%] w-[4%] h-[25%] bg-blue-400/50 rounded-full blur-md pointer-events-none transition-all duration-500"
              style={{ opacity: houseState.exterieurLights ? 1 : 0 }}
            />
            <div 
              className="absolute left-[18%] top-[68%] w-[4%] h-[20%] bg-blue-400/40 rounded-full blur-md pointer-events-none transition-all duration-500"
              style={{ opacity: houseState.exterieurLights ? 1 : 0 }}
            />

            {/* Active Preset Overlay / Weather Tag */}
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${houseState.alarmActive ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
              <span className="font-mono text-slate-300">
                {houseState.alarmActive ? "Alarme Armée" : "Maison Sécurisée"}
              </span>
            </div>

            <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono text-indigo-300">
              Ext: 12.4°C
            </div>
          </div>

          {/* Smartphone Simulator - Floats beautifully over the villa to the bottom right, with massive smooth drop shadows */}
          <div className="absolute right-0 md:-right-4 bottom-[-20px] md:bottom-[-30px] w-[260px] h-[460px] bg-slate-900 rounded-[38px] border-[5px] border-slate-800 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95)] p-2.5 flex flex-col overflow-hidden select-none z-20 hover:translate-y-[-8px] transition-transform duration-300">
            {/* Speaker & Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-800 rounded-full mb-1" />
              <div className="w-2.5 h-2.5 bg-slate-950 rounded-full ml-2 mb-1" />
            </div>

            {/* Simulated Phone UI Container */}
            <div className="flex-1 bg-slate-950 rounded-[28px] overflow-hidden p-3.5 pt-7 flex flex-col justify-between text-left font-sans">
              
              {/* Header inside phone screen */}
              <div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono font-medium mb-2.5">
                  <span>Sally App v1.5</span>
                  <span>14:32 • Local</span>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xs text-slate-400 font-mono">Ma maison</h3>
                    <p className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Sallanches, FR</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-500 font-mono">Intérieur</p>
                    <p className="text-sm font-bold text-amber-400 font-mono flex items-center gap-0.5 justify-end">
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>{houseState.chauffageTemp.toFixed(1)}°C</span>
                    </p>
                  </div>
                </div>

                {/* Scénarios Chips Block */}
                <div className="mb-4">
                  <p className="text-[10px] text-slate-400 font-semibold mb-2 tracking-wider uppercase font-mono">Scénarios</p>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <button 
                      onClick={() => applyScenario('soir')}
                      className={`py-1.5 px-2 rounded-lg flex items-center gap-1.5 border transition-all ${houseState.activeScenario === 'soir' ? 'bg-indigo-600 border-indigo-500 text-white font-medium' : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:bg-slate-800'}`}
                    >
                      <span className="text-amber-400 text-xs">🔥</span>
                      <span className="truncate">Soirée</span>
                    </button>
                    <button 
                      onClick={() => applyScenario('depart')}
                      className={`py-1.5 px-2 rounded-lg flex items-center gap-1.5 border transition-all ${houseState.activeScenario === 'depart' ? 'bg-sky-700 border-sky-600 text-white font-medium' : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:bg-slate-800'}`}
                    >
                      <span className="text-sky-300 text-xs">🚗</span>
                      <span className="truncate">Départ</span>
                    </button>
                    <button 
                      onClick={() => applyScenario('nuit')}
                      className={`py-1.5 px-2 rounded-lg flex items-center gap-1.5 border transition-all ${houseState.activeScenario === 'nuit' ? 'bg-violet-950 border-violet-800 text-indigo-200 font-medium' : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:bg-slate-800'}`}
                    >
                      <span className="text-indigo-400 text-xs">🌙</span>
                      <span className="truncate">Nuit</span>
                    </button>
                    <button 
                      onClick={() => applyScenario('cinema')}
                      className={`py-1.5 px-2 rounded-lg flex items-center gap-1.5 border transition-all ${houseState.activeScenario === 'cinema' ? 'bg-purple-900 border-purple-800 text-white font-medium' : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:bg-slate-800'}`}
                    >
                      <span className="text-pink-400 text-xs">🎬</span>
                      <span className="truncate">Cinéma</span>
                    </button>
                  </div>
                </div>

                {/* Pièces Quick controls inside phone */}
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-400 font-semibold mb-1.5 tracking-wider uppercase font-mono">Pièces / Appareils</p>
                  
                  {/* Salon switch */}
                  <div className="bg-slate-900/80 border border-slate-800/50 p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-lg ${houseState.salonLights ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                        💡
                      </span>
                      <div>
                        <p className="font-medium text-slate-200 text-xs">Salon</p>
                        <p className="text-[9px] text-slate-500 font-mono">Éclairage principal</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleLight('salon')}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${houseState.salonLights ? 'bg-indigo-600' : 'bg-slate-800'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${houseState.salonLights ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Volets control slider simulated */}
                  <div className="bg-slate-900/80 border border-slate-800/50 p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-lg ${houseState.voletsOpenPercent > 0 ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                        🪟
                      </span>
                      <div>
                        <p className="font-medium text-slate-200 text-xs">Volets</p>
                        <p className="text-[9px] text-slate-500 font-mono">
                          {houseState.voletsOpenPercent === 100 ? 'Entièrement ouverts' : houseState.voletsOpenPercent === 0 ? 'Fermés' : `Ouverts à ${houseState.voletsOpenPercent}%`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setHouseState(prev => ({ ...prev, voletsOpenPercent: Math.max(0, prev.voletsOpenPercent - 25), activeScenario: 'idle' }))}
                        className="p-1 bg-slate-800 hover:bg-slate-700/80 text-slate-300 rounded"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-[9px] min-w-[24px] text-center text-slate-400">
                        {houseState.voletsOpenPercent}%
                      </span>
                      <button 
                        onClick={() => setHouseState(prev => ({ ...prev, voletsOpenPercent: Math.min(100, prev.voletsOpenPercent + 25), activeScenario: 'idle' }))}
                        className="p-1 bg-slate-800 hover:bg-slate-700/80 text-slate-300 rounded"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Thermostat controls */}
                  <div className="bg-slate-900/80 border border-slate-800/50 p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
                        🌡️
                      </span>
                      <div>
                        <p className="font-medium text-slate-200 text-xs">Chauffage</p>
                        <p className="text-[9px] text-slate-500 font-mono">Consigne de chauffe</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => adjustTemp(-0.5)} className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded flex items-center justify-center">-</button>
                      <span className="font-mono text-[10px] text-slate-200 min-w-[32px] text-center">{houseState.chauffageTemp.toFixed(1)}°</span>
                      <button onClick={() => adjustTemp(0.5)} className="w-5 h-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded flex items-center justify-center">+</button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom App Bar index inside phone */}
              <div className="border-t border-slate-900/60 pt-2 flex justify-around items-center text-[9px] text-slate-500">
                <div className="flex flex-col items-center gap-0.5 text-indigo-400 font-medium">
                  <Home className="w-3.5 h-3.5" />
                  <span>Maison</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 hover:text-slate-200 cursor-pointer">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Sécurité</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 hover:text-slate-200 cursor-pointer" onClick={() => onOpenCheckout('Licence Sally OS', 79)}>
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Obtenir</span>
                </div>
              </div>

            </div>
          </div>

          {/* Floating badge for local processing */}
          <div className="absolute -left-4 bottom-14 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/50 shadow-xl max-w-[200px] text-left hidden sm:block z-30">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <p className="text-xs font-bold text-slate-200">100% Autonome</p>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              Aucun serveur cloud requis. Les scénarios complexes s'exécutent même si internet est coupé.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
