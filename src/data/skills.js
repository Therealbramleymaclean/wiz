/* Skills: bought once with legacy, survive the forgetting forever.
   Stored as an array of ids in S.skills. Each is purchased at most once
   across all lives — the second life starts sharper, the third sharper still.

   Costs are tuned so a full playthrough (~450 legacy) can afford all five
   with margin, while a short life (~95) affords one or two. The choice of
   which to buy is the strategic layer between lives. */
const SKILLS = [
  { id: 'quick_study',
    name: 'Quick Study',
    desc: 'You read the way you did before the weight of it. Books take a third less time.',
    cost: 25 },

  { id: 'keen_eye',
    name: 'Keen Eye',
    desc: 'New things announce themselves. The first tag of a discovery is never a mystery.',
    cost: 30 },

  { id: 'extra_hands',
    name: 'Extra Hands',
    desc: 'You keep a second place to lay things out. One more piece of the answer, always within reach.',
    cost: 40 },

  { id: 'waking_room',
    name: 'A Room Already Yours',
    desc: 'You wake with the place half-remembered. One room is already yours — the shack held it for you.',
    cost: 50 },

  { id: 'keepsake',
    name: 'The Keepsake',
    desc: 'You forget the spire, but not the nettle. Exactly one material of your choosing survives.',
    cost: 80 },
];
