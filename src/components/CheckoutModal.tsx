/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent } from 'react';
import { X, ShieldCheck, CreditCard, CheckCircle2, Ticket, Truck, Sparkles } from 'lucide-react';
import { CheckoutDetails } from '../types';

interface CheckoutModalProps {
  details: CheckoutDetails;
  onClose: () => void;
  triggerNotification: (msg: string, type: 'info' | 'success' | 'warning' | 'alert') => void;
}

export default function CheckoutModal({ details, onClose, triggerNotification }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing indicators text tracker
  const [processingText, setProcessingText] = useState('Contact de la banque partenaire...');

  // Auto detect card type based on number
  const cardType = useMemo(() => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'Mastercard';
    if (cardNumber.startsWith('3')) return 'American Express';
    return 'Classic';
  }, [cardNumber]);

  const formattedCardNumber = useMemo(() => {
    // Spacer format: 1234 5678 1234 5678
    const cleanNum = cardNumber.replace(/\D/g, '').slice(0, 16);
    const groups = cleanNum.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleanNum;
  }, [cardNumber]);

  const handleCardNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    setCardNumber(clean);
  };

  const handleExpiryChange = (val: string) => {
    // Format mm/yy
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length > 2) {
      setCardExpiry(`${clean.slice(0, 2)}/${clean.slice(2, 4)}`);
    } else {
      setCardExpiry(clean);
    }
  };

  const handleCvvChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 3);
    setCardCvv(clean);
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || cardNumber.length < 12 || !cardHolder || cardExpiry.length < 4 || cardCvv.length < 3) {
      triggerNotification("Veuillez remplir correctement tous les champs de facturation et de paiement.", "warning");
      return;
    }

    // Enter simulation processing pipeline
    setStep('processing');
    setProcessingText("Interconnexion avec le réseau de paiement bancaire...");
    
    setTimeout(() => {
      setProcessingText("Vérification des fonds et sécurisation locale 'Sally Shield'...");
    }, 1200);

    setTimeout(() => {
      setProcessingText("Finalisation de la commande et réservation de votre licence Sally...");
    }, 2500);

    setTimeout(() => {
      setStep('success');
      triggerNotification("Paiement simulé accepté ! Bienvenue dans l'univers Sally.", "success");
    }, 3800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Black backdrop banner overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer transition-opacity" 
      />

      {/* Main card box panel */}
      <div className="relative bg-slate-900 border border-slate-850 rounded-3xl w-full max-w-170 p-6 md:p-8 shadow-2xl z-10 text-left overflow-y-auto max-h-[92vh] sally-glow-purple flex flex-col justify-between">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-800/60 mb-6 shrink-0">
          <div>
            <h3 className="text-lg md:text-xl font-display font-medium text-slate-100 flex items-center gap-2">
              <CreditCard className="w-5.5 h-5.5 text-indigo-400" />
              <span>Finalisez votre commande</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Paiement sécurisé crypté SSL local</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-xl text-slate-450 hover:text-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left form inputs column (Inputs) */}
            <div className="md:col-span-7 space-y-4">
              
              {/* Profile details */}
              <div className="space-y-3.5">
                <p className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase">1. Livraison & Contacts</p>
                
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 font-sans mb-1.5">Nom complet</label>
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 font-sans mb-1.5">E-mail</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean.dupont@orange.fr"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 font-sans mb-1.5">Adresse de livraison</label>
                    <input 
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="18 Rue de la Paix, Paris"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Checkout details Card fields */}
              <div className="space-y-3.5 pt-4 border-t border-slate-850">
                <p className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase">2. Informations de Paiement</p>
                
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Titulaire de la carte</label>
                  <input 
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="JEAN DUPONT"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 text-xs uppercase focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Numéro de carte</label>
                  <input 
                    type="text"
                    required
                    value={formattedCardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Date d'expiration</label>
                    <input 
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      placeholder="MM/AA"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-xs text-center focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1.5">Code CVV</label>
                    <input 
                      type="password"
                      required
                      value={cardCvv}
                      onChange={(e) => handleCvvChange(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 font-mono text-xs text-center focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Recap Summary Column */}
            <div className="md:col-span-5 space-y-6">
              
              {/* Glowing Interactive Visual Credit Card inside Summary Column */}
              <div className="relative w-full h-37.5 bg-linear-to-br from-indigo-700 via-indigo-900 to-purple-950 p-5 rounded-2xl shadow-lg border border-indigo-500/40 text-white flex flex-col justify-between overflow-hidden select-none">
                {/* Visual grid circuitry */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="flex justify-between items-start z-10">
                  <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-300 uppercase">Sally Smart-Card</span>
                  <span className="text-[11px] font-black font-sans tracking-tight italic text-slate-50">
                    {cardType}
                  </span>
                </div>

                <div className="font-mono text-base md:text-lg tracking-wider text-slate-100 my-2 z-10">
                  {formattedCardNumber || "•••• •••• •••• ••••"}
                </div>

                <div className="flex justify-between items-end z-10">
                  <div>
                    <p className="text-[7px] text-indigo-300 uppercase leading-none font-mono">Titulaire</p>
                    <p className="text-[11px] font-bold text-slate-100 uppercase mt-1 truncate max-w-30 font-sans">
                      {cardHolder || "NOM COMPLET"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-indigo-300 uppercase leading-none font-mono">Expire</p>
                    <p className="text-[11px] font-bold text-slate-100 mt-1 font-mono">
                      {cardExpiry || "MM/AA"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bill invoice breakdown card */}
              <div className="bg-slate-950 border border-slate-850 p-4.5 rounded-2xl space-y-3 font-sans">
                <p className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase py-1 border-b border-slate-900">
                  Résumé de la facture
                </p>
                
                <div className="space-y-1.5 text-xs text-slate-350">
                  <div className="flex justify-between">
                    <span>{details.planName}</span>
                    <span className="text-slate-100 font-mono font-medium">{details.price},00 €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais d'expédition Colissimo</span>
                    <span className="text-emerald-400 font-mono font-medium">Gratuit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes locales (TVA 20% incluse)</span>
                    <span className="text-slate-100 font-mono">{(details.price * 0.2).toFixed(2)} €</span>
                  </div>
                </div>

                <div className="h-px bg-slate-900 my-2" />

                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-200">Total payé</span>
                  <span className="font-mono font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-indigo-400 text-base md:text-lg">
                    {details.price},00 €
                  </span>
                </div>
              </div>

              {/* Validation action button */}
              <button 
                type="submit"
                className="w-full py-4 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/20 active:scale-98 cursor-pointer transition-all"
              >
                <ShieldCheck className="w-5 h-5 text-indigo-100" />
                <span>Simuler le Paiement de {details.price}€</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-slate-550 text-[10px] font-mono">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Ceci est une simulation de paiement sécurisée.</span>
              </div>

            </div>

          </form>
        )}

        {/* STEP 2: PROCESSING LOADER */}
        {step === 'processing' && (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-6 flex-1">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin" />
              <ShieldCheck className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            
            <div className="space-y-2 max-w-sm">
              <h4 className="text-slate-100 text-base font-semibold font-display">Traitement sécurisé en cours</h4>
              <p className="text-slate-400 text-xs font-mono leading-relaxed min-h-9">
                {processingText}
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS PANEL SCREEN */}
        {step === 'success' && (
          <div className="py-10 flex flex-col items-center justify-center text-center space-y-6 flex-1 max-w-md mx-auto">
            <div className="p-4 bg-emerald-500/15 border-2 border-emerald-500/50 rounded-full animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-display font-medium text-slate-100">Félicitations, {name} !</h4>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Votre commande pour le <strong className="text-indigo-400">{details.planName}</strong> a été validée avec succès.
              </p>
            </div>

            {/* Simulated Receipt details invoice box */}
            <div className="w-full bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-3.5 text-xs text-left">
              <div className="flex justify-between text-[11px] font-mono tracking-wide text-indigo-300 border-b border-slate-900 pb-2">
                <span>FACTURE #SL-5920194</span>
                <span>{new Date().toLocaleDateString('fr-FR')}</span>
              </div>
              
              <div className="space-y-1.5 text-slate-400 leading-normal">
                <p>📍 Expédié à : <strong className="text-slate-200">{name}</strong> • {address}</p>
                <p>📦 Mode d'expédition : <strong className="text-slate-200">Colissimo Express Suivi</strong></p>
                <p>🚛 Numéro de suivi simulé : <span className="font-mono text-emerald-400 font-bold">FR-SALLY-921048AX</span></p>
              </div>

              <div className="border-t border-slate-900/60 pt-2 flex items-center gap-2 text-[10px] text-slate-500 leading-relaxed font-mono">
                <Truck className="w-4 h-4 text-indigo-400" />
                <span>Votre colis sera emballé localement et quittera nos entrepôts de Sallanches sous 24h.</span>
              </div>
            </div>

            {/* Back button */}
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-slate-300 text-white font-semibold rounded-xl text-xs hover:transform transition-all"
            >
              Retourner sur le site
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
