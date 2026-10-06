// traduire.cjs — fabrique les versions anglaise, allemande, espagnole et italienne du site à partir des pages
// françaises de site/, avec les traductions de traductions/textes.cjs.
// Utilisation : node traduire.cjs   (à relancer après chaque modification d'une page française)
// - écrit site/en/, site/de/, site/es/, site/it/ (adresses traduites : /en/features/, /de/funktionen/…) ;
// - ajoute à toutes les pages, françaises comprises, le choix de la langue et les liens « hreflang » ;
// - refait site/sitemap.xml ;
// - s'arrête sans rien écrire s'il manque une traduction (le texte français est alors affiché).
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, 'site');
const ADRESSE = 'https://www.sally-home-connect.com';
const PAGES = ['', 'fonctionnalites', 'compatibilite', 'obtenir', 'contact', 'mentions-legales'];
const LANGUES = {
  fr: { nom: 'Français', colonne: 0, prefixe: '', etiquette: 'Langue', slugs: { fonctionnalites: 'fonctionnalites', compatibilite: 'compatibilite', obtenir: 'obtenir', contact: 'contact', 'mentions-legales': 'mentions-legales' } },
  en: { nom: 'English', colonne: 1, prefixe: '/en', etiquette: 'Language', slugs: { fonctionnalites: 'features', compatibilite: 'compatibility', obtenir: 'get-sally', contact: 'contact', 'mentions-legales': 'legal-notice' } },
  de: { nom: 'Deutsch', colonne: 2, prefixe: '/de', etiquette: 'Sprache', slugs: { fonctionnalites: 'funktionen', compatibilite: 'kompatibilitaet', obtenir: 'sally-holen', contact: 'kontakt', 'mentions-legales': 'impressum' } },
  es: { nom: 'Español', colonne: 3, prefixe: '/es', etiquette: 'Idioma', slugs: { fonctionnalites: 'funciones', compatibilite: 'compatibilidad', obtenir: 'obtener', contact: 'contacto', 'mentions-legales': 'aviso-legal' } },
  it: { nom: 'Italiano', colonne: 4, prefixe: '/it', etiquette: 'Lingua', slugs: { fonctionnalites: 'funzionalita', compatibilite: 'compatibilita', obtenir: 'ottieni', contact: 'contatti', 'mentions-legales': 'note-legali' } }
};

// Message prérempli des testeurs, et objet du message « question », dans chaque langue
const TESTEUR = {
  fr: { objet: 'Je veux tester Sally', corps: "Bonjour,\n\nJe veux bien tester Sally Home Connect.\n\nMon prénom :\nJ'habite : appartement / maison\nMon niveau en domotique : je débute / j'ai quelques objets connectés / j'utilise déjà Home Assistant, Jeedom ou Domoticz / je suis électricien ou installateur\nJ'ai un ordinateur sous Windows 10 ou 11 : oui / non\nJ'ai une clé USB domotique : Zigbee / EnOcean / aucune / je ne sais pas\nMes appareils connectés (marques et modèles si je les connais) :\nJ'ai un Raspberry Pi : oui / non / je ne sais pas ce que c'est\nCe que j'attends d'une maison connectée :\nComment j'ai connu Sally :\n\nJ'accepte d'être recontacté par e-mail au sujet du test.\n", question: 'Question sur Sally Home Connect' },
  en: { objet: 'I want to test Sally', corps: "Hello,\n\nI'd like to test Sally Home Connect.\n\nMy first name:\nI live in: a flat / a house\nMy home automation level: beginner / I have a few connected devices / I already use Home Assistant, Jeedom or Domoticz / I'm an electrician or installer\nI have a Windows 10 or 11 computer: yes / no\nI have a home automation USB stick: Zigbee / EnOcean / none / I don't know\nMy connected devices (brands and models if I know them):\nI have a Raspberry Pi: yes / no / I don't know what that is\nWhat I expect from a smart home:\nHow I heard about Sally:\n\nI agree to be contacted by email about the test.\n", question: 'Question about Sally Home Connect' },
  de: { objet: 'Ich möchte Sally testen', corps: "Hallo,\n\nich möchte Sally Home Connect gerne testen.\n\nMein Vorname:\nIch wohne in: einer Wohnung / einem Haus\nMein Smart-Home-Niveau: Anfänger / ich habe ein paar vernetzte Geräte / ich nutze schon Home Assistant, Jeedom oder Domoticz / ich bin Elektriker oder Installateur\nIch habe einen Computer mit Windows 10 oder 11: ja / nein\nIch habe einen Smart-Home-USB-Stick: Zigbee / EnOcean / keinen / weiß nicht\nMeine vernetzten Geräte (Marken und Modelle, falls bekannt):\nIch habe einen Raspberry Pi: ja / nein / ich weiß nicht, was das ist\nWas ich von einem Smart Home erwarte:\nWie ich von Sally erfahren habe:\n\nIch bin einverstanden, wegen des Tests per E-Mail kontaktiert zu werden.\n", question: 'Frage zu Sally Home Connect' },
  es: { objet: 'Quiero probar Sally', corps: "Hola:\n\nMe gustaría probar Sally Home Connect.\n\nMi nombre:\nVivo en: un piso / una casa\nMi nivel en domótica: empiezo / tengo algunos aparatos conectados / ya uso Home Assistant, Jeedom o Domoticz / soy electricista o instalador\nTengo un ordenador con Windows 10 u 11: sí / no\nTengo una llave USB de domótica: Zigbee / EnOcean / ninguna / no lo sé\nMis aparatos conectados (marcas y modelos si los conozco):\nTengo una Raspberry Pi: sí / no / no sé qué es\nLo que espero de una casa conectada:\nCómo conocí Sally:\n\nAcepto que me contacten por correo sobre la prueba.\n", question: 'Pregunta sobre Sally Home Connect' },
  it: { objet: 'Voglio provare Sally', corps: "Ciao,\n\nmi piacerebbe provare Sally Home Connect.\n\nIl mio nome:\nAbito in: un appartamento / una casa\nIl mio livello in domotica: principiante / ho qualche dispositivo connesso / uso già Home Assistant, Jeedom o Domoticz / sono elettricista o installatore\nHo un computer con Windows 10 o 11: sì / no\nHo una chiavetta USB per la domotica: Zigbee / EnOcean / nessuna / non lo so\nI miei dispositivi connessi (marche e modelli se li conosco):\nHo un Raspberry Pi: sì / no / non so cosa sia\nCosa mi aspetto da una casa connessa:\nCome ho conosciuto Sally:\n\nAccetto di essere ricontattato via email per il test.\n", question: 'Domanda su Sally Home Connect' }
};

