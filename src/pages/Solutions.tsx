/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import DashboardSection from "../components/DashboardSection";
import { HouseState, ActivityNotification } from "../types";
import SOLUTIONS_BG from "../assets/images/sally_hero_house_new_1780924228781.png";
import {
  Home,
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Blinds,
  WifiOff,
  Smartphone,
  CheckCircle2,
  Accessibility,
  Mic,
  Server,
  Radio,
  Router,
  Clock,
  Sparkles,
} from "lucide-react";

interface SolutionsProps {
  houseState: HouseState;
  setHouseState: (
    state: HouseState | ((prev: HouseState) => HouseState)
  ) => void;
  notifications: ActivityNotification[];
  triggerNotification: (
    msg: string,
    type: "info" | "success" | "warning" | "alert"
  ) => void;
}

export default function Solutions({
  houseState,
  setHouseState,
  notifications,
  triggerNotification,
}: SolutionsProps) {
  return (
    <div className="relative min-h-screen text-white bg-[#030712] overflow-hidden">
      
      {/* ================= FIXED BACKDROP BACKGROUND ================= */}
      {/* This ensures the stunning house image is highly visible across the entire scrollable page */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <img
          src={SOLUTIONS_BG}
          alt="Sally Premium Home Background"
          className="w-full h-full object-cover opacity-35 saturate-[1.2] brightness-[0.45]"
          referrerPolicy="no-referrer"
        />
        
        {/* Gorgeous custom neon visual glow overlays */}
        <div className="absolute top-1/4 left-1/4 w-140 h-140 bg-indigo-500/10 rounded-full blur-[140px] opacity-40 pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-160 h-160 bg-cyan-500/10 rounded-full blur-[160px] opacity-35 pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-120 h-120 bg-purple-500/5 rounded-full blur-[130px] opacity-30 pointer-events-none" />
        
        {/* Soft elegant vignette gradient layer to keep high contrast text legible always */}
        <div className="absolute inset-0 bg-linear-to-b from-[#030712]/60 via-[#030712]/55 to-[#030712]/85" />
      </div>

      {/* Content wrapper scrolling on top of the fixed background with positive z-index */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8 text-left">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 rounded-full text-xs font-mono text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Solutions Sally Home Connect</span>
            </div>

            <h1 className="text-4xl font-black leading-[1.1] text-white sm:text-5xl md:text-6xl tracking-tight">
              Contrôlez votre maison
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400 font-extrabold">
                depuis une seule interface.
              </span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl font-light leading-relaxed text-slate-300">
              Sally Home Connect centralise l’éclairage, les volets roulants, le
              chauffage, les scénarios et la sécurité dans une interface moderne
              fonctionnant localement.
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 text-left">
          <div className="rounded-3xl border border-slate-800 bg-[#060a16]/40 p-8 backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Pourquoi Sally Home Connect ?
            </h2>

            <p className="mt-4 max-w-4xl text-sm sm:text-base leading-relaxed text-slate-300 font-light">
              Sally Home Connect a été conçue pour reprendre le contrôle de sa
              maison sans dépendre d’un service cloud, d’un abonnement mensuel ou
              d’une plateforme propriétaire. La solution privilégie le
              fonctionnement local afin que vos équipements restent utilisables
              même en cas de coupure Internet.
            </p>
          </div>
        </section>

        {/* INTERACTIVE DASHBOARD PREVIEW */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 font-bold">CONTRÔLE INTÉGRAL EN DIRECT</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Console Interactive d&apos;Expérimentation</h2>
            <p className="text-sm text-slate-400 font-light">
              Configurez et testez en temps réel l&apos;état global de votre habitat connecté ci-dessous.
            </p>
          </div>
          
          <div className="rounded-3xl border border-slate-800/80 bg-[#040812]/50 p-4 sm:p-6 backdrop-blur-lg shadow-2xl">
            <DashboardSection
              houseState={houseState}
              setHouseState={setHouseState}
              notifications={notifications}
              triggerNotification={triggerNotification}
            />
          </div>
        </section>

        {/* SOLUTIONS CONCRÈTES */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 text-left">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-yellow-500/30 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(234,179,8,0.05)]">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Lightbulb className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Éclairage intelligent
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Contrôle individuel ou global des lumières avec scénarios
                personnalisés.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(6,182,212,0.05)]">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Blinds className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Volets roulants</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Ouverture, fermeture et arrêt des volets depuis l’interface
                Sally.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-rose-500/30 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(244,63,94,0.05)]">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Thermometer className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Chauffage connecté
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Réglage des températures et automatisation du confort selon les
                pièces.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(16,185,129,0.05)]">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Sécurité locale</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Alertes, scénarios de départ et surveillance locale sans cloud
                imposé.
              </p>
            </div>
            
          </div>
        </section>

        {/* POUR QUI */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 text-left">
          <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-8 backdrop-blur-md sm:p-10">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Une solution adaptée à toute la famille
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 backdrop-blur-sm">
                <Home className="mb-4 h-7 w-7 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">
                  Pour les particuliers
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400 font-light">
                  <li>• Pilotage simple de l’éclairage.</li>
                  <li>• Gestion des volets roulants.</li>
                  <li>• Contrôle du chauffage.</li>
                  <li>• Scénarios quotidiens automatisés.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 backdrop-blur-sm">
                <Smartphone className="mb-4 h-7 w-7 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">
                  Pour les seniors
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400 font-light">
                  <li>• Interface simplifiée.</li>
                  <li>• Commandes vocales.</li>
                  <li>• Accès rapide aux fonctions essentielles.</li>
                  <li>• Aide au maintien à domicile.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 backdrop-blur-sm">
                <Accessibility className="mb-4 h-7 w-7 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Pour les personnes à mobilité réduite
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400 font-light">
                  <li>• Contrôle depuis smartphone, tablette ou PC.</li>
                  <li>• Réduction des déplacements inutiles.</li>
                  <li>• Automatisation des tâches répétitives.</li>
                  <li>• Compatibilité avec les équipements d’assistance.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* EXEMPLES */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 text-left">
          <div className="grid gap-6 md:grid-cols-2">
            
            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-slate-700 transition-all">
              <Clock className="mb-4 h-7 w-7 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">
                Départ de la maison
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Un seul bouton permet d’éteindre toutes les lumières, fermer les
                volets et activer la surveillance.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-slate-700 transition-all">
              <Home className="mb-4 h-7 w-7 text-indigo-400" />
              <h3 className="text-xl font-bold text-white">Retour à domicile</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Sally peut ouvrir certains volets, allumer l’éclairage extérieur
                et remettre le chauffage à température.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-slate-700 transition-all">
              <Thermometer className="mb-4 h-7 w-7 text-rose-400" />
              <h3 className="text-xl font-bold text-white">
                Gestion du chauffage
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Température différente par pièce, programmation selon les horaires
                et réduction automatique en cas d’absence.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#060a16]/45 p-8 backdrop-blur-md hover:border-slate-700 transition-all">
              <Mic className="mb-4 h-7 w-7 text-emerald-400" />
              <h3 className="text-xl font-bold text-white">Commande vocale</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 font-light">
                Des commandes simples permettent de déclencher les actions
                principales sans naviguer dans plusieurs menus.
              </p>
            </div>
            
          </div>
        </section>

        {/* TECHNOLOGIE */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 text-left">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/65 p-8 backdrop-blur-md sm:p-10">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Une technologie ouverte et locale
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-400 font-light">
              Sally Home Connect s’appuie sur des technologies reconnues afin de
              proposer une solution évolutive, fiable et compréhensible.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xs">
                <Radio className="mb-3 h-6 w-6 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">EnOcean</h3>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Interrupteurs sans pile et sans câblage complexe.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xs">
                <Router className="mb-3 h-6 w-6 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Zigbee</h3>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Équipements connectés, capteurs et modules compatibles.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xs">
                <Server className="mb-3 h-6 w-6 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Raspberry Pi</h3>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Serveur local installé dans le logement.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xs">
                <WifiOff className="mb-3 h-6 w-6 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Sans cloud</h3>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Les données restent à domicile.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xs">
                <CheckCircle2 className="mb-3 h-6 w-6 text-green-400" />
                <h3 className="text-sm font-bold text-white">Évolutif</h3>
                <p className="mt-2 text-xs text-slate-400 font-light">
                  Installation progressive selon les besoins.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
