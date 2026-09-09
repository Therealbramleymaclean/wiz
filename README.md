# Wiz — The Tower

An idle/incremental browser game. A wizard in a shack; things happen slowly.

**Play:** https://YOUR-USERNAME.github.io/wiz/

## Structure

```
wiz/
├── index.html          ← page shell + script tags in load order
├── styles.css          ← all styles
├── src/
│   ├── data/           ← pure data: materials, books, tiers, kit…
│   ├── state.js        ← the mutable game state `S`
│   ├── save.js         ← save / resume (localStorage, versioned)
│   ├── helpers.js      ← small pure helpers reused everywhere
│   ├── sim.js          ← the tick loop
│   ├── ui/             ← one file per page + shared fragments + render
│   ├── actions.js      ← every player action (attached to window.*)
│   └── boot.js         ← resume or creator, start tick, autosave
```

All files are plain `<script>`s (no ES modules), so you can open `index.html`
directly in a browser without a local server. Load order in `index.html`
matters and is commented there.

## Local development

Just open `index.html` in a browser. That's it.

Progress autosaves to the browser's `localStorage` (every few seconds, and when
you close the tab). Use **Start over** on the Yourself page to begin again.

If you later switch to `<script type="module">` you'll need a local server:

```bash
python3 -m http.server 8000
# then http://localhost:8000
```

## Deploying

Any push to `main` is picked up by GitHub Pages automatically. In repo settings:
**Pages** → Source: **Deploy from a branch** → Branch: **main** / **/(root)**.

## Versions

- **v9** — character creator, tier progression (shack → cottage → tower → spire),
  Town replaces Books, Notebook reworked, Search cooldown, Workshop combine batching,
  turn-away costs renown, nav dots for idle tracks.

The single-file prototype `tower-v9.html` was the source for this split.
