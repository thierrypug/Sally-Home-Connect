// apercu.cjs — montre le nouveau site (dossier « site ») sur ce PC, sans rien publier
// Utilisation : node apercu.cjs, puis ouvrir http://localhost:8765 dans le navigateur. Ctrl+C pour arrêter.
const http = require('http');
const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, 'site');
const PORT = 8765;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  let chemin = decodeURIComponent(req.url.split('?')[0]);
  if (chemin.endsWith('/')) chemin += 'index.html';
  const fichier = path.join(SITE, chemin);
  // Rien en dehors du dossier du site, et la page « introuvable » pour tout le reste, comme en ligne
  const trouve = fichier.startsWith(SITE) && fs.existsSync(fichier) && fs.statSync(fichier).isFile();
  res.writeHead(trouve ? 200 : 404, { 'Content-Type': trouve ? TYPES[path.extname(fichier)] || 'application/octet-stream' : TYPES['.html'] });
  res.end(fs.readFileSync(trouve ? fichier : path.join(SITE, '404.html')));
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Aperçu du site : http://localhost:${PORT}  (Ctrl+C pour arrêter)`);
});
