/* Kit slots (vanity for now), curios, and shared kit-description tables. */
const KIT = {
  head:  [['none','Bare-headed'],['hood','A grey hood'],['hat','A wide felt hat'],
          ['cap','A student\u2019s cap'],['scarf','A wound scarf'],
          ['coif','A leather coif'],['crown','A crown of twigs']],
  body:  [['none','Shirtsleeves'],['robe','A patched robe'],['coat','A long coat'],
          ['jerkin','A worn jerkin'],['cloak','A traveller\u2019s cloak'],
          ['smock','A dyer\u2019s smock']],
  legs:  [['none','Plain hose'],['apron','A working apron'],
          ['breeches','Rough breeches'],['skirt','A long skirt']],
  lhand: [['none','Empty'],['stick','A walking stick'],['staff','A knotted staff'],
          ['orb','A scrying orb'],['censer','A small censer'],['book','A closed book']],
  rhand: [['none','Empty'],['pen','A pen, always'],['knife','A small knife'],
          ['wand','A wand-shaped stick'],['bell','A hand-bell'],['pouch','A leather pouch']],
  feet:  [['none','Bare feet'],['boots','Heavy boots'],
          ['sandals','Rope sandals'],['slippers','Felt slippers']],
};
const SLOTNAME = {
  head: 'Head', body: 'Upper body', legs: 'Lower body',
  lhand: 'Left hand', rhand: 'Right hand', feet: 'Feet',
};
const KIT_LOOKUP = {};
Object.keys(KIT).forEach(k => {
  KIT[k].forEach(([v, n]) => { KIT_LOOKUP[k + ':' + v] = n; });
});

/* Shared tables used by both the live status madlib and the creator preview. */
const HEAD_ADJ = {
  hood: 'hooded', hat: 'hatted', cap: 'capped',
  scarf: 'scarfed', coif: 'coifed', crown: 'crowned',
};
const HAND_N = {
  stick: 'walking stick', staff: 'knotted staff', orb: 'scrying orb',
  censer: 'small censer', book: 'closed book', pen: 'pen',
  knife: 'small knife', wand: 'wand-shaped stick',
  bell: 'hand-bell', pouch: 'leather pouch',
};
const BODY_N = {
  robe: 'a patched robe', coat: 'a long coat', jerkin: 'a worn jerkin',
  cloak: 'a traveller\u2019s cloak', smock: 'a dyer\u2019s smock',
};

/* Curios — starting item choice. Each is a small kindness, not a mechanical shove. */
const CURIOS = [
  { id: 'stick', kind: 'kit', slot: 'rhand', val: 'wand',
    name: 'A stick that looks like a wand',
    desc: 'It isn\u2019t. But it looks like one. Held in the right hand.' },
  { id: 'book',  kind: 'book', val: 'h1',
    name: 'A water-stained herbal',
    desc: 'Left in a drawer by whoever was here before. Yours to read.' },
  { id: 'mat',   kind: 'mat',  val: 'lens',
    name: 'A cracked lens',
    desc: 'It doesn\u2019t focus properly. It still shows you things.' },
];
