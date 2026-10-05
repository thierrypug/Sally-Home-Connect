// site/js/site.js — deux petites choses : le menu sur téléphone, et l'apparition des blocs quand on fait défiler la page
(() => {
  // --- Menu sur téléphone : le bouton ouvre et ferme la liste des pages ---
  const bouton = document.querySelector('.bouton-menu');
  const menu = document.getElementById('menu');
  if (bouton && menu) {
    const regler = ouvert => {
      menu.classList.toggle('ouvert', ouvert);
      bouton.setAttribute('aria-expanded', String(ouvert));
      bouton.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    };
    bouton.addEventListener('click', () => regler(!menu.classList.contains('ouvert')));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') regler(false); });
  }

  // --- Boutons « Copier l'adresse » : copient l'adresse e-mail et le disent ---
  for (const b of document.querySelectorAll('[data-copier]')) {
    const texte = b.textContent;
    b.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(b.dataset.copier);
        b.textContent = 'Adresse copiée ✓';
      } catch {
        b.textContent = 'Copie impossible : sélectionne l\'adresse';
      }
      setTimeout(() => { b.textContent = texte; }, 2500);
    });
  }

  // --- Apparition en douceur des blocs ---
  // Sans ce script, ou si la personne a demandé moins d'animations, tout est simplement visible d'emblée.
  const moinsDeMouvement = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (moinsDeMouvement || !('IntersectionObserver' in window)) return;
  const blocs = document.querySelectorAll('.entete-section, .carte, .etapes li, .duo > *, .tableau-cadre, .appel');
  if (!blocs.length) return;
  document.documentElement.classList.add('js');
  const guetteur = new IntersectionObserver(entrees => {
    for (const entree of entrees) {
      if (!entree.isIntersecting) continue;
      entree.target.classList.add('vu');
      guetteur.unobserve(entree.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  for (const bloc of blocs) {
    bloc.classList.add('revele');
    guetteur.observe(bloc);
  }
  // Filet de sécurité : si un bloc n'a pas été vu au bout de quelques secondes (onglet en arrière-plan,
  // page imprimée…), on montre tout
  setTimeout(() => { if (document.hidden) blocs.forEach(b => b.classList.add('vu')); }, 4000);
  window.addEventListener('beforeprint', () => blocs.forEach(b => b.classList.add('vu')));
})();
