/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Check, ArrowRight, Shield, Monitor, Lightbulb, Volume2, Bell, Cpu, Compass } from 'lucide-react';
import { HouseState, ActivityNotification } from '../types';

interface DashboardSectionProps {
  houseState: HouseState;
  setHouseState: (state: HouseState | ((prev: HouseState) => HouseState)) => void;
  notifications: ActivityNotification[];
  triggerNotification: (msg: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
}

export default function DashboardSection({ houseState, setHouseState, notifications, triggerNotification }: DashboardSectionProps) {
  const [activeTab, setActiveTab] = useState<'accueil' | 'pieces' | 'scenarios' | 'reglages'>('accueil');

  const checkmarks = [
    "Scénarios illimités réactifs au soleil",
    "Tableaux de bord personnalisables par glisser-déposer",
    "Commandes vocales hors-ligne locales (français)",
    "Notifications instantanées en temps réel sur mobile"
  ];

  // Calculate dynamic average usage wattage based on current house state!
  const currentWattage = useMemo(() => {
    let base = 120; // Standby devices/fridge/etc.
    if (houseState.salonLights) base += 180; // Main chandelier + accent LED
    if (houseState.cuisineLights) base += 220; // Spots kitchen + exhaust hood
    if (houseState.chambreLights) base += 90; // Smart bedside lamps
    if (houseState.exterieurLights) base += 250; // Garden projectors
    
    // Heating draw (dynamic heating demand)
    const heatingFactor = Math.max(0, (houseState.chauffageTemp - 18) * 350);
    base += Math.round(heatingFactor);
    return base;
  }, [houseState]);

  // Generate SVG path for energy wave chart based on current wattage to simulate active draw
  const chartPath = useMemo(() => {
    const scale = Math.min(2.2, Math.max(0.6, currentWattage / 600));
    // Core points of wave path
    const p1_y = 65 - (15 * scale);
    const p2_y = 40 - (25 * scale);
    const p3_y = 75 - (10 * scale);
    const p4_y = 25 - (20 * scale);
    const p5_y = 55 - (15 * scale);
    
    return `M 0 90 Q 20 ${p1_y}, 40 50 T 80 ${p2_y} T 120 ${p3_y} T 160 ${p4_y} T 200 ${p5_y} L 200 100 L 0 100 Z`;
  }, [currentWattage]);

  const toggleState = (field: keyof HouseState) => {
    setHouseState(prev => {
      const val = !prev[field];
      let label = "Interrupteur";
      if (field === 'salonLights') label = "Lumières Salon";
      if (field === 'cuisineLights') label = "Lumières Cuisine";
      if (field === 'chambreLights') label = "Lumières Chambre";
      if (field === 'exterieurLights') label = "Lumière Extérieure";
      if (field === 'alarmActive') label = "Système d'Alarme";
      
      triggerNotification(`${label} ${val ? 'activé(es)' : 'désactivé(es)'}.`, val ? 'success' : 'info');
      
      return {
        ...prev,
        [field]: val,
        activeScenario: 'idle'
      };
    });
  };

  const setShutters = (pct: number) => {
    setHouseState(prev => {
      triggerNotification(`Volets ajustés à ${pct}%.`, 'info');
      return { ...prev, voletsOpenPercent: pct, activeScenario: 'idle' };
    });
  };

  const setTemp = (val: number) => {
    setHouseState(prev => {
      triggerNotification(`Chauffage réglé sur ${val}°C.`, 'info');
      return { ...prev, chauffageTemp: val, activeScenario: 'idle' };
    });
  };

  return (
    <section id="usages" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Content Description */}
        <div className="lg:col-span-5 text-left space-y-6">
          <span className="text-xs font-mono font-medium tracking-widest text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            PUISSANTE & INTELLIGENTE
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight leading-tight">
            Tout votre logement <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sally-blue to-teal-400 sally-text-glow font-bold">
              sous contrôle
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            Éclairage intelligent, stores roulants, régulation thermique, suivi énergétique, sécurité périmétrique... Sally centralise l'intégralité des équipements de votre lieu de vie sous un tableau de bord puissant, moderne et ultra-fluide.
          </p>

          {/* Quick Checkmarks */}
          <ul className="space-y-3.5 pt-2">
            {checkmarks.map((text, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="p-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/50 mt-1 shrink-0">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="text-slate-200 text-sm md:text-base font-medium">
                  {text}
                </span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <a href="#tarifs" className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-100 text-sm font-semibold rounded-xl inline-flex items-center gap-2 group transition-all duration-200">
              <span>Voir toutes les fonctionnalités</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column - Desktop Interactive Web Interface Dashboard Mockup */}
        <div className="lg:col-span-7 flex justify-center">
          
          {/* Main Browser Window frame styling */}
          <div className="w-full max-w-[620px] bg-slate-950 border border-slate-800/90 rounded-2xl shadow-2xl overflow-hidden text-left flex flex-col h-[520px] sally-glow-blue relative">
            
            {/* Browser top title bar */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow" />
                <span className="text-slate-500 font-mono text-[10px] ml-4">https://sally.local/dashboard</span>
              </div>
              <div className="px-2.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[9px] font-mono text-indigo-300">
                SÉCURISÉ (SSL LOCAL)
              </div>
            </div>

            {/* Main Grid App Layout inside Browser */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Desktop Sidebar tabs */}
              <div className="w-[124px] md:w-[150px] bg-slate-950 border-r border-slate-900 p-3 flex flex-col justify-between shrink-0">
                <div className="space-y-4">
                  {/* Dashboard mini logo */}
                  <div className="px-2 pb-2 border-b border-slate-900">
                    <span className="text-xs font-display font-medium text-slate-100 block tracking-tight">Sally Panel</span>
                    <span className="text-[8px] font-mono text-emerald-400">CONNECTÉ</span>
                  </div>

                  {/* Nodes */}
                  <ul className="space-y-1.5">
                    <li>
                      <button 
                        onClick={() => setActiveTab('accueil')}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center gap-2 text-xs font-medium transition-all ${activeTab === 'accueil' ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Accueil</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('pieces')}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center gap-2 text-xs font-medium transition-all ${activeTab === 'pieces' ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Pièces</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('scenarios')}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center gap-2 text-xs font-medium transition-all ${activeTab === 'scenarios' ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Scénarios</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('reglages')}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center gap-2 text-xs font-medium transition-all ${activeTab === 'reglages' ? 'bg-indigo-600/10 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        <span>Réglages</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Local environment specs */}
                <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-900 text-[8px] font-mono text-zinc-500">
                  <p>CPU Temp: 42°C</p>
                  <p>RAM: 14% [RASPBERRY]</p>
                </div>
              </div>

              {/* Main Content Area in browser mockup */}
              <div className="flex-1 bg-slate-950 p-4.5 overflow-y-auto space-y-4">
                
                {activeTab === 'accueil' && (
                  <>
                    {/* Welcome row & status */}
                    <div className="flex justify-between items-center pb-2 border-b border-slate-900/60">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-100">Tableau de bord</h4>
                        <p className="text-[10px] text-slate-500">Statut de la maison • Salon connecté</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 rounded-full font-medium">
                          OK: 0 LATENCE
                        </span>
                      </div>
                    </div>

                    {/* Simple Quick Grid Cards */}
                    <div className="grid grid-cols-2 gap-3.5">
                      
                      {/* Éclairage Dashboard Widget */}
                      <div className="bg-slate-900/60 border border-slate-800/60 p-3 rounded-xl flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                          <span className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-xs font-bold">💡 Éclairage</span>
                          <span className="text-[9px] text-slate-500 font-mono">
                            {((houseState.salonLights ? 1 : 0) + (houseState.cuisineLights ? 1 : 0) + (houseState.chambreLights ? 1 : 0) + (houseState.exterieurLights ? 1 : 0))}/4 Zones
                          </span>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px]">Salon</span>
                            <button 
                              onClick={() => toggleState('salonLights')} 
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono border transition-colors ${houseState.salonLights ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                            >
                              {houseState.salonLights ? 'ALLUMÉ' : 'ÉTEINT'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400 text-[10px]">Cuisine</span>
                            <button 
                              onClick={() => toggleState('cuisineLights')} 
                              className={`px-1.5 py-0.5 rounded text-[9px] font-mono border transition-colors ${houseState.cuisineLights ? 'bg-amber-600/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                            >
                              {houseState.cuisineLights ? 'ALLUMÉ' : 'ÉTEINT'}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Thermostat Temp Widget */}
                      <div className="bg-slate-900/60 border border-slate-800/60 p-3 rounded-xl flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                          <span className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg text-xs font-bold">🌡️ Chauffage</span>
                          <span className="text-sm font-semibold font-mono text-slate-100">{houseState.chauffageTemp.toFixed(1)}°C</span>
                        </div>
                        <div className="space-y-2 pt-1">
                          <div className="flex gap-1">
                            <button 
                              onClick={() => setTemp(19.0)} 
                              className={`flex-1 py-1 rounded text-[9px] font-mono border transition-colors ${houseState.chauffageTemp === 19.0 ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                            >
                              ÉCO 19°
                            </button>
                            <button 
                              onClick={() => setTemp(21.5)} 
                              className={`flex-1 py-1 rounded text-[9px] font-mono border transition-colors ${houseState.chauffageTemp === 21.5 ? 'bg-orange-500/20 border-orange-500 text-orange-300 font-semibold' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                            >
                              CONF 21.5°
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Power grid custom animated SVG graph (Replaced heavy packages, highly optimized!) */}
                      <div className="bg-slate-900/60 border border-slate-800/60 p-3 rounded-xl col-span-2 space-y-2 relative overflow-hidden">
                        
                        <div className="flex justify-between items-start relative z-10">
                          <div>
                            <span className="p-1 bg-indigo-500/10 text-indigo-400 rounded text-[9px] font-mono font-medium block w-fit mb-1">CAPTEUR LINKY LOCAL</span>
                            <h5 className="text-[10px] text-slate-400">Consommation instantanée</h5>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-mono font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">
                              {currentWattage} <span className="text-xs">W</span>
                            </span>
                          </div>
                        </div>

                        {/* Interactive dynamic Wave Chart in SVG */}
                        <div className="h-16 w-full relative pt-2">
                          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="gradient-wattage" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <path 
                              d={chartPath} 
                              fill="url(#gradient-wattage)" 
                              stroke="#818cf8" 
                              strokeWidth="1.5" 
                              className="transition-all duration-[600ms] ease-out" 
                            />
                          </svg>
                        </div>
                      </div>

                    </div>

                    {/* Simulated live notification logs feeds */}
                    <div className="bg-slate-900/40 border border-slate-850 p-3.5 rounded-xl">
                      <h5 className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Flux d'activité de la maison (Direct local)</span>
                      </h5>
                      <div className="space-y-1.5 max-h-[85px] overflow-y-auto pr-1">
                        {notifications.slice(0, 3).map((notif) => (
                          <div key={notif.id} className="flex justify-between items-center text-[10px] border-b border-slate-900/40 pb-1.5 last:border-b-0">
                            <span className="text-slate-400 font-mono">{notif.time}</span>
                            <span className="text-slate-200 font-medium ml-2 mr-auto truncate">{notif.message}</span>
                            <span className={`px-1 rounded-sm text-[8px] font-mono leading-none ${notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : notif.type === 'warning' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-blue-500/10 text-blue-400'}`}>
                              {notif.type.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'pieces' && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 font-mono uppercase pb-1 border-b border-slate-900">Éclairages de toutes les pièces</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Salon", field: 'salonLights' as keyof HouseState },
                        { label: "Cuisine", field: 'cuisineLights' as keyof HouseState },
                        { label: "Chambre à coucher", field: 'chambreLights' as keyof HouseState },
                        { label: "Projecteur Jardin", field: 'exterieurLights' as keyof HouseState },
                      ].map((lamp, i) => (
                        <div key={i} className="bg-slate-900/55 p-3 rounded-xl flex justify-between items-center border border-slate-850">
                          <span className="text-xs text-slate-300 font-medium">{lamp.label}</span>
                          <button 
                            onClick={() => toggleState(lamp.field)}
                            className={`w-10 h-5.5 rounded-full p-0.5 transition-colors focus:outline-none ${houseState[lamp.field] ? 'bg-indigo-600' : 'bg-slate-800'}`}
                          >
                            <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${houseState[lamp.field] ? 'translate-x-4.5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-xs font-bold text-slate-300 font-mono uppercase pt-2 pb-1 border-b border-slate-900">Stores / Volets</h4>
                    <div className="bg-slate-900/55 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-medium">Position des volets</span>
                      <div className="flex gap-2">
                        {[0, 50, 100].map((val) => (
                          <button 
                            key={val} 
                            onClick={() => setShutters(val)}
                            className={`px-2.5 py-1 text-[10px] rounded font-mono border transition-all ${houseState.voletsOpenPercent === val ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
                          >
                            {val === 0 ? "Fermé 0%" : val === 100 ? "Ouvert 100%" : `Mi-ouvert ${val}%`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'scenarios' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 font-mono uppercase pb-1 border-b border-slate-900">Activer Scénario Domotique global</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Les scénarios ajustent instantanément toutes les lampes, températures et fermetures de la maison d'une simple pression.
                    </p>
                    <div className="grid grid-cols-2 gap-3.5">
                      {[
                        { id: 'soir' as const, label: 'Mode Soirée', emoji: '🔥', desc: 'Salon + Extérieur on, Temp 21.5°' },
                        { id: 'depart' as const, label: 'Mode Départ', emoji: '🚗', desc: 'Extinction complète & alarme armée' },
                        { id: 'nuit' as const, label: 'Mode Nuit', emoji: '🌙', desc: 'Chambre on, volets fermés, Temp 18.5°' },
                        { id: 'cinema' as const, label: 'Mode Cinéma', emoji: '🎬', desc: 'Lumières faibles, volets tamisés 30%' },
                      ].map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => {
                            setHouseState((prev) => {
                              let next = { ...prev, activeScenario: item.id };
                              if (item.id === 'soir') {
                                next.salonLights = true;
                                next.cuisineLights = true;
                                next.exterieurLights = true;
                                next.chambreLights = false;
                                next.voletsOpenPercent = 100;
                                next.chauffageTemp = 21.5;
                                next.alarmActive = false;
                              } else if (item.id === 'depart') {
                                next.salonLights = false;
                                next.cuisineLights = false;
                                next.exterieurLights = false;
                                next.chambreLights = false;
                                next.voletsOpenPercent = 0;
                                next.chauffageTemp = 17.0;
                                next.alarmActive = true;
                              } else if (item.id === 'nuit') {
                                next.salonLights = false;
                                next.cuisineLights = false;
                                next.exterieurLights = false;
                                next.chambreLights = true;
                                next.voletsOpenPercent = 10;
                                next.chauffageTemp = 18.5;
                                next.alarmActive = true;
                              } else if (item.id === 'cinema') {
                                next.salonLights = true;
                                next.cuisineLights = false;
                                next.exterieurLights = false;
                                next.chambreLights = false;
                                next.voletsOpenPercent = 30;
                                next.chauffageTemp = 20.0;
                                next.alarmActive = false;
                              }
                              triggerNotification(`Scénario '${item.label}' lancé.`, 'success');
                              return next;
                            });
                          }}
                          className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${houseState.activeScenario === item.id ? 'bg-indigo-600/25 border-indigo-500/80 sally-glow-purple text-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'}`}
                        >
                          <span className="text-lg">{item.emoji}</span>
                          <div>
                            <p className="text-xs font-semibold text-slate-200">{item.label}</p>
                            <p className="text-[9px] text-slate-400 font-mono mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reglages' && (
                  <div className="space-y-4 text-xs text-slate-300">
                    <h4 className="text-xs font-bold text-slate-300 font-mono uppercase pb-1 border-b border-slate-900">Sécurité & Alarme</h4>
                    <div className="bg-slate-900/55 p-3.5 rounded-xl border border-slate-850 space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-100">Armer l'Alarme Système</p>
                          <p className="text-[10px] text-slate-400">Périmètre de détection extérieur actif</p>
                        </div>
                        <button 
                          onClick={() => toggleState('alarmActive')}
                          className={`px-3 py-1.5 text-[10px] font-mono rounded border transition-colors ${houseState.alarmActive ? 'bg-red-500/20 border-red-500 text-red-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                        >
                          {houseState.alarmActive ? 'ALERTE ACTIVE' : 'ARMEZ ALARME'}
                        </button>
                      </div>
                      <div className="border-t border-slate-950 pt-2 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Sirène connectée compatible</span>
                        <span className="text-emerald-500 font-mono">EN LIGNE</span>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-300 font-mono uppercase pt-2 pb-1 border-b border-slate-900">Serveur Local de Maison</h4>
                    <div className="p-3 bg-slate-900/30 border border-slate-850 rounded-xl space-y-1 text-slate-400 text-[10px] leading-relaxed">
                      <p>✨ Node Version : v22.14.0</p>
                      <p>🔒 Clé secrète de cryptage locale : <span className="font-mono text-[9px] text-[#3b82f6]">AES-256-GCM [ACTIF]</span></p>
                      <p>📡 Portée radio Zigbee amplifiée : <span className="font-mono text-emerald-400">~60m en intérieur</span></p>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
