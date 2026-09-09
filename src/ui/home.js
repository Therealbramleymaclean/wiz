/* Home page (shack/cottage/tower/spire). Rooms grouped by floor. */
function pageTower() {
  const t = tier();
  const nx = nextTier();
  let h = `<h1>${t.pageTitle}</h1>
    <p class="sub">${S.rooms.length} of ${roomCap()} rooms across ${t.floors} floor${t.floors===1?'':'s'} \u2014
    ${t.roomsPerFloor} per floor. Holding ${held()} of ${storeCap()}.
    Change what any room is for whenever you like.</p>`;

  if (S.tierOffered && nx) {
    h += `<div class="card" style="border-color:var(--candle)">
      <div class="t">The builder\u2019s offer <span>${nx.coin}c</span></div>
      <div class="note-p" style="margin:0 0 10px">${nx.rumour} If you pay for it, this becomes a ${nx.name} \u2014 ${nx.floors} floors, ${nx.roomsPerFloor} rooms each.</div>
      <button class="go" onclick="commissionTier()" ${S.coin<nx.coin?'disabled':''}>Commission the ${nx.name}</button>
    </div>`;
  } else if (nx) {
    h += `<div class="card" style="opacity:.6">
      <div class="t">The next thing <span>needs ${nx.reqRep} renown</span></div>
      <div class="note-p" style="margin:0">A builder won\u2019t take work for someone unknown. Word has to reach them first.</div>
    </div>`;
  }

  /* Group rooms by floor. */
  for (let f = 0; f < t.floors; f++) {
    const onFloor = S.rooms.filter(r => r.floor === f);
    h += `<div class="floor"><div class="fh"><b>Floor ${f+1}</b><span>${onFloor.length} of ${t.roomsPerFloor}</span></div>`;
    h += '<div class="rgrid">';
    h += onFloor.map(r => {
      const ix = S.rooms.indexOf(r);
      const fits = Object.keys(FIXTURES).filter(fx =>
        FIXTURES[fx].fits.includes(r.fn) && (S.ups.includes(fx) || r.fixture === fx));
      let inner = `<div class="rh">Room</div>
        <select onchange="setRoom(${ix},this.value)">${
          Object.entries(ROOM_FN).map(([k, v]) =>
            `<option value="${k}" ${r.fn===k?'selected':''}>${v.name}</option>`
          ).join('')
        }</select>
        <div class="eff">${ROOM_FN[r.fn].desc}</div>`;
      if (r.fn === 'garden') {
        inner += `<select onchange="sow(${ix},this.value)" style="margin-top:6px">
          <option value="">\u2014 sow nothing \u2014</option>${
            BASE.filter(m => m.sow).map(m =>
              `<option value="${m.id}" ${r.sown===m.id?'selected':''}>${cap(m.name)}</option>`
            ).join('')
          }</select>`;
        if (r.sown) {
          inner += `<div class="bar" style="margin-top:6px"><i style="width:${(r.grown/T.grow*100).toFixed(1)}%"></i></div>`;
        }
      }
      if (fits.length) {
        inner += `<select onchange="setFix(${ix},this.value)" style="margin-top:6px">
          <option value="">\u2014 no fixture \u2014</option>${
            fits.map(fx =>
              `<option value="${fx}" ${r.fixture===fx?'selected':''}>${FIXTURES[fx].name}</option>`
            ).join('')
          }</select>`;
      }
      return `<div class="room">${inner}</div>`;
    }).join('');
    h += '</div></div>';
  }

  const canBuild = S.rooms.length < roomCap();
  h += `<p style="font-family:var(--sans);font-size:12px;color:var(--dim);margin-top:10px">
    New rooms are commissioned at the builder in Town.${
      canBuild ? '' : ' The ' + t.name + ' is full. Commission the ' + (nx ? nx.name : 'next tier') + ' to build more.'
    }</p>`;
  return h;
}
