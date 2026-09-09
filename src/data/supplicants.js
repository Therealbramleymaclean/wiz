/* The consume: a caller who shouldn't be able to — you, younger.
   Their trouble has one answer. Not a regular supplicant; the sim injects
   this when struggle hits the threshold. */
const CONSUME = {
  who: 'You. Younger. The face you had before the years got into it.',
  trouble: 'consume',
  keeps: 'you',
  ask: 'You are standing on your own stair, looking up at the rooms you have built, the shelf full, the notebook thick. You have not slept. You say: \u201cI know what this is. I have done it before, or I will, and I cannot keep doing it.\u201d',
  when: 'It is the weight of it. The requests. The ones that outrun you.',
  tried: 'You have tried every arrangement of it',
};

/* Who comes up the stair. Each entry pairs a caller with the trouble they bring. */
const SUPPLICANTS = [
  { who: 'A widow from the low village', trouble: 'sleeplessness', keeps: 'widow',
    ask: 'She has not slept properly since the spring. She wants the nights made quiet, and to stop being afraid of the dark hours.',
    when: 'It is worst after the fire goes out, when the room turns cold.',
    tried: 'Her sister gave her' },
  { who: 'A vagabond with a ruined leg', trouble: 'oldwound', keeps: 'vagabond',
    ask: 'The wound closed badly two winters back. Something is still in there, he says, and it aches whenever the weather turns wet.',
    when: 'Worst before rain. It wants opening, he says, not closing.',
    tried: 'A barber in Ashgate sold him' },
  { who: 'A shepherd, hat in hands', trouble: 'barren', keeps: 'shepherd',
    ask: 'His ewes will not take the ram. The flock has gone quiet and slow, and he wants life put back into them before the season closes.',
    when: 'They stand at the fence and will not go up to the new grass.',
    tried: 'His father swore by' },
  { who: 'A girl sent by her mother', trouble: 'lostthing', keeps: 'girl',
    ask: 'A ring has gone missing somewhere in the house. She has looked everywhere. She wants to be able to see where she has not.',
    when: 'It went in the evening, in the dim part of the hall.',
    tried: 'Her mother already tried' },
  { who: 'A miller, and he has come at night', trouble: 'curse', keeps: 'miller',
    ask: 'He is certain someone has put something on him. He wants it taken off him and held down so it cannot come back.',
    when: 'It began after a quarrel at the weir. He will not say with whom.',
    tried: 'A woman on the road sold him' },
  { who: 'A priest, travelling alone', trouble: 'doubt', keeps: 'priest',
    ask: 'A passage in his book has begun to trouble him. He wants the words looked at plainly, by someone who will tell him the truth of them.',
    when: 'It is the wording itself. He has read it until it means nothing.',
    tried: 'His bishop recommended' },
  { who: 'A boy with his sister behind him', trouble: 'sickbeast', keeps: 'children',
    ask: 'Their dog has stopped eating and lies by the fire all day. They want it warm again, and clean, and eating grass like it used to.',
    when: 'It started after it got into the ditch behind the tannery.',
    tried: 'They have been putting' },
  { who: 'A carter who will not sit down', trouble: 'grief', keeps: 'carter',
    ask: 'His wife went in the winter. He is not asking to be mended. He would like to be able to feel the mornings again.',
    when: 'He says the whole of it has gone dry and stopped. He wants it moving.',
    tried: 'The parish gave him' },
];
