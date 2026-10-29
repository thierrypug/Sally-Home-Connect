// site/js/acheter.js — page « Acheter » : Sally l'ouvre avec le code d'installation de l'appareil, la langue et
// l'adresse où revenir après le paiement (?code=…&langue=fr&retour=https://sally.local).
// Tant que la vente n'est pas ouverte, la page propose d'écrire avec le code déjà dans le message.
(() => {
  // Le jour de l'ouverture de la vente (boutique en service, voir scripts/vendeur/boutique dans le projet de Sally) :
  // passer à true
  const VENTE_OUVERTE = false;
  const BOUTIQUE = 'https://boutique.sally-home-connect.com';
  const PAGES = { fr: '/acheter/', en: '/en/buy/', de: '/de/kaufen/', es: '/es/comprar/', it: '/it/acquista/' };
  const MESSAGES = {
    fr: ['Je veux acheter Sally', 'Bonjour,\n\nJe souhaite acheter la licence de Sally Home Connect.\n\nMon code d\'installation : {code}\nMon prénom et mon nom :\n'],
    en: ['I want to buy Sally', 'Hello,\n\nI would like to buy a Sally Home Connect licence.\n\nMy installation code: {code}\nMy first and last name:\n'],
    de: ['Ich möchte Sally kaufen', 'Hallo,\n\nich möchte eine Lizenz für Sally Home Connect kaufen.\n\nMein Installationscode: {code}\nMein Vor- und Nachname:\n'],
    es: ['Quiero comprar Sally', 'Hola:\n\nMe gustaría comprar la licencia de Sally Home Connect.\n\nMi código de instalación: {code}\nMi nombre y apellidos:\n'],
    it: ['Voglio acquistare Sally', 'Ciao,\n\nvorrei acquistare la licenza di Sally Home Connect.\n\nIl mio codice di installazione: {code}\nIl mio nome e cognome:\n']
  };

  const parametres = new URLSearchParams(location.search);
  const langue = document.documentElement.lang;
  // Sally envoie toujours vers la page française, avec sa langue : on passe à la page de cette langue
  const voulue = parametres.get('langue');
  if (voulue && voulue !== langue && PAGES[voulue]) {
    location.replace(PAGES[voulue] + location.search);
    return;
  }

  // Le code : 20 lettres ou chiffres en 4 groupes (rien d'autre n'est affiché)
  const brut = String(parametres.get('code') || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
  const code = /^[0-9A-HJKMNP-TV-Z]{20}$/.test(brut) ? brut.match(/.{5}/g).join('-') : '';
  document.getElementById('code-achat').textContent = code || '—';
  document.getElementById('sans-code').hidden = Boolean(code);

  if (VENTE_OUVERTE && code) {
    document.getElementById('vente-ouverte').hidden = false;
    document.getElementById('vente-bientot').hidden = true;
    const retour = parametres.get('retour') || '';
    document.getElementById('payer').href = `${BOUTIQUE}/acheter?` + new URLSearchParams({ code, langue, retour });
    return;
  }

  const [objet, corps] = MESSAGES[langue] || MESSAGES.fr;
  const texte = corps.replace('{code}', code || '…');
  const e = encodeURIComponent;
  document.getElementById('ecrire-gmail').href = `https://mail.google.com/mail/?view=cm&fs=1&to=sallyhomeconnect@gmail.com&su=${e(objet)}&body=${e(texte)}`;
  document.getElementById('ecrire-messagerie').href = `mailto:sallyhomeconnect@gmail.com?subject=${e(objet)}&body=${e(texte.replace(/\n/g, '\r\n'))}`;
})();
