/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  Zap,
  Layers,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Smartphone,
  HelpCircle,
  Activity,
  Settings,
  Radio,
  Eye,
  Sparkles,
  ChevronRight,
  ToggleLeft,
  Thermometer,
  Lightbulb,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

import HERO_HOUSE_IMAGE from "../assets/images/sally_hero_house_new_1780924228781.png";
import SALLY_HUB_IMAGE from "../assets/images/sally_hub_1780921367481.png";

export default function Compatibilite() {
  const [activeBrand, setActiveBrand] = useState<"all" | "nodon" | "zigbee">("all");
  const [imageBg, setImageBg] = useState<string>(HERO_HOUSE_IMAGE);

  // States for our interactive testing panel (Simulateur NodOn & Zigbee)
  const [shutterPosition, setShutterPosition] = useState<number>(75);
  const [isNodonLightOn, setIsNodonLightOn] = useState<boolean>(false);
  const [zigbeeTemp, setZigbeeTemp] = useState<number>(21.8);
  const [isPairing, setIsPairing] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    "[SOUVERAIN] Initialisation du coordinateur local Sally...",
    "[ZIGBEE 3.0] Puce Silicon Labs @ +20dBm prête",
    "[LOCAL] Aucun cloud requis. Réseau 100% blindé.",
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("fr-FR");
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 7)]);
  };

  const handleToggleLight = () => {
    const nextState = !isNodonLightOn;
    setIsNodonLightOn(nextState);
    addLog(`[NODON SIN-4-2-20] État relais changé -> ${nextState ? "ALLUMÉ" : "ÉTEINT"} (Commande locale 4ms)`);
  };

  const handleShutterChange = (value: number) => {
    setShutterPosition(value);
    addLog(`[NODON SIN-4-RS-20] Volet positionné à ${value}%`);
  };

  const handleRefreshTemp = () => {
    const randomChange = (Math.random() * 0.6 - 0.3).toFixed(1);
    const nextTemp = parseFloat((zigbeeTemp + parseFloat(randomChange)).toFixed(1));
    setZigbeeTemp(nextTemp);
    addLog(`[ZIGBEE SENSOR] Météo/Température locale mise à jour : ${nextTemp}°C`);
  };

  const handleTriggerPairing = () => {
    if (isPairing) return;
    setIsPairing(true);
    addLog("[PRODUIT] Mode appairage actif : à l'écoute de nouveaux modules (60s)...");
    setTimeout(() => {
      setIsPairing(false);
      addLog("[PRODUIT] Micromodule NodOn raccordé avec succès ! Identifié : SIN-4-2-20.");
    }, 4000);
  };

  // Static product catalogues
  const nodonProducts = [
    {
      id: "sin-4-2-20",
      name: "Micromodule Relais Éclairage Zigbee",
      ref: "SIN-4-2-20",
      desc: "Installez ce module derrière vos interrupteurs muraux existants pour conserver l'appareillage physique d'origine tout en ajoutant le contrôle local et vocal Sally.",
      features: ["Double canal (contrôle 2 lignes indépendantes)", "Zéro neutre requis disponible", "Mesure automatique de la charge"],
      badge: "Best-seller Zigbee",
    },
    {
      id: "sin-4-rs-20",
      name: "Micromodule Volet Roulant Motorisé",
      ref: "SIN-4-RS-20",
      desc: "L'outil parfait pour automatiser vos volets roulants, brise-soleil orientables (BSO) ou stores. Permet un retour d'état ultra-précis sur le taux d'ouverture réelle.",
      features: ["Auto-calibration automatique", "Algorithme anti-blocage matériel", "Compatible filaire traditionnel"],
      badge: "Haute Précision",
    },
    {
      id: "sin-4-fp-21",
      name: "Module Chauffage Intelligent Fil Pilote",
      ref: "SIN-4-FP-21",
      desc: "Idéal pour amener la sobriété énergétique aux radiateurs électriques français. Pilote les 6 ordres classiques pour automatiser votre chauffage pièce par pièce.",
      features: ["6 modes de fonctionnement gérés localement", "Économies jusqu'à 28% constatées", "Format extra-plat"],
      badge: "Spécifique Radiateur",
    },
    {
      id: "remote-enocean",
      name: "Interrupteur Mural Sans Pile (Kinetic)",
      ref: "MTR-2-1-01",
      desc: "Alimenté par l'énergie cinétique de votre doigt (sans pile, autonome à vie). Communique instantanément avec le récepteur Sally pour vos va-et-vient.",
      features: ["Zéro maintenance / Zéro pile", "Positionnement ultra libre (double-face fourni)", "Durabilité éprouvée de 100 000 clics"],
      badge: "Souverain & Écologique",
    },
  ];

  const zigbeeProducts = [
    {
      id: "temp-sensor",
      name: "Capteur Intégré Température & Humidité",
      brand: "Zigbee Multi-Marque",
      desc: "Un capteur miniature discret à fixer n'importe où. Transmet les variations thermiques toutes les 15 secondes pour adapter votre confort thermique.",
      features: ["Durée de vie pile : 2 à 3 ans", "Précision de ±0.3°C certifiée", "Maillage dynamique de signal"],
      badge: "Essentiel Confort",
    },
    {
      id: "presence-sensor",
      name: "Détecteur de Mouvement & Haute Présence PMR",
      brand: "Automatisme Local",
      desc: "Technologie radar millimétrique de pointe capable de détecter même la respiration d'une personne immobile. Parfait pour sécuriser les chutes ou automatiser la lumière.",
      features: ["Immunité aux animaux domestiques", "Portée réglable de 1 à 8 mètres", "Mesure de luminosité en lux"],
      badge: "Sécurité Active",
    },
    {
      id: "smart-plug",
      name: "Prise Connectée avec Analyse de Consommation",
      brand: "Mesure d'Énergie",
      desc: "Mesurez la puissance instantanée et le cumul journalier en kWh des gros consommateurs de la maison (lave-linge, audiovisuel...). Coupe automatiquement les veilles.",
      features: ["Relais renforcé certifié 16A", "Bouton d'allumage manuel intégré", "Règle de coupure sur seuil bas"],
      badge: "Eco-Responsable",
    },
    {
      id: "thermostatic-valve",
      name: "Tête Thermostatique de Radiateur à Eau",
      brand: "Régulation Chauffage",
      desc: "Gérez finement la circulation d'eau chaude de vos radiateurs collectifs ou individuels. Se coordonne avec les rituels quotidiens de Sally pour couper la nuit.",
      features: ["Affichage LCD discret", "Détection automatique d'ouverture de fenêtre", "Mode déglaçage anti-calcaire"],
      badge: "Énergie Verte",
    },
  ];

  return (
    <div
      id="compatibilite-page-container"
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#030712] pb-16 text-white text-left"
    >
      {/* 1. Header Intro Title Block - Styled exactly like Accessibilité & Seniors */}
      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 text-left sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs font-extrabold uppercase leading-none tracking-widest text-[#00f2fe] drop-shadow-[0_2px_10px_rgba(0,242,254,0.3)]">
            ÉCOSYS-TECH SOUVERAIN & LOCALE
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Compatibilité Modules
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00f2fe] via-indigo-400 to-purple-400 font-extrabold">
              NodOn & Zigbee.
            </span>
          </h1>

          <p className="text-base font-light leading-relaxed text-slate-400 sm:text-lg">
            Sally intègre nativement les contrôleurs locaux les plus robustes de la domotique européenne. Coordonnez vos micromodules encastrés NodOn et tout l'écosystème de capteurs Zigbee 3.0 en local pur, pour un temps de réponse instantané et une confidentialité absolue.
          </p>
        </div>
      </section>

      {/* 2. Hero Background Image Section - Structured with ultra-premium glowing elements */}
      <section className="relative w-full overflow-hidden border-y-2 border-slate-900 bg-slate-950/40 py-16 group/hero">
        
        {/* Fullscreen Background Image - CRISP, HIGH CONTRAST, BRIGHT NEON RENDERING */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageBg}
            alt="Sally Domotique Hardware Modules"
            className="h-full w-full object-cover transition-all duration-[10s] scale-100 group-hover/hero:scale-105 brightness-[0.90] contrast-[1.12] saturate-[1.4] filter drop-shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            referrerPolicy="no-referrer"
            onError={() => {
              setImageBg(HERO_HOUSE_IMAGE);
            }}
          />

          {/* Vibrant high-contrast gradient filters for that rich 3D deep contrast feel */}
          <div className="absolute inset-0 z-10 bg-radial-at-t from-[#030712]/10 via-[#030712]/30 to-[#030712]/90" />
          <div className="absolute inset-0 z-10 hidden bg-linear-to-r from-[#030712]/95 via-[#030712]/60 to-[#030712]/40 md:block" />

          {/* Multi-layered futuristic neon light waves */}
          <div className="absolute -top-40 -left-40 w-120 h-120 bg-indigo-500/20 rounded-full blur-[160px] pointer-events-none z-10 animate-pulse" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-[140px] pointer-events-none z-10 animate-bounce-slow" />
        </div>

        {/* Content Overlays containing interactive components */}
        <div className="relative z-25 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
            
            {/* Left Box: Value Proposition & Brand Toggle buttons */}
            <div className="flex flex-col justify-center space-y-6 text-left lg:col-span-5">
              <span className="select-none text-xs font-extrabold uppercase leading-none tracking-[0.25em] text-[#00f2fe] drop-shadow-[0_2px_10px_rgba(0,242,254,0.3)] md:text-sm">
                SOUVERAINETÉ ET ROBUSTESSE
              </span>

              <h2 className="select-none text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                Zéro Cloud.
                <br />
                <span className="mt-1 block bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text font-extrabold text-transparent">
                  Sélection domotique pro.
                </span>
              </h2>

              <p className="max-w-lg text-sm font-light leading-relaxed text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-base">
                Associez la précision industrielle des boîtiers d'encastrement NodOn (conçus et fabriqués en France) à la variété infinie des capteurs Zigbee du marché mondial. Tout transite par la passerelle locale Sally.
              </p>

              {/* brand selection filter for list below */}
              <div className="flex flex-wrap gap-2.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800/60 backdrop-blur-md max-w-md">
                <button
                  onClick={() => setActiveBrand("all")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all ${
                    activeBrand === "all"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Tous les modules
                </button>
                <button
                  onClick={() => setActiveBrand("nodon")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all ${
                    activeBrand === "nodon"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  NodOn Pro
                </button>
                <button
                  onClick={() => setActiveBrand("zigbee")}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all ${
                    activeBrand === "zigbee"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Zigbee Universel
                </button>
              </div>

              {/* Minimal benefits list */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Appairage simplifié en 1-Clic</h4>
                    <p className="text-xs text-slate-300">Aucun code informatique requis, Sally scanne les modules en 4 secondes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Mesures physiques fiables</h4>
                    <p className="text-xs text-slate-300">Suivi précis des volets, de la puissance absorbée et de la qualité de liaison locale (LQI).</p>
                  </div>
                </div>
              </div>

              {/* Actual Sally Hub hardware module showcase with Wow factor card */}
              <div className="relative mt-6 p-4 rounded-3xl bg-slate-950/80 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center gap-4 group/hub hover:border-indigo-400 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-50 group-hover/hub:opacity-100 transition-all" />
                <div className="relative w-22 h-22 rounded-2xl overflow-hidden border border-slate-800 shrink-0 bg-slate-900 shadow-xl group-hover/hub:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <img 
                    src={SALLY_HUB_IMAGE} 
                    alt="Boîtier Sally Hub" 
                    className="w-full h-full object-cover group-hover/hub:scale-110 transition-transform duration-500 brightness-105 saturate-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 to-transparent" />
                </div>
                <div className="relative text-left space-y-1">
                  <span className="text-[10px] font-mono text-[#00f2fe] font-extrabold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full inline-block">
                    CONCIERGERIE SALLY HUB
                  </span>
                  <h4 className="text-sm font-extrabold text-white group-hover/hub:text-cyan-300 transition-colors">Le cerveau de votre installation</h4>
                  <p className="text-[11px] text-slate-350 font-light leading-snug">
                    Un boîtier local haut de gamme, élégant et puissant qui orchestre toutes vos automatisations physiques intelligentes en totale autonomie.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box: Absolute Master class Interactive Sandbox Simulator */}
            <div className="relative flex items-center justify-center py-2 lg:col-span-7">
              <div className="relative w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950/90 shadow-[0_0_50px_rgba(0,242,254,0.15)] p-6 backdrop-blur-xl flex flex-col justify-between">
                
                {/* Header terminal status bar */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-wider">LABORATOIRE INTERACTIF SALLY x NODON</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">v3.2 LOCAL HOST</span>
                </div>

                <div className="space-y-5">
                  {/* Top instruction text */}
                  <div className="text-left space-y-1">
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Cpu className="text-indigo-400 w-5 h-5" /> 
                      Banc d'Essai Matériel Domotique
                    </h3>
                    <p className="text-xs font-light text-slate-400">
                      Testez les commandes directes appliquées aux micromodules NodOn et capteurs Zigbee configurés sur Sally.
                    </p>
                  </div>

                  {/* interactive component 1: Relais Écuries / Éclairage de Salon NodOn */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`p-3 rounded-xl transition-all ${isNodonLightOn ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-slate-950 text-slate-500 border border-slate-900"}`}>
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">Micromodule Éclairage NodOn</p>
                        <p className="text-[11px] text-slate-400">Modèle installé derrière l'interrupteur</p>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleLight}
                      className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                        isNodonLightOn 
                          ? "bg-amber-500 text-slate-950 hover:bg-amber-400" 
                          : "bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800"
                      }`}
                    >
                      {isNodonLightOn ? "Éteindre" : "Allumer"}
                    </button>
                  </div>

                  {/* interactive component 2: Shutter Volet Roulant SIN-4-RS-20 NodOn */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-slate-950 text-indigo-400 border border-slate-900">
                          <SlidersHorizontal className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-white">Volet Roulant NodOn</p>
                          <p className="text-[11px] text-slate-400">Calibration SIN-4-RS-20 automatique</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-1 bg-slate-950 text-[#00f2fe] rounded-lg">
                        {shutterPosition === 0 ? "Fermé" : shutterPosition === 100 ? "Grand Ouvert" : `Ouvert à ${shutterPosition}%`}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-slate-500">0%</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={shutterPosition}
                        onChange={(e) => handleShutterChange(parseInt(e.target.value))}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-500">100%</span>
                    </div>
                  </div>

                  {/* interactive component 3: Thermomètre Zigbee Multi-marque */}
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-xl bg-slate-950 text-cyan-400 border border-slate-900">
                        <Thermometer className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">Capteur Température Zigbee</p>
                        <p className="text-[11px] text-slate-400">Intervalle de push physique local</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-mono font-black text-cyan-400 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-900">
                        {zigbeeTemp}°C
                      </span>
                      <button
                        onClick={handleRefreshTemp}
                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-900 text-xs text-indigo-400 hover:text-indigo-300 font-mono"
                      >
                        Push
                      </button>
                    </div>
                  </div>

                  {/* Simulator terminal output logs - crucial for design detailing */}
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-900 text-left">
                    <p className="text-[10px] font-mono text-indigo-300 mb-2 uppercase tracking-wide font-extrabold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Diagnostics du Bus Local
                    </p>
                    <div className="space-y-1 font-mono text-[11px] text-slate-400 max-h-24 overflow-y-auto">
                      {logs.map((log, idx) => (
                        <div key={idx} className="truncate">
                          <span className="text-indigo-400/70">{">"}</span> {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Appairage trigger button with state feedback */}
                  <button
                    onClick={handleTriggerPairing}
                    disabled={isPairing}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      isPairing
                        ? "bg-purple-950/45 border border-purple-500/50 text-purple-300 animate-pulse"
                        : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/10"
                    }`}
                  >
                    <Radio className={`w-4 h-4 ${isPairing ? "animate-spin" : ""}`} />
                    {isPairing ? "Recherche de module en cours..." : "Simuler l'appairage d'un nouveau module"}
                  </button>

                </div>

                {/* Footer simulation info */}
                <div className="mt-5 pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
                  <span>COORDINATEUR SALLY SOUVERAIN</span>
                  <span>BUS ZIGBEE 3.0</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 3. Products Catalogue Section (Filtered based on user choice above) */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 text-left sm:px-6 lg:px-8 w-full">
        
        <div className="text-left space-y-3 mb-10">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Gamme de matériels supportés nativement
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
            Profitez d'un matériel sélectionné pour sa fiabilité technique et sa capacité à s'insérer de manière esthétique dans les boîtes d'encastrement de vos murs.
          </p>
        </div>

        {/* NODON CATEGORY */}
        {(activeBrand === "all" || activeBrand === "nodon") && (
          <div className="mb-14">
            <div className="flex items-center gap-3 border-b border-slate-900 pb-3 mb-6">
              <span className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1 font-mono rounded-full border border-purple-500/20">
                PRODUITS VEDETTES
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">
                Gamme NodOn <span className="text-slate-500 font-light text-sm italic">Conçu en France</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nodonProducts.map((p) => (
                <div 
                  key={p.id}
                  className="bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:bg-slate-900/60 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono bg-purple-500/10 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-md font-bold">
                        {p.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">{p.ref}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-950 space-y-1.5">
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full shrink-0" />
                        <span className="text-[11px] text-slate-300 font-light">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ZIGBEE CATEGORY */}
        {(activeBrand === "all" || activeBrand === "zigbee") && (
          <div>
            <div className="flex items-center gap-3 border-b border-slate-900 pb-3 mb-6">
              <span className="bg-cyan-500/10 text-cyan-400 text-xs px-3 py-1 font-mono rounded-full border border-cyan-500/20">
                ÉCOSYSTÈME OUVERT
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">
                Capteurs et Actionneurs Zigbee 3.0
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {zigbeeProducts.map((p) => (
                <div 
                  key={p.id}
                  className="bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:bg-slate-900/60 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded-md font-bold">
                        {p.badge}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">{p.brand}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-950 space-y-1.5">
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                        <span className="text-[11px] text-slate-300 font-light">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* 4. Technical Specs Info banner */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 text-left sm:px-6 lg:px-8 w-full">
        <div className="relative flex flex-col items-center gap-10 overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-r from-slate-950 to-slate-900 p-6 shadow-xl sm:p-10 lg:flex-row">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              <Settings className="h-3.5 w-3.5 animate-spin" />
              <span>Souveraineté Radio Certifiée</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Pourquoi choisir l'appairage local ?
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-400">
              Chaque périphérique domotique grand public ordinaire renvoie constamment des paquets de données vers des serveurs hébergés en dehors de l'Union européenne. Avec la technologie locale intégrée à Sally, vos signaux radio Zigbee et vos modules NodOn cheminent de façon ultra sécurisée uniquement au sein de votre domicile.
            </p>
          </div>

          <div className="grid w-full grow grid-cols-1 gap-4 sm:grid-cols-2 lg:w-auto">
            <div className="flex h-36 flex-col justify-between rounded-2xl border border-slate-850 bg-slate-900/40 p-5 text-left">
              <span className="text-lg">📡</span>
              <div>
                <span className="block text-sm font-bold text-white">Réseau Maillé Robuste</span>
                <span className="mt-1 block text-xs leading-tight text-slate-400 font-light">
                  Chaque module NodOn ou prise raccordée sur secteur amplifie le réseau local et agit comme un répéteur de signal.
                </span>
              </div>
            </div>

            <div className="flex h-36 flex-col justify-between rounded-2xl border border-slate-850 bg-slate-900/40 p-5 text-left">
              <span className="text-lg">⚡</span>
              <div>
                <span className="block text-sm font-bold text-white">Latence Imperceptible</span>
                <span className="mt-1 block text-xs leading-tight text-slate-400 font-light">
                  Passer de 300 millisecondes (transit cloud classique) à moins de 8 millisecondes pour vos capteurs et luminaires physiques.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Additional physical checker widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div id="compatibility-widget" className="bg-slate-900/40 rounded-3xl border border-slate-800 p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-100 mb-2">Un autre modèle ou protocole à vérifier ?</h3>
          <p className="text-slate-400 text-sm mb-6 font-light">
            Sally est nativement compatible avec plus de 2400 références d'appareils autonomes Zigbee, EnOcean, Z-Wave et Wi-Fi Local.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              id="compat-check-input"
              type="text" 
              placeholder="ex: Legrand, Somfy, Philips Hue, Shelly..." 
              className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 w-full"
            />
            <button id="compat-check-btn" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4.5 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
              Vérifier
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

