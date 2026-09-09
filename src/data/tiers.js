/* Tier progression: shack → cottage → tower → spire.
   Renown gates the rumour, coin buys the work. */
const TIERS_UP = [
  { id: 'shack',   name: 'shack',   pageTitle: 'Your shack',
    floors: 1, roomsPerFloor: 1, reqRep: 0,   coin: 0,
    madlibNoun: 'shack' },
  { id: 'cottage', name: 'cottage', pageTitle: 'Your cottage',
    floors: 2, roomsPerFloor: 2, reqRep: 15,  coin: 80,
    madlibNoun: 'cottage',
    rumour: 'A carter says there\u2019s a mason at Ashgate who takes small work \u2014 a cottage could be raised here.' },
  { id: 'tower',   name: 'tower',   pageTitle: 'Your tower',
    floors: 4, roomsPerFloor: 3, reqRep: 60,  coin: 400,
    madlibNoun: 'tower',
    rumour: 'They speak of you at market now. A builder from the city writes: he can raise a tower on this footing.' },
  { id: 'spire',   name: 'spire',   pageTitle: 'Your spire',
    floors: 9, roomsPerFloor: 4, reqRep: 180, coin: 1600,
    madlibNoun: 'spire',
    rumour: 'A letter, in a hand you don\u2019t know: the old spire-work is remembered, and there are still those who would raise one for you.' },
];
const tierByIx = i => TIERS_UP[i];
const nextTier = () => tierByIx(S.tierIx + 1);
