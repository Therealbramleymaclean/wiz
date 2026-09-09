/* Save and resume. Everything lives in S plus the shop's rotating stock;
   the whole lot is versioned so later schema changes can migrate old saves. */
const SAVE_KEY = 'wiz.tower.save';

/* Migrations, keyed by the save version they upgrade FROM.
   Add an entry for each S.version bump (e.g. 9: s => { … } for v9→v10). */
const MIGRATIONS = {
  /* 9: v9 is the first saved version — nothing to do yet. */
};

function saveGame() {
  if (!S.setup) return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ v: S.version, t: Date.now(), s: S, shop: SHOP_PROC }));
  } catch (e) { /* storage full or blocked — the game just keeps running */ }
}

function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}

function loadGame() {
  let d;
  try { d = JSON.parse(localStorage.getItem(SAVE_KEY)); } catch (e) { return false; }
  if (!d || !d.s || typeof d.s !== 'object' || d.v === undefined) return false;
  if (d.v > S.version) return false;  /* a save from a newer game — don't clobber it */
  if (typeof d.s.rep !== 'number' || typeof d.s.shelf !== 'object' || !Array.isArray(d.s.rooms)) return false;
  for (let v = d.v; v < S.version; v++) {
    const m = MIGRATIONS[v];
    if (m) m(d.s, d.shop);
  }
  Object.assign(S, d.s);
  if (Array.isArray(d.shop)) SHOP_PROC = d.shop;
  /* Older builds may have room/fixture ids the current data tables don't know. */
  S.rooms.forEach(r => {
    if (!ROOM_FN[r.fn]) r.fn = 'empty';
    if (r.fixture && !FIXTURES[r.fixture]) r.fixture = null;
  });
  return true;
}