const e = encodeURIComponent;
const fichierPage = page => path.join(SITE, page, page ? 'index.html' : 'index.html');
const chemin = (langue, page) => {
  const L = LANGUES[langue];
  return `${L.prefixe}/${page ? L.slugs[page] + '/' : ''}`;
};
const normaliser = t => t.replace(/\s+/g, ' ').trim();

// --- Blocs ajoutés à chaque page (entre marqueurs, remplacés à chaque passage) ---
function blocLangues(langue, page) {
  const L = LANGUES[langue];
  const globe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.500 2.700 3.800 5.700 3.800 9s-1.300 6.300-3.800 9c-2.500-2.700-3.800-5.700-3.800-9s1.300-6.300 3.800-9z"/></svg>';
  const liens = Object.entries(LANGUES).map(([code, X]) =>
    `<li><a href="${chemin(code, page)}" hreflang="${code}" lang="${code}"${code === langue ? ' aria-current="true"' : ''}>${X.nom}</a></li>`).join('');
  return `<!--langues--><details class="choix-langue"><summary>${globe}<span class="visuellement-cache">${L.etiquette} : </span>${langue.toUpperCase()}</summary><ul>${liens}</ul></details><!--/langues-->`;
}
function blocHreflang(page) {
  const liens = Object.keys(LANGUES).map(code => `<link rel="alternate" hreflang="${code}" href="${ADRESSE}${chemin(code, page)}">`);
  liens.push(`<link rel="alternate" hreflang="x-default" href="${ADRESSE}${chemin('fr', page)}">`);
  return `<!--hreflang-->\n  ${liens.join('\n  ')}\n  <!--/hreflang-->`;
}
function poserBlocs(html, langue, page) {
  html = html.replace(/<!--langues-->[\s\S]*?<!--\/langues-->/, '');
  html = html.replace(/\s*<!--hreflang-->[\s\S]*?<!--\/hreflang-->/, '');
  html = html.replace('</nav>', '</nav>\n      ' + blocLangues(langue, page));
  if (page !== null) html = html.replace('</head>', '  ' + blocHreflang(page) + '\n</head>');
  return html;
}

