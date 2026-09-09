/* Search — pick a place, tap for finds with a 1-second cooldown. */
function pageSearch() {
  const p = S.searchAt ? PLACES.find(x => x.id === S.searchAt) : null;
  const places = availPlaces();

  let h = `<h1>Out looking</h1>
    <p class="sub">Pick somewhere and turn something up. One find per click,
    a moment between each. Each location lists what you might find there.</p>
    <div class="places">${
      places.map(pl => `<button class="place ${S.searchAt===pl.id?'on':''}" onclick="setPlace('${pl.id}')">
        <b>${cap(pl.name)}</b>
        <span>${pl.mats.map(m => cap(BASE.find(x => x.id === m).name)).join(' \u00b7 ')}</span>
      </button>`).join('')
    }</div>`;

  if (p) {
    const cdPct = S.searchCd > 0 ? (1 - S.searchCd / SEARCH_CD_MS) * 100 : 100;
    h += `<div class="tapzone">
      <div class="bar" style="margin-bottom:16px"><i id="cdbar" style="width:${cdPct.toFixed(0)}%"></i></div>
      <button class="tapbtn" id="tapbtn" onclick="doTap()" ${held()>=storeCap()||S.searchCd>0?'disabled':''}>${
        held()>=storeCap() ? 'Your hands are full' : S.searchCd>0 ? '\u2026' : 'Turn something up'
      }</button>
      <div class="finds" id="finds">${S.lastFind || '&nbsp;'}</div>
      <div class="cooldown" id="cdtxt">${S.searchCd>0 ? Math.ceil(S.searchCd/1000*10)/10 + 's' : 'ready'}</div>
    </div>`;
  }

  h += '<h2>Things you have to hand</h2>' + shelfHTML(null, true);
  return h;
}
