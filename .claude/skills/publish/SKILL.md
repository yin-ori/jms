---
name: publish
description: >
  Pre-Publish-Review und Merge fuer diese zweisprachige (DE/EN) Astro-Website.
  Prueft nach Content-Aenderungen (About, Blog, Research, Profession, i18n), ob
  das Sprachpendant DE<->EN existiert und inhaltlich wie formal konsistent ist,
  ob nichts veraltet/verwaist ist und ob der Build sauber laeuft. Erst wenn alles
  passt: Commit und Push direkt auf main. Trigger: "/publish", "review und merge",
  "check und merge", "pruef und committe das", nachdem der Nutzer Content
  gespeichert hat und veroeffentlichen moechte.
---

# Publish Check (DE/EN)

Ziel: kein Push auf main, bevor DE/EN synchron, formal konsistent und der Build
sauber sind. Arbeite **nur mit dem, was sich geaendert hat** (`git status --short`,
`git diff`) — kein Vollaudit des Repos.

## Ablauf

**1. Scope ermitteln**
Geaenderte/neue Dateien unter `src/pages/{de,en}/**`, `src/content/{blog,research}/**`,
`src/utils/i18n.ts`, `src/components/**`. Anderes (z. B. `.claude/settings.local.json`)
nie stagen.

**2. Sprachpendant finden**
- Seiten: `src/pages/de/x.astro` <-> `src/pages/en/x.astro` (gleicher Pfad).
- Blog-Posts: Slugs unterscheiden sich je Sprache — Pendant ueber `publishedDate`
  und Thema zuordnen, nicht ueber den Dateinamen.
- Research: `src/content/research/de.md` <-> `en.md`.
- Kein Pendant vorhanden -> melden und nachfragen (fehlt die Uebersetzung oder
  bleibt der Inhalt bewusst einsprachig?). Nicht raten, nicht ignorieren.

**3. Inhaltlicher Abgleich** (bei vorhandenem Pendant)
- Gleiche Struktur: Absaetze, Ueberschriften, Listen, Links, Bilder in Anzahl
  und Reihenfolge.
- Keine Aussage, die nur in einer Sprache steht.
- Frontmatter: `draft`, `publishedDate`, `modifiedDate` identisch; `keywords`/
  `imageAlt` uebersetzt statt kopiert. Bei Inhaltsaenderung an bestehenden Posts:
  `modifiedDate` in beiden Sprachen aktualisieren.
- Massstab ist inhaltliche Gleichwertigkeit, nicht Wort-fuer-Wort-Gleichheit.

**4. Format-Konsistenz** (nur geaenderte Bereiche)
- Anfuehrungszeichen: Deutsch „…", Englisch "…" — in `.astro` UND `.md` manuell
  setzen. (Astros smartypants macht aus geraden Anfuehrungszeichen englische
  Kurven, niemals deutsche — gerade Anfuehrungszeichen in DE-Markdown sind also
  ein Fehler.)
- Externe Links: `target="_blank" rel="noopener"`.
- Interne Text-Links: gleiche CSS-Klassen wie bestehende Links derselben Seite.
- Keine Dopplung von Eintraegen zwischen Sektionen (z. B. Profession-Kategorien).
- Geaenderte `i18n.ts`-Keys fuer `de` und `en` beide gepflegt.

**5. Veraltetes/Totes**
- Neue Dateien/Assets, die nirgends referenziert werden.
- Kein Platzhaltertext (TODO, Lorem ipsum, XXX).
- Keine internen Links auf nicht existierende Routen.

**6. Build**
`npm run build` muss mit 0 Errors durchlaufen (enthaelt `astro check`).
Warnungen nur blockierend, wenn sie geaenderte Dateien betreffen.

**7. Erst wenn 1–6 sauber: Commit + Push auf main**
- Vorbedingung: auf `main`, und `git pull --ff-only` laeuft konfliktfrei durch;
  sonst stoppen und melden.
- Nur die relevanten Dateien gezielt stagen (nie `git add -A`; Pfade mit `[...]`
  in Anfuehrungszeichen wegen zsh-Globbing).
- Commit: kurze deutsche Beschreibung + die vom Harness vorgegebene
  Co-Authored-By-Zeile.
- `git push origin main`. Schlaegt der Push ab (non-fast-forward): stoppen,
  melden, niemals force-pushen.

## Grundsaetze
- Nichts committen, solange ein Check offen ist oder eine Rueckfrage aussteht.
- Findet ein Check ein Problem: erst fixen (oder nachfragen), dann von vorn ab
  dem betroffenen Schritt.
- Abschlussbericht kurz: was geprueft, was korrigiert, Commit-Hash.
