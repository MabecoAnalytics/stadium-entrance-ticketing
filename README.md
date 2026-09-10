# Sistema de Gestão de Entradas - CFM (Demo)

Clickable mockup of a stadium digital ticketing and entrance-control system for
CFM (Portos e Caminhos de Ferro de Moçambique). Everything is client-side and
hardcoded/in-memory - there is no backend, no database, and no network calls at
runtime, so the demo runs fully offline.

## Run it

```bash
npm install && npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Live demo

Deployed automatically to GitHub Pages on every push to `main`:
https://mabecoanalytics.github.io/stadium-entrance-ticketing/

## Screens

Routing uses hash-based URLs (`#/...`) so deep links work on GitHub Pages'
static hosting without server-side rewrites.

| Route | Screen |
|---|---|
| `#/` | Landing hub |
| `#/compra` | Compra de Bilhete (4-step purchase wizard) |
| `#/gate` | Validação na Entrada (gate operator scanner) |
| `#/admin` | Painel Administrativo (dashboard) |
| `#/relatorio` | Relatório de Evento (post-event report) |

## Stack

React + Vite, Tailwind CSS, react-router-dom, recharts, lucide-react, qrcode.react.

All mock data lives in [src/data/mockData.js](src/data/mockData.js).