// --- Traduction d'une page française ---
function traduire(html, langue, page, dico, manquants) {
  const col = LANGUES[langue].colonne;
  const mis = [];
  // Parties à ne pas toucher : scripts, styles, dessins, blocs de langue
  html = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>|<!--langues-->[\s\S]*?<!--\/langues-->|<!--hreflang-->[\s\S]*?<!--\/hreflang-->/g,
    m => `\u0000${mis.push(m) - 1}\u0000`);
  const t = (texte, ou) => {
    const n = normaliser(texte);
    if (dico.has(n)) return dico.get(n)[col];
    manquants.add(`${ou} : ${n}`);
    return null;
  };
  // Textes entre les balises
  html = html.replace(/>([^<>\u0000]+)</g, (m, texte) => {
    if (!/[a-zA-ZÀ-ÿ]/.test(texte)) return m;
    const r = t(texte, page || 'accueil');
    if (r === null) return m;
    const debut = texte.match(/^\s*/)[0], fin = texte.match(/\s*$/)[0];
    return `>${debut}${r}${fin}<`;
  });
  // Attributs lus par les gens : textes de remplacement, titres, libellés, descriptions
  html = html.replace(/\b(alt|title|aria-label)="([^"]+)"/g, (m, a, v) => {
    const r = t(v, `${page || 'accueil'} [${a}]`);
    return r === null ? m : `${a}="${r}"`;
  });
  html = html.replace(/(<meta\s+(?:name|property)="(?:description|og:title|og:description)"\s+content=")([^"]+)"/g, (m, avant, v) => {
    const r = t(v, `${page || 'accueil'} [description]`);
    return r === null ? m : `${avant}${r}"`;
  });
  // Liens internes et adresses de la page
  html = html.replace(/href="\/([a-z-]*)\/?(#[a-z-]+)?"/g, (m, p, ancre) => {
    if (p === '' || PAGES.includes(p)) return `href="${chemin(langue, p)}${ancre || ''}"`;
    return m;
  });
  html = html.replace(new RegExp(`(href|content)="${ADRESSE.replace(/\./g, '\\.')}/([a-z-]*)/?"`, 'g'), (m, a, p) =>
    p === '' || PAGES.includes(p) ? `${a}="${ADRESSE}${chemin(langue, p)}"` : m);
  // Messages préremplis (testeurs, questions) dans la langue de la page
  const T = TESTEUR[langue], F = TESTEUR.fr;
  const corps = T.corps.replace(/\n/g, '\r\n');
  html = html.replace(/href="mailto:sallyhomeconnect@gmail\.com\?subject=Je%20veux%20tester%20Sally[^"]*"/g,
    `href="mailto:sallyhomeconnect@gmail.com?subject=${e(T.objet)}&amp;body=${e(corps)}"`);
  html = html.replace(/href="https:\/\/mail\.google\.com\/mail\/\?view=cm[^"]*"/g,
    `href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=sallyhomeconnect@gmail.com&amp;su=${e(T.objet)}&amp;body=${e(T.corps)}"`);
  html = html.replace(/href="https:\/\/outlook\.live\.com\/mail\/0\/deeplink\/compose\?[^"]*"/g,
    `href="https://outlook.live.com/mail/0/deeplink/compose?to=sallyhomeconnect@gmail.com&amp;subject=${e(T.objet)}&amp;body=${e(T.corps)}"`);
  html = html.split(`subject=${e(F.question)}`).join(`subject=${e(T.question)}`);
  html = html.replace('<html lang="fr"', `<html lang="${langue}"`);
  return html.replace(/\u0000(\d+)\u0000/g, (m, i) => mis[Number(i)]);
}

// --- Programme ---
const lignes = require('./traductions/textes.cjs');
const dico = new Map(lignes.map(l => [normaliser(l[0]), l]));
const manquants = new Set();
const sorties = [];
for (const page of PAGES) {
  const source = fs.readFileSync(fichierPage(page), 'utf8');
  sorties.push({ fichier: fichierPage(page), html: poserBlocs(source, 'fr', page) });
  for (const langue of Object.keys(LANGUES).filter(l => l !== 'fr')) {
    const html = poserBlocs(traduire(source, langue, page, dico, manquants), langue, page);
    sorties.push({ fichier: path.join(SITE, chemin(langue, page), 'index.html'), html });
  }
}
// Page introuvable (une seule pour tout le site) : seulement le choix de la langue, vers les accueils
const p404 = path.join(SITE, '404.html');
sorties.push({ fichier: p404, html: poserBlocs(fs.readFileSync(p404, 'utf8'), 'fr', null).replace(/<!--langues-->[\s\S]*?<!--\/langues-->/, blocLangues('fr', '')) });

if (manquants.size) {
  console.error(`Il manque ${manquants.size} traduction(s) dans traductions/textes.cjs :`);
  for (const m of manquants) console.error('  - ' + m);
  process.exit(1);
}
for (const code of Object.keys(LANGUES).filter(l => l !== 'fr')) fs.rmSync(path.join(SITE, code), { recursive: true, force: true });
for (const s of sorties) {
  fs.mkdirSync(path.dirname(s.fichier), { recursive: true });
  fs.writeFileSync(s.fichier, s.html);
}
// Plan du site pour les moteurs de recherche, avec les versions de chaque page
const jour = new Date().toISOString().slice(0, 10);
const urls = PAGES.flatMap(page => Object.keys(LANGUES).map(code => `  <url>\n    <loc>${ADRESSE}${chemin(code, page)}</loc>\n    <lastmod>${jour}</lastmod>\n${Object.keys(LANGUES).map(c => `    <xhtml:link rel="alternate" hreflang="${c}" href="${ADRESSE}${chemin(c, page)}"/>`).join('\n')}\n  </url>`));
fs.writeFileSync(path.join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
console.log(`${sorties.length} pages écrites (${PAGES.length} pages × ${Object.keys(LANGUES).length} langues + page introuvable), plan du site refait.`);
