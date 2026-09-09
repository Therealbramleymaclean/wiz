/* Yourself — name, kit, and rumours about you. */
function pageSelf() {
  let h = `<h1>Yourself</h1>
    <h2>What they call you</h2>
    <input class="nm" id="nmin" value="${S.name.replace(/"/g, '&quot;')}"
      placeholder="Name yourself" oninput="setName(this.value)">
    <h2>What you are wearing</h2>
    <div class="grid2">`;
  h += Object.keys(KIT).map(k => `<div class="sl"><b>${SLOTNAME[k]}</b>
    <select onchange="setKit('${k}',this.value)">${
      KIT[k].map(([v, n]) =>
        `<option value="${v}" ${S.kit[k]===v?'selected':''}>${n}</option>`
      ).join('')
    }</select></div>`).join('');
  h += '</div>';

  if (S.kit.lhand === 'orb') {
    h += '<p style="font-size:14px;color:var(--violet);margin-top:14px">The orb answers one question a caller, free. It is glass. You know it is glass.</p>';
  }

  h += '<h2>What people say about you</h2>';
  h += S.rumours.length
    ? S.rumours.map(r => `<div class="rum">
        <div class="t">${r.name}</div>
        <div class="d">${r.drift}</div>
        <div class="m">${TROUBLES[r.trouble].label.toLowerCase()} &middot; made from ${r.from}</div>
      </div>`).join('')
      + '<p style="font-family:var(--sans);font-size:11px;color:var(--dim);margin-top:14px">What you are known for decides who climbs the stairs.</p>'
    : '<p class="empty-txt">Nobody has anything to say about you yet.</p>';

  h += '<div style="margin-top:34px;opacity:.75"><button class="ghost" onclick="startOver()">Start over &mdash; forget it all</button></div>';
  return h;
}
