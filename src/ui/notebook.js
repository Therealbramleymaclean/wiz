/* Notebook — reading track, current study, per-material study buttons. */
function pageNote() {
  const done = BASE.filter(m => (S.lore[m.id] || []).length === m.tags.length).length;
  let h = `<h1>The notebook</h1>
    <p class="sub">Everything you have worked out. None of it was given to you.</p>`;

  /* Reading — was Books tab in v8, lives here in v9. */
  h += '<h2>Under your arm</h2>';
  if (S.activeBook) {
    const b = bk(S.activeBook), d = readMin(b) * MIN;
    h += `<div class="card"><div class="t">${b.title}<span id="bookleft">${mins(d - S.bookProg)} left</span></div>
      <div class="bar"><i id="bookbar" style="width:${(S.bookProg/d*100).toFixed(1)}%"></i></div>
      <div style="margin-top:10px"><button class="ghost" style="margin:0" onclick="setBook(null)">Put it down</button></div></div>`;
  } else {
    h += '<p class="empty-txt">You are carrying nothing to read.</p>';
  }
  const unread = S.owned.filter(id => !S.readBooks.includes(id) && id !== S.activeBook);
  if (unread.length) {
    h += '<div class="filt" style="margin-top:8px">' + unread.map(id => {
      const b = bk(id);
      return `<button onclick="setBook('${id}')">Pick up: ${b.title}</button>`;
    }).join('') + '</div>';
  }

  /* Current study/ponder card. */
  if (S.doing) {
    const d = S.doing;
    if (d.kind === 'study') {
      const it = item(d.target), k = knownTags(d.target);
      h += `<div class="study-now"><div class="t">Studying &mdash; ${mins(d.dur - d.elapsed)} left</div>
        <div class="n">${cap(it.name)}</div>
        <div class="props">${it.tags.map(t => k.includes(t) ? `<b>${t}</b>` : `<i>?</i>`).join(' \u00b7 ')}</div>
        <div class="bar" id="occbar-wrap"><i id="occbar" style="width:${(d.elapsed/d.dur*100).toFixed(1)}%"></i></div>
        <div style="margin-top:10px"><button class="ghost" style="margin:0" onclick="stopOcc()">Stop</button></div></div>`;
    } else {
      h += `<div class="study-now"><div class="t">Sitting and thinking &mdash; ${mins(d.dur - d.elapsed)} left</div>
        <div class="bar"><i id="occbar" style="width:${(d.elapsed/d.dur*100).toFixed(1)}%"></i></div>
        <div style="margin-top:10px"><button class="ghost" style="margin:0" onclick="stopOcc()">Stop</button></div></div>`;
    }
  }

  h += `<div class="nb"><div class="grp">What troubles people &mdash; ${S.troubles.length} of ${Object.keys(TROUBLES).length}</div>`;
  h += Object.entries(TROUBLES).map(([k, v]) => knows(k)
    ? `<div class="lore">${v.lore}</div>`
    : `<div class="lore un">${v.label} &mdash; you have not read about this.</div>`
  ).join('');
  h += `<div class="grp">What things do &mdash; ${done} of ${BASE.length}</div>`;

  /* Inline study buttons per material. */
  h += BASE.map(m => {
    const k = S.lore[m.id] || [];
    const have = S.shelf[m.id] || 0;
    const canStudy = have > 0 && k.length < m.tags.length && !S.doing;
    const isStudying = S.doing && S.doing.kind === 'study' && S.doing.target === m.id;
    return `<div class="row ${k.length ? '' : 'un'}">
      <span>${cap(m.name)}${isStudying ? ' <em style="color:var(--sky);font-style:normal;font-family:var(--sans);font-size:10px">&middot; studying</em>' : ''}</span>
      <span class="v">${k.length ? m.tags.map(t => k.includes(t) ? t : '?').join(' \u00b7 ') : 'unknown'}</span>
      ${k.length < m.tags.length
        ? `<button class="study-btn" onclick="startStudy('${m.id}')" ${canStudy?'':'disabled'} title="${have?(S.doing?'Busy':'Study for '+mins(T.study)):'You have none to study'}">study</button>`
        : ''}
    </div>`;
  }).join('');
  h += '</div>';

  h += `<h2>Sit and think</h2>`;
  if (!S.doing) {
    h += `<button class="place" style="max-width:340px" onclick="startPonder()" ${S.troubles.length<3?'disabled style="opacity:.4"':''}>
      <b>Sit and think</b><span>${mins(T.ponder)} &middot; +3 insight${S.troubles.length<3?' &middot; you need more in your head first':''}</span></button>`;
  } else {
    h += '<p class="empty-txt">You are already occupied.</p>';
  }
  return h;
}
