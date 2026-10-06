# Site de Sally Home Connect

Site de présentation du logiciel Sally Home Connect, publié sur https://www.sally-home-connect.com
(GitHub Pages, dépôt `thierrypug/Sally-Home-Connect`).
Le logiciel lui-même est dans un autre projet : `D:\Sally-Home-Connect\Programme sous Windows\SallyHomeConnect_V2`
(son fichier CLAUDE.md décrit le produit, sa cible et sa feuille de route).

Promesse à tenir partout : « Ta maison connectée, sans travaux, et tes données restent chez toi ».

## Où en est le site (octobre 2026)

- Le site est dans le dossier `site/`. Il a été refait entièrement le 2026-10-02 pour décrire la nouvelle Sally
  (version 2), validé par l'auteur et mis en ligne le 2026-10-05.
- L'ancien site (React, Vite, Tailwind, fait avec Google AI Studio, faux formulaire de paiement, Google Analytics)
  a été retiré le 2026-10-05 ; il reste consultable dans l'historique de git.
- Mentions légales : Thierry Puglisi, entrepreneur individuel (EI), adresse au Crès, micro-entreprise avec
  « numéro SIRET en cours d'attribution » : remplacer par le vrai numéro dès qu'il est connu.

## Règles du nouveau site

- Répondre en français, simplement : l'auteur n'est pas développeur professionnel.
- Pas de framework ni d'étape de construction : des fichiers HTML, une feuille de style et un petit script.
  Chaque page est un fichier `index.html` dans son dossier ; l'en-tête et le pied de page sont recopiés dans chaque
  page, donc un changement de menu se fait dans toutes les pages.
- Aucune ressource extérieure : pas de CDN, pas de Google Fonts, aucun outil de mesure d'audience, aucun cookie.
  Les polices (Manrope, Bricolage Grotesque) sont dans `site/polices/` avec leurs licences.
- Aucun formulaire : le contact se fait par un lien qui ouvre la messagerie (`sallyhomeconnect@gmail.com`).
- Ne rien promettre qui ne soit pas vrai dans le logiciel. La page Compatibilité distingue ce qui est « Vérifié »
  avec de vrais appareils de ce qui est « En cours de validation » : la tenir à jour avec le projet du logiciel.
- Pas de prix tant que l'auteur ne l'a pas décidé. Depuis le 3 octobre 2026, la page « Obtenir Sally » propose la
  bêta Windows (essai de 30 jours) : le bouton mène à https://github.com/thierrypug/Sally-Home-Connect-Windows-Beta/releases/latest
  (toujours la dernière version, sans retoucher le site). Windows sert à essayer ; la version finale est prévue sur
  Raspberry Pi.
