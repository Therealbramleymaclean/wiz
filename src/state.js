/* The one mutable object the game runs on. Everything else reads S. */
let S = {
  version: 10,
  setup: false,
  page: 'door',
  name: '',
  rep: 0, coin: 6, insight: 0, speed: 1,
  location: null, tierIx: 0, tierOffered: false,
  shelf: {}, bench: [],
  supplicant: null, knockIn: 0.5 * MIN,
  trickle: 0, broomT: 0,
  troubles: [], lore: {},
  owned: ['t1'], readBooks: [],
  activeBook: null, bookProg: 0,
  procN: 0, procBooks: {},
  doing: null,
  searchAt: null, lastFind: '', searchCd: 0,
  rooms: [{ floor: 0, fn: 'empty', fixture: null, sown: null, grown: 0 }],
  ups: [],
  kit: { head: 'none', body: 'none', legs: 'none',
         lhand: 'none', rhand: 'none', feet: 'none' },
  transSel: [], orbUsed: false,
  used: 0, asked: [], said: [],
  rumours: [], outcome: null,
  workFilter: 'all',
  /* v10 prestige.
     legacy  = the points a life weighs in (computed, not stored — recalculated at consume).
     skills  = what survives the forgetting (bought with legacy, persistent).
     peakRep = highest renown reached this life (feeds legacy).
     discovered = base material ids ever encountered (feeds legacy). */
  legacy: 0,
  skills: [],
  peakRep: 0,
  discovered: [],
  struggle: 0,
  lives: 1,
  keepsake: null,
  log: [],
  lastUpdate: Date.now(),
};

/* Bookseller procedural stock lives outside S because it regenerates. */
let SHOP_PROC = [];
