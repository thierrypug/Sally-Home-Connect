/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import CheckoutModal from './components/CheckoutModal';
import { HouseState, ActivityNotification, CheckoutDetails } from './types';

import Accueil from './pages/Accueil';
import Compatibilite from './pages/Compatibilite';
import Solutions from './pages/Solutions';
import APropos from './pages/APropos';
import Fonctionnalites from './pages/Fonctionnalites';
import Accessibilite from './pages/Accessibilite';
import SeniorsSection from './pages/SeniorsSection';
import Contact from './pages/Contact';

const pageToPath: Record<string, string> = {
  accueil: '/',
  fonctionnalites: '/fonctionnalites',
  solutions: '/solutions',
  accessibilite: '/accessibilite',
  seniors: '/seniors',
  compatibilite: '/compatibilite',
  propos: '/a-propos',
  contact: '/contact',
};

const pathToPage: Record<string, string> = {
  '/': 'accueil',
  '/fonctionnalites': 'fonctionnalites',
  '/solutions': 'solutions',
  '/accessibilite': 'accessibilite',
  '/seniors': 'seniors',
  '/compatibilite': 'compatibilite',
  '/a-propos': 'propos',
  '/contact': 'contact',
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [houseState, setHouseState] = useState<HouseState>({
    salonLights: true,
    cuisineLights: false,
    chambreLights: false,
    exterieurLights: true,
    voletsOpenPercent: 100,
    chauffageTemp: 21.5,
    activeScenario: 'soir',
    alarmActive: false,
  });

  const [notifications, setNotifications] = useState<ActivityNotification[]>([
    {
      id: '1',
      time: '14:32',
      message:
        "Automatisme : Scénario 'Soirée' appliqué (Coucher de soleil)",
      type: 'success',
    },
    {
      id: '2',
      time: '14:30',
      message: 'Protocole EnOcean local : Module USB prêt',
      type: 'info',
    },
    {
      id: '3',
      time: '14:28',
      message: 'Serveur local Sally Connect v1.5 connecté avec succès',
      type: 'success',
    },
  ]);

  const [checkout, setCheckout] = useState<CheckoutDetails>({
    planName: '',
    price: 0,
    isOpen: false,
  });

  const currentPage = pathToPage[location.pathname] || 'accueil';

  const changePage = (page: string) => {
    const path = pageToPath[page] || '/';
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerNotification = (
    msg: string,
    type: 'info' | 'success' | 'warning' | 'alert',
  ) => {
    const now = new Date();

    const timeString =
      `${now.getHours().toString().padStart(2, '0')}:` +
      `${now.getMinutes().toString().padStart(2, '0')}:` +
      `${now.getSeconds().toString().padStart(2, '0')}`;

    setNotifications((prev) => [
      {
        id: Math.random().toString(36).substring(2, 9),
        time: timeString,
        message: msg,
        type,
      },
      ...prev,
    ]);
  };

  const handleOpenCheckout = (planName: string, _price: number) => {
    changePage('contact');

    triggerNotification(
      `Réservation : Veuillez utiliser notre formulaire de contact pour réserver votre ${planName}.`,
      'warning',
    );
  };

  const handleCloseCheckout = () => {
    setCheckout((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div className="bg-[#030712] min-h-screen text-slate-100 flex flex-col selection:bg-indigo-600/50 selection:text-white">
      <Header
        currentPage={currentPage}
        onChangePage={changePage}
        onOpenCheckout={handleOpenCheckout}
      />

      <main className="grow pt-28 md:pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{
              duration: 0.25,
              ease: 'easeInOut',
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <Accueil
                    houseState={houseState}
                    setHouseState={setHouseState}
                    triggerNotification={triggerNotification}
                    onOpenCheckout={handleOpenCheckout}
                    onChangePage={changePage}
                  />
                }
              />

              <Route
                path="/fonctionnalites"
                element={
                  <Fonctionnalites
                    houseState={houseState}
                    setHouseState={setHouseState}
                    triggerNotification={triggerNotification}
                  />
                }
              />

              <Route
                path="/solutions"
                element={
                  <Solutions
                    houseState={houseState}
                    setHouseState={setHouseState}
                    notifications={notifications}
                    triggerNotification={triggerNotification}
                  />
                }
              />

              <Route
                path="/accessibilite"
                element={
                  <Accessibilite
                    houseState={houseState}
                    setHouseState={setHouseState}
                    triggerNotification={triggerNotification}
                  />
                }
              />

              <Route
                path="/seniors"
                element={<SeniorsSection />}
              />

              <Route
                path="/compatibilite"
                element={<Compatibilite />}
              />

              <Route
                path="/a-propos"
                element={<APropos onChangePage={changePage} />}
              />

              <Route
                path="/contact"
                element={<Contact />}
              />

              <Route
                path="*"
                element={
                  <Accueil
                    houseState={houseState}
                    setHouseState={setHouseState}
                    triggerNotification={triggerNotification}
                    onOpenCheckout={handleOpenCheckout}
                    onChangePage={changePage}
                  />
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-900/80 bg-slate-950/60 py-8 text-center text-xs text-slate-500 font-mono mt-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 Sally Home Connect • Conçu par et pour la souveraineté
            numérique.
          </p>

          <div className="flex gap-6 flex-wrap justify-center">
            <button
              onClick={() => changePage('accueil')}
              className="hover:text-indigo-400 transition-colors"
            >
              Accueil
            </button>

            <button
              onClick={() => changePage('fonctionnalites')}
              className="hover:text-indigo-400 transition-colors"
            >
              Fonctionnalités
            </button>

            <button
              onClick={() => changePage('solutions')}
              className="hover:text-indigo-400 transition-colors"
            >
              Solutions
            </button>

            <button
              onClick={() => changePage('accessibilite')}
              className="hover:text-indigo-400 transition-colors text-cyan-400"
            >
              Accessibilité
            </button>

            <button
              onClick={() => changePage('seniors')}
              className="hover:text-indigo-400 transition-colors text-purple-400"
            >
              Seniors
            </button>

            <button
              onClick={() => changePage('compatibilite')}
              className="hover:text-indigo-400 transition-colors"
            >
              Compatibilité
            </button>

            <button
              onClick={() => changePage('propos')}
              className="hover:text-indigo-400 transition-colors"
            >
              À propos
            </button>

            <button
              onClick={() => changePage('contact')}
              className="hover:text-indigo-400 font-bold transition-colors text-indigo-400"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

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