/* All player actions. These are attached to window so inline onclick="..." works. */

/* Navigation and settings. */
window.go       = p => { S.page = p; dirty(); renderAll(); };
window.setSpeed = v => { S.speed = v; drawStatus(); };
window.setName  = v => { S.name = v; drawStatus(); };
window.setFilt  = v => { S.workFilter = v; renderAll(); };

/* Search — one click, cooldown gates the next. No shelf redraw per tap. */
window.doTap = () => {
  if (!S.searchAt || held() >= storeCap() || S.searchCd > 0) return;
  const p = PLACES.find(x => x.id === S.searchAt);
  const id = pick(p.mats);
  give(id);
  S.lastFind = `You turn up <b>${item(id).name}</b>.`;
  note(`Found ${item(id).name} at ${p.name}.`);
  S.searchCd = SEARCH_CD_MS;
  /* Update find text and disable button now; shelf refreshes on next render tick. */
  const f = $('finds'); if (f) f.innerHTML = S.lastFind;
  const btn = $('tapbtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = held() >= storeCap() ? 'Your hands are full' : '\u2026';
  }
  const bar = $('cdbar'); if (bar) bar.style.width = '0%';
  /* Full re-render deferred a hair so the tap feels snappy but shelf updates. */
  setTimeout(() => { dirty(); renderAll(); }, 50);
};
window.setPlace = id => {
  S.searchAt = S.searchAt === id ? null : id;
  S.lastFind = ''; S.searchCd = 0;
  dirty(); renderAll();
};

/* Reading and study. */
window.setBook = id => {
  if (id && S.readBooks.includes(id)) return;
  S.activeBook = id; S.bookProg = 0; renderAll();
};
window.startStudy = id => {
  if (S.doing) return;
  if (!(S.shelf[id] > 0)) return;
  S.doing = { kind: 'study', target: id, elapsed: 0, dur: T.study };
  renderAll();
};
window.startPonder = () => {
  if (S.doing) return;
  S.doing = { kind: 'ponder', target: null, elapsed: 0, dur: T.ponder };
  renderAll();
};
window.stopOcc = () => { S.doing = null; renderAll(); };

/* Rooms and fixtures. */
window.setRoom = (i, v) => {
  const r = S.rooms[i]; r.fn = v;
  if (r.fixture && !FIXTURES[r.fixture].fits.includes(v)) r.fixture = null;
  if (v !== 'garden') { r.sown = null; r.grown = 0; }
  renderAll();
};
window.setFix = (i, v) => {
  S.rooms.forEach(r => { if (r.fixture === v) r.fixture = null; });
  S.rooms[i].fixture = v || null;
  renderAll();
};
window.sow = (i, v) => {
  S.rooms[i].sown = v || null; S.rooms[i].grown = 0; renderAll();
};
window.setKit = (k, v) => { S.kit[k] = v; renderAll(); };

/* Builder commissions. */
window.commissionRoom = () => {
  const cap = roomCap();
  if (S.rooms.length >= cap) return;
  const cost = roomCost();
  if (S.coin < cost) return;
  const t = tier();
  let placedFloor = 0;
  for (let f = 0; f < t.floors; f++) {
    if (S.rooms.filter(r => r.floor === f).length < t.roomsPerFloor) { placedFloor = f; break; }
  }
  S.coin -= cost;
  S.rooms.push({ floor: placedFloor, fn: 'empty', fixture: null, sown: null, grown: 0 });
  note(`The builder raises another room on floor ${placedFloor + 1}. Wood-smell for a week.`);
  renderAll();
};
window.commissionTier = () => {
  const nx = nextTier();
  if (!nx) return;
  if (!S.tierOffered) return;
  if (S.coin < nx.coin) return;
  S.coin -= nx.coin;
  S.tierIx++; S.tierOffered = false;
  /* Rooms keep their floor index; the tier permits more of them and more floors. */
  note(`The work is done. Your ${tier().name} rises where the old ${TIERS_UP[S.tierIx - 1].name} stood. The stair goes up further than it did.`);
  renderAll();
};

