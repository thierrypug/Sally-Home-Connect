/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Pointer,
  Mic,
  ShieldCheck,
  Heart,
  Lock,
  Headset,
  Sparkles,
  Smartphone,
  ChevronRight,
  PhoneCall,
  Volume2,
  Activity,
  Sun,
  Eye,
} from "lucide-react";

import SENIOR_BG from "../assets/images/sally_senior_background_1781599653686.jpg";
import SALLY_HUB_IMAGE from "../assets/images/sally_hub_1780921367481.png";

export default function SeniorsSection() {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [bgImage, setBgImage] = useState<string>(SENIOR_BG);

  // States for our interactive Senior Tablet simulator
  const [isEmergencySent, setIsEmergencySent] = useState(false);
  const [isOrientationLightsOn, setIsOrientationLightsOn] = useState(false);
  const [isShutterOpen, setIsShutterOpen] = useState(true);
  const [tabletFeedback, setTabletFeedback] = useState<string>(
    "Appuyez sur un bouton géant pour tester l'interface."
  );

  const leftFeatures = [
    {
      title: "Interface intuitive",
      desc: "Tout est clair, simple et accessible.",
      details: "Des boutons de grande taille, des couleurs contrastées et un retour vocal instantané pour éliminer toute hésitation.",
      icon: <Pointer className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />,
    },
    {
      title: "Commandes vocales",
      desc: "Parlez, Sally s'occupe du reste.",
      details: "Aucune application compliquée à manipuler. Dites simplement ce que vous souhaitez et Sally adapte l'éclairage ou sécurise l'habitat localement.",
      icon: <Mic className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />,
    },
    {
      title: "Sécurité renforcée",
      desc: "Détection, alertes et suivi en temps réel.",
      details: "Veille permanente sur les anomalies du quotidien avec notification automatique et immédiate aux proches ou aidants désignés.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />,
    },
    {
      title: "Autonomie préservée",
      desc: "Gardez le contrôle, à votre rythme.",
      details: "Une technologie bienveillante, 100% hors-ligne, qui respecte les habitudes sans jamais s'imposer de manière intrusive.",
      icon: <Heart className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />,
    },
  ];

  const bottomCards = [
    {
      title: "Tout à portée",
      desc: "Contrôlez votre maison où que vous soyez.",
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Sérénité au quotidien",
      desc: "Une maison qui prend soin de vous.",
      icon: <Heart className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: "Données 100 % locales",
      desc: "Vos données restent chez vous.",
      icon: <Lock className="w-5 h-5 text-teal-400" />,
    },
    {
      title: "Support réactif",
      desc: "Une équipe disponible quand vous en avez besoin.",
      icon: <Headset className="w-5 h-5 text-purple-400" />,
    },
  ];

  const triggerTabletAction = (actionType: string) => {
    if (actionType === "emergency") {
      setIsEmergencySent(true);
      setTabletFeedback("Simulation d’alerte activée dans cette démonstration.");
      setTimeout(() => {
        setIsEmergencySent(false);
      }, 5000);
    } else if (actionType === "lights") {
      const nextState = !isOrientationLightsOn;
      setIsOrientationLightsOn(nextState);
      setTabletFeedback(
        nextState 
          ? "Chemin lumineux allumé de la chambre vers la salle de bain." 
          : "Chemin lumineux éteint."
      );
    } else if (actionType === "shutters") {
      const nextState = !isShutterOpen;
      setIsShutterOpen(nextState);
      setTabletFeedback(
        nextState 
          ? "Ouverture automatique des volets motorisés." 
          : "Fermeture des volets motorisés."
      );
    }
  };

  return (
    <div className="relative flex flex-col w-full overflow-x-hidden bg-[#030712] pb-16 text-white text-left">
      
      {/* 1. Header Intro Title Block - Structured exactly like Accessibilité */}
      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 text-left sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs font-extrabold uppercase leading-none tracking-widest text-purple-400">
            Seniors & Maintien à domicile
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Une maison plus simple à piloter,
            <br />
            pensée pour les <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-400 font-extrabold">seniors.</span>
          </h1>

          <p className="text-base font-light leading-relaxed text-slate-400 sm:text-lg">
            Faciliter certains gestes du quotidien sans bouleverser les habitudes. Sally Home Connect permet de centraliser des commandes et des automatismes localement, tout en privilégiant la maîtrise des données dans le logement.
          </p>
        </div>
      </section>

      {/* 2. Hero Background Image Section - Structured with ultra-premium glowing elements */}
      <section className="relative w-full overflow-hidden border-y-2 border-slate-900 bg-slate-950/40 py-16 group/hero">
        
        {/* Fullscreen background with state-reflective layout classes & glowing colors */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Maison équipée pour faciliter le quotidien des seniors"
            className={`h-full w-full object-cover transition-all duration-[10s] group-hover/hero:scale-105 ${
              isOrientationLightsOn
                ? "brightness-105 contrast-[1.15] saturate-[1.35]"
                : "brightness-[0.90] contrast-[1.12] saturate-[1.25]"
            } filter drop-shadow-[0_0_30px_rgba(168,85,247,0.15)]`}
            referrerPolicy="no-referrer"
            onError={() => {
              // Si le fichier d'image local n'a pas encore été ré-exporté par l'utilisateur,
              //on bascule proprement sur une magnifique image Unsplash de salon chaleureux.
              setBgImage("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1600");
            }}
          />

          {/* Vibrant high-contrast gradient filters for that rich 3D deep contrast feel */}
          <div className="absolute inset-0 z-10 bg-radial-at-t from-[#030712]/10 via-[#030712]/30 to-[#030712]/90" />
          <div className="absolute inset-0 z-10 hidden bg-linear-to-r from-[#030712]/95 via-[#030712]/60 to-[#030712]/40 md:block" />

          <AnimatePresence>
            {isOrientationLightsOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="pointer-events-none absolute inset-0 z-12 bg-purple-500/15 mix-blend-screen"
              />
            )}
          </AnimatePresence>

          {/* Multi-layered futuristic neon purple light waves */}
          <div className="absolute -top-40 -left-40 w-120 h-120 bg-purple-500/20 rounded-full blur-[160px] pointer-events-none z-10 animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none z-10" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-25 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Column: Interactive Feature List on dark background blur card */}
            <div className="flex flex-col justify-center space-y-6 text-left lg:col-span-5">
              <span className="select-none text-xs font-extrabold uppercase leading-none tracking-[0.25em] text-purple-400 drop-shadow-[0_2px_10px_rgba(168,85,247,0.3)] md:text-sm">
                ACCESSIBILITÉ SIMPLIFIÉE
              </span>

              <h2 className="select-none text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                Un quotidien plus doux
                <br />
                <span className="mt-1 block bg-linear-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text font-extrabold text-transparent">
                  et sécurisant.
                </span>
              </h2>

              <p className="max-w-lg text-sm font-light leading-relaxed text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-base">
                Découvrez comment nos options d'interfaces tactiles simplifiées à l'extrême et nos commandes locales s'adaptent merveilleusement au rythme de nos aînés.
              </p>

              {/* Accordion / Column of interactive tabs */}
              <div className="space-y-3">
                {leftFeatures.map((feat, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer group focus:outline-none backdrop-blur-md ${
                      activeFeature === index
                        ? "bg-purple-500/10 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                        : "bg-slate-950/70 border-slate-900 hover:bg-slate-950/90 hover:border-slate-800"
                    }`}
                  >
                    <div className={`p-3 rounded-xl transition-all ${
                      activeFeature === index 
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" 
                        : "bg-slate-950 text-slate-400 border border-slate-900"
                    }`}>
                      {feat.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                          {feat.title}
                        </h3>
                        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${activeFeature === index ? "translate-x-1 text-purple-400" : ""}`} />
                      </div>
                      <p className="text-slate-400 text-sm font-light">
                        {feat.desc}
                      </p>
                      
                      {activeFeature === index && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.25 }}
                          className="text-slate-300 text-xs mt-2 pt-2 border-t border-purple-500/10 leading-relaxed font-light"
                        >
                          {feat.details}
                        </motion.p>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Actual Sally Hub hardware module showcase with Wow factor card */}
              <div className="relative mt-6 p-4 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-4 group/hub hover:border-purple-400 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 to-indigo-500/5 opacity-50 group-hover/hub:opacity-100 transition-all" />
                <div className="relative w-22 h-22 rounded-2xl overflow-hidden border border-slate-800 shrink-0 bg-slate-900 shadow-xl group-hover/hub:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <img 
                    src={SALLY_HUB_IMAGE} 
                    alt="Boîtier Sally Hub" 
                    className="w-full h-full object-cover group-hover/hub:scale-110 transition-transform duration-500 brightness-105 saturate-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 to-transparent" />
                </div>
                <div className="relative text-left space-y-1">
                  <span className="text-[10px] font-mono text-[#a855f7] font-extrabold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full inline-block">
                    CONCIERGERIE PREMIUM SALLY
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover/hub:text-purple-300 transition-colors">Le protecteur bienveillant des aînés</h4>
                  <p className="text-[11px] text-slate-350 font-light leading-snug">
                    Notre centrale locale ultra-sécurisée veille silencieusement sur le logement sans aucune intrusion externe.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Stunning Interactive Senior Simplified Console Mockup */}
            <div className="relative flex items-center justify-center py-2 lg:col-span-7 lg:justify-end">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/90 shadow-[0_0_50px_rgba(168,85,247,0.25)] p-6 backdrop-blur-xl"
              >
                {/* Header status */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">PUPITRE SALLY SENIOR ACTIF</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">100% Hors-Ligne local</span>
                </div>

                <div className="space-y-4">
                  <div className="text-left space-y-1">
                    <h3 className="text-lg font-black text-white">Console Simplifiée</h3>
                    <p className="text-xs font-light text-slate-400">
                      Boutons surdimensionnés avec contraste optimal et retour d'information immédiat.
                    </p>
                  </div>

                  {/* Simulator feedback block */}
                  <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 text-left min-h-18 flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <p className="text-sm font-medium text-slate-200">
                      {tabletFeedback}
                    </p>
                  </div>

                  {/* Interactive Button Grid */}
                  <div className="grid grid-cols-1 gap-3.5 pt-1">
                    
                    {/* BUTTON 1: Orientation light */}
                    <button
                      onClick={() => triggerTabletAction("lights")}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all duration-350 focus:outline-none ${
                        isOrientationLightsOn 
                          ? "bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                          : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-3 rounded-xl transition-colors ${isOrientationLightsOn ? "bg-amber-500/20" : "bg-slate-800"}`}>
                          <Sun className="w-6 h-6 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-extrabold text-white text-base">Chemin de Nuit</p>
                          <p className="text-xs text-slate-400">Allume le passage de sécurité</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-1 bg-slate-950 rounded-lg">
                        {isOrientationLightsOn ? "ALLUMÉ" : "ÉTEINT"}
                      </span>
                    </button>

                    {/* BUTTON 2: Shutter safety */}
                    <button
                      onClick={() => triggerTabletAction("shutters")}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all duration-350 focus:outline-none ${
                        !isShutterOpen
                          ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                          : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-3 rounded-xl transition-colors ${!isShutterOpen ? "bg-indigo-500/20" : "bg-slate-800"}`}>
                          <Lock className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="font-extrabold text-white text-base">Sécuriser Volets</p>
                          <p className="text-xs text-slate-400">Fermer tous les volets de l'étage</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-1 bg-slate-950 rounded-lg">
                        {isShutterOpen ? "OUVERT" : "SÉCURISÉ"}
                      </span>
                    </button>

                    {/* BUTTON 3: Emergency assistance */}
                    <button
                      onClick={() => triggerTabletAction("emergency")}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between cursor-pointer transition-all duration-350 focus:outline-none ${
                        isEmergencySent 
                          ? "bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse"
                          : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-3 rounded-xl transition-colors ${isEmergencySent ? "bg-rose-500/30" : "bg-slate-800"}`}>
                          <PhoneCall className="w-6 h-6 text-rose-400" />
                        </div>
                        <div>
                          <p className="font-extrabold text-white text-base">Appeler Famille</p>
                          <p className="text-xs text-slate-400">Notifier mon aidant en cas de besoin</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-1 bg-slate-950 rounded-lg text-rose-400">
                        {isEmergencySent ? "SMS ENVOYÉ" : "APPUYER"}
                      </span>
                    </button>

                  </div>
                </div>

                {/* Footer simulation info */}
                <div className="mt-5 pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>SALLY COCKPIT SENIOR</span>
                  <span>v1.5 LOCAL</span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Quick tech specs */}
          <div className="relative z-20 mt-8 text-left">
            <div className="grid max-w-full grid-cols-2 gap-4 rounded-2xl border border-slate-950/40 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-md md:grid-cols-4 md:gap-6 md:px-6 md:py-5">
              {[
                [Activity, "Sécurité active", "Dispositif anti-chute", "text-cyan-400"],
                [Smartphone, "Contraste optimal", "Grande police", "text-indigo-400"],
                [Mic, "Zéro Cloud", "Voix intégrale locale", "text-purple-400"],
                [ShieldCheck, "Tranquillité Famille", "Notification d'aide", "text-emerald-400"],
              ].map(([Icon, title, subtitle, color]: any, index) => (
                <div
                  key={title}
                  className={`flex items-center gap-3 ${
                    index > 0 ? "md:border-l md:border-slate-800/80 md:pl-6" : ""
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current/25 bg-current/10 ${color}`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <div className="text-left leading-none">
                    <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-100">
                      {title}
                    </span>

                    <span className="mt-0.5 block text-xs font-bold uppercase text-slate-400">
                      {subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Detail section - Test accessibilities software demonstration triggers */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 text-left sm:px-6 lg:px-8 w-full">
        <div className="relative flex flex-col items-center gap-10 overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-r from-slate-950 to-slate-900 p-6 shadow-xl sm:p-10 lg:flex-row">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
              <Eye className="h-3.5 w-3.5" />
              <span>Assistance cognitive & physique</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Une technologie bienveillante, pas intrusive.
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-400">
              Sally redéfinit le maintien à domicile. Sans installer aucune caméra ni aucun système d'écoute à distance
              qui espionne la vie intime, Sally comprend si l'éclairage de salle d'eau s'allonge anormalement ou si
              un robinet de cuisine coule trop longtemps. C'est l'assurance d'une surveillance respectueuse.
            </p>
          </div>

          <div className="grid w-full grow grid-cols-1 gap-4 sm:grid-cols-2 lg:w-auto">
            <div className="flex h-36 flex-col justify-between rounded-2xl border border-slate-850 bg-slate-900/40 p-5 text-left">
              <span className="text-lg">🛎️</span>
              <div>
                <span className="block text-sm font-bold text-white">Alerte Chute Indirecte</span>
                <span className="mt-1 block text-xs leading-tight text-slate-400">
                  Détection automatique par absence d'activité détectée sur les interrupteurs autonomes physiques.
                </span>
              </div>
            </div>

            <div className="flex h-36 flex-col justify-between rounded-2xl border border-slate-850 bg-slate-900/40 p-5 text-left">
              <span className="text-lg">🏡</span>
              <div>
                <span className="block text-sm font-bold text-white">Rituels du Soir</span>
                <span className="mt-1 block text-xs leading-tight text-slate-400">
                  Fermeture des portes, extinction des lumières et activation des détecteurs techniques locaux.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Row Container (The 4 dark cards showing core values) */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-slate-800/85 bg-slate-950/60 p-6 md:p-8 backdrop-blur-md shadow-xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bottomCards.map((card, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl hover:bg-slate-900/40 transition-colors group"
              >
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/60 group-hover:border-purple-500/20 group-hover:bg-purple-500/5 transition-all">
                  {card.icon}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}