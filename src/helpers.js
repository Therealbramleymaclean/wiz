/* Small pure helpers reused across pages and actions. */
const $   = id => document.getElementById(id);
const pick = a => a[Math.floor(Math.random() * a.length)];
const cap  = s => s.charAt(0).toUpperCase() + s.slice(1);

/* Book lookup — proc books come first because they overlay real ids. */
const bk = id => S.procBooks[id] || BOOKS.find(b => b.id === id);

/* Knowledge queries. */
const knows      = t  => S.troubles.includes(t);

/* Skill queries. */
const hasSkill   = id => S.skills.includes(id);
const skillDef   = id => SKILLS.find(s => s.id === id);
const knownTags  = id => S.lore[parseId(id).b] || [];
const needsOf    = () => S.supplicant ? TROUBLES[S.supplicant.trouble].needs : [];

/* Rooms and capacities. */
const roomsWith  = fn => S.rooms.filter(r => r.fn === fn);
const hasFix     = f  => S.rooms.some(r => r.fixture === f);
const storeCap   = () => BASE_STORE + roomsWith('stores').length * 10;
const held       = () => Object.values(S.shelf).reduce((a, b) => a + b, 0);
const maxActions = () => 3;
const leftAct    = () => maxActions() - S.used;
const combineN   = () => hasFix('bellows') ? 4 : 5;
const benchCap   = () => 3 + (hasSkill('extra_hands') ? 1 : 0);

/* The builder's price for the next room: scales with everything built so far. */
const roomCost   = () => Math.round(20 * Math.pow(1.35, Math.max(0, S.rooms.length) - 1));

/* Formatting and tier queries. */
const mins = ms => ms < MIN
  ? Math.max(1, Math.ceil(ms / 1000)) + 's'
  : Math.ceil(ms / MIN) + 'm';
const tier    = () => tierByIx(S.tierIx);
const roomCap = () => tier().floors * tier().roomsPerFloor;

/* Location-derived helpers. */
const currentPlaces = () => {
  if (!S.location) return [];
  const loc = START_LOCATIONS.find(l => l.id === S.location);
  return loc ? loc.places : [];
};
const availPlaces = () => PLACES.filter(p => currentPlaces().includes(p.id));

/* Supplicant-flow helpers. */
function revealed() {
  if (!S.supplicant) return [];
  if (knows(S.supplicant.trouble)) return needsOf();
  return needsOf().filter((n, i) => S.asked.includes('n' + i));
}
function benchTags() {
  const t = new Set();
  S.bench.forEach(id => item(id).tags.forEach(x => t.add(x)));
  return t;
}
function callerWait() {
  return Math.max(T.callerFloor, T.callerBase - S.rep * 1200);
}
function readMin(b) {
  let m = b.min;
  if (roomsWith('study').length) m *= 0.67;
  if (hasFix('stand'))           m *= 0.75;
  if (hasSkill('quick_study'))   m *= 0.67;
  return m;
}
function give(id, n = 1) {
  if (held() >= storeCap()) return false;
  S.shelf[id] = (S.shelf[id] || 0) + n;
  /* Track first-encounter for legacy; Keen Eye auto-learns the first tag. */
  const b = parseId(id).b;
  if (!S.discovered.includes(b)) {
    S.discovered.push(b);
    if (hasSkill('keen_eye')) {
      const base = BASE.find(m => m.id === b);
      if (base && !S.lore[b]) S.lore[b] = [base.tags[0]];
    }
  }
  return true;
}

/* Legacy: what a life weighs in. Sums the tunable term table. */
function legacyScore() {
  return LEGACY_TERMS.reduce((sum, t) => sum + t.weight * t.get(S), 0);
}
function note(s) {
  S.log.unshift(s);
  if (S.log.length > 40) S.log.pop();
}
function makeProcBook() {
  const id = 'p' + (S.procN++);
  const b = {
    id,
    title: `${pick(PB.a)} ${pick(PB.b)} ${pick(PB.c)}, ${pick(PB.d)}`,
    kind: 'common',
    min:  4 + Math.floor(Math.random() * 4),
    cost: 8 + Math.floor(Math.random() * 9),
  };
  S.procBooks[id] = b;
  return b;
}

/* Kit descriptor for the madlib. Shared by the live status bar and the
   creator preview; pass a kit and includeBody:false for the creator's sentence. */
function kitDescriptor(kit = S.kit, includeBody = true) {
  const parts = [];
  const { head, body, lhand, rhand } = kit;
  if (HEAD_ADJ[head]) parts.push(HEAD_ADJ[head]);
  parts.push('wizard');
  const heldItems = [];
  if (HAND_N[lhand]) heldItems.push(HAND_N[lhand]);
  if (HAND_N[rhand]) heldItems.push(HAND_N[rhand]);
  let out = 'the ' + parts.join(' ');
  const art = w => /^[aeiou]/i.test(w) ? 'an ' + w : 'a ' + w;
  if (heldItems.length) out += ' with ' + heldItems.map(art).join(' and ');
  if (includeBody && BODY_N[body]) out += ', in ' + BODY_N[body];
  return out;
}

/* Peak renown tracking — called after any rep change. */
function bumpPeak() {
  if (S.rep > S.peakRep) S.peakRep = S.rep;
}

/* Nav dots — a dot means "you could be doing something here and aren't". */
function navDots() {
  return {
    door:   !!(S.supplicant && S.page !== 'door'),
    search: !S.searchAt && S.page !== 'search' && held() < storeCap(),
    note:   !S.doing && !S.activeBook && S.page !== 'note',
  };
}
