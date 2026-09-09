/* Town — bookseller, builder, ironmonger. Replaced the Books tab in v9. */
function pageTown() {
  let h = `<h1>Town</h1><p class="sub">The road down takes an hour, but it never seems to.
    You come back with what you came for and no memory of the walk.</p>`;

  h += '<h2>The bookseller</h2>';
  const real = BOOKS.filter(b => b.cost > 0 && !S.owned.includes(b.id));
  h += real.map(b => `<button class="item buy" onclick="buy('${b.id}')" ${S.coin<b.cost?'disabled':''}>
    <span class="price ${S.coin<b.cost?'no':''}">${b.cost}c</span>${b.title}
    <span>${b.kind} &middot; ${b.min} minutes</span></button>`).join('')
    || '<p class="empty-txt">He has nothing left you want.</p>';

  h += '<h2>Whatever else is in the cart</h2>';
  h += SHOP_PROC.map(b => `<button class="item buy" onclick="buyProc('${b.id}')" ${S.coin<b.cost?'disabled':''}>
    <span class="price ${S.coin<b.cost?'no':''}">${b.cost}c</span>${b.title}
    <span>common &middot; ${b.min} minutes &middot; a thought, perhaps</span></button>`).join('');

  h += '<h2>The builder</h2>';
  const cap = roomCap(), used = S.rooms.length, room = cap - used;
  if (room > 0) {
    /* Room cost scales with how many you already have this tier. */
    const t = tier();
    const roomCost = Math.round(20 * Math.pow(1.35, used - 1));
    h += `<button class="item buy" onclick="commissionRoom()" ${S.coin<roomCost?'disabled':''}>
      <span class="price ${S.coin<roomCost?'no':''}">${roomCost}c</span>Another room in the ${t.name}
      <span>Room for ${room} more before the ${t.name} is full. Placed on the lowest floor with space.</span></button>`;
  } else {
    h += '<p class="empty-txt">The ' + tier().name + ' is at its full size. The builder shrugs.</p>';
  }
  const nx = nextTier();
  if (S.tierOffered && nx) {
    h += `<button class="item buy" onclick="commissionTier()" ${S.coin<nx.coin?'disabled':''}>
      <span class="price ${S.coin<nx.coin?'no':''}">${nx.coin}c</span>Raise the ${nx.name}
      <span>${nx.floors} floors, ${nx.roomsPerFloor} rooms each. The stair goes up further than it did.</span></button>`;
  }

  h += '<h2>Fixtures &mdash; ironmonger</h2>';
  h += Object.entries(FIXTURES).filter(([k]) => !S.ups.includes(k)).map(([k, f]) =>
    `<button class="item buy" onclick="buyFix('${k}')" ${S.coin<f.cost?'disabled':''}>
      <span class="price ${S.coin<f.cost?'no':''}">${f.cost}c</span>${f.name}
      <span>${f.desc} &middot; goes in a ${f.fits.map(x => ROOM_FN[x].name.toLowerCase().replace(/^a\s+|^an\s+/, '')).join(' or ')}</span></button>`
  ).join('') || '<p class="empty-txt">You own every fixture.</p>';

  return h;
}
