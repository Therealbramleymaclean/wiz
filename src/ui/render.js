/* Status bar, nav, page dispatch, and the per-tick partial refresh. */

const PAGES = [
  ['door','The Door'], ['search','Search'], ['work','Workshop'],
  ['tower','Home'],    ['town','Town'],     ['note','Notebook'],
  ['self','Yourself'],
];

let DIRTY = true;
const dirty = () => { DIRTY = true; };

function drawStatus() {
  const full = held() >= storeCap();
  $('status').innerHTML = `<span class="me">${S.name || 'A wizard, unnamed'}</span>
    <span class="r"><b>${S.rep}</b> renown</span>
    <span class="c"><b>${S.coin}</b> coin</span>
    <span class="i"><b>${S.insight}</b> insight</span>
    <span class="s ${full ? 'full' : ''}">${held()}/${storeCap()} held</span>
    <span class="speed">${
      [1, 10, 60].map(v => `<button class="${S.speed===v?'on':''}" onclick="setSpeed(${v})">&times;${v}</button>`).join('')
    }</span>`;

  const dots = navDots();
  $('madlib').textContent = S.name
    ? `${S.name}, ${kitDescriptor()}, in a ${tier().madlibNoun} at ${(START_LOCATIONS.find(l => l.id === S.location) || {}).name || 'no place in particular'}.`
    : '';

  $('nav').innerHTML = PAGES.map(([k, n]) => {
    const label = k === 'tower' ? cap(tier().name) : n;
    return `<button class="${S.page===k?'on':''}" onclick="go('${k}')">${label}${dots[k]?'<span class="dot"></span>':''}</button>`;
  }).join('');
}

/* Page dispatcher. Full re-render — DOM is small and stateless. */
function renderAll() {
  drawStatus();
  $('page').innerHTML = ({
    door: pageDoor, search: pageSearch, work: pageWork, tower: pageTower,
    town: pageTown, note: pageNote, self: pageSelf,
  })[S.page]();
  DIRTY = false;
}

/* Lightweight per-tick refresh so bars advance without wiping inputs. */
function renderTick() {
  drawStatus();

  if (S.page === 'note' && S.activeBook) {
    const b = bk(S.activeBook), d = readMin(b) * MIN;
    const bar = $('bookbar'), lf = $('bookleft');
    if (bar) bar.style.width = (S.bookProg / d * 100).toFixed(1) + '%';
    if (lf)  lf.textContent = mins(d - S.bookProg) + ' left';
  }
  if (S.page === 'note' && S.doing) {
    const bar = $('occbar');
    if (bar) bar.style.width = (S.doing.elapsed / S.doing.dur * 100).toFixed(1) + '%';
  }
  if (S.page === 'search') {
    const bar = $('cdbar'), txt = $('cdtxt'), btn = $('tapbtn');
    if (bar) {
      const pct = S.searchCd > 0 ? (1 - S.searchCd / SEARCH_CD_MS) * 100 : 100;
      bar.style.width = pct.toFixed(0) + '%';
    }
    if (txt) txt.textContent = S.searchCd > 0 ? Math.ceil(S.searchCd / 1000 * 10) / 10 + 's' : 'ready';
    if (btn && S.searchAt) {
      const full = held() >= storeCap();
      const ready = S.searchCd <= 0 && !full;
      btn.disabled = !ready;
      btn.textContent = full ? 'Your hands are full' : S.searchCd > 0 ? '\u2026' : 'Turn something up';
    }
  }
}
