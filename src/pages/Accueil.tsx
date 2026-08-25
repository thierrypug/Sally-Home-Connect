/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Download,
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
import HERO_HOUSE_IMAGE from '../assets/images/sally_hero_house_new_1780924228781.png';

interface AccueilProps {
  houseState: HouseState;
  setHouseState: (
    state: HouseState | ((prev: HouseState) => HouseState)
  ) => void;
  triggerNotification: (
    msg: string,
    type: 'info' | 'success' | 'warning' | 'alert'
  ) => void;
  onOpenCheckout: (planName: string, price: number) => void;
  onChangePage: (page: string) => void;
}

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
      title: 'EnOcean',
      text: 'Des interrupteurs sans pile pour commander la maison simplement.'
    },
    {
      icon: <Wifi className="w-6 h-6 text-indigo-400" />,
      title: 'Zigbee',
      text: 'Des ampoules, prises et capteurs connectés facilement intégrés.'
    },
    {
      icon: <Mic className="w-6 h-6 text-indigo-400" />,
      title: 'Vocal',
      text: 'Une commande vocale locale pour piloter sans effort.'
    }
  ];

  const limites = [
    {
      icon: <CloudOff className="w-5 h-5 text-rose-400" />,
      title: 'Dépendance au cloud',
      text: 'Certaines solutions dépendent de serveurs distants pour fonctionner.'
    },
    {
      icon: <CreditCard className="w-5 h-5 text-rose-400" />,
      title: 'Abonnements récurrents',
      text: 'Certaines solutions ajoutent des frais mensuels ou annuels.'
    },
    {
      icon: <SlidersHorizontal className="w-5 h-5 text-rose-400" />,
      title: 'Complexité inutile',
      text: 'Certaines interfaces sont davantage pensées pour les experts que pour le quotidien.'
    },
    {
      icon: <EyeOff className="w-5 h-5 text-rose-400" />,
      title: 'Confidentialité limitée',
      text: 'Selon les solutions utilisées, certaines données peuvent quitter le logement.'
    }
  ];

  const reponses = [
    {
      icon: <Home className="w-5 h-5 text-emerald-400" />,
      title: '100 % locale',
      text: 'Votre maison fonctionne chez vous, sans dépendance inutile.'
    },
    {
      icon: <LockKeyhole className="w-5 h-5 text-emerald-400" />,
      title: 'Sans abonnement',
      text: 'Pas de frais mensuels imposés pour utiliser Sally Home Connect.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Simple et sécurisée',
      text: 'Une interface claire pour piloter votre logement.'
    },
    {
      icon: <Info className="w-5 h-5 text-emerald-400" />,
      title: 'Évolutive',
      text: 'Ajoutez progressivement lumières, volets, chauffage et capteurs.'
    }
  ];

  const scenarios = [
    {
      id: 'depart' as const,
      title: 'Je pars travailler',
      items: [
        'Les lumières s’éteignent.',
        'Le chauffage passe en mode économie.',
        'Les volets se ferment automatiquement.'
      ],
      description:
        'Appuyez pour tester : extinction globale, chauffage éco (17 °C) et alarme armée.'
    },
    {
      id: 'soir' as const,
      title: 'Je rentre à la maison',
      items: [
        'La maison retrouve la bonne température.',
        'Les lumières d’accueil s’allument.',
        'Tout est prêt sans que j’aie à y penser.'
      ],
      description:
        'Appuyez pour tester : salon et extérieur allumés, température réglée à 21,5 °C.'
    },
    {
      id: 'vacances' as const,
      title: 'Je pars en vacances',
      items: [
        'La maison peut simuler une présence.',
        'Les automatismes continuent de fonctionner localement.',
        'La consommation reste maîtrisée.'
      ],
      description:
        'Appuyez pour tester : simulation de présence active et chauffage hors gel.'
    }
  ];

  const handleApplyScenario = (
    id: 'depart' | 'soir' | 'vacances'
  ) => {
    setHouseState((prev) => {
      const next = { ...prev };

      if (id === 'depart') {
        next.salonLights = false;
        next.cuisineLights = false;
        next.exterieurLights = false;
        next.chambreLights = false;
        next.voletsOpenPercent = 0;
        next.chauffageTemp = 17.0;
        next.alarmActive = true;

        triggerNotification(
          "Scénario 'Départ' appliqué : extinction globale, volets fermés et alarme activée.",
          'warning'
        );
      }

      if (id === 'soir') {
        next.salonLights = true;
        next.cuisineLights = true;
        next.exterieurLights = true;
        next.chambreLights = false;
        next.voletsOpenPercent = 100;
        next.chauffageTemp = 21.5;
        next.alarmActive = false;

        triggerNotification(
          "Scénario 'Soirée' activé : maison accueillante et chaleureuse.",
          'success'
        );
      }

      if (id === 'vacances') {
        next.salonLights = false;
        next.cuisineLights = false;
        next.exterieurLights = true;
        next.chambreLights = false;
        next.voletsOpenPercent = 0;
        next.chauffageTemp = 15.0;
        next.alarmActive = true;

        triggerNotification(
          "Scénario 'Vacances' activé : simulation de présence et chauffage hors gel.",
          'info'
        );
      }

      return next;
    });
  };

  const toggleLight = (
    key: 'salonLights' | 'cuisineLights' | 'exterieurLights'
  ) => {
    setHouseState((prev) => {
      const nextVal = !prev[key];

      const name =
        key === 'salonLights'
          ? 'Salon'
          : key === 'cuisineLights'
            ? 'Cuisine'
            : 'Extérieur';

      triggerNotification(
        `Lumière ${name} ${nextVal ? 'allumée' : 'éteinte'} via l’interface locale.`,
        nextVal ? 'success' : 'info'
      );

      return { ...prev, [key]: nextVal };
    });
  };

  const adjustHeating = (amount: number) => {
    setHouseState((prev) => {
      const nextTemp =
        Math.round((prev.chauffageTemp + amount) * 10) / 10;

      if (nextTemp >= 14 && nextTemp <= 28) {
        return {
          ...prev,
          chauffageTemp: nextTemp
        };
      }

      return prev;
    });
  };

  return (
    <div className="space-y-24 pb-20">

      {/* ================= HERO SECTION ================= */}

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 text-left">

        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

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

                Automatisez votre maison, gagnez en confort et gardez vos données chez vous.

              </p>

            </div>

            <div className="space-y-4">

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

                <a
                  href="https://github.com/thierrypug/Sally-Home-Connect-Windows-Beta/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold rounded-xl text-base shadow-lg shadow-emerald-600/20 transition-all text-center cursor-pointer inline-flex items-center justify-center gap-2"
                >

                  <Download className="w-5 h-5" />

                  Télécharger la bêta Windows

                </a>

                <button
                  onClick={() => onChangePage('propos')}
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-850 active:scale-[0.98] border border-slate-800 text-slate-200 hover:text-white font-semibold rounded-xl text-base transition-all text-center cursor-pointer"
                >

                  Découvrir Sally

                </button>

              </div>

              <p className="text-sm text-slate-500">

                Bêta Windows 10/11 • essai gratuit 60 jours • fonctionnement local • aucun compte requis

              </p>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-900">

              <div className="flex items-start gap-2.5">

                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">

                  <Home className="w-4 h-4" />

                </div>

                <div>

                  <h4 className="text-xs font-bold text-slate-200">
                    100 % locale
                  </h4>

                  <p className="text-[10px] text-slate-500">
                    Aucun cloud imposé
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-2.5">

                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">

                  <LockKeyhole className="w-4 h-4" />

                </div>

                <div>

                  <h4 className="text-xs font-bold text-slate-200">
                    Sans abonnement
                  </h4>

                  <p className="text-[10px] text-slate-500">
                    Pas de frais mensuels
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-2.5">

                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">

                  <Radio className="w-4 h-4" />

                </div>

                <div>

                  <h4 className="text-xs font-bold text-slate-200">
                    Zigbee / EnOcean
                  </h4>

                  <p className="text-[10px] text-slate-500">
                    Compatibilité native
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-2.5">

                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">

                  <ShieldCheck className="w-4 h-4" />

                </div>

                <div>

                  <h4 className="text-xs font-bold text-slate-200">
                    Données locales
                  </h4>

                  <p className="text-[10px] text-slate-500">
                    Contrôle du logement
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="lg:col-span-5 relative flex justify-center">

            <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 to-cyan-500/5 rounded-3xl blur-2xl pointer-events-none" />

            <div className="relative w-full max-w-sm rounded-[40px] border-[5px] border-slate-800 bg-slate-950 p-2.5 shadow-2xl overflow-hidden sally-glow-purple">

              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-850 rounded-full z-20 flex items-center justify-between px-4">

                <div className="w-2 h-2 rounded-full bg-slate-900" />

                <div className="w-16 h-1 rounded-full bg-slate-900" />

              </div>

              <div className="relative bg-[#050b18] rounded-[30px] p-5 h-full space-y-6 pt-8 text-left">

                <div className="flex justify-between items-center border-b border-white/5 pb-3">

                  <div>

                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">

                      <span>Sally Home Connect</span>

                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />

                    </h3>

                    <p className="text-[9px] font-mono text-emerald-400">

                      FONCTIONNEMENT LOCAL

                    </p>

                  </div>

                  <span className="text-[10px] bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full font-mono">

                    Local

                  </span>

                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-800 group h-40">

                  <img
                    src={HERO_HOUSE_IMAGE}
                    alt="Maison équipée avec Sally Home Connect"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className={`absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-14 h-10 bg-yellow-400/20 blur-lg transition-opacity duration-300 ${
                      houseState.salonLights
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />

                  <div
                    className={`absolute top-2/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-8 bg-yellow-400/25 blur-md transition-opacity duration-300 ${
                      houseState.exterieurLights
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />

                  <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md rounded-lg p-2 flex justify-between items-center border border-white/10 text-[10px]">

                    <span className="text-slate-300">
                      Statut maison
                    </span>

                    <span className="text-emerald-400 font-bold flex items-center gap-1">

                      <span className="w-1 h-1 rounded-full bg-emerald-400" />

                      Connectée localement

                    </span>

                  </div>

                </div>

                <div className="space-y-3">

                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">

                    Commandes principales

                  </span>

                  <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 flex items-center justify-between">

                    <div>

                      <span className="text-[10px] text-slate-500 block">
                        Chauffage salon
                      </span>

                      <strong className="text-sm text-slate-200">
                        {houseState.chauffageTemp} °C
                      </strong>

                    </div>

                    <div className="flex gap-1.5">

                      <button
                        onClick={() => adjustHeating(-0.5)}
                        className="w-7 h-7 bg-slate-950 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center justify-center text-xs active:scale-95"
                        aria-label="Baisser la température"
                      >

                        <ChevronDown className="w-4 h-4" />

                      </button>

                      <button
                        onClick={() => adjustHeating(0.5)}
                        className="w-7 h-7 bg-slate-950 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center justify-center text-xs active:scale-95"
                        aria-label="Augmenter la température"
                      >

                        <ChevronUp className="w-4 h-4" />

                      </button>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-2">

                    <button
                      onClick={() => toggleLight('salonLights')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        houseState.salonLights
                          ? 'bg-indigo-600/10 border-indigo-500/40 text-indigo-300'
                          : 'bg-slate-900/50 border-slate-800/80 text-slate-400'
                      }`}
                    >

                      <Lightbulb
                        className={`w-4 h-4 mb-1.5 ${
                          houseState.salonLights
                            ? 'text-indigo-400'
                            : 'text-slate-500'
                        }`}
                      />

                      <div className="text-[9px] text-slate-500 leading-none">
                        Salon
                      </div>

                      <div className="text-[10px] font-bold leading-normal">

                        {houseState.salonLights
                          ? 'Allumé'
                          : 'Éteint'}

                      </div>

                    </button>

                    <button
                      onClick={() => toggleLight('exterieurLights')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        houseState.exterieurLights
                          ? 'bg-cyan-600/10 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-900/50 border-slate-800/80 text-slate-400'
                      }`}
                    >

                      <Lightbulb
                        className={`w-4 h-4 mb-1.5 ${
                          houseState.exterieurLights
                            ? 'text-cyan-400'
                            : 'text-slate-500'
                        }`}
                      />

                      <div className="text-[9px] text-slate-500 leading-none">
                        Extérieur
                      </div>

                      <div className="text-[10px] font-bold leading-normal">

                        {houseState.exterieurLights
                          ? 'Allumé'
                          : 'Éteint'}

                      </div>

                    </button>

                  </div>

                  <div
                    className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                      houseState.alarmActive
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                    }`}
                  >

                    <ShieldCheck className="w-4 h-4 shrink-0" />

                    <div className="leading-tight">

                      <p className="font-semibold text-[10px]">

                        {houseState.alarmActive
                          ? 'Alarme activée'
                          : 'Alarme désactivée'}

                      </p>

                      <p className="text-[8.5px] opacity-70">

                        Gestion locale du système

                      </p>

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 text-left">

          <div className="lg:col-span-5 space-y-6">

            <p className="text-xs font-mono tracking-widest text-cyan-400 font-semibold uppercase leading-none">

              Notre mission

            </p>

            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-tight">

              Pourquoi Sally

              <br />

              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-cyan-400 to-[#b5179e] font-extrabold pb-1">

                existe.

              </span>

            </h2>

            <div className="space-y-4 text-slate-300 font-light text-base leading-relaxed">

              <p>

                La domotique devrait simplifier votre vie, pas la compliquer.

              </p>

              <p>

                Sally Home Connect a été conçue pour proposer une solution{' '}

                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400 font-bold">

                  locale et sécurisée

                </span>{' '}

                tout en restant{' '}

                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400 font-bold">

                  accessible au plus grand nombre.

                </span>

              </p>

            </div>

          </div>

          <div className="lg:col-span-7 relative h-90 rounded-3xl overflow-hidden border border-slate-900 group shadow-2xl shadow-black/80">

            <img
              src={HERO_HOUSE_IMAGE}
              alt="Maison connectée avec Sally Home Connect"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.45] saturate-[1.2] transition-transform duration-[8s] group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none stroke-current"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                d="M 330,190 C 280,140 180,120 120,120 M 120,120 L 120,124"
                fill="none"
                stroke="#2563eb"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />

              <path
                d="M 360,190 C 350,110 320,60 260,60"
                fill="none"
                stroke="#818cf8"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />

              <path
                d="M 390,190 C 400,120 420,80 480,80"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />

              <path
                d="M 420,200 C 460,190 530,190 570,190"
                fill="none"
                stroke="#a21caf"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.6"
              />

            </svg>

            <div className="absolute top-30 left-30 -translate-x-1/2 -translate-y-1/2 z-10">

              <div
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-cyan-400 text-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                title="Lumières"
              >

                <Lightbulb className="w-4 h-4" />

              </div>

            </div>

            <div className="absolute top-15 left-65 -translate-x-1/2 -translate-y-1/2 z-10">

              <div
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-indigo-400 text-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(129,140,248,0.4)]"
                title="Volets motorisés"
              >

                <SlidersHorizontal className="w-4 h-4" />

              </div>

            </div>

            <div className="absolute top-20 left-120 -translate-x-1/2 -translate-y-1/2 z-10">

              <div
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-blue-400 text-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(96,165,250,0.4)]"
                title="Automatismes"
              >

                <Home className="w-4 h-4" />

              </div>

            </div>

            <div className="absolute top-47.5 left-15 -translate-x-1/2 -translate-y-1/2 z-10">

              <div
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-orange-400 text-orange-400 flex items-center justify-center shadow-[0_0_15px_rgba(251,146,60,0.4)]"
                title="Chauffage"
              >

                <Thermometer className="w-4 h-4" />

              </div>

            </div>

            <div className="absolute top-47.5 right-17.5 translate-x-1/2 -translate-y-1/2 z-10">

              <div
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-fuchsia-500 text-fuchsia-400 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.4)]"
                title="Sécurité"
              >

                <LockKeyhole className="w-4 h-4" />

              </div>

            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">

              <div className="bg-[#050b18]/95 border-2 border-indigo-500/40 rounded-2xl px-6 py-3.5 shadow-[0_0_35px_rgba(99,102,241,0.5)] flex items-center gap-4">

                <div className="relative w-11 h-11 rounded-xl bg-linear-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg">

                  <div className="w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center">

                    <Home className="w-5 h-5 text-indigo-400 animate-pulse" />

                  </div>

                </div>

                <div className="text-left">

                  <span className="font-display font-black text-slate-100 text-sm tracking-tight block">

                    Logiciel{' '}

                    <span className="text-indigo-400">
                      Sally
                    </span>

                  </span>

                  <div className="flex items-center gap-1.5 mt-0.5">

                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />

                    <span className="text-[9px] font-mono tracking-wider text-emerald-400 uppercase leading-none block font-semibold">

                      Fonctionnement local

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">

          <article className="lg:col-span-5 bg-[#060a16]/80 border border-slate-900 rounded-3xl p-8 relative flex flex-col justify-between hover:border-slate-800/60 transition-colors text-left overflow-hidden">

            <div className="space-y-6">

              <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 pb-3 border-b border-white/5">

                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />

                <span>Les limites de certaines solutions</span>

              </h3>

              <div className="space-y-5">

                {limites.map((item) => (

                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                  >

                    <div className="p-2 w-9 h-9 rounded-full bg-rose-950/20 border border-rose-900/20 flex items-center justify-center shrink-0">

                      {item.icon}

                    </div>

                    <div>

                      <h4 className="text-sm font-semibold text-slate-200">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {item.text}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <button
              onClick={() => onChangePage('solutions')}
              className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/35 transition-all shadow-xl shadow-black z-20 cursor-pointer"
              aria-label="Voir les solutions"
            >

              <ArrowRight className="w-4 h-4" />

            </button>

          </article>

          <article className="lg:col-span-4 bg-[#050916] border-2 border-[#1e1b4b] rounded-3xl p-8 relative shadow-[0_0_25px_rgba(99,102,241,0.15)] flex flex-col justify-between text-left overflow-hidden">

            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">

              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 pb-3 border-b border-indigo-500/10">

                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />

                <span>
                  Notre réponse :{' '}
                  <span className="text-indigo-400">
                    Sally Home Connect
                  </span>
                </span>

              </h3>

              <div className="space-y-5">

                {reponses.map((item) => (

                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                  >

                    <div className="p-2 w-9 h-9 rounded-full bg-emerald-950/20 border border-emerald-900/20 flex items-center justify-center shrink-0">

                      {item.icon}

                    </div>

                    <div>

                      <h4 className="text-sm font-semibold text-slate-200">
                        {item.title}
                      </h4>

                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        {item.text}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </article>

          <article className="lg:col-span-3 bg-[#060a16]/80 border border-slate-900 rounded-3xl p-6 relative flex flex-col justify-between hover:border-slate-800/60 transition-colors text-left overflow-hidden">

            <span className="text-[75px] text-indigo-500/10 font-serif absolute -top-3 -left-1 select-none pointer-events-none font-bold leading-none">
              “
            </span>

            <div className="space-y-4 pt-8 relative z-10">

              <p className="text-slate-300 font-light text-xs italic leading-relaxed">

                Nous défendons une domotique respectueuse de la vie privée, conçue pour améliorer le quotidien sans imposer de dépendance au cloud.

              </p>

            </div>

            <div className="border-t border-white/5 pt-6 mt-6 flex flex-col gap-4 relative z-10">

              <div className="flex items-center gap-3">

                <div className="w-5 h-5 rounded-full overflow-hidden flex shrink-0 border border-white/10 shadow-sm">

                  <div className="w-1/3 h-full bg-[#002395]" />
                  <div className="w-1/3 h-full bg-white" />
                  <div className="w-1/3 h-full bg-[#ED2939]" />

                </div>

                <div>

                  <p className="text-slate-200 font-bold text-xs leading-none">
                    Conçue en France
                  </p>

                  <p className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mt-1">
                    avec passion
                  </p>

                </div>

              </div>

            </div>

          </article>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-900/80 text-left">

          <div className="flex items-center gap-3">

            <div className="p-2 w-9 h-9 rounded-xl bg-cyan-950/20 border border-cyan-900/30 text-cyan-400 flex items-center justify-center shrink-0">

              <ShieldCheck className="w-5 h-5" />

            </div>

            <div>

              <h4 className="text-xs font-bold text-slate-200">
                Protection des données
              </h4>

              <p className="text-[10px] text-slate-500 font-medium">
                Les données restent dans le logement
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="p-2 w-9 h-9 rounded-xl bg-indigo-950/25 border border-indigo-900/30 text-indigo-400 flex items-center justify-center shrink-0">

              <Sparkles className="w-5 h-5" />

            </div>

            <div>

              <h4 className="text-xs font-bold text-slate-200">
                Fonctionnement local
              </h4>

              <p className="text-[10px] text-slate-500 font-medium">
                Utilisable même sans accès Internet
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="p-2 w-9 h-9 rounded-xl bg-violet-950/20 border border-violet-900/25 text-violet-400 flex items-center justify-center shrink-0">

              <Wifi className="w-5 h-5" />

            </div>

            <div>

              <h4 className="text-xs font-bold text-slate-200">
                Technologies compatibles
              </h4>

              <p className="text-[10px] text-slate-500 font-medium">
                Zigbee et EnOcean
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="p-2 w-9 h-9 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-emerald-400 flex items-center justify-center shrink-0">

              <Home className="w-5 h-5" />

            </div>

            <div>

              <h4 className="text-xs font-bold text-slate-200">
                Évolutive
              </h4>

              <p className="text-[10px] text-slate-500 font-medium">
                Installation progressive
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= UNE JOURNÉE AVEC SALLY ================= */}

      <section className="relative bg-slate-950/40 border-y border-slate-900 py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

            <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">
              Scénarios du quotidien
            </p>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
              Une journée avec Sally.
            </h2>

            <p className="text-slate-400 font-light leading-relaxed">

              Sally automatise certains gestes simples de la maison pour améliorer le confort au quotidien.

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

                      <li
                        key={i}
                        className="text-sm text-slate-400 flex items-start gap-2"
                      >

                        <span className="text-indigo-400 mt-1 text-xs">
                          •
                        </span>

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

            <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">
              Ce que Sally vous apporte
            </p>

            <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-100 leading-tight">

              Une maison plus confortable,

              <br />

              <span className="text-indigo-400 font-bold">
                plus simple à piloter.
              </span>

            </h2>

            <p className="text-slate-400 font-light leading-relaxed">

              Sally centralise les fonctions essentielles du logement : lumières, volets, chauffage, scénarios et équipements connectés.

            </p>

            <button
              onClick={() => onChangePage('solutions')}
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-all group cursor-pointer focus:outline-none"
            >

              <span>Voir les fonctionnalités</span>

              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />

            </button>

          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">

              <div className="p-2 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4">

                <Lightbulb className="w-full h-full" />

              </div>

              <h3 className="text-base font-bold text-slate-200">
                Confort
              </h3>

              <p className="text-xs text-slate-400 mt-2">

                Centralisez le pilotage des lumières, volets et équipements du logement.

              </p>

            </div>

            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">

              <div className="p-2 w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-4">

                <Thermometer className="w-full h-full" />

              </div>

              <h3 className="text-base font-bold text-slate-200">
                Chauffage
              </h3>

              <p className="text-xs text-slate-400 mt-2">

                Adaptez les consignes de température aux besoins de chaque pièce.

              </p>

            </div>

            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">

              <div className="p-2 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">

                <ShieldCheck className="w-full h-full" />

              </div>

              <h3 className="text-base font-bold text-slate-200">
                Sécurité locale
              </h3>

              <p className="text-xs text-slate-400 mt-2">

                Consultez localement l’état des équipements et automatismes de votre habitat.

              </p>

            </div>

            <div className="p-6 rounded-2xl bg-slate-900/45 border border-slate-900 hover:border-indigo-500/20 hover:bg-[#070c18] transition-all text-left">

              <div className="p-2 w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-4">

                <SlidersHorizontal className="w-full h-full" />

              </div>

              <h3 className="text-base font-bold text-slate-200">
                Automatisation
              </h3>

              <p className="text-xs text-slate-400 mt-2">

                Créez des scénarios pour automatiser les gestes répétitifs du quotidien.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= PUBLICS ================= */}

      <section className="relative bg-slate-950/40 border-y border-slate-900 py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">

            <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">
              Accessible à tous
            </p>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">
              Sally s&apos;adapte à différents besoins.
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

            <article className="bg-[#0b0f19] border border-slate-900 p-8 rounded-2xl">

              <div className="p-3 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">

                <HeartHandshake className="w-full h-full" />

              </div>

              <h3 className="text-lg font-bold text-slate-200 mb-2">
                Pour les seniors
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed font-light">

                Une interface simplifiée et lisible pour faciliter le pilotage des fonctions essentielles du logement.

              </p>

            </article>

            <article className="bg-[#0b0f19] border border-slate-900 p-8 rounded-2xl">

              <div className="p-3 w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-6">

                <Users className="w-full h-full" />

              </div>

              <h3 className="text-lg font-bold text-slate-200 mb-2">
                Pour les proches
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed font-light">

                Une domotique locale conçue pour apporter davantage de confort sans imposer de caméra ni de cloud.

              </p>

            </article>

            <article className="bg-[#0b0f19] border border-slate-900 p-8 rounded-2xl">

              <div className="p-3 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">

                <Accessibility className="w-full h-full" />

              </div>

              <h3 className="text-lg font-bold text-slate-200 mb-2">
                Pour l&apos;autonomie PMR
              </h3>

              <p className="text-sm text-slate-400 leading-relaxed font-light">

                Contrôle par scénarios, interface adaptée et commandes vocales pour limiter certains déplacements.

              </p>

            </article>

          </div>

        </div>

      </section>

      {/* ================= TECHNOLOGIES ================= */}

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">

        <div className="max-w-3xl mx-auto space-y-4">

          <p className="text-xs uppercase font-mono tracking-widest text-indigo-400">
            Technologies compatibles
          </p>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-100">

            EnOcean, Zigbee et commande vocale.

          </h2>

          <p className="text-slate-400 font-light max-w-2xl mx-auto">

            Sally Home Connect rassemble plusieurs technologies domotiques derrière une interface unique.

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

              <h3 className="text-base font-bold text-slate-200">
                {item.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.text}
              </p>

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

              Testez{' '}

              <span className="font-bold text-indigo-400">
                Sally Home Connect
              </span>{' '}

              sur Windows

            </h2>

            <p className="text-slate-400 font-light max-w-lg mx-auto">

              La bêta Windows est disponible gratuitement pendant 60 jours. Téléchargez-la depuis le dépôt GitHub officiel pour découvrir Sally.

            </p>

          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">

            <a
              href="https://github.com/thierrypug/Sally-Home-Connect-Windows-Beta/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center gap-3"
            >

              <Download className="w-5 h-5" />

              <span>Télécharger la bêta Windows</span>

            </a>

            <button
              onClick={() => onChangePage('solutions')}
              className="px-10 py-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] border border-slate-800 text-slate-200 hover:text-white font-semibold rounded-xl transition-all cursor-pointer inline-flex items-center gap-3"
            >

              <span>Découvrir les fonctionnalités</span>

              <ArrowRight className="w-5 h-5" />

            </button>

          </div>

        </div>

      </section>

    </div>
  );
}