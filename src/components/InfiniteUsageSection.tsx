/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Heart, Shield, Activity, Accessibility, AlertTriangle } from 'lucide-react';

import CONFORT_IMG from '../assets/images/sally_card_confort_1780921307983.png';
import SECURITY_IMG from '../assets/images/sally_card_securite_1780921326910.png';
import ENER_IMG from '../assets/images/sally_card_energie_1780921339119.png';
import SIMP_IMG from '../assets/images/sally_card_simplicite_1780921352758.png';

export default function InfiniteUsageSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const usages = [
    {
      img: CONFORT_IMG,
      tag: "CONFORT",
      title: "Confort absolu",
      desc: "Ambiance parfaite en un clic.",
      longDesc: "Réveillez-vous avec les volets qui s'ouvrent doucement de concert avec votre réveil. Le chauffage s'ajuste tout seul dans la salle de bain et votre playlist matinale démarre. Votre maison anticipe vos moindres désirs.",
      icon: <Heart className="w-4 h-4 text-rose-400" />
    },
    {
      img: SECURITY_IMG,
      tag: "SÉCURITÉ",
      title: "Sécurité sereine",
      desc: "Protégez votre maison et vos proches.",
      longDesc: "En cas d'absence, simulez une présence humaine par des jeux d'éclairage fortuits. Si un détecteur thermique ou d'ouverture repère une anomalie, vous êtes prévenu et la sirène retentit immédiatement pour dissuader tout intrus.",
      icon: <Shield className="w-4 h-4 text-emerald-400" />
    },
    {
      img: ENER_IMG,
      tag: "ÉNERGIE",
      title: "Énergie maîtrisée",
      desc: "Réduisez votre consommation sans effort.",
      longDesc: "Vos radiateurs se coupent automatiquement lorsque vous ouvrez les fenêtres pour aérer. Des coupures automatiques de prise veillent à ce qu'aucun appareil en veille ne gaspille d'ampérages superflus pendant la nuit.",
      icon: <Activity className="w-4 h-4 text-amber-400" />
    },
    {
      img: SIMP_IMG,
      tag: "SIMPLICITÉ",
      title: "Simplicité moderne",
      desc: "Tout est réuni dans une seule interface.",
      longDesc: "Pilotable au choix depuis votre smartphone, votre tablette fixée au mur ou votre voix. L'interface extrêmement intuitive de Sally a été conçue pour être accessible aussi bien aux grands-parents qu'aux plus petits.",
      icon: <Accessibility className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <section id="propos" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Visual glowing effects */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-mono font-medium tracking-widest text-[#3b82f6] uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
          POUR TOUTE LA MAISON
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight">
          Des usages <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-sally-purple to-cyan-400 sally-text-glow font-bold">
            infinis
          </span>
        </h2>
        <p className="text-slate-400 leading-relaxed max-w-lg mx-auto text-sm md:text-base">
          Créez des scénarios domotiques parfaitement adaptés à votre quotidien et laissez Sally s’occuper de tout le travail répétitif.
        </p>
      </div>

      {/* Grid deck of usage cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {usages.map((card, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedCard(selectedCard === idx ? null : idx)}
            className="group relative bg-slate-900/30 border border-slate-800/60 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-700/80 hover:bg-slate-900/55 transition-all duration-300 flex flex-col justify-between h-[360px] shadow-lg"
          >
            {/* Aspect Photo Wrapper */}
            <div className="relative h-44 w-full overflow-hidden select-none shrink-0 bg-slate-950">
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 to-transparent opacity-65" />
              
              {/* Floating micro category tag */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-slate-950/85 backdrop-blur-md rounded-lg border border-slate-800 text-[9px] font-mono font-medium text-indigo-300 flex items-center gap-1.5">
                {card.icon}
                <span>{card.tag}</span>
              </div>
            </div>

            {/* Description Card Texts */}
            <div className="p-5 flex-1 flex flex-col justify-between text-left">
              <div>
                <h4 className="font-display font-semibold text-slate-100 text-base mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {card.title}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed truncate">
                  {card.desc}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5">
                  <span>{selectedCard === idx ? "Réduire l'explication ▲" : "Lire la situation domotique ▼"}</span>
                </span>
              </div>
            </div>

            {/* Expanded scenario description overlay */}
            {selectedCard === idx && (
              <div className="absolute inset-0 bg-slate-950/95 p-5 flex flex-col justify-between text-left border-2 border-indigo-600/30 rounded-2xl z-20 animate-fade-in">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-indigo-500/10 rounded-lg">
                      {card.icon}
                    </div>
                    <h4 className="font-display font-bold text-slate-100 text-sm md:text-base">
                      {card.title}
                    </h4>
                  </div>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                    {card.longDesc}
                  </p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard(null);
                  }}
                  className="mt-4 px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs self-end hover:bg-slate-800"
                >
                  Fermer
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Embedded Alert Info Block */}
      <div className="mt-12 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 text-left flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-4xl mx-auto">
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl shrink-0 text-indigo-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h5 className="font-display font-semibold text-slate-100 text-sm md:text-base mb-1">
             Souveraineté et Autonomie Totale
          </h5>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
             À la différence de la majorité des marques actuelles qui lient vos boutons et capteurs à des infrastructures distantes cloud soumises à abonnements, chez **Sally, tout s'exécute à l'intérieur chez vous**. Même si votre ligne internet subit une coupure temporaire, vos alarmes, automatisations horaires et interrupteurs fonctionnent sans aucune perturbation.
          </p>
        </div>
      </div>

    </section>
  );
}
