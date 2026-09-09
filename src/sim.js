/* The tick loop. Drives passives, callers, and cooldowns. */
function simulate(s, dtReal) {
  const dt = dtReal * s.speed;

  /* Trickle of finds. */
  s.trickle += dt;
  while (s.trickle >= T.trickle) { s.trickle -= T.trickle; give(pick(BASE).id); }

  /* Broom fixture: passive insight. */
  if (hasFix('broom')) {
    s.broomT += dt;
    while (s.broomT >= T.broom) { s.broomT -= T.broom; s.insight += 1; }
  }

  /* Glasshouse growth. */
  s.rooms.forEach(r => {
    if (r.fn === 'garden' && r.sown) {
      r.grown += dt;
      if (r.grown >= T.grow) { give(r.sown, hasFix('hoe') ? 3 : 2); r.grown = 0; }
    }
  });

  /* Reading and occupations. */
  if (s.activeBook) {
    const b = bk(s.activeBook);
    s.bookProg += dt;
    if (s.bookProg >= readMin(b) * MIN) finishBook(s);
  }
  if (s.doing) {
    s.doing.elapsed += dt;
    if (s.doing.elapsed >= s.doing.dur) finishOcc(s);
  }

  /* Search cooldown uses real time, not sped-up time. */
  if (s.searchCd > 0) { s.searchCd -= dtReal; if (s.searchCd < 0) s.searchCd = 0; }

  /* Someone on the stair? */
  if (!s.supplicant) {
    s.knockIn -= dt;
    if (s.knockIn <= 0) {
      s.supplicant = nextCaller();
      s.used = 0; s.asked = []; s.said = []; s.orbUsed = false;
      s.knockIn = callerWait();
      note('Someone is on the stair.');
      dirty();
    }
  }

  /* Tier offer check — a rumour first, then coin. */
  const nx = nextTier();
  if (nx && !s.tierOffered && s.rep >= nx.reqRep) {
    s.tierOffered = true;
    note(nx.rumour);
    note(`\u2014 the builder at Town will take the work. ${nx.coin} coin.`);
    dirty();
  }

  return s;
}

function finishBook(s) {
  const b = bk(s.activeBook);
  s.readBooks.push(b.id);
  s.activeBook = null;
  s.bookProg = 0;
  if (b.kind === 'treatise') {
    if (!knows(b.teaches)) s.troubles.push(b.teaches);
    note(`You finish ${b.title}. ${TROUBLES[b.teaches].lore}`);
    s.insight += 2;
  } else if (b.kind === 'herbal') {
    b.mats.forEach(id => s.lore[id] = [...BASE.find(m => m.id === id).tags]);
    note(`You finish ${b.title}. You know ${b.mats.map(id => BASE.find(m => m.id === id).name).join(', ')} properly now.`);
    s.insight += 2;
  } else {
    s.insight += 1;
    note(`You finish ${b.title}. ${pick(THOUGHTS)} (+1 insight)`);
  }
  dirty();
}

function finishOcc(s) {
  const d = s.doing;
  s.doing = null;
  if (d.kind === 'study') {
    const it = item(d.target);
    const un = it.tags.filter(t => !knownTags(d.target).includes(t));
    if (un.length) {
      const t = pick(un);
      S.lore[it.b] = [...knownTags(d.target), t];
      note(`You turn the ${it.name} over for an hour. It is ${t}.`);
    } else {
      note(`Nothing further from the ${it.name}.`);
    }
    s.insight += 1;
  }
  if (d.kind === 'ponder') {
    s.insight += 3;
    note(pick([
      'You sit with it until the shape of the thing comes clear. Nothing happened. Something changed.',
      'An hour at the window. You could not say what you worked out, but you worked something out.',
    ]));
  }
  dirty();
}

function nextCaller() {
  const w = SUPPLICANTS.map(sp =>
    1 + S.rumours.filter(r => r.trouble === sp.trouble).length * 1.5);
  let r = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < w.length; i++) {
    r -= w[i];
    if (r <= 0) return SUPPLICANTS[i];
  }
  return SUPPLICANTS[0];
}
