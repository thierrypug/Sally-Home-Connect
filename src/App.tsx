/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import CheckoutModal from './components/CheckoutModal';
import { HouseState, ActivityNotification, CheckoutDetails } from './types';

// Import our new stateful pages
import Accueil from './pages/Accueil';
import Compatibilite from './pages/Compatibilite';
import Solutions from './pages/Solutions';
import APropos from './pages/APropos';
import Fonctionnalites from './pages/Fonctionnalites';
import Accessibilite from './pages/Accessibilite';
import SeniorsSection from './pages/SeniorsSection';
import Contact from './pages/Contact';

export default function App() {
  // Household smart configurations central state
  const [houseState, setHouseState] = useState<HouseState>({
    salonLights: true,
    cuisineLights: false,
    chambreLights: false,
    exterieurLights: true,
    voletsOpenPercent: 100,
    chauffageTemp: 21.5,
    activeScenario: 'soir',
    alarmActive: false
  });

  // Navigation page routing state
  const [currentPage, setCurrentPage] = useState<string>('accueil');

  // Recent activity logs notification lists
  const [notifications, setNotifications] = useState<ActivityNotification[]>([
    { id: '1', time: '14:32', message: "Automatisme : Scénario 'Soirée' appliqué (Coucher de soleil)", type: 'success' },
    { id: '2', time: '14:30', message: 'Protocole EnOcean local : Module USB prêt', type: 'info' },
    { id: '3', time: '14:28', message: 'Serveur local Sally Connect v1.5 connecté avec succès', type: 'success' }
  ]);

  // Command checkout panel details
  const [checkout, setCheckout] = useState<CheckoutDetails>({
    planName: '',
    price: 0,
    isOpen: false
  });

  // Helper function to append and scroll a new log entry
  const triggerNotification = (msg: string, type: 'info' | 'success' | 'warning' | 'alert') => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    setNotifications((prev) => [
      {
        id: Math.random().toString(36).substring(2, 9),
        time: timeString,
        message: msg,
        type: type
      },
      ...prev
    ]);
  };

  const handleOpenCheckout = (planName: string, _price: number) => {
    // Redirection vers la page Contact car la boutique est en cours de configuration de sécurité
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerNotification(`Réservation : Veuillez utiliser notre formulaire de contact pour réserver votre ${planName}.`, 'warning');
  };

  const handleCloseCheckout = () => {
    setCheckout(prev => ({ ...prev, isOpen: false }));
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'accueil':
        return (
          <Accueil 
            houseState={houseState}
            setHouseState={setHouseState}
            triggerNotification={triggerNotification}
            onOpenCheckout={handleOpenCheckout}
            onChangePage={setCurrentPage}
          />
        );
      case 'compatibilite':
        return <Compatibilite />;
      case 'accessibilite':
        return (
          <Accessibilite 
            houseState={houseState}
            setHouseState={setHouseState}
            triggerNotification={triggerNotification}
          />
        );
      case 'fonctionnalites':
        return (
          <Fonctionnalites 
            houseState={houseState}
            setHouseState={setHouseState}
            triggerNotification={triggerNotification}
          />
        );
      case 'solutions':
        return (
          <Solutions 
            houseState={houseState}
            setHouseState={setHouseState}
            notifications={notifications}
            triggerNotification={triggerNotification}
          />
        );
      case 'propos':
        return <APropos onChangePage={setCurrentPage} />;
      case 'seniors':
        return <SeniorsSection />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Accueil 
            houseState={houseState}
            setHouseState={setHouseState}
            triggerNotification={triggerNotification}
            onOpenCheckout={handleOpenCheckout}
            onChangePage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 flex flex-col selection:bg-indigo-600/50 selection:text-white">
      
      {/* 1. Transparent Floating Navigation Bar */}
      <Header 
        currentPage={currentPage}
        onChangePage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCheckout={handleOpenCheckout} 
      />

      {/* 2. Page Content Rendered with Smooth Slide Transitions */}
      <main className="grow pt-28 md:pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Elegant Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/60 py-8 text-center text-xs text-slate-500 font-mono mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Sally Home Connect • Conçu par et pour la souveraineté numérique.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <button onClick={() => setCurrentPage('accueil')} className="hover:text-indigo-400 transition-colors">Accueil</button>
            <button onClick={() => setCurrentPage('fonctionnalites')} className="hover:text-indigo-400 transition-colors">Fonctionnalités</button>
            <button onClick={() => setCurrentPage('solutions')} className="hover:text-indigo-400 transition-colors">Solutions</button>
            <button onClick={() => setCurrentPage('accessibilite')} className="hover:text-indigo-400 transition-colors text-cyan-400">Accessibilité</button>
            <button onClick={() => setCurrentPage('seniors')} className="hover:text-indigo-400 transition-colors text-purple-400">Seniors</button>
            <button onClick={() => setCurrentPage('compatibilite')} className="hover:text-indigo-400 transition-colors">Compatibilité</button>
            <button onClick={() => setCurrentPage('propos')} className="hover:text-indigo-400 transition-colors">À propos</button>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-indigo-400 font-bold transition-colors text-indigo-400">Contact</button>
          </div>
        </div>
      </footer>

      {/* 4. Interactive virtual checkout overlay credit card simulator */}
      {checkout.isOpen && (
        <CheckoutModal 
          details={checkout}
          onClose={handleCloseCheckout}
          triggerNotification={triggerNotification}
        />
      )}

    </div>
  );
}
