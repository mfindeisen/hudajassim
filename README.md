# Huda Jassim Portfolio - Node.js Version

Dieses Projekt wurde von Jekyll auf ein reines Node.js-Projekt umgestellt.

## Installation

1. Node.js installieren (v14 oder höher):
```bash
node --version
```

2. Dependencies installieren:
```bash
npm install
```

3. Umgebungsvariablen einrichten (optional):
```bash
cp .env.example .env
# Bearbeite .env und setze deine Werte
```

4. Admin-Passwort einrichten:
```bash
npm run setup-password
```

## Server starten

```bash
npm start
```

Oder für Entwicklung mit Auto-Reload:
```bash
npm run dev
```

Der Server läuft dann auf `http://localhost:3000`

## Struktur

- `server.js` - Hauptserver mit allen Routes
- `views/` - EJS Templates
  - `layouts/` - Layout-Templates
  - `pages/` - Seiten-Templates
- `_posts/` - Blog-Posts (Markdown mit Front Matter)
- `_data/content.yml` - Inhaltsdaten (mehrsprachig)
- `assets/` - CSS, JS, Bilder
- `admin/` - Admin-Bereich für Blog-Verwaltung

## Routes

- `/` - Homepage (English)
- `/ku` - Homepage (Kurdish)
- `/blog` - Blog-Liste (English)
- `/ku/blog` - Blog-Liste (Kurdish)
- `/posts/:slug` - Einzelner Blog-Post
- `/admin` - Admin-Bereich

## Admin-Bereich

Der Admin-Bereich ist unter `/admin` erreichbar. Dort kannst du:
- Blog-Posts erstellen, bearbeiten und löschen
- WYSIWYG-Editor für Inhalte verwenden
- Posts in verschiedenen Sprachen verfassen

**Wichtig:** Ändere die Standard-Credentials in der `.env` Datei oder direkt in `server.js`!

## Unterschiede zu Jekyll

- **Kein Build-Prozess mehr** - Seiten werden dynamisch gerendert
- **Server muss laufen** - Keine statischen HTML-Dateien mehr
- **Templates in EJS** - Statt Liquid-Templates
- **Gleiches Design** - CSS und HTML-Struktur bleiben identisch

## Deployment

Für Produktion:
1. Setze `BASEURL` in der `.env` wenn nötig
2. Verwende einen Process Manager wie PM2
3. Setze HTTPS und `cookie.secure: true` in `server.js`

