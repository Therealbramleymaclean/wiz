/* Troubles: what people bring, what it needs, how it's referred to. */
const TROUBLES = {
  sleeplessness: { label: 'Sleeplessness',  needs: ['warm','soft','dark'],
    lore: 'Sleeplessness answers to warmth, softness, and the dark.' },
  oldwound:      { label: 'An old wound',   needs: ['drawing','bitter','damp'],
    lore: 'An old wound wants drawing out, bitterness, and damp to soften it.' },
  barren:        { label: 'Barrenness',     needs: ['quickening','green','warm'],
    lore: 'Barrenness answers to quickening things, to green, and to warmth.' },
  lostthing:     { label: 'A lost thing',   needs: ['seeing','light','clear'],
    lore: 'What is lost answers to seeing, to light, and to what is clear.' },
  curse:         { label: 'A curse',        needs: ['washing','binding','metal'],
    lore: 'A curse is washed, then bound. Metal helps, though none agree why.' },
  doubt:         { label: 'Doubt',          needs: ['word','seeing','clear'],
    lore: 'Doubt answers to words, to seeing plainly, and to clarity.' },
  sickbeast:     { label: 'A sick beast',   needs: ['green','warm','washing'],
    lore: 'A sick beast wants green things, warmth, and washing.' },
  grief:         { label: 'Grief',          needs: ['soft','damp','quickening'],
    lore: 'Grief wants softness, and damp, and something to start it moving again.' },
};

/* Answer scoring pools and their reputational/coin returns. */
const POOLS = {
  0: ['dismissed','dismissed','adequate'],
  1: ['dismissed','adequate','adequate'],
  2: ['adequate','adequate','talked'],
  3: ['talked','talked','remembered'],
  4: ['talked','remembered','remembered'],
  5: ['remembered','remembered','talked'],
};
const TIERS_ANS = {
  dismissed:  { rep: 0,  coin: 0,  cls: '' },
  adequate:   { rep: 1,  coin: 3,  cls: '' },
  talked:     { rep: 4,  coin: 8,  cls: 'talked' },
  remembered: { rep: 10, coin: 20, cls: 'remembered' },
};
const REACTION = {
  dismissed: [
    'They turn it over, thank you politely, and leave sooner than they arrived.',
    'They take it. You watch them decide, on the stairs, not to come back.',
  ],
  adequate: [
    'They seem satisfied. Whether it works you will probably never learn.',
    'They go away calmer than they came. That may be the whole of it.',
  ],
  talked: [
    'Three weeks later a carter mentions it to you, not knowing it was yours.',
    'Word comes back up the hill. The telling has already improved on the truth.',
  ],
  remembered: [
    'You hear about it for years afterwards, in versions you do not recognise.',
    'It is spoken of at market. In the story you say something clever, which you did not.',
  ],
};
const DRIFT = [
  'In the version they tell now, you did not even look up.',
  'By the time it reached Ashgate there were three of them, and a storm.',
  'The telling has you speaking words nobody can repeat afterwards.',
  'Children have it that the tower leaned down to listen.',
  'A pedlar sells a copy of it now. It is not much like the thing you made.',
];