/* Combine — batches, reveals unknown input properties on the way. */
window.qty = (id, d) => {
  const el = $('q_' + id); if (!el) return;
  const have = S.shelf[id] || 0, max = Math.floor(have / combineN());
  let v = parseInt(el.value) || 1;
  v = Math.max(1, Math.min(max, v + d));
  el.value = v;
};
window.qtySet = (id, v) => {
  const el = $('q_' + id); if (!el) return;
  const have = S.shelf[id] || 0, max = Math.floor(have / combineN());
  let n = parseInt(v) || 1;
  n = Math.max(1, Math.min(max, n));
  el.value = n;
};
window.doCombine = id => {
  const N = combineN();
  const el = $('q_' + id);
  const batches = el ? Math.max(1, parseInt(el.value) || 1) : 1;
  const { b, p } = parseId(id);
  if (p >= 5) return;
  const have = S.shelf[id] || 0;
  const canDo = Math.min(batches, Math.floor(have / N));
  if (canDo <= 0) return;

  /* Reveal unknown properties of the input mat, one per batch, up to what's left unknown. */
  const it = item(id);
  const un = it.tags.filter(t => !knownTags(id).includes(t));
  const revealCount = Math.min(un.length, canDo);
  if (revealCount) {
    const rev = un.slice(0, revealCount);
    S.lore[b] = [...knownTags(id), ...rev];
    note(`Working with the ${it.name}, you notice: ${rev.join(', ')}.`);
  }

  S.shelf[id] -= N * canDo;
  if (!S.shelf[id]) delete S.shelf[id];
  const out = b + '@' + (p + 1);
  S.shelf[out] = (S.shelf[out] || 0) + canDo;
  note(`${N * canDo} become ${canDo}. You have ${canDo}\u00d7 ${item(out).name}.`);
  renderAll();
};

/* Transmute. */
window.toggleTrans = id => {
  if (S.transSel.includes(id)) S.transSel = S.transSel.filter(x => x !== id);
  else if (S.transSel.length < 4 && !S.transSel.some(x => parseId(x).b === parseId(id).b)) S.transSel.push(id);
  renderAll();
};
window.clearTrans = () => { S.transSel = []; renderAll(); };
window.doTrans = () => {
  if (S.transSel.length !== 4) return;
  const tags = new Set();
  S.transSel.forEach(x => item(x).tags.forEach(t => tags.add(t)));
  S.transSel.forEach(x => { S.shelf[x]--; if (!S.shelf[x]) delete S.shelf[x]; });
  const used = new Set(S.transSel.map(x => parseId(x).b));
  let pool = BASE.filter(m => !used.has(m.id) && m.tags.some(t => tags.has(t)));
  if (!pool.length) pool = BASE;
  const out = pick(pool).id;
  S.shelf[out] = (S.shelf[out] || 0) + 1;
  note(`Four become one. The workshop gives you back ${item(out).name}.`);
  S.transSel = []; renderAll();
};

/* Shopping. */
window.buy = id => {
  const b = BOOKS.find(x => x.id === id);
  if (S.coin < b.cost) return;
  S.coin -= b.cost; S.owned.push(id);
  note(`You buy ${b.title}.`); renderAll();
};
window.buyProc = id => {
  const b = S.procBooks[id];
  if (S.coin < b.cost) return;
  S.coin -= b.cost; S.owned.push(id);
  SHOP_PROC = SHOP_PROC.filter(x => x.id !== id);
  SHOP_PROC.push(makeProcBook());
  note(`You buy ${b.title}. It is probably rubbish.`); renderAll();
};
window.buyFix = k => {
  const f = FIXTURES[k];
  if (S.coin < f.cost) return;
  S.coin -= f.cost; S.ups.push(k);
  note(`${f.name}. Now put it somewhere.`); renderAll();
};

/* Bench. */
window.place = id => {
  if (S.bench.length >= 3 || !S.shelf[id]) return;
  S.shelf[id]--; if (!S.shelf[id]) delete S.shelf[id];
  S.bench.push(id); renderAll();
};
window.unplace = i => {
  const id = S.bench.splice(i, 1)[0];
  S.shelf[id] = (S.shelf[id] || 0) + 1;
  renderAll();
};
window.clearBench = () => {
  S.bench.forEach(id => S.shelf[id] = (S.shelf[id] || 0) + 1);
  S.bench = []; renderAll();
};
window.clearOutcome = () => { S.outcome = null; renderAll(); };
window.clearLog     = () => { S.log = []; renderAll(); };
window.startOver    = () => {
  if (!confirm('Start over? This game will be forgotten.')) return;
  clearSave();
  location.reload();
};

/* Autofill — the "reach for the obvious things" ghost button. */
window.autofill = () => {
  S.bench.forEach(id => S.shelf[id] = (S.shelf[id] || 0) + 1);
  S.bench = [];
  const rev = revealed();
  if (!rev.length) { renderAll(); return; }
  const ids = Object.keys(S.shelf).filter(id => S.shelf[id] > 0);
  const sc = id => rev.filter(n => knownTags(id).includes(n)).length;
  ids.sort((a, b) => sc(b) - sc(a));
  const covered = new Set();
  for (const id of ids) {
    if (S.bench.length >= 3) break;
    const adds = rev.filter(n => knownTags(id).includes(n) && !covered.has(n));
    if (!adds.length) continue;
    S.shelf[id]--; if (!S.shelf[id]) delete S.shelf[id];
    S.bench.push(id);
    adds.forEach(n => covered.add(n));
    if (covered.size === rev.length) break;
  }
  renderAll();
};

