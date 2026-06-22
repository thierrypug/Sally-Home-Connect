/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldCheck, Zap, Layers, Lock, ArrowRight, HelpCircle, Info } from 'lucide-react';

import HUB_IMAGE from '../assets/images/sally_hub_1780921367481.png';

export default function FreedomSection() {
  const [activeInfo, setActiveInfo] = useState<number | null>(null);

  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      title: "Vos données restent chez vous",
      desc: "Aucune donnée n’est stockée à l'extérieur ni partagée. Vos enregistrements caméra, historiques d'activité et habitudes restent à l'intérieur de vos murs.",
      details: "Sally embarque sa propre base de données optimisée. Pas de profilage publicitaire, pas d'intrusion : le respect absolu de votre domicile."
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-400" />,
      title: "Rapide et fiable",
      desc: "Réponse instantanée en moins de 15 microsecondes. Vos capteurs et interrupteurs fonctionnent instantanément, même sans connexion internet.",
      details: "Le réseau domotique local de Sally traite les requêtes directement à la source, sans transiter par des datacenters à l'autre bout de la planète."
    },
    {
      icon: <Layers className="w-6 h-6 text-indigo-400" />,
      title: "Ouverte et évolutive",
      desc: "Compatible avec de nombreux protocoles et des milliers de périphériques du marché sans être prisonnier d'un constructeur unique.",
      details: "Mixez du matériel Philips Hue, Somfy, Xiaomi, Legrand, EnOcean, Shelly... Sally orchestre tout sous une interface unifiée."
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      title: "Sécurisée",
      desc: "Protection de niveau bancaire contre les intrusions. Mises à jour locales simplifiées et isolées automatiquement d'Internet.",
      details: "Notre logiciel utilise des mécanismes de chiffrement industriel et un pare-feu intégré qui cloisonne vos objets connectés du web public."
    }
  ];

  const protocols = [
    { name: "Zigbee 3.0", color: "from-amber-500/20 to-amber-700/20 border-amber-500/30 text-amber-300" },
    { name: "EnOcean", color: "from-cyan-500/20 to-indigo-700/20 border-cyan-500/30 text-cyan-300" },
    { name: "Wi-Fi local", color: "from-blue-500/20 to-blue-700/20 border-blue-500/30 text-blue-300" },
    { name: "MQTT Protocols", color: "from-purple-500/20 to-purple-700/20 border-purple-500/30 text-purple-300" }
  ];

  return (
    <section id="compatibilite" className="relative py-20 bg-slate-950/30 border-t border-slate-900/60 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-112.5 h-112.5 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-87.5 h-87.5 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Freedom Benefits Layout */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight">
            Conçue pour votre <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-sally-purple to-cyan-400 sally-text-glow font-bold">
              liberté
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Sally fonctionne localement sur votre propre réseau privé. Pas de serveurs à distance obligatoires, pas de dépendance technique, pas de limites d'utilisation.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/30 border border-slate-800/60 hover:border-slate-700/85 hover:bg-slate-900/60 p-6 rounded-2xl text-left transition-all duration-300 group hover:-translate-y-1 relative"
            >
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl w-fit mb-5 group-hover:bg-indigo-950/50 group-hover:border-indigo-500/30 transition-all">
                {benefit.icon}
              </div>
              <h3 className="font-display font-semibold text-slate-100 text-lg mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {benefit.desc}
              </p>
              
              <button 
                onClick={() => setActiveInfo(activeInfo === idx ? null : idx)}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-mono hover:text-indigo-300 transition-colors mt-auto cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{activeInfo === idx ? "Réduire les détails" : "En savoir plus"}</span>
              </button>

              {/* Collapsed Detail Pane inside Benefit Card */}
              {activeInfo === idx && (
                <div className="absolute inset-0 bg-slate-950 border border-indigo-500/40 rounded-2xl p-6 flex flex-col justify-between text-left shadow-2xl z-20 animate-fade-in">
                  <div>
                    <h4 className="font-display font-bold text-indigo-400 text-sm md:text-base mb-2">
                       {benefit.title}
                    </h4>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                      {benefit.details}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveInfo(null)}
                    className="mt-4 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 rounded-lg self-end"
                  >
                    Fermer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Protocols compatibility card block */}
        <div className="bg-linear-to-r from-slate-950 via-slate-900 to-indigo-950/30 border border-slate-800 p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />
          
          <div className="lg:col-span-7 space-y-6 relative z-10">
            <span className="text-xs font-mono font-medium tracking-widest text-sally-blue uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              COMPATIBLE AVEC VOS APPAREILS
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-medium text-slate-100 leading-tight">
              Zigbee, EnOcean <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400 font-bold">
                et bien plus encore
              </span>
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Sally intègre des émetteurs-récepteurs radio de dernière génération capables de communiquer nativement avec les protocoles phares de la maison intelligente. Plus besoin de multiplier les boîtiers intermédiaires.
            </p>

            {/* Glowing Tech Protocols Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {protocols.map((proto, idx) => (
                <div 
                  key={idx} 
                  className={`px-4 py-2 rounded-xl text-xs font-mono border bg-linear-to-r ${proto.color} shadow-sm`}
                >
                  {proto.name}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href="#usages" className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-semibold group cursor-pointer">
                <span>Voir les 2400+ appareils compatibles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Glowing Hub illustration inside card */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              
              {/* Background glowing shadows behind Hub image */}
              <div className="absolute inset-0 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" />
              <div className="absolute w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl" />

              {/* Generated image */}
              <img 
                src={HUB_IMAGE} 
                alt="Sally 3D Home Hub" 
                className="w-full h-full object-contain select-none md:scale-110 relative z-10 hover:rotate-3 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic light halos */}
              <div className="absolute top-1/4 left-1/4 w-3.5 h-3.5 bg-blue-400 rounded-full blur-sm animate-ping duration-3000 pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-3.5 h-3.5 bg-emerald-400 rounded-full blur-sm animate-ping duration-4000 pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
