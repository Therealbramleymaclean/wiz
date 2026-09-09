/* Search locations and starting locations. Each starting location gates
   which three of six places are available at the start. */
const PLACES = [
  { id: 'garden', name: 'the kitchen garden', mats: ['nettle','thyme','plum','honey'] },
  { id: 'ditch',  name: 'the ditch below',    mats: ['clay','ash','moth','crow'] },
  { id: 'river',  name: 'the river stones',   mats: ['rain','salt','iron','clay'] },
  { id: 'desk',   name: 'your own drawers',   mats: ['quill','note','lens','string'] },
  { id: 'hearth', name: 'the cold hearth',    mats: ['wax','ash','honey','string'] },
  { id: 'waste',  name: 'the burnt waste',    mats: ['rue','poppy','ash','iron'] },
];

const START_LOCATIONS = [
  {
    id: 'village', name: 'the edge of the low village',
    flavour: 'A shack behind a hedgerow. The village will notice you by winter.',
    places: ['garden','desk','hearth'],
    startShelf: ['nettle','wax','honey'],
    startLore: { wax: ['warm','soft','binding'], honey: ['warm','soft','quickening'] },
  },
  {
    id: 'woods', name: 'the woods above',
    flavour: 'A shack under branches. Trouble walks up to your door because there is nowhere else.',
    places: ['garden','ditch','desk'],
    startShelf: ['nettle','thyme','moth'],
    startLore: { thyme: ['green','warm','quickening'], moth: ['dark','soft','light'] },
  },
  {
    id: 'waste', name: 'the burnt waste',
    flavour: 'A shack on a plain of ash. The desperate find their way here, eventually.',
    places: ['waste','river','hearth'],
    startShelf: ['rue','ash','rain'],
    startLore: { rain: ['damp','clear','washing'], ash: ['earth','dark','washing'] },
  },
];