/* Caller dialogue actions. */
function revealOne() {
  const rev = revealed(), miss = needsOf().filter(n => !rev.includes(n));
  if (!miss.length) return null;
  S.asked.push('n' + needsOf().indexOf(miss[0]));
  return miss[0];
}
window.intuit = () => {
  if (S.insight < INTUIT_COST) return;
  const n = revealOne(); if (!n) return;
  S.insight -= INTUIT_COST;
  S.said.push(`You have seen this before, or something like it. It wants <b>${n}</b>.`);
  renderAll();
};
window.orb = () => {
  if (S.orbUsed) return;
  const n = revealOne(); if (!n) return;
  S.orbUsed = true;
  S.said.push(`You make a show of the orb. Looking into it, you happen to notice they want <b>${n}</b>. The glass had nothing to do with it.`);
  renderAll();
};
window.ask = q => {
  if (leftAct() <= 0 || S.asked.includes(q)) return;
  S.asked.push(q); S.used++;
  const sp = S.supplicant, needs = needsOf();
  if (q === 'n0') S.said.push(sp.when);
  if (q === 'n1') S.said.push(`You look properly. What it wants is <b>${needs[1]}</b>, and you would have missed it.`);
  if (q === 'tried') {
    const dud = BASE.filter(m => !m.tags.some(t => needs.includes(t)));
    const m = pick(dud.length ? dud : BASE);
    S.lore[m.id] = [...m.tags];
    S.said.push(`${sp.tried} ${m.name}. It did nothing \u2014 but you have handled it now, and you know what it is.`);
  }
  renderAll();
};

/* Turn a caller away — costs 1 renown, returns bench items to the shelf. */
window.turnAway = () => {
  if (!S.supplicant) return;
  const sp = S.supplicant;
  const lost = Math.max(0, Math.min(S.rep, 1));
  S.rep -= lost;
  S.bench.forEach(id => S.shelf[id] = (S.shelf[id] || 0) + 1); S.bench = [];
  S.outcome = {
    cls: 'turned', name: null,
    line: `You do not open the door. ${sp.who} waits, then goes back down the stair.`,
    detail: lost
      ? '\u22121 renown. Word travels. It is not the good kind.'
      : 'There is no renown to lose. They go down the stair quietly, and you think about it afterwards.',
    gained: '',
  };
  note(lost
    ? `You turned ${sp.keeps} away. \u22121 renown.`
    : `You turned ${sp.keeps} away. No renown to lose, but it was not kind.`);
  S.supplicant = null; S.used = 0; S.asked = []; S.said = []; S.orbUsed = false;
  S.knockIn = callerWait();
  renderAll();
};

/* Answer — the big one. Scores the bench against needs, publishes an outcome. */
window.answer = () => {
  const used = [...S.bench], names = used.map(id => item(id).name);
  const needs = needsOf(), tags = benchTags(), sp = S.supplicant;
  const met = needs.filter(n => tags.has(n));
  let score = met.length;
  if (met.length === needs.length) score += [0, 2, 1, 0][used.length];
  score = Math.max(0, Math.min(5, score + [2, 1, 0, -1, -1][S.used]));
  const t = pick(POOLS[score]);
  const gained = [];
  used.forEach(id => {
    const it = item(id);
    it.tags.forEach(tt => {
      if (needs.includes(tt) && !knownTags(id).includes(tt)) {
        S.lore[it.b] = [...knownTags(id), tt];
        gained.push(`${it.name} is ${tt}`);
      }
    });
  });
  S.rep += TIERS_ANS[t].rep;
  S.coin += TIERS_ANS[t].coin;
  let name = null;
  if (t === 'remembered') {
    name = `The ${cap(sp.keeps)}\u2019s ${NOUN[parseId(pick(used)).b]}`;
    S.rumours.unshift({ name, trouble: sp.trouble, from: names.join(', '), drift: pick(DRIFT) });
  }
  const missed = needs.filter(n => !met.includes(n));
  S.outcome = {
    cls: TIERS_ANS[t].cls, name,
    line: pick(REACTION[t]),
    detail: `It wanted <b>${needs.join(', ')}</b>. You gave ${
      met.length ? met.join(' and ') : 'none of it'}${
      missed.length ? `, and missed ${missed.join(' and ')}` : ''}, using ${
      used.length} thing${used.length === 1 ? '' : 's'} and ${
      S.used} action${S.used === 1 ? '' : 's'}. ${
      TIERS_ANS[t].rep ? `+${TIERS_ANS[t].rep} renown, +${TIERS_ANS[t].coin} coin.` : 'Nothing gained.'}`,
    gained: gained.join('; '),
  };
  note(name
    ? `${name}. +${TIERS_ANS[t].rep} renown.`
    : `The ${sp.keeps}: ${t}. +${TIERS_ANS[t].rep} renown.`);
  S.bench = []; S.supplicant = null; S.used = 0; S.asked = []; S.said = []; S.orbUsed = false;
  S.knockIn = callerWait();
  renderAll();
};
