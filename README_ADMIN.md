# Admin Setup

## Installation

1. Node.js installieren (falls noch nicht vorhanden):
```bash
node --version  # Sollte v14 oder höher sein
```

2. Dependencies installieren:
```bash
npm install
```

3. Umgebungsvariablen einrichten:
```bash
cp .env.example .env
```

4. Passwort-Hash generieren (einfache Methode):
```bash
npm run setup-password
```
Folge den Anweisungen und kopiere die Ausgabe in deine `.env` Datei.

Alternativ manuell:
```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('dein-passwort', 10).then(h => console.log(h));"
```

5. `.env` Datei bearbeiten und die generierten Werte eintragen:
```
ADMIN_USERNAME=dein-username
ADMIN_PASSWORD_HASH=der-generierte-hash
SESSION_SECRET=ein-zufaelliger-secret-key
PORT=3000
```

## Server starten

```bash
npm start
```

Oder für Entwicklung mit Auto-Reload:
```bash
npm run dev
```

Der Admin-Bereich ist dann unter `http://localhost:3000/admin` erreichbar.

## Verwendung

1. Öffne `http://localhost:3000/admin` im Browser
2. Melde dich mit deinen Admin-Credentials an
3. Erstelle neue Blog-Beiträge oder bearbeite bestehende
4. Der WYSIWYG-Editor ermöglicht einfaches Formatieren
5. Beiträge werden automatisch im `_posts` Ordner gespeichert

## Wichtig

- **Ändere die Standard-Credentials!** Die Standard-Login-Daten sind nur für die Entwicklung gedacht.
- Für Produktion sollte HTTPS verwendet werden (setze `cookie.secure: true` in `server.js`).
- Der Server muss laufen, damit der Admin-Bereich funktioniert.

