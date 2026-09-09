/* Materials, potency tiers, tag palette, and item helpers. */
const POT = [
  { n: '',                c: '--p0', lab: 'common' },
  { n: 'Strong ',         c: '--p1', lab: 'strong' },
  { n: 'Concentrated ',   c: '--p2', lab: 'concentrated' },
  { n: 'Distilled ',      c: '--p3', lab: 'distilled' },
  { n: 'Quintessence of ',c: '--p4', lab: 'quintessential' },
  { n: 'Perfected ',      c: '--p5', lab: 'perfect' },
];

const ALLTAGS = [
  'bitter','green','drawing','earth','damp','binding','glass','light','seeing',
  'word','warm','soft','dark','quickening','metal','clear','washing',
];

const BASE = [
  { id: 'nettle', name: 'dried nettle',  tags: ['bitter','green','drawing'],       sow: 1 },
  { id: 'clay',   name: 'river clay',    tags: ['earth','damp','binding'] },
  { id: 'lens',   name: 'cracked lens',  tags: ['glass','light','seeing'] },
  { id: 'quill',  name: 'goose quill',   tags: ['word','light','seeing'] },
  { id: 'wax',    name: 'beeswax stub',  tags: ['warm','soft','binding'] },
  { id: 'crow',   name: 'crow feather',  tags: ['dark','light','seeing'] },
  { id: 'plum',   name: 'sour plum',     tags: ['bitter','quickening','soft'],     sow: 1 },
  { id: 'iron',   name: 'iron filings',  tags: ['metal','dark','binding'] },
  { id: 'note',   name: 'marginal note', tags: ['word','seeing','bitter'] },
  { id: 'rain',   name: 'rainwater',     tags: ['damp','clear','washing'] },
  { id: 'moth',   name: 'moth wing',     tags: ['dark','soft','light'] },
  { id: 'salt',   name: 'salt',          tags: ['bitter','clear','washing'] },
  { id: 'thyme',  name: 'wild thyme',    tags: ['green','warm','quickening'],      sow: 1 },
  { id: 'string', name: 'waxed string',  tags: ['binding','soft','earth'] },
  { id: 'honey',  name: 'dark honey',    tags: ['warm','soft','quickening'] },
  { id: 'ash',    name: 'hearth ash',    tags: ['earth','dark','washing'] },
  { id: 'rue',    name: 'bitter rue',    tags: ['bitter','green','washing'],       sow: 1 },
  { id: 'poppy',  name: 'poppy head',    tags: ['dark','soft','drawing'],          sow: 1 },
];

const NOUN = {
  nettle:'Nettle', clay:'Clay', lens:'Glass', quill:'Quill', wax:'Wax', crow:'Feather',
  plum:'Plum', iron:'Iron', note:'Marginalia', rain:'Rainwater', moth:'Moth', salt:'Salt',
  thyme:'Thyme', string:'Cord', honey:'Honey', ash:'Ash', rue:'Rue', poppy:'Poppy',
};

/* Item id encoding: "nettle" is base, "nettle@2" is potency 2. */
function parseId(id) {
  const [b, p] = id.split('@');
  return { b, p: p ? +p : 0 };
}
function extraTags(b, p) {
  const base = BASE.find(m => m.id === b);
  let seed = 0;
  for (const ch of b) seed += ch.charCodeAt(0);
  const avail = ALLTAGS.filter(t => !base.tags.includes(t));
  const out = [];
  for (let i = 0; i < p; i++) out.push(avail[(seed * 7 + i * 13 + seed % 5) % avail.length]);
  return [...new Set(out)];
}
function item(id) {
  const { b, p } = parseId(id);
  const base = BASE.find(m => m.id === b);
  return {
    id, b, p,
    name: POT[p].n + base.name,
    tags: [...base.tags, ...extraTags(b, p)],
    col: POT[p].c,
  };
}
