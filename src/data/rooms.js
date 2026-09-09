/* Room functions and fixtures. */
const ROOM_FN = {
  empty:   { name: 'Bare room',    desc: 'Nothing in it but the draught.' },
  study:   { name: 'A study',      desc: 'Books read a third faster.' },
  stores:  { name: 'Store room',   desc: 'Room for ten more things.' },
  garden:  { name: 'Glasshouse',   desc: 'Grows one herb you choose.' },
  work:    { name: 'Workshop',     desc: 'Opens the workshop.' },
  parlour: { name: 'A parlour',    desc: 'Callers sit for a fourth action.' },
};
const FIXTURES = {
  broom:   { name: 'The broom',    fits: ['empty','study','parlour'], cost: 30,
             desc: 'Sweeps by itself. A little insight, always.' },
  hoe:     { name: 'The hoe',      fits: ['garden'],                  cost: 36,
             desc: 'Three from the bed instead of two.' },
  bellows: { name: 'Small bellows',fits: ['work'],                    cost: 44,
             desc: 'Combine from four, not five.' },
  stand:   { name: 'Reading stand',fits: ['study'],                   cost: 38,
             desc: 'Another quarter off reading time.' },
};
