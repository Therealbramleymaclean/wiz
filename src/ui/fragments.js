/* Shared HTML fragments used by several pages. */

function tagStr(id) {
  const it = item(id), k = knownTags(id), rev = revealed();
  return it.tags.map(t => !k.includes(t)
    ? '<i>?</i>'
    : (rev.includes(t) ? `<b>${t}</b>` : t)
  ).join(' \u00b7 ');
}

function shelfHTML(onclickFn, disabled) {
  const ids = Object.keys(S.shelf)
    .filter(i => S.shelf[i] > 0)
    .sort((a, b) => parseId(b).p - parseId(a).p || item(a).name.localeCompare(item(b).name));
  return `<div class="shelf" id="shelfbox">${
    ids.map(id => {
      const it = item(id);
      return `<button class="mat ${knownTags(id).length < it.tags.length ? 'unknown' : ''}"
        style="border-left-color:var(${it.col})"
        ${onclickFn ? `onclick="${onclickFn(id)}"` : ''}
        ${disabled || !onclickFn ? 'disabled' : ''}>${cap(it.name)}
        <span class="n">${S.shelf[id]}</span><span class="tags">${tagStr(id)}</span></button>`;
    }).join('') || '<span class="empty-txt">Nothing but dust. Go and search somewhere.</span>'
  }
  <div class="legend" style="width:100%">${
    POT.map(p => `<span><i style="background:var(${p.c})"></i>${p.lab}</span>`).join('')
  }</div></div>`;
}

function outcomeHTML() {
  if (!S.outcome) return '';
  const o = S.outcome;
  return `<div class="outcome ${o.cls}">
    <button class="x" onclick="clearOutcome()">&times;</button>
    ${o.name ? `<p class="named">${o.name}</p>` : ''}
    <p>${o.line}</p>
    <p class="gain">${o.detail}</p>
    ${o.gained ? `<p class="learned">You noticed: ${o.gained}.</p>` : ''}
  </div>`;
}
