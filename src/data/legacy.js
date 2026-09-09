/* Legacy: what a life weighs in. Each term contributes to the total that
   becomes spendable at the consume. Weights are tuned so a full playthrough
   (spire-level) yields roughly 400–550 legacy, enough for 5–8 skill purchases.

   A shorter life (cottage, ~30 rep, 4 rooms, 8 species, 5 books, 1 fixture)
   yields ~95 — enough for 1–2 skills. Every playstyle pays. */
const LEGACY_TERMS = [
  { id: 'rep',      label: 'Renown',       weight: 1,  get: s => s.peakRep },
  { id: 'rooms',    label: 'Rooms built',  weight: 2,  get: s => s.rooms.length },
  { id: 'species',  label: 'Species found',weight: 4,  get: s => s.discovered.length },
  { id: 'books',    label: 'Books read',   weight: 3,  get: s => s.readBooks.length },
  { id: 'fixtures', label: 'Fixtures',     weight: 10, get: s => s.ups.length },
];
