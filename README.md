# LOCAMIMI — landing DJ

Sito statico, una pagina. Nessuna build: si carica così com'è su Netlify, Vercel, GitHub Pages o qualsiasi hosting.

## Struttura

```
index.html          contenuti e struttura della pagina
css/theme.css       token del design system LOCAMIMI (colori Chiaro/Scuro, spacing, radius, font)
css/site.css        layout della landing e versione mobile (sotto 600px)
js/sets.js          i set del carosello: titolo, sottotitolo, riga, illustrazione, link SoundCloud
js/app.js           monta il CoverCarousel e lo scroll orizzontale che fa girare la pila
vendor/             componenti LOCAMIMI (bundle.js, bundle.css) + React 19
fonts/              DAMN e Bricolage Grotesque
```

## Modifiche frequenti

- Aggiungere o cambiare un set: `js/sets.js`, un oggetto per set.
- Testi, giovedì, bio, contatti: `index.html`.
- Grandezza e inclinazione del carosello: `css/site.css`, regole `.vetrina [class*="--cover-size"]`, `--step-x`, `--step-y`.

## Pubblicare su Netlify

app.netlify.com › Sites › trascina l'intera cartella nell'area "Deploy manually".

## Provarlo in locale

Aprire `index.html` direttamente dal file system funziona, ma per i font è meglio un piccolo server:

```
python3 -m http.server 8000
```

poi http://localhost:8000
