/* Books — real (bookseller stock) and procedural (cart flotsam). */
const BOOKS = [
  { id: 't1', title: 'On the Quieting of Nights',              kind: 'treatise', teaches: 'sleeplessness', min: 7,  cost: 0 },
  { id: 'h1', title: 'A Herbal, water-stained',                kind: 'herbal',   mats: ['nettle','thyme','plum','honey'], min: 8, cost: 0 },
  { id: 't2', title: 'Culpeper, annotated by a former tenant', kind: 'treatise', teaches: 'oldwound',      min: 8,  cost: 22 },
  { id: 't3', title: 'A Treatise on Flocks and Their Seasons', kind: 'treatise', teaches: 'barren',        min: 9,  cost: 24 },
  { id: 't4', title: 'Letters Concerning Things Mislaid',      kind: 'treatise', teaches: 'lostthing',     min: 8,  cost: 26 },
  { id: 't5', title: 'Against the Binding of Millers',         kind: 'treatise', teaches: 'curse',         min: 11, cost: 38 },
  { id: 't6', title: 'Marginalia on a Disputed Passage',       kind: 'treatise', teaches: 'doubt',         min: 9,  cost: 32 },
  { id: 't7', title: 'The Farrier\u2019s Commonplace Book',    kind: 'treatise', teaches: 'sickbeast',     min: 8,  cost: 24 },
  { id: 't8', title: 'Consolations, in a poor translation',    kind: 'treatise', teaches: 'grief',         min: 12, cost: 48 },
  { id: 'h2', title: 'On Stones, Metals and Ash',              kind: 'herbal',   mats: ['iron','salt','ash','clay'],    min: 9, cost: 28 },
  { id: 'h3', title: 'Of Small Dead Things',                   kind: 'herbal',   mats: ['moth','crow','string','wax'],  min: 9, cost: 28 },
  { id: 'h4', title: 'Concerning Glass, Water and Light',      kind: 'herbal',   mats: ['lens','quill','rain','note'],  min: 9, cost: 34 },
  { id: 'h5', title: 'The Poisoner\u2019s Garden, unsigned',   kind: 'herbal',   mats: ['rue','poppy'],                 min: 10, cost: 42 },
];

/* Procedural title parts and post-read "thoughts". */
const PB = {
  a: ['A Discourse','Some Observations','A Short Account','Notes','An Enquiry',
      'Fragments','A Rebuttal','Meditations'],
  b: ['upon','concerning','touching','against','in defence of','on the subject of'],
  c: ['the Humours of Cattle','Weather in the Low Valleys','the Ordering of a Still Room',
      'Salt','Bees and Their Tempers','the Naming of Winds','Grave-Moss','the Uses of Ash',
      'Sleep in Children','Rust','the Turning of Milk','Old Roads'],
  d: ['by a Country Physician','anonymous','trans. from the Frankish',
      'a copy of a copy','with a hostile preface','author unknown'],
};
const THOUGHTS = [
  'A line in the margin stops you. You have thought this before.',
  'Something in it connects to something else. You could not say what.',
  'The author is wrong, and being wrong usefully.',
  'You realise you have read this page four times without seeing it.',
  'A previous owner has underlined one word. It was not the important one.',
];
