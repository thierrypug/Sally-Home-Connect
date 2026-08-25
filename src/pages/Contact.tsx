/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Send, Clock3, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [imageBg, setImageBg] = useState<string>(
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
  );
  const emailDestination = "sallyhomeconnect@gmail.com";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mailtoLink = `mailto:${emailDestination}?subject=${encodeURIComponent(
    form.sujet || "Demande d'information Sally Home Connect"
  )}&body=${encodeURIComponent(
    `Nom : ${form.nom}\nEmail : ${form.email}\n\nMessage :\n${form.message}`
  )}`;

  return (
    <div
      id="contact-page-container"
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#030712] pb-16 text-white text-left"
    >
      {/* 1. Header Section - Consistent with Accessibilité, Compatibilité, and Seniors pages */}
      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-10 text-left sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-4">
          <p className="font-mono text-xs font-extrabold uppercase leading-none tracking-widest text-[#00f2fe] drop-shadow-[0_2px_10px_rgba(0,242,254,0.3)]">
            ÉCHANGE DIRECT & ASSISTANCE
          </p>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Réserver Sally
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00f2fe] via-indigo-400 to-purple-400 font-extrabold">
              ou poser une question.
            </span>
          </h1>

          <p className="text-base font-light leading-relaxed text-slate-400 sm:text-lg">
            Un échange simple et humain autour de votre projet de domotique locale. Présentez-nous vos envies, votre logement ou vos besoins spécifiques pour votre transition souveraine.
          </p>
        </div>
      </section>

      {/* 2. Banner/Hero Section with high resolution atmospheric image */}
      <section className="relative w-full overflow-hidden border-y border-slate-900 bg-slate-950/20 py-16">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageBg}
            alt="Maison Connectée Sally chaleureuse et lumineuse"
            className="h-full w-full object-cover transition-all duration-1000 brightness-[0.7] contrast-[1.05] saturate-[0.95]"
            referrerPolicy={"no-referrer" as React.HTMLAttributeReferrerPolicy}
            onError={() => {
              // Fallback image in case Unsplash fails to load
              setImageBg("https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200");
            }}
          />
          {/* Subtle gradient dark overlays for clear content contrast */}
          <div className="absolute inset-0 z-10 bg-linear-to-b from-slate-950/60 via-transparent to-slate-950/60" />
          <div className="absolute inset-0 z-10 hidden bg-linear-to-r from-slate-950/90 via-transparent to-slate-950/40 md:block" />
          <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none z-10" />
        </div>

        {/* Hero split section */}
        <div className="relative z-25 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
            
            {/* Left box: Hero Content */}
            <div className="flex flex-col justify-center space-y-6 text-left lg:col-span-6">
              <span className="select-none text-xs font-extrabold uppercase leading-none tracking-[0.25em] text-[#00f2fe] drop-shadow-[0_2px_10px_rgba(0,242,254,0.3)] md:text-sm">
                CONTACT & ACCOMPAGNEMENT
              </span>

              <h2 className="select-none text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                Un accompagnement
                <br />
                <span className="mt-1 block bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text font-extrabold text-transparent">
                  sur-mesure dès le début.
                </span>
              </h2>

              <p className="max-w-lg text-sm font-light leading-relaxed text-slate-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-base">
                Partagez votre projet, posez une question ou transmettez votre retour sur Sally Home Connect en utilisant le formulaire ou l’adresse e-mail indiquée.
              </p>

              {/* High precision aesthetic benefits checkmarks */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Échange direct sans filtre</h4>
                    <p className="text-xs text-slate-300">Votre demande est envoyée directement au contact Sally Home Connect.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Respect de vos informations</h4>
                    <p className="text-xs text-slate-300">Les informations que vous choisissez d’envoyer servent à traiter votre demande et ne sont pas destinées à des fins publicitaires.</p>
                  </div>
                </div>
              </div>

              {/* Quick direct mail button */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#formulaire-contact" 
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all shadow-lg shadow-indigo-600/20"
                >
                  Nous contacter
                </a>
                <a 
                  href={`mailto:${emailDestination}`}
                  className="px-6 py-3 bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold leading-none cursor-pointer transition-all text-slate-300 hover:text-white backdrop-blur-md"
                >
                  {emailDestination}
                </a>
              </div>
            </div>

            {/* Right block: Representative decorative physical mockup screen or interactive image frame */}
            <div className="relative flex items-center justify-center py-2 lg:col-span-6">
              <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/90 shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden p-3 backdrop-blur-xl">
                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800" 
                  alt="Sally Home Connect" 
                  className="h-95 w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.02]"
                  referrerPolicy={"no-referrer" as React.HTMLAttributeReferrerPolicy}
                />
                <div className="p-4 text-left">
                  <p className="text-xs font-mono text-cyan-400 font-black">SALLY ECOSYSTEM COMPONENT</p>
                  <p className="text-xs text-slate-400 mt-1 font-light">Le confort d'une installation intelligente en local pur.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Contact Details and Form Section */}
      <section id="formulaire-contact" className="relative mx-auto max-w-7xl px-4 py-16 text-left sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left space-y-3">
              <span className="text-xs font-mono font-medium tracking-widest text-[#00f2fe] uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                ÉCHANGE DIRECT
              </span>
              <h3 className="text-3xl font-black text-white tracking-tight">
                Un contact simple.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Présentez votre besoin, votre type de logement (appartement, maison, rénovation ou construction neuve) ou simplement vos interrogations.
              </p>
            </div>

            {/* Email card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 text-left space-y-4 hover:border-indigo-500/30 transition-all duration-300">
              <div className="p-3 w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase">EMAIL EN DIRECT</span>
                <a 
                  href={`mailto:${emailDestination}`}
                  className="text-lg font-bold text-white hover:text-indigo-400 transition-colors"
                >
                  {emailDestination}
                </a>
              </div>
            </div>

            {/* Time response card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 text-left space-y-4 hover:border-cyan-500/30 transition-all duration-300">
              <div className="p-3 w-12 h-12 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Clock3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block uppercase">CONTACT DIRECT</span>
                <h4 className="text-base font-bold text-white">Une demande traitée individuellement</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">
                  Chaque message est examiné individuellement afin d’apporter une réponse adaptée à votre question ou à votre projet.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Stylized dark contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/20 backdrop-blur-md">
              <div className="mb-6 text-left">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="text-indigo-400 w-5 h-5" /> Formulaire de contact
                </h4>
                <p className="text-xs font-light text-slate-400 mt-1">
                  Les informations saisies prérempliront un e-mail dans votre logiciel de messagerie. Vous pourrez le vérifier avant de l’envoyer.
                </p>
              </div>

              <div className="grid gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-mono text-slate-400 font-bold uppercase">Votre nom</label>
                    <input
                      name="nom"
                      type="text"
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="rounded-xl bg-[#030712] border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-mono text-slate-400 font-bold uppercase">Votre email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@email.com"
                      className="rounded-xl bg-[#030712] border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-mono text-slate-400 font-bold uppercase">Sujet de la demande</label>
                  <input
                    name="sujet"
                    type="text"
                    value={form.sujet}
                    onChange={handleChange}
                    placeholder="ex: Projet de rénovation, Demande d'information..."
                    className="rounded-xl bg-[#030712] border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors w-full"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-mono text-slate-400 font-bold uppercase">Votre message</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Dites-nous en plus sur vos envies..."
                    className="rounded-xl bg-[#030712] border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors w-full resize-none"
                  />
                </div>

                <a
                  href={mailtoLink}
                  className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 animate-pulse" />
                  <span>Envoyer ma demande</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}