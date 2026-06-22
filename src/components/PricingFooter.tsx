/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ShieldCheck, HelpCircle, Truck, RotateCcw, HeartHandshake } from 'lucide-react';

interface PricingFooterProps {
  onOpenCheckout: (planName: string, price: number) => void;
}

export default function PricingFooter({ onOpenCheckout }: PricingFooterProps) {
  const guarantees = [
    { icon: <RotateCcw className="w-5 h-5 text-indigo-400" />, title: "Satisfait ou remboursé 60j", desc: "Testez l'écosystème Sally sans risque." },
    { icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />, title: "Mises à jour incluses", desc: "Mises à jour de sécurité gratuites à vie." },
    { icon: <RotateCcw className="w-5 h-5 text-indigo-400" style={{ transform: "rotate(180deg)" }} />, title: "Aucun déchet électronique", desc: "Vous utilisez ou achetez votre propre matériel." },
    { icon: <HeartHandshake className="w-5 h-5 text-indigo-400" />, title: "Support réactif actif", desc: "Des experts français à votre écoute." }
  ];

  return (
    <footer id="tarifs" className="bg-slate-950 pt-20 pb-12 border-t border-slate-900/80 relative overflow-hidden text-left">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Pricing headings */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight">
            Reprenez le contrôle <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-sally-purple to-pink-500 sally-text-glow font-bold">
              de votre maison
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Un achat de licence unique pour une autonomie logicielle à vie. Achetez votre matériel type mini-PC ou Raspberry Pi où vous voulez, nous fournissons le programme souverain et local.
          </p>
        </div>

        {/* Pricing Cards Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          
          {/* Card 1: Licence Logicielle Sally */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between hover:border-slate-700/80 hover:bg-slate-900/55 transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-100">Licence Sally Solo</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">Le programme autonome à installer</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-black text-slate-100">79€</div>
                  <div className="text-[10px] text-emerald-400 font-bold font-mono">LICENCE À VIE</div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-800" />
              
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Idéal si vous êtes à l'aise avec la technique et possédez ou souhaitez commander vous-même votre mini-ordinateur (Raspberry Pi 4/5 ou Mini PC) et vos adaptateurs Zigbee indépendamment.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                {[
                  "Lien de téléchargement immédiat de Sally OS",
                  "Fichiers d'images système optimisés",
                  "Application mobile iOS & Android incluse",
                  "Connexion locale pure, aucun cloud requis",
                  "Mises à jour logicielles de sécurité incluses à vie",
                  "Guide d'installation pas à pas détaillé fourni"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => onOpenCheckout('Licence Sally Solo', 79)}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 font-semibold rounded-xl text-slate-200 text-sm shadow transition-all cursor-pointer"
              >
                Télécharger Licence Sally Solo
              </button>
            </div>
          </div>

          {/* Card 2: Pack Accompagnement & Installation */}
          <div className="bg-linear-to-b from-indigo-950/20 via-slate-900/60 to-slate-900/40 border-2 border-indigo-600/50 rounded-2xl p-8 flex flex-col justify-between hover:border-indigo-500 relative shadow-2xl">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 border border-indigo-500 text-white text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
              CONSEILLÉ
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-100">Pack Clé en Main</h3>
                  <p className="text-xs text-indigo-300 font-mono mt-1">Accompagnement expert de A à Z</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-black text-indigo-300">149€</div>
                  <div className="text-[10px] text-emerald-400 font-bold font-mono">PRESTATION UNIQUE</div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-800/60" />
              
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Le choix idéal pour être guidé pas à pas sans aucune frustration. Nous vous recommandons le meilleur matériel tiers économique et installons ensemble le logiciel Sally sur votre machine.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                {[
                  "Lien de téléchargement de la licence de Sally OS",
                  "Liste de courses personnalisée & liens directs pour acheter votre matériel",
                  "Session de télé-assistance de 1h avec un expert technique",
                  "Aide à l'installation logicielle et flashage d'image",
                  "Configuration guidée de vos 5 premiers scénarios d'éclairage ou de chauffage",
                  "Support technique prioritaire par email pendant 12 mois"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className={idx >= 1 ? "text-indigo-200 font-semibold" : ""}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => onOpenCheckout('Pack Clé en Main - Prestation & Licence', 149)}
                className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 font-bold rounded-xl text-white text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Réserver mon Accompagnement
              </button>
            </div>
          </div>

        </div>

        {/* Guarantees Trust Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-t border-b border-slate-900 mb-16">
          {guarantees.map((g, idx) => (
            <div key={idx} className="flex gap-3 text-left">
              <div className="p-2 border border-slate-800 rounded-xl bg-slate-900/45 shrink-0 h-fit">
                {g.icon}
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-semibold text-slate-200">{g.title}</h4>
                <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand footer and trademark credit row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-2.5">
            <span className="font-display font-bold text-slate-300">Sally Home Connect</span>
            <span className="text-[10px] font-mono text-zinc-600 px-2 py-0.5 border border-zinc-900 rounded">v1.5 Premium</span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="#hero" className="hover:text-slate-300">Mentions Légales</a>
            <a href="#hero" className="hover:text-slate-300">Données Privées</a>
            <a href="#hero" className="hover:text-slate-300">CGV</a>
            <p>© {new Date().getFullYear()} Sally SAS. Tous droits réservés.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
