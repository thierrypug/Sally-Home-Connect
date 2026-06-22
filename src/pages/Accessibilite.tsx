/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lightbulb,
  ChevronRight,
  Bell,
  Thermometer,
  Home,
  Layout,
  Sliders,
  MoreHorizontal,
  Accessibility,
  Mic,
  Lock,
  Unlock,
  Settings,
  Smartphone,
  Eye,
  Users,
  ShieldCheck,
} from "lucide-react";

import { HouseState } from "../types";
import BACKGROUND_PMR_IMAGE from "../assets/images/sally_pmr_background.png";

interface AccessibiliteProps {
  houseState?: HouseState;
  setHouseState?: (
    state: HouseState | ((prev: HouseState) => HouseState)
  ) => void;
  triggerNotification?: (
    msg: string,
    type: "info" | "success" | "warning" | "alert"
  ) => void;
}

export default function Accessibilite({
  houseState,
  setHouseState,
  triggerNotification,
}: AccessibiliteProps) {
  const [localState, setLocalState] = useState<HouseState>({
    salonLights: true,
    cuisineLights: true,
    chambreLights: false,
    exterieurLights: false,
    voletsOpenPercent: 100,
    chauffageTemp: 21.5,
    activeScenario: "soir",
    alarmActive: false,
  });

  const state = houseState || localState;

  const setState = (
    updater: HouseState | ((prev: HouseState) => HouseState)
  ) => {
    if (setHouseState) {
      setHouseState(updater);
    } else {
      setLocalState(updater);
    }
  };

  const [activeTab, setActiveTab] = useState<
    "accueil" | "pieces" | "scenarios" | "plus"
  >("accueil");

  const [voiceInput, setVoiceInput] = useState<string | null>(null);
  const [voiceReply, setVoiceReply] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedVoicePreset, setSelectedVoicePreset] = useState<number | null>(
    null
  );

  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDyslexicFriendly, setIsDyslexicFriendly] = useState(false);
  const [textScale, setTextScale] = useState<"normal" | "large" | "huge">(
    "normal"
  );

  const isLightsOn = state.salonLights || state.cuisineLights;
  const isVoletsOpen = state.voletsOpenPercent > 0;

  const handleVoiceAction = (commandType: string) => {
    setIsListening(true);
    setVoiceReply(null);

    setTimeout(() => {
      setIsListening(false);

      if (commandType === "lumieres_on") {
        setState((prev) => ({
          ...prev,
          salonLights: true,
          cuisineLights: true,
        }));
        setVoiceReply("J’ai allumé les lumières du salon pour vous.");
        triggerNotification?.("Commande vocale : salon allumé", "success");
      }

      if (commandType === "lumieres_off") {
        setState((prev) => ({
          ...prev,
          salonLights: false,
          cuisineLights: false,
        }));
        setVoiceReply("Très bien, extinction des lumières effectuée.");
        triggerNotification?.("Commande vocale : extinction générale", "info");
      }

      if (commandType === "volets_close") {
        setState((prev) => ({
          ...prev,
          voletsOpenPercent: 0,
        }));
        setVoiceReply("Je ferme les volets roulants.");
        triggerNotification?.("Commande vocale : fermeture des volets", "warning");
      }

      if (commandType === "scenario_soir") {
        setState((prev) => ({
          ...prev,
          salonLights: true,
          exterieurLights: true,
          activeScenario: "soir",
          voletsOpenPercent: 100,
        }));
        setVoiceReply("Ambiance chaleureuse programmée. Belle soirée.");
        triggerNotification?.("Commande vocale : scénario soirée activé", "success");
      }
    }, 1500);
  };

  const voicePresets = [
    {
      text: "Sally, allume les lumières !",
      action: () => handleVoiceAction("lumieres_on"),
    },
    {
      text: "Sally, éteins tout le salon.",
      action: () => handleVoiceAction("lumieres_off"),
    },
    {
      text: "Sally, ferme tous les volets.",
      action: () => handleVoiceAction("volets_close"),
    },
    {
      text: "Sally, active l’ambiance Soirée.",
      action: () => handleVoiceAction("scenario_soir"),
    },
  ];

  const toggleLightsOnPhone = () => {
    const nextVal = !isLightsOn;
    setState((prev) => ({
      ...prev,
      salonLights: nextVal,
      cuisineLights: nextVal,
    }));

    triggerNotification?.(
      `Lumières ${nextVal ? "allumées" : "éteintes"}`,
      nextVal ? "success" : "info"
    );
  };

  const toggleVoletsOnPhone = () => {
    const nextVal = isVoletsOpen ? 0 : 100;

    setState((prev) => ({
      ...prev,
      voletsOpenPercent: nextVal,
    }));

    triggerNotification?.(
      `Volets roulants ${nextVal > 0 ? "ouverts" : "fermés"}`,
      "info"
    );
  };

  const cycleScenarioOnPhone = () => {
    const scenarios: Array<"soir" | "cinema" | "nuit" | "depart"> = [
      "soir",
      "cinema",
      "nuit",
      "depart",
    ];

    const nextIdx =
      (scenarios.indexOf(state.activeScenario as any) + 1) % scenarios.length;

    const nextScenario = scenarios[nextIdx];

    setState((prev) => {
      const updated = {
        ...prev,
        activeScenario: nextScenario,
      };

      if (nextScenario === "soir") {
        updated.salonLights = true;
        updated.voletsOpenPercent = 100;
        updated.chauffageTemp = 21.5;
      }

      if (nextScenario === "cinema") {
        updated.salonLights = true;
        updated.voletsOpenPercent = 30;
        updated.chauffageTemp = 20;
      }

      if (nextScenario === "nuit") {
        updated.salonLights = false;
        updated.voletsOpenPercent = 0;
        updated.chauffageTemp = 18.5;
      }

      if (nextScenario === "depart") {
        updated.salonLights = false;
        updated.voletsOpenPercent = 0;
        updated.chauffageTemp = 17;
      }

      return updated;
    });

    triggerNotification?.(
      `Scénario activé : ${nextScenario.toUpperCase()}`,
      "success"
    );
  };

  const adjustTempOnPhone = () => {
    setState((prev) => {
      const nextTemp = prev.chauffageTemp >= 24 ? 18 : prev.chauffageTemp + 0.5;
      return {
        ...prev,
        chauffageTemp: nextTemp,
      };
    });

    triggerNotification?.("Consigne de chauffage ajustée", "info");
  };

  const getTextSizeClass = (element: "title" | "body" | "small") => {
    if (textScale === "huge") {
      if (element === "title") return "text-[17px]";
      if (element === "body") return "text-[14px]";
      return "text-[12px]";
    }

    if (textScale === "large") {
      if (element === "title") return "text-[15px]";
      if (element === "body") return "text-[12px]";
      return "text-[10px]";
    }

    if (element === "title") return "text-[13px]";
    if (element === "body") return "text-[11px]";
    return "text-[9px]";
  };

  return (
    <div
      id="accessibilite-page-container"
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#030712] pb-16 text-white"
    >
      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 text-left sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs font-extrabold uppercase leading-none tracking-widest text-cyan-400">
            Espaces adaptés & souverains
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            L’accessibilité domotique,
            <br />
            sans compromis sur la{" "}
            <span className="text-indigo-400">vie privée.</span>
          </h1>

          <p className="text-base font-light leading-relaxed text-slate-400 sm:text-lg">
            Pour les personnes en perte d’autonomie, seniors ou PMR, piloter son
            environnement n’est pas un gadget : c’est la reconquête du
            quotidien. Notre interface adaptative locale garantit un
            fonctionnement physique permanent, 100 % hors-ligne.
          </p>
        </div>
      </section>

      <section className="relative w-full overflow-hidden border-y border-slate-900 bg-slate-950/20 py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={BACKGROUND_PMR_IMAGE}
            alt="Sally PMR Autonomie"
            className={`h-full w-full object-cover transition-all duration-1000 ${
              isLightsOn
                ? "scale-100 brightness-[0.7] contrast-[1.02] saturate-[1.05]"
                : "scale-[1.01] brightness-[0.35] contrast-95 saturate-[0.8]"
            }`}
          />

          <div className="absolute inset-0 z-10 bg-linear-to-b from-slate-950/90 via-transparent to-slate-950/90" />
          <div className="absolute inset-0 z-10 hidden bg-linear-to-r from-slate-950/80 via-transparent to-slate-950/60 md:block" />

          <AnimatePresence>
            {isLightsOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="pointer-events-none absolute inset-0 z-10 bg-indigo-500/10 mix-blend-screen"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-25 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="flex flex-col justify-center space-y-6 text-left lg:col-span-6">
              <span className="select-none text-xs font-extrabold uppercase leading-none tracking-[0.25em] text-[#00f2fe] drop-shadow-[0_2px_10px_rgba(0,242,254,0.3)] md:text-sm">
                Autonomie PMR
              </span>

              <h2 className="select-none text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                La maison
                <br />
                <span className="mt-1 block bg-linear-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text font-extrabold text-transparent">
                  obéit à votre voix.
                </span>
              </h2>

              <p className="max-w-lg text-sm font-light leading-relaxed text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-base">
                Déclenchez lumières, fermetures de volets, régulations de
                température ou activation d’ambiance à distance, depuis un lit,
                un fauteuil d’autonomie ou de simples commandes orales.
              </p>

              <div className="max-w-md space-y-4 rounded-2xl border border-slate-800/80 bg-slate-950/85 p-5 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 animate-pulse text-cyan-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                      Simulateur vocal de démonstration
                    </span>
                  </div>

                  {isListening && (
                    <span className="rounded-full bg-red-500/25 px-2.5 py-0.5 font-mono text-[10px] text-red-300 animate-pulse">
                      En écoute...
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {voicePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedVoicePreset(idx);
                        setVoiceInput(preset.text);
                        preset.action();
                      }}
                      disabled={isListening}
                      className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all ${
                        selectedVoicePreset === idx
                          ? "border-indigo-400 bg-indigo-600/30 text-white"
                          : "border-slate-800/60 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      }`}
                    >
                      “{preset.text}”
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {(voiceInput || isListening || voiceReply) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-2.5 border-t border-slate-900 pt-2 text-left text-xs"
                    >
                      {voiceInput && (
                        <div className="flex max-w-[95%] justify-start gap-2">
                          <div className="shrink-0 self-start rounded-full border border-slate-800 bg-slate-900 p-1 px-1.5 text-[10px]">
                            👤
                          </div>

                          <div className="rounded-2xl rounded-tl-none border border-slate-800 bg-slate-900 p-2 text-slate-200">
                            {voiceInput}
                          </div>
                        </div>
                      )}

                      {isListening && (
                        <div className="flex justify-end gap-2">
                          <div className="flex items-center gap-1 rounded-2xl rounded-tr-none border border-cyan-500/20 bg-cyan-500/10 p-3">
                            <span className="h-3 w-1 animate-bounce rounded-full bg-cyan-400" />
                            <span className="h-4.5 w-1 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
                            <span className="h-2.5 w-1 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
                            <span className="h-5 w-1 animate-bounce rounded-full bg-cyan-400 [animation-delay:450ms]" />
                          </div>

                          <div className="shrink-0 self-start rounded-full border border-cyan-800 bg-cyan-950 p-1 px-1.5 text-[10px]">
                            🤖
                          </div>
                        </div>
                      )}

                      {voiceReply && !isListening && (
                        <div className="ml-auto flex max-w-[95%] justify-end gap-2">
                          <div className="rounded-2xl rounded-tr-none border border-cyan-400/20 bg-cyan-500/10 p-2.5 font-medium text-[#00f2fe]">
                            {voiceReply}
                          </div>

                          <div className="shrink-0 self-start rounded-full border border-indigo-800 bg-indigo-950 p-1 pl-1 pr-1.5 text-[10px]">
                            ⚡
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative flex items-center justify-center py-2 lg:col-span-6 lg:justify-end">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className={`relative flex h-160 w-85 flex-col overflow-hidden rounded-[48px] border-10 border-slate-900 bg-slate-950 shadow-[0_0_50px_rgba(139,92,246,0.25)] transition-all duration-300 ${
                  isHighContrast ? "bg-black ring-4 ring-yellow-400/40" : ""
                }`}
              >
                <div className="absolute left-1/2 top-0 z-50 flex h-6 w-40 -translate-x-1/2 items-center justify-center gap-2 rounded-b-2xl bg-slate-950 px-6">
                  <div className="h-1 w-10 rounded-full bg-slate-800" />
                  <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
                </div>

                <div className="z-40 flex items-center justify-between px-6 pb-2 pt-8 text-[10px] font-semibold text-slate-400">
                  <span>9:41</span>

                  <div className="flex items-center gap-1">
                    <div className="flex h-2 items-end gap-0.5">
                      <div className="h-1 w-0.5 rounded-sm bg-white" />
                      <div className="h-1.5 w-0.5 rounded-sm bg-white" />
                      <div className="h-2 w-0.5 rounded-sm bg-white" />
                      <div className="h-2.5 w-0.5 rounded-sm bg-white" />
                    </div>

                    <span className="rounded border border-green-500/30 bg-green-500/5 px-1 text-[7px] font-bold text-green-400">
                      LOCAL
                    </span>

                    <div className="flex h-2 w-4 items-center justify-start rounded-sm border border-slate-700 bg-slate-800 p-0.5">
                      <div className="h-full w-full rounded-sm bg-white" />
                    </div>
                  </div>
                </div>

                <div className="relative z-30 flex grow flex-col overflow-y-auto p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          isHighContrast
                            ? "bg-yellow-400 text-black"
                            : "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                        }`}
                      >
                        <Accessibility className="h-4.5 w-4.5" />
                      </div>

                      <div className="text-left">
                        <h4
                          className={`font-bold uppercase leading-none tracking-wide ${
                            getTextSizeClass("title")
                          } ${
                            isHighContrast ? "text-yellow-400" : "text-slate-100"
                          } ${
                            isDyslexicFriendly ? "font-mono tracking-wider" : ""
                          }`}
                        >
                          Sally Home
                        </h4>

                        <p className="mt-0.5 font-mono text-[8px] font-medium uppercase leading-none tracking-widest text-[#00f2fe]">
                          Connect
                        </p>
                      </div>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900">
                      <Settings className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-left">
                    <span
                      className={`font-semibold tracking-wide ${getTextSizeClass(
                        "body"
                      )} ${isHighContrast ? "text-white" : "text-slate-300"}`}
                    >
                      Contrôle pièces
                    </span>

                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  </div>

                  <div className="mb-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={toggleLightsOnPhone}
                      className={`flex min-h-27.5 cursor-pointer flex-col items-start justify-between rounded-2xl border p-3 text-left transition-all duration-300 ${
                        isHighContrast
                          ? isLightsOn
                            ? "border-yellow-400 bg-yellow-400 text-black shadow-[0_4px_15px_rgba(234,179,8,0.4)]"
                            : "border-yellow-400 bg-black text-yellow-400"
                          : isLightsOn
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-[0_4px_16px_rgba(245,158,11,0.2)]"
                            : "border-slate-800/60 bg-slate-900/60 text-slate-400 hover:bg-slate-800/60"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-1.5 transition-all ${
                          isHighContrast
                            ? isLightsOn
                              ? "bg-black text-yellow-400"
                              : "bg-yellow-400/20 text-yellow-300"
                            : isLightsOn
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-800"
                        }`}
                      >
                        <Lightbulb className="h-4 w-4" />
                      </div>

                      <div>
                        <h5
                          className={`font-bold leading-none ${getTextSizeClass(
                            "body"
                          )} ${
                            isHighContrast && isLightsOn
                              ? "text-black"
                              : "text-slate-200"
                          } ${
                            isDyslexicFriendly ? "font-mono tracking-wider" : ""
                          }`}
                        >
                          Lumières
                        </h5>

                        <span
                          className={`mt-1 block font-mono leading-none ${getTextSizeClass(
                            "small"
                          )} ${isLightsOn ? "font-bold opacity-100" : "opacity-60"}`}
                        >
                          {isLightsOn ? "ALLUMÉES" : "ÉTEINTES"}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={toggleVoletsOnPhone}
                      className={`flex min-h-27.5 cursor-pointer flex-col items-start justify-between rounded-2xl border p-3 text-left transition-all duration-300 ${
                        isHighContrast
                          ? isVoletsOpen
                            ? "border-yellow-400 bg-yellow-400 text-black shadow-[0_4px_15px_rgba(234,179,8,0.4)]"
                            : "border-yellow-400 bg-black text-yellow-400"
                          : isVoletsOpen
                            ? "border-sky-500/40 bg-sky-500/10 text-sky-300 shadow-[0_4px_16px_rgba(14,165,233,0.2)]"
                            : "border-slate-800/60 bg-slate-900/60 text-slate-400 hover:bg-slate-800/60"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-1.5 transition-all ${
                          isHighContrast
                            ? isVoletsOpen
                              ? "bg-black text-yellow-400"
                              : "bg-yellow-400/20 text-yellow-400"
                            : isVoletsOpen
                              ? "bg-sky-500/20 text-sky-300"
                              : "bg-slate-800"
                        }`}
                      >
                        <div className="flex h-3.5 w-3.5 flex-col items-center justify-center gap-0.5">
                          <span className="h-0.5 w-3 rounded-sm bg-current" />
                          <span className="h-0.5 w-3 rounded-sm bg-current" />
                          <span className="h-0.5 w-3 rounded-sm bg-current" />
                        </div>
                      </div>

                      <div>
                        <h5
                          className={`font-bold leading-none ${getTextSizeClass(
                            "body"
                          )} ${
                            isHighContrast && isVoletsOpen
                              ? "text-black"
                              : "text-slate-200"
                          } ${
                            isDyslexicFriendly ? "font-mono tracking-wider" : ""
                          }`}
                        >
                          Volets
                        </h5>

                        <span
                          className={`mt-1 block font-mono leading-none ${getTextSizeClass(
                            "small"
                          )} ${
                            isVoletsOpen ? "font-bold opacity-100" : "opacity-60"
                          }`}
                        >
                          {isVoletsOpen ? "OUVERTS" : "FERMÉS"}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={adjustTempOnPhone}
                      className={`flex min-h-27.5 cursor-pointer flex-col items-start justify-between rounded-2xl border p-3 text-left transition-all hover:bg-opacity-80 ${
                        isHighContrast
                          ? "border-yellow-400 bg-black text-yellow-400 shadow-[0_4px_15px_rgba(234,179,8,0.1)]"
                          : "border-pink-500/20 bg-pink-500/5 text-pink-400 shadow-[0_4px_15px_rgba(236,72,153,0.08)]"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-1.5 ${
                          isHighContrast
                            ? "bg-yellow-400/20 text-yellow-400"
                            : "bg-pink-500/20 text-pink-400"
                        }`}
                      >
                        <Thermometer className="h-4 w-4" />
                      </div>

                      <div>
                        <h5
                          className={`font-bold leading-none ${getTextSizeClass(
                            "body"
                          )} ${
                            isHighContrast ? "text-yellow-400" : "text-slate-200"
                          } ${
                            isDyslexicFriendly ? "font-mono tracking-wider" : ""
                          }`}
                        >
                          Chauffage
                        </h5>

                        <span className="mt-1 block font-mono text-xs font-bold">
                          {state.chauffageTemp.toFixed(1)} °C
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={cycleScenarioOnPhone}
                      className={`flex min-h-27.5 cursor-pointer flex-col items-start justify-between rounded-2xl border p-3 text-left transition-all hover:bg-opacity-80 ${
                        isHighContrast
                          ? "border-yellow-400 bg-black text-yellow-400 shadow-[0_4px_15px_rgba(234,179,8,0.1)]"
                          : "border-purple-500/20 bg-purple-500/5 text-purple-300 shadow-[0_4px_15px_rgba(168,85,247,0.08)]"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-1.5 ${
                          isHighContrast
                            ? "bg-yellow-400/20 text-yellow-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        <Bell className="h-4 w-4" />
                      </div>

                      <div>
                        <h5
                          className={`font-bold leading-none ${getTextSizeClass(
                            "body"
                          )} ${
                            isHighContrast ? "text-yellow-400" : "text-slate-200"
                          } ${
                            isDyslexicFriendly ? "font-mono tracking-wider" : ""
                          }`}
                        >
                          Ambiance
                        </h5>

                        <span className="mt-1 block truncate text-[9px] font-semibold uppercase tracking-tight">
                          {state.activeScenario}
                        </span>
                      </div>
                    </button>
                  </div>

                  <div
                    className={`space-y-1 rounded-xl p-3 text-left ${
                      isHighContrast
                        ? "border-2 border-yellow-400 bg-black text-white"
                        : "border border-slate-800 bg-slate-900/60"
                    }`}
                  >
                    <p
                      className={`font-mono text-[8.5px] font-bold uppercase ${
                        isHighContrast ? "text-yellow-400" : "text-indigo-400"
                      }`}
                    >
                      Scénario actif
                    </p>

                    <p
                      className={`flex items-center gap-1.5 font-semibold capitalize ${getTextSizeClass(
                        "body"
                      )}`}
                    >
                      <span>🏠 Ambiance {state.activeScenario}</span>
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    </p>
                  </div>
                </div>

                <div
                  className={`z-40 flex shrink-0 items-center justify-between border-t px-6 py-4 ${
                    isHighContrast
                      ? "border-yellow-400 bg-black text-yellow-400"
                      : "border-slate-900 bg-slate-950 text-slate-400"
                  }`}
                >
                  {[
                    ["accueil", Home, "Accueil"],
                    ["pieces", Layout, "Pièces"],
                    ["scenarios", Sliders, "Scénarios"],
                    ["plus", MoreHorizontal, "Plus"],
                  ].map(([tab, Icon, label]: any) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex cursor-pointer flex-col items-center gap-1 transition-colors ${
                        activeTab === tab
                          ? isHighContrast
                            ? "text-white"
                            : "text-[#00f2fe]"
                          : "hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-[8px] font-semibold">{label}</span>
                    </button>
                  ))}
                </div>

                <div
                  className={`z-40 flex w-full shrink-0 justify-center pb-1.5 ${
                    isHighContrast ? "bg-black" : "bg-slate-950"
                  }`}
                >
                  <div className="h-0.75 w-24 rounded-full bg-slate-700" />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-20 mt-8 text-left">
            <div className="grid max-w-full grid-cols-2 gap-4 rounded-2xl border border-slate-950/40 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-md md:grid-cols-4 md:gap-6 md:px-6 md:py-5">
              {[
                [Home, "100% Locale", "Sans cloud", "text-cyan-400"],
                [Accessibility, "Accessible", "à tous", "text-indigo-400"],
                [Mic, "Contrôle", "vocal local", "text-purple-400"],
                [Smartphone, "Interface", "simplifiée", "text-emerald-400"],
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

      <section className="relative mx-auto max-w-7xl px-4 py-16 text-left sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center gap-10 overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-r from-slate-950 to-slate-900 p-6 shadow-xl sm:p-10 lg:flex-row">
          <div className="max-w-lg space-y-4">
            <div className="inline-flex gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
              <Eye className="h-3.5 w-3.5" />
              <span>Démonstration numérique adaptative</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Testez nos fonctions d’accessibilité logicielle.
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-400">
              Notre interface s’adapte aux différents handicaps sensoriels ou
              cognitifs. Activez les filtres d’aide pour voir instantanément
              comment l’application virtuelle ajuste son affichage.
            </p>
          </div>

          <div className="grid w-full grow grid-cols-1 gap-4 sm:grid-cols-3 lg:w-auto">
            <button
              onClick={() => {
                setIsHighContrast(!isHighContrast);
                triggerNotification?.(
                  `Contraste élevé ${!isHighContrast ? "activé" : "désactivé"}`,
                  "info"
                );
              }}
              className={`flex h-36 cursor-pointer flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-350 ${
                isHighContrast
                  ? "border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.15)]"
                  : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700"
              }`}
            >
              <span className="text-lg">👁️</span>

              <div>
                <span className="block text-sm font-bold">
                  Contrôle du contraste
                </span>

                <span className="mt-1 block text-xs leading-tight text-slate-400">
                  Palettes adaptées aux personnes malvoyantes.
                </span>
              </div>

              <span className="self-end text-right font-mono text-[10px] font-bold uppercase tracking-wider">
                {isHighContrast ? "Actif" : "Désactivé"}
              </span>
            </button>

            <button
              onClick={() => {
                setIsDyslexicFriendly(!isDyslexicFriendly);
                triggerNotification?.(
                  `Mode dyslexie ${
                    !isDyslexicFriendly ? "activé" : "désactivé"
                  }`,
                  "info"
                );
              }}
              className={`flex h-36 cursor-pointer flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-350 ${
                isDyslexicFriendly
                  ? "border-indigo-400 bg-indigo-500/15 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700"
              }`}
            >
              <span className="text-lg">📖</span>

              <div>
                <span className="block text-sm font-bold">
                  Soutien cognitif
                </span>

                <span className="mt-1 block text-xs leading-tight text-slate-400">
                  Typographies espacées pour améliorer la lecture.
                </span>
              </div>

              <span className="self-end text-right font-mono text-[10px] font-bold uppercase tracking-wider">
                {isDyslexicFriendly ? "Actif" : "Désactivé"}
              </span>
            </button>

            <div className="flex h-36 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-left">
              <span className="text-lg">🔎</span>

              <div>
                <span className="block text-sm font-bold text-slate-200">
                  Taille du texte
                </span>

                <div className="mt-2 flex gap-2">
                  {[
                    ["normal", "Px1"],
                    ["large", "Px2"],
                    ["huge", "Px3"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => {
                        setTextScale(value as "normal" | "large" | "huge");
                        triggerNotification?.(
                          `Échelle de texte : ${label}`,
                          "info"
                        );
                      }}
                      className={`cursor-pointer rounded border px-2 py-1 font-mono text-[10px] uppercase ${
                        textScale === value
                          ? "border-cyan-400 bg-cyan-500/10 text-cyan-300"
                          : "border-slate-800 bg-slate-950 text-slate-400"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <span className="font-mono text-[10px] text-slate-500">
                Agrandissement senior.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-12 text-left sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <p className="font-mono text-xs font-extrabold uppercase leading-none tracking-widest text-[#00f2fe]">
            Une réponse à chaque handicap
          </p>

          <h2 className="text-3xl font-medium text-slate-100 sm:text-4xl">
            Les 4 piliers de l’autonomie à domicile
          </h2>

          <p className="mx-auto max-w-2xl font-light text-slate-400">
            Chaque dispositif Sally s’accorde de manière intelligente et
            matérielle aux nécessités physiques de l’utilisateur.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
          <article className="rounded-3xl border border-slate-900 bg-[#090d16] p-8 transition-colors hover:border-slate-800">
            <div className="mb-6 h-12 w-12 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-3.5 text-indigo-400">
              <Accessibility className="h-full w-full" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-100">
              Autonomie motrice PMR
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-400">
              Plus besoin de forcer physiquement sur des interrupteurs encastrés
              en hauteur. Sally intègre des dispositifs EnOcean de secours sans
              pile ni fil, repositionnables facilement.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-900 bg-[#090d16] p-8 transition-colors hover:border-slate-800">
            <div className="mb-6 h-12 w-12 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3.5 text-orange-500">
              <Eye className="h-full w-full" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-100">
              Déficiences visuelles & cognitives
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-400">
              Les personnes souffrant de cataracte, DMLA ou malvoyance disposent
              d’un mode de lecture dynamique à contraste renforcé. Sally peut
              aussi accompagner l’utilisateur avec des retours vocaux locaux.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-900 bg-[#090d16] p-8 transition-colors hover:border-slate-800">
            <div className="mb-6 h-12 w-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-emerald-400">
              <Users className="h-full w-full" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-100">
              Seniors & maintien à domicile
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-400">
              Sally peut aider à sécuriser le quotidien avec des scénarios
              simples, des alertes locales et des automatismes utiles, sans
              caméra intrusive.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-900 bg-[#090d16] p-8 transition-colors hover:border-slate-800">
            <div className="mb-6 h-12 w-12 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-3.5 text-purple-300">
              <Bell className="h-full w-full" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-100">
              Déficiences auditives & alertes visuelles
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-400">
              Les signaux importants peuvent être traduits en alertes visuelles :
              sonnerie, fumée, alerte technique ou notification de sécurité.
            </p>
          </article>
        </div>
      </section>

      <section className="relative mx-auto mt-6 max-w-7xl px-4 py-10 text-left sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-indigo-950/20 p-6 sm:p-10">
          <div className="pointer-events-none absolute right-0 top-0 select-none p-8 text-8xl opacity-10">
            💶
          </div>

          <div className="max-w-3xl space-y-6">
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-indigo-400">
              Financement & MaPrimeAdapt’
            </span>

            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Saviez-vous que vos travaux d’autonomie peuvent être pris en
              charge jusqu’à 70 % ?
            </h3>

            <p className="text-sm font-light leading-relaxed text-slate-300">
              Depuis janvier 2024, l’aide nationale <strong>MaPrimeAdapt’</strong>, orchestrée par l’Anah, finance
              l’adaptation des logements pour les seniors et les personnes en
              situation de handicap.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-4">
                <h4 className="font-mono text-xs font-bold text-cyan-300">
                  MAPRIMEADAPT’
                </h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  Prise en charge possible de 50 % à 70 % selon la situation.
                </p>
              </div>

              <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-4">
                <h4 className="font-mono text-xs font-bold text-cyan-300">
                  AIDES PCH & APA
                </h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  Aides complémentaires possibles selon le profil.
                </p>
              </div>

              <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-4">
                <h4 className="font-mono text-xs font-bold text-cyan-300">
                  TVA RÉDUITE
                </h4>
                <p className="mt-1 text-[11px] text-slate-400">
                  Taux réduit possible selon les travaux et conditions
                  applicables.
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                triggerNotification?.(
                  "Demande d’informations MaPrimeAdapt’ enregistrée",
                  "success"
                )
              }
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-xs font-semibold text-white shadow-md transition-all hover:bg-opacity-90 sm:text-sm"
            >
              <span>Faire un diagnostic d’éligibilité gratuit</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-8 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-900 pt-8 text-left sm:flex-row">
          <div className="flex shrink-0 items-center gap-2 text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
            <span className="font-mono font-bold tracking-wider">
              CHARTE SOUVERAINETÉ & HANDICAP
            </span>
          </div>

          <p className="max-w-2xl font-light leading-relaxed text-slate-400">
            Parce que les routines de vie d’une personne en situation de
            handicap constituent des données sensibles, Sally conserve
            l’intégralité des flux à l’intérieur du logement. Aucune analyse
            vocale, comportementale ou journal d’activité ne quitte votre réseau.
          </p>
        </div>
      </section>
    </div>
  );
}