- Les testeurs s'inscrivent par un message prérempli (objet « Je veux tester Sally » et quelques questions) : pas de
  formulaire en ligne, rien n'est enregistré par le site. Tous les boutons « Devenir testeur » mènent à la partie
  `#devenir-testeur` de la page Obtenir, qui propose trois boutons : Gmail (`mail.google.com/mail/?view=cm…`),
  Outlook.com (`outlook.live.com/mail/0/deeplink/compose?…`) et « Avec ma messagerie » (`mailto:`), plus l'adresse en
  clair et un bouton « Copier l'adresse » (`data-copier`, géré par `site/js/site.js`). Le lien `mailto:` seul ne
  marchait pas chez les personnes qui lisent leurs e-mails dans le navigateur (cas de l'auteur).
- On tutoie le visiteur, comme dans l'application.
- Accessibilité : contrastes suffisants (mesurés à 4,5 au moins pour le texte courant), focus visible, menu utilisable
  au clavier, `prefers-reduced-motion` respecté, texte de remplacement sur les images, titres sans saut de niveau
  (au besoin un titre `<h2 class="visuellement-cache">` lu seulement par les lecteurs d'écran), liens qui ouvrent un
  nouvel onglet annoncés par un texte caché.
- Même style que l'application : fond bleu nuit, halos de couleur, panneaux de verre, ambre pour ce qui est allumé.
- Tailles et espaces suivent le nombre d'or, à la demande de l'auteur : les tailles de texte sont les variables
  `--t-1` à `--t5` de `site/css/site.css` (chaque cran vaut le précédent multiplié par 1,272 ; texte courant de 14 px,
  étiquettes de 11,5 px, à ne pas réduire davantage pour rester lisible), les espaces sont `--e1` à `--e5`, la hauteur de ligne est 1,618, et les blocs image + texte
  sont dans le rapport 1 pour 1,618. Pour grossir ou réduire tout le site, changer ces variables plutôt que les
  tailles une à une.
- Effet « brillant », voulu par l'auteur : il est regroupé dans le bloc « Brillance » à la fin de `site/css/site.css`
  (fond à halos vifs avec une aurore qui dérive, verre à reflet et liseré lumineux, boutons en dégradé avec un éclat
  au survol, halo derrière les captures, encadré d'appel violet) et dans `site/js/site.js` (apparition des blocs au
  défilement, coupée si le visiteur demande moins d'animations ou si le script ne démarre pas).
- Le fond est fixe et animé : un texte peut donc passer devant sa partie la plus claire. Avant d'éclaircir le fond,
  remesurer le contraste des textes avec le point le plus lumineux du fond, y compris à travers un panneau de verre.
  C'est pour cela que les liens sont presque blancs et soulignés, et non bleu clair.

## Langues (depuis le 6 octobre 2026)

- Le français, à la racine de `site/`, est la seule langue qu'on modifie à la main. Les versions anglaise, allemande,
  espagnole et italienne (`site/en/`, `site/de/`, `site/es/`, `site/it/`, adresses traduites : `/en/features/`,
  `/de/funktionen/`, `/es/funciones/`, `/it/funzionalita/`…) sont **fabriquées** : ne jamais les modifier à la main.
- Après toute modification d'une page française : mettre à jour la ligne correspondante de `traductions/textes.cjs`
  ([français, anglais, allemand, espagnol, italien]), puis `node traduire.cjs`. Le programme s'arrête et liste les
  textes sans traduction plutôt que de laisser du français dans les autres langues.
- `traduire.cjs` ajoute aussi à toutes les pages (françaises comprises) le choix de la langue (`<details
  class="choix-langue">` entre `<!--langues-->`) et les liens `hreflang` (entre `<!--hreflang-->`), traduit les
  messages préremplis des testeurs (Gmail, Outlook.com, messagerie) et refait `site/sitemap.xml`. Les adresses
  traduites sont dans `LANGUES` (début de `traduire.cjs`).
- Les captures de l'application restent en français. La commande vocale de Sally n'existe qu'en français : les pages
  traduites le disent.

## Voir le site sur ce PC

- `node apercu.cjs`, puis ouvrir http://localhost:8765. Les liens du site commencent par `/` : ouvrir un fichier
  par double-clic ne marche pas, il faut passer par cet aperçu.

## Contenu de `site/`

- `index.html` (accueil), `fonctionnalites/`, `compatibilite/`, `obtenir/`, `contact/`, `mentions-legales/`, `404.html`.
- `css/site.css`, `js/site.js` (menu sur téléphone).
- `images/` : captures de la vraie application, prises en mode démonstration (`npm run demo` dans le projet
  du logiciel), au format WebP.
- `icones/` : logo, icône du navigateur, image de partage.
- `sitemap.xml`, `robots.txt`.

## Publication

- `.github/workflows/deploy.yml` envoie le dossier `site/` tel quel à GitHub Pages à chaque envoi sur `main`
  (aucune construction). Le domaine est réglé dans les paramètres Pages du dépôt ; `site/CNAME` le rappelle.
- Ne jamais envoyer sur GitHub (`git push`) sans que l'auteur le demande : c'est une mise en ligne.

## Reste à faire

1. Remplacer « SIRET en cours d'attribution » par le vrai numéro dans les mentions légales.
2. Tenir la page Compatibilité à jour avec ce qui est vérifié dans le logiciel.
3. Plus tard : la version Raspberry Pi (image toute prête) quand elle sera publiée, prix et page d'achat,
   versions en anglais, espagnol, italien et allemand.
