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

  /* Legacy and skills — visible once you have at least one life behind you. */
  if (S.lives > 1 || S.legacy > 0 || S.skills.length) {
    h += `<h2>What the forgetting left</h2>
    <p style="font-family:var(--sans);font-size:13px;color:var(--dim)">Life ${S.lives}. You hold <b>${S.legacy}</b> legacy${S.skills.length ? ` and ${S.skills.length} skill${S.skills.length===1?'':'s'}` : ''}.</p>`;
    h += '<div class="grid2">' + SKILLS.map(sk => {
      const owned = S.skills.includes(sk.id);
      const canBuy = !owned && S.legacy >= sk.cost;
      return `<div class="sl"><b>${sk.name}</b>
        <span style="font-size:12px;opacity:.7">${sk.desc}</span>
        ${owned
          ? '<span style="color:var(--moss);font-size:12px">\u2713 held</span>'
          : `<button class="go" style="margin-top:6px" onclick="buySkill('${sk.id}')" ${canBuy?'':'disabled'}>Buy &mdash; ${sk.cost} legacy</button>`}
      </div>`;
    }).join('') + '</div>';

    /* Keepsake selector: choose the one material that survives. */
    if (hasSkill('keepsake')) {
      const mats = Object.keys(S.shelf).filter(id => S.shelf[id] > 0);
      h += `<div class="sl" style="margin-top:10px"><b>Keepsake</b>
        <span style="font-size:12px;opacity:.7;display:block;margin:4px 0">You forget the spire, but not the nettle. One survives.</span>
        <select onchange="setKeepsake(this.value)">
          <option value="">\u2014 nothing \u2014</option>
          ${BASE.filter(m => mats.includes(m.id)).map(m =>
            `<option value="${m.id}" ${S.keepsake===m.id?'selected':''}>${m.name}</option>`
          ).join('')}
        </select></div>`;
    }
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
