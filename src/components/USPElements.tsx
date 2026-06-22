/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CloudOff, Euro, Cpu, ShieldAlert } from 'lucide-react';

export default function USPElements() {
  const usps = [
    {
      icon: <CloudOff className="w-5 h-5 text-indigo-400" />,
      title: "100% Locale",
      desc: "Aucun cloud requis"
    },
    {
      icon: <Euro className="w-5 h-5 text-indigo-400" />,
      title: "Sans abonnement",
      desc: "Aucun frais caché"
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: "Zigbee & EnOcean",
      desc: "Compatible nativement"
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-indigo-400" />,
      title: "Sécurisée",
      desc: "Vos données vous appartiennent"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 -mt-4 mb-20">
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-xl grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/60">
        {usps.map((usp, i) => (
          <div 
            key={i} 
            className={`flex items-start gap-4 text-left ${i > 0 && i < 2 ? 'pt-6 lg:pt-0 lg:pl-8' : i >= 2 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}
          >
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl shrink-0">
              {usp.icon}
            </div>
            <div>
              <h3 className="font-display font-medium text-slate-100 text-sm md:text-base">
                {usp.title}
              </h3>
              <p className="text-slate-400 text-xs md:text-sm">
                {usp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
